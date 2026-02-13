-- Fix RLS policies to avoid querying auth.users directly
-- Issue: "permission denied for table users" when enrolling (inserting) because RLS policies check auth.users

-- Students Table
drop policy if exists "Students can view own profile" on public.students;

drop policy if exists "Students can claim profile" on public.students;

-- 1. View Profile: Match user_id OR email (from JWT)
create policy "Students can view own profile" on public.students for
select using (
        auth.uid () = user_id
        OR email = (auth.jwt () ->> 'email')
    );

-- 2. Claim Profile: Match email (from JWT)
create policy "Students can claim profile" on public.students
for update
    using (
        email = (auth.jwt () ->> 'email')
    )
with
    check (
        email = (auth.jwt () ->> 'email')
    );