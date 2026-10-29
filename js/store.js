/* ==========================================================================
   store.js — one data layer, two backends.

   Every read and write the site performs goes through `Store`. If Supabase
   credentials are present in js/supabase-config.js the calls hit the Supabase
   REST API; otherwise they hit localStorage. Nothing else in the app knows or
   cares which one is active, so switching backends needs no other change.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------- seed data */

  const SEED_NOTICES = [
    {
      id: "n1",
      title: "Mid-semester examination timetable released",
      body: "The November timetable for semesters 3, 5 and 7 is now on the portal. Hall tickets can be downloaded from 10 November.",
      category: "exam",
      published_on: "2026-10-27"
    },
    {
      id: "n2",
      title: "Applications for Autumn 2026 close on 30 November",
      body: "All UG programmes close on 30 November. Late applications are considered only against vacant seats, with a ₹1,500 late fee.",
      category: "admin",
      published_on: "2026-10-24"
    },
    {
      id: "n3",
      title: "Vidyanova TechFest — registrations open",
      body: "TechFest runs 12–14 December with 22 events, a 24-hour hackathon and a ₹3 lakh prize pool. Team registration closes 1 December.",
      category: "event",
      published_on: "2026-10-21"
    },
    {
      id: "n4",
      title: "Merit scholarship list published",
      body: "The first list of merit-cum-means scholarship awardees is on the notice board outside the academic office. Objections by 5 November.",
      category: "general",
      published_on: "2026-10-18"
    },
    {
      id: "n5",
      title: "Library extends hours during examinations",
      body: "The central library will stay open until 1 am from 8 November to 28 November. Bring your ID card for after-hours entry.",
      category: "general",
      published_on: "2026-10-15"
    }
  ];

  const SEED_STUDENTS = [
    {
      roll: "CSE2021001",
      dob: "2003-05-14",
      name: "Riya Sharma",
      programme: "B.Tech Computer Science & Engineering",
      semester: 6,
      cgpa: 8.74,
      attendance: 92,
      fee_status: "Paid",
      marks: [
        { code: "CS601", subject: "Distributed Systems", credits: 4, grade: "A", points: 9 },
        { code: "CS602", subject: "Machine Learning", credits: 4, grade: "A+", points: 10 },
        { code: "CS603", subject: "Compiler Design", credits: 3, grade: "B+", points: 8 },
        { code: "CS604", subject: "Computer Networks Lab", credits: 2, grade: "A", points: 9 },
        { code: "HS601", subject: "Professional Communication", credits: 2, grade: "A+", points: 10 }
      ]
    },
    {
      roll: "ECE2022014",
      dob: "2004-01-09",
      name: "Arjun Patel",
      programme: "B.Tech Electronics & Communication",
      semester: 4,
      cgpa: 7.92,
      attendance: 84,
      fee_status: "Part-paid",
      marks: [
        { code: "EC401", subject: "Digital Signal Processing", credits: 4, grade: "B+", points: 8 },
        { code: "EC402", subject: "Analog Circuits", credits: 4, grade: "A", points: 9 },
        { code: "EC403", subject: "Microcontrollers", credits: 3, grade: "B", points: 7 },
        { code: "EC404", subject: "VLSI Lab", credits: 2, grade: "A", points: 9 }
      ]
    }
  ];

  const SEED_APPLICATIONS = [];

  /* ---------------------------------------------------------------- helpers */

  const LS = {
    notices: "vidyanova.notices.v1",
    apps: "vidyanova.applications.v1"
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function readLocal(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      // always hand back a copy: callers mutate the array, and the seed data
      // must never be modified in place
      return raw ? JSON.parse(raw) : clone(fallback);
    } catch (e) {
      return clone(fallback);
    }
  }

  function writeLocal(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* storage full or blocked — the UI still works for this session */
    }
  }

  function cfg() {
    const c = window.SUPABASE_CONFIG || {};
    return c.url && c.anonKey ? c : null;
  }

  function headers(c, extra) {
    return Object.assign(
      {
        apikey: c.anonKey,
        Authorization: "Bearer " + c.anonKey,
        "Content-Type": "application/json"
      },
      extra || {}
    );
  }

  async function rest(c, path, options) {
    const res = await fetch(c.url.replace(/\/$/, "") + "/rest/v1/" + path, options);
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error("Supabase " + res.status + " " + (detail || res.statusText));
    }
    if (res.status === 204) return null;
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  function uid() {
    return "n_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function appNumber() {
    return "VIT-2026-" + String(Math.floor(1000 + Math.random() * 9000));
  }

  /* ---------------------------------------------------------------- Store */

  const Store = {
    get mode() {
      return cfg() ? "supabase" : "local";
    },

    /* ---- notices ---- */
    async listNotices() {
      const c = cfg();
      if (!c) return readLocal(LS.notices, SEED_NOTICES);
      try {
        const rows = await rest(c, "notices?select=*&order=published_on.desc", { headers: headers(c) });
        return rows || [];
      } catch (e) {
        console.warn("[store] falling back to local notices:", e.message);
        return readLocal(LS.notices, SEED_NOTICES);
      }
    },

    async addNotice(notice) {
      const row = {
        id: uid(),
        title: notice.title,
        body: notice.body,
        category: notice.category || "general",
        published_on: notice.published_on || new Date().toISOString().slice(0, 10)
      };
      const c = cfg();
      if (c) {
        try {
          const out = await rest(c, "notices", {
            method: "POST",
            headers: headers(c, { Prefer: "return=representation" }),
            body: JSON.stringify(row)
          });
          return (out && out[0]) || row;
        } catch (e) {
          console.warn("[store] insert failed, saving locally:", e.message);
        }
      }
      const all = readLocal(LS.notices, SEED_NOTICES);
      all.unshift(row);
      writeLocal(LS.notices, all);
      return row;
    },

    async deleteNotice(id) {
      const c = cfg();
      if (c) {
        try {
          await rest(c, "notices?id=eq." + encodeURIComponent(id), {
            method: "DELETE",
            headers: headers(c, { Prefer: "return=minimal" })
          });
          return true;
        } catch (e) {
          console.warn("[store] delete failed:", e.message);
          return false;
        }
      }
      const all = readLocal(LS.notices, SEED_NOTICES).filter((n) => n.id !== id);
      writeLocal(LS.notices, all);
      return true;
    },

    /* ---- applications ---- */
    async addApplication(app) {
      const row = {
        app_no: appNumber(),
        name: app.name,
        email: app.email,
        phone: app.phone,
        course: app.course,
        marks: Number(app.marks),
        category: app.category || "General",
        note: app.note || "",
        status: "Under review",
        created_at: new Date().toISOString()
      };
      const c = cfg();
      if (c) {
        try {
          const out = await rest(c, "applications", {
            method: "POST",
            headers: headers(c, { Prefer: "return=representation" }),
            body: JSON.stringify(row)
          });
          return (out && out[0]) || row;
        } catch (e) {
          console.warn("[store] application insert failed, saving locally:", e.message);
        }
      }
      const all = readLocal(LS.apps, SEED_APPLICATIONS);
      all.unshift(row);
      writeLocal(LS.apps, all);
      return row;
    },

    async findApplication(appNo) {
      const needle = String(appNo || "").trim().toUpperCase();
      if (!needle) return null;
      const c = cfg();
      if (c) {
        try {
          const rows = await rest(
            c,
            "applications?select=*&app_no=eq." + encodeURIComponent(needle),
            { headers: headers(c) }
          );
          if (rows && rows.length) return rows[0];
        } catch (e) {
          console.warn("[store] lookup failed:", e.message);
        }
      }
      const all = readLocal(LS.apps, SEED_APPLICATIONS);
      return all.find((a) => String(a.app_no).toUpperCase() === needle) || null;
    },

    /* ---- student portal ---- */
    async login(roll, dob) {
      const rollNo = String(roll || "").trim().toUpperCase();
      const c = cfg();
      if (c) {
        try {
          const rows = await rest(
            c,
            "students?select=*&roll=eq." + encodeURIComponent(rollNo) + "&dob=eq." + encodeURIComponent(dob),
            { headers: headers(c) }
          );
          if (rows && rows.length) return rows[0];
        } catch (e) {
          console.warn("[store] student lookup failed:", e.message);
        }
      }
      const found = SEED_STUDENTS.find((s) => s.roll === rollNo && s.dob === dob);
      return found || null;
    },

    /* Exposed for the demo hint in the UI and for tests. */
    demoStudent: SEED_STUDENTS[0]
  };

  window.Store = Store;
})();
