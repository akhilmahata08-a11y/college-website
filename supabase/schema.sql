-- ============================================================================
-- Vidyanova college website — Supabase schema
-- Run this in your Supabase project's SQL editor, once.
--
-- Security note: the policies below are deliberately permissive so the demo
-- works with the public "anon" key straight away. Before you take real
-- admissions data, replace the insert policies with Edge Functions or add
-- auth checks — an anon-insert table can be spammed by anyone.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- notices ---
create table if not exists public.notices (
  id            text primary key default ('n_' || replace(gen_random_uuid()::text, '-', '')),
  title         text not null,
  body          text not null,
  category      text not null default 'general'
                check (category in ('general', 'exam', 'event', 'admin')),
  published_on  date not null default current_date,
  created_at    timestamptz not null default now()
);

create index if not exists notices_published_idx on public.notices (published_on desc);

-- ----------------------------------------------------------- applications ---
create table if not exists public.applications (
  id          uuid primary key default gen_random_uuid(),
  app_no      text unique not null,
  name        text not null,
  email       text not null,
  phone       text not null,
  course      text not null,
  marks       numeric(5, 2) not null check (marks >= 0 and marks <= 100),
  category    text default 'General',
  note        text default '',
  status      text not null default 'Under review'
              check (status in ('Under review', 'Shortlisted', 'Waitlisted', 'Offer made', 'Rejected')),
  created_at  timestamptz not null default now()
);

create index if not exists applications_app_no_idx on public.applications (app_no);

-- --------------------------------------------------------------- students ---
create table if not exists public.students (
  roll          text primary key,
  dob           date not null,
  name          text not null,
  programme     text not null,
  semester      int not null check (semester between 1 and 8),
  cgpa          numeric(4, 2) not null,
  attendance    int not null check (attendance between 0 and 100),
  fee_status    text not null default 'Paid',
  marks         jsonb not null default '[]'::jsonb
);

-- ------------------------------------------------------------ row access ---
alter table public.notices      enable row level security;
alter table public.applications enable row level security;
alter table public.students     enable row level security;

drop policy if exists "notices are public"      on public.notices;
drop policy if exists "anyone can post notices" on public.notices;
drop policy if exists "anyone can remove a notice" on public.notices;
drop policy if exists "applications insert"     on public.applications;
drop policy if exists "applications read own"   on public.applications;
drop policy if exists "students read own"       on public.students;

create policy "notices are public"
  on public.notices for select using (true);

-- DEMO ONLY: lets the admin form on the site publish notices with the anon key.
create policy "anyone can post notices"
  on public.notices for insert with check (true);

create policy "anyone can remove a notice"
  on public.notices for delete using (true);

create policy "applications insert"
  on public.applications for insert with check (true);

-- DEMO ONLY: the status checker looks a row up by application number.
create policy "applications read own"
  on public.applications for select using (true);

-- DEMO ONLY: the student portal matches roll + date of birth. In production,
-- move this behind Supabase Auth so a student can only read their own row.
create policy "students read own"
  on public.students for select using (true);

-- ------------------------------------------------------------- seed rows ---
insert into public.notices (id, title, body, category, published_on) values
  ('n1', 'Mid-semester examination timetable released',
   'The November timetable for semesters 3, 5 and 7 is now on the portal. Hall tickets can be downloaded from 10 November.',
   'exam', '2026-10-27'),
  ('n2', 'Applications for Autumn 2026 close on 30 November',
   'All UG programmes close on 30 November. Late applications are considered only against vacant seats, with a Rs 1,500 late fee.',
   'admin', '2026-10-24'),
  ('n3', 'Vidyanova TechFest - registrations open',
   'TechFest runs 12-14 December with 22 events, a 24-hour hackathon and a Rs 3 lakh prize pool.',
   'event', '2026-10-21'),
  ('n4', 'Merit scholarship list published',
   'The first list of merit-cum-means scholarship awardees is on the notice board outside the academic office.',
   'general', '2026-10-18'),
  ('n5', 'Library extends hours during examinations',
   'The central library will stay open until 1 am from 8 November to 28 November.',
   'general', '2026-10-15')
on conflict (id) do nothing;

insert into public.students (roll, dob, name, programme, semester, cgpa, attendance, fee_status, marks) values
  ('CSE2021001', '2003-05-14', 'Riya Sharma', 'B.Tech Computer Science & Engineering', 6, 8.74, 92, 'Paid',
   '[{"code":"CS601","subject":"Distributed Systems","credits":4,"grade":"A","points":9},
     {"code":"CS602","subject":"Machine Learning","credits":4,"grade":"A+","points":10},
     {"code":"CS603","subject":"Compiler Design","credits":3,"grade":"B+","points":8},
     {"code":"CS604","subject":"Computer Networks Lab","credits":2,"grade":"A","points":9},
     {"code":"HS601","subject":"Professional Communication","credits":2,"grade":"A+","points":10}]'::jsonb),
  ('ECE2022014', '2004-01-09', 'Arjun Patel', 'B.Tech Electronics & Communication', 4, 7.92, 84, 'Part-paid',
   '[{"code":"EC401","subject":"Digital Signal Processing","credits":4,"grade":"B+","points":8},
     {"code":"EC402","subject":"Analog Circuits","credits":4,"grade":"A","points":9},
     {"code":"EC403","subject":"Microcontrollers","credits":3,"grade":"B","points":7},
     {"code":"EC404","subject":"VLSI Lab","credits":2,"grade":"A","points":9}]'::jsonb)
on conflict (roll) do nothing;
