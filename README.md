# Vidyanova Institute of Technology — college website

A complete college website with a glassmorphism interface: programmes, online
admissions, a student portal with results and attendance, a notice board,
events, faculty and contact — all of it working, with no build step and no
dependencies.

Open `index.html` in a browser and everything runs. That is the whole setup.

```
college-site/
├── index.html
├── css/styles.css
├── js/
│   ├── supabase-config.js   ← paste your Supabase URL + anon key here
│   ├── store.js             ← data layer (Supabase or localStorage)
│   └── app.js               ← all page behaviour
├── supabase/schema.sql      ← run once in Supabase to enable shared storage
└── README.md
```

## What works

| Feature | Behaviour |
| --- | --- |
| **Programme catalogue** | 12 programmes across 4 schools. Filter by school, live search, and a detail modal with seats, eligibility and tuition. "Apply for this programme" pre-fills the admission form. |
| **Online admissions** | Validated form (name, email, Indian mobile, programme, marks, category). On submit it issues an application number like `VIT-2026-4821` and shows it in a confirmation dialog. |
| **Application status** | Look up any submitted application number and see applicant, programme, status and submission date. |
| **Student portal** | Sign in with roll number + date of birth. Shows CGPA, semester SGPA computed from the marks table, attendance with a warning under 75%, fee status, and the full grade sheet. Demo account: `CSE2021001` / `2003-05-14`. |
| **Notice board** | Category filters, live search, publish a notice, delete a notice. Newest first. The three most recent notices also appear in the hero card. |
| **Events** | Upcoming/past filter, dates compared against today, past events dimmed. |
| **Faculty** | Live search across name, department and specialisation. |
| **Contact form** | Validated, with success feedback. |
| **Theme** | Dark and light, remembered in `localStorage`, and it follows your OS preference on first visit. |
| **Interface** | Animated aurora background, frosted glass panels, scroll reveals, animated counters, sticky glass nav with active-section tracking, mobile menu, modal with Escape-to-close and focus restore, toasts, back-to-top, print styles, `prefers-reduced-motion` respected. |

## Data: local by default, Supabase optional

Every read and write goes through `Store` in `js/store.js`. It has two backends
and picks one automatically:

- **No credentials** → `localStorage`. The site is fully usable, and notices and
  applications persist in that browser only. This is the default, so the site
  works on GitHub Pages or from a USB stick with no account needed.
- **Credentials present** → Supabase REST API. Notices and applications become
  shared and permanent, visible to every visitor.

To connect Supabase:

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run `supabase/schema.sql`. It creates the `notices`,
   `applications` and `students` tables, adds row-level-security policies and
   seeds demo rows.
3. Go to **Project Settings → API** and copy the **Project URL** and the
   **anon public** key.
4. Paste both into `js/supabase-config.js`:

```js
window.SUPABASE_CONFIG = {
  url: "https://yourproject.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
};
```

5. Reload. The notice board will show "Connected to Supabase" instead of the
   offline note.

If a Supabase request fails at runtime, the store logs a warning and falls back
to local storage, so a misconfigured key degrades instead of breaking the page.

### Before this handles real data

The policies in `schema.sql` allow anyone with the anon key to insert and read
rows — fine for a demo, not fine for real applicant data. Three things to
change: move application inserts behind an Edge Function or Supabase Auth,
restrict `applications` reads to the owner of the row, and put the notice
board's delete/publish behind an authenticated admin role. Never put the
`service_role` key in a browser.

## Customising

- **College name, address, phone, email** — in `index.html`, and the footer.
- **Programmes, events, faculty** — the `COURSES`, `EVENTS` and `FACULTY` arrays
  at the top of `js/app.js`. Everything on the page is generated from them, so
  adding a programme is one object.
- **Colours** — the `:root` block in `css/styles.css`. Change `--brand`,
  `--brand-2` and `--brand-3` and the whole site follows, badges included.
- **Demo student** — the `SEED_STUDENTS` array in `js/store.js`, or the
  `students` table in Supabase.

## Deploying

There is no build step, so any static host works. GitHub Pages is already wired
up for this repo (`main` branch, root folder).

### Vercel

1. Open [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. **Import Git Repository** → choose `college-website` → **Import**.
3. On the configure screen:
   - **Framework Preset:** `Other`
   - **Build Command:** leave empty
   - **Output Directory:** leave empty
   - **Root Directory:** `./`
4. **Deploy.** The build takes about 20 seconds and you get a URL like
   `college-website-<hash>.vercel.app`.

After that, every push to `main` redeploys automatically — editing a file in the
GitHub web editor is enough to update the live site.

**Custom domain:** Project → Settings → Domains → Add, then create the DNS
record Vercel shows you. HTTPS is issued automatically.

**Supabase on Vercel:** the keys live in `js/supabase-config.js`, which is served
as a static file. Commit the values before deploying — reading them from Vercel
Environment Variables would need a build step this project deliberately avoids.
The anon key is safe to expose; the service_role key never is.

Netlify, Cloudflare Pages, Firebase Hosting and any static file server work the
same way: point them at the repository root, no build command, no output
directory.

## Notes

Content — names, fees, dates, faculty, statistics — is illustrative placeholder
copy written for a demo. Replace it with your institution's real information
before publishing.

No frameworks, no tracking, no external requests except Google Fonts. Total
weight is under 60 KB before fonts.
