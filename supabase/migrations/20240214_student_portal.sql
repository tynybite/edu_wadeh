-- Student Portal Migration
-- Date: 2024-02-14

-- 1. BATCHES TABLE
create table if not exists public.batches (
    id uuid default uuid_generate_v4 () primary key,
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    name text not null, -- e.g. "BEMS 2024-25"
    program text not null,
    start_date date not null,
    end_date date not null
);

-- 2. STUDENTS TABLE
create table if not exists public.students (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,

-- Link to Auth User (The login account)
user_id uuid references auth.users (id),

-- Link to Original Application
application_id uuid references public.applications (id),

-- Academic Details
batch_id uuid references public.batches (id),
enrollment_number text unique not null,
current_semester int default 1,

-- Snapshot of personal details (in case application is deleted/archived, though unlikely)
-- We can mostly just join with applications, but keeping a name here is useful for quick lookups
full_name text, email text, phone text );

-- 3. NOTICES TABLE
create table if not exists public.notices (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    content text not null,

-- Targeting
audience_type text check (audience_type in ('all', 'batch', 'program')) default 'all',
    target_batch_id uuid references public.batches(id), -- If audience_type is 'batch'
    
    is_active boolean default true,
    author_id uuid references auth.users(id) -- Admin who posted
);

-- RLS POLICIES

-- Batches
alter table public.batches enable row level security;

-- Drop existing policies to be safe (Idempotency)
drop policy if exists "Admins can manage batches" on public.batches;

drop policy if exists "Students can view batches" on public.batches;

create policy "Admins can manage batches" on public.batches for all using (
    auth.role () = 'authenticated' -- For MVP we trust authenticated users are admins or we can add specific admin check later
);

create policy "Students can view batches" on public.batches for
select using (
        auth.role () = 'authenticated'
    );

-- Students
alter table public.students enable row level security;

drop policy if exists "Admins can manage students" on public.students;

drop policy if exists "Students can view own profile" on public.students;

drop policy if exists "Students can claim profile" on public.students;

create policy "Admins can manage students" on public.students for all using (
    auth.role () = 'authenticated'
    -- In a real app we'd check public.users_roles or similar. For now, we assume auth users are admin OR self.
    -- Ideally: exists(select 1 from admins where id = auth.uid()) OR user_id = auth.uid()
);

-- Allow students to read THEIR OWN record
create policy "Students can view own profile" on public.students for
select using (
        auth.uid () = user_id
        OR email = (
            select email
            from auth.users
            where
                id = auth.uid ()
        )
    );

-- Allow students to claim their profile (Link User ID)
create policy "Students can claim profile" on public.students
for update
    using (
        email = (
            select email
            from auth.users
            where
                id = auth.uid ()
        )
    )
with
    check (
        email = (
            select email
            from auth.users
            where
                id = auth.uid ()
        )
    );

-- Notices
alter table public.notices enable row level security;

drop policy if exists "Admins can manage notices" on public.notices;

drop policy if exists "Students can view relevant notices" on public.notices;

create policy "Admins can manage notices" on public.notices for all using (
    auth.role () = 'authenticated'
);

create policy "Students can view relevant notices" on public.notices for
select using (
        is_active = true
        -- Logic: If audience is 'all', OR (audience is 'batch' AND user is in that batch)
        -- This requires a join check which can be expensive. 
        -- Simplified for MVP: Authenticated users can read active notices.
        and auth.role () = 'authenticated'
    );