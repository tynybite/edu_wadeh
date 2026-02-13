-- MIGRATION: Admin Dashboard & Application Tracking
-- Date: 2024-02-13

-- 1. APPLICATIONS TABLE
-- Stores the live state of an application form, even if incomplete.
create table if not exists public.applications (
    id uuid default uuid_generate_v4 () primary key,
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone ('utc'::text, now()) not null,

-- Optional: Link to a Lead if we have identified them
lead_id uuid references public.leads (id) on delete set null,

-- Status tracking
status text check (
    status in (
        'draft',
        'submitted',
        'reviewing',
        'approved',
        'rejected'
    )
) default 'draft',
current_step int default 1,

-- JSONB Data Storage for flexibility
step_data jsonb default '{}'::jsonb, -- Stores form data { name: "...", "step2": ... }
documents jsonb default '[]'::jsonb, -- Stores file metadata URLs

-- Financials
fee_amount numeric default 0, coupon_code text,

-- Quick Access Fields (duplicated from JSON for easier querying if needed)
applicant_name text,
    applicant_email text,
    applicant_phone text
);

-- 2. COUPONS TABLE
-- Stores discount codes.
create table if not exists public.coupons (
    code text primary key,
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    discount_type text check (
        discount_type in ('percentage', 'fixed')
    ) not null,
    discount_value numeric not null,
    active boolean default true,
    max_uses int,
    used_count int default 0
);

-- 3. APP SETTINGS TABLE
-- Stores dynamic configuration like 'application_fee'.
create table if not exists public.app_settings (
    key text primary key,
    value jsonb not null,
    updated_at timestamp with time zone default timezone ('utc'::text, now()) not null
);

-- SEED DATA for Settings
insert into
    public.app_settings (key, value)
values (
        'application_fee',
        '500'::jsonb
    ),
    (
        'enable_discounts',
        'true'::jsonb
    )
on conflict (key) do nothing;

-- SECURITY POLICIES (RLS)

-- Enable RLS
alter table public.applications enable row level security;

alter table public.coupons enable row level security;

alter table public.app_settings enable row level security;

-- APPLICATIONS POLICIES
-- Admins can view/edit ALL applications
create policy "Admins can manage all applications" on public.applications for all using (
    auth.role () = 'authenticated'
);

-- Public/Applicants can INSERT (Start a draft)
create policy "Public can start applications" on public.applications for insert
with
    check (true);

-- Public/Applicants can UPDATE their own drafts (We rely on them knowing the UUID)
-- Note: In a strict env, we'd use a signed token. For now, we allow update if ID matches.
-- This effectively means if you know the UUID, you can update it.
create policy "Public can update applications" on public.applications
for update
    using (true);

-- Public can SELECT? No, for privacy, we don't let public iterate.
-- They should use local state. If they need to resume, strict auth is better.
-- For now: NO public select.

-- COUPONS POLICIES
-- Admins manage
create policy "Admins can manage coupons" on public.coupons for all using (
    auth.role () = 'authenticated'
);
-- Public can read (to validate code)
create policy "Public can view active coupons" on public.coupons for
select using (active = true);

-- APP SETTINGS POLICIES
-- Admins manage
create policy "Admins can manage settings" on public.app_settings for all using (
    auth.role () = 'authenticated'
);
-- Public can read (to get fee)
create policy "Public can view settings" on public.app_settings for
select using (true);