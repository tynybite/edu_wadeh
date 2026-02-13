-- Add invitation tracking
alter table public.students
add column if not exists invitation_sent_at timestamp with time zone;