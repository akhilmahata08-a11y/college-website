/* ==========================================================================
   app.js — all page behaviour.
   Sections: data, utilities, theme, navigation, hero, courses, admissions,
   portal, events, notices, faculty, forms, modal, toasts, scroll effects.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------ data */

  const SCHOOLS = ["All", "Engineering", "Science", "Commerce", "Arts"];

  const COURSES = [
    {
      id: "cse", school: "Engineering", name: "B.Tech Computer Science & Engineering",
      duration: "4 years · 8 semesters", seats: 180, level: "UG",
      eligibility: "Class XII with Physics, Chemistry and Mathematics, minimum 60% aggregate, plus VITEEE/JEE Main score.",
      fee: "₹1,85,000 per year", blurb: "Systems, distributed computing, machine learning and a two-semester capstone with an industry sponsor."
    },
    {
      id: "aids", school: "Engineering", name: "B.Tech Artificial Intelligence & Data Science",
      duration: "4 years · 8 semesters", seats: 120, level: "UG",
      eligibility: "Class XII with PCM, minimum 65% aggregate, plus entrance score. Mathematics at 70% or above preferred.",
      fee: "₹1,95,000 per year", blurb: "Statistics, deep learning, MLOps and responsible-AI coursework, with a research internship in semester 7."
    },
    {
      id: "ece", school: "Engineering", name: "B.Tech Electronics & Communication",
      duration: "4 years · 8 semesters", seats: 120, level: "UG",
      eligibility: "Class XII with PCM, minimum 60% aggregate, plus VITEEE/JEE Main score.",
      fee: "₹1,70,000 per year", blurb: "VLSI, embedded systems, signal processing and RF design, taught in a 24×7 hardware lab."
    },
    {
      id: "mech", school: "Engineering", name: "B.Tech Mechanical Engineering",
      duration: "4 years · 8 semesters", seats: 120, level: "UG",
      eligibility: "Class XII with PCM, minimum 60% aggregate, plus entrance score.",
      fee: "₹1,60,000 per year", blurb: "Thermodynamics, robotics and additive manufacturing, with a Formula-Student style design project."
    },
    {
      id: "civil", school: "Engineering", name: "B.Tech Civil & Environmental Engineering",
      duration: "4 years · 8 semesters", seats: 60, level: "UG",
      eligibility: "Class XII with PCM, minimum 55% aggregate, plus entrance score.",
      fee: "₹1,45,000 per year", blurb: "Structural design, water systems and sustainable construction, with live site work from year two."
    },
    {
      id: "msc-ds", school: "Science", name: "M.Sc Data Science",
      duration: "2 years · 4 semesters", seats: 40, level: "PG",
      eligibility: "Bachelor's in science, engineering or commerce with mathematics, minimum 55% aggregate.",
      fee: "₹1,40,000 per year", blurb: "Applied statistics, causal inference and large-scale data engineering, with a paid industry practicum."
    },
    {
      id: "bsc-phy", school: "Science", name: "B.Sc Physics (Honours)",
      duration: "3 years · 6 semesters", seats: 50, level: "UG",
      eligibility: "Class XII with Physics and Mathematics, minimum 55% aggregate.",
      fee: "₹85,000 per year", blurb: "Quantum mechanics, condensed matter and a research thesis with a faculty supervisor from semester 5."
    },
    {
      id: "bba", school: "Commerce", name: "BBA — Business Analytics",
      duration: "3 years · 6 semesters", seats: 90, level: "UG",
      eligibility: "Class XII in any stream, minimum 60% aggregate, plus a written aptitude test.",
      fee: "₹1,20,000 per year", blurb: "Financial modelling, marketing analytics and operations, taught with live datasets from partner firms."
    },
    {
      id: "bcom", school: "Commerce", name: "B.Com (Honours) — FinTech",
      duration: "3 years · 6 semesters", seats: 120, level: "UG",
      eligibility: "Class XII in commerce preferred, minimum 55% aggregate.",
      fee: "₹95,000 per year", blurb: "Accounting, taxation and digital payments infrastructure, with CA/CFA foundation modules."
    },
    {
      id: "psych", school: "Arts", name: "B.A. Psychology",
      duration: "3 years · 6 semesters", seats: 60, level: "UG",
      eligibility: "Class XII in any stream, minimum 50% aggregate.",
      fee: "₹80,000 per year", blurb: "Cognitive and social psychology, research methods and a supervised clinical internship in the final year."
    },
    {
      id: "english", school: "Arts", name: "B.A. English & Media Studies",
      duration: "3 years · 6 semesters", seats: 60, level: "UG",
      eligibility: "Class XII in any stream, minimum 50% aggregate.",
      fee: "₹75,000 per year", blurb: "Literary studies, film, and digital media production, with a student-run newsroom."
    },
    {
      id: "design", school: "Arts", name: "B.Des Interaction Design",
      duration: "4 years · 8 semesters", seats: 40, level: "UG",
      eligibility: "Class XII in any stream, minimum 55% aggregate, plus a portfolio review and studio test.",
      fee: "₹1,75,000 per year", blurb: "Interface design, design systems and prototyping in a studio model with real client briefs."
    }
  ];

  const today = new Date();
  const EVENTS = [
    { title: "Vidyanova TechFest 2026", date: "2026-12-12", place: "Main auditorium + innovation lab", desc: "22 events, a 24-hour hackathon and a ₹3 lakh prize pool. Registrations close 1 December." },
    { title: "Open campus day", date: "2026-11-08", place: "Admissions office", desc: "Walk the labs, meet faculty, sit in on a live class. Free, no registration needed." },
    { title: "Industry lecture: building at scale", date: "2026-11-02", place: "Seminar hall 2", desc: "A principal engineer from a Bengaluru product company on the first 10 million users." },
    { title: "Alumni homecoming", date: "2026-09-20", place: "Central lawn", desc: "Batches from 1996 to 2024 came back for a day of panels, cricket and dinner." },
    { title: "Independence day cultural evening", date: "2026-08-15", place: "Open-air theatre", desc: "Music, dance and a short film made by the media studies cohort." }
  ];

  const FACULTY = [
    { name: "Dr. Meera Krishnan", dept: "Computer Science", role: "Professor & Head · Distributed systems, ML", initials: "MK" },
    { name: "Dr. Sanjay Bose", dept: "Electronics", role: "Professor · VLSI design, RF circuits", initials: "SB" },
    { name: "Prof. Ananya Rao", dept: "Design", role: "Associate Professor · Interaction design, design systems", initials: "AR" },
    { name: "Dr. Imran Qureshi", dept: "Mathematics", role: "Professor · Applied statistics, causal inference", initials: "IQ" },
    { name: "Dr. Lakshmi Venkat", dept: "Commerce", role: "Associate Professor · Financial modelling, fintech", initials: "LV" },
    { name: "Dr. Rohit Menon", dept: "Mechanical", role: "Assistant Professor · Robotics, additive manufacturing", initials: "RM" },
    { name: "Prof. Fatima Sheikh", dept: "Psychology", role: "Assistant Professor · Clinical psychology, research methods", initials: "FS" },
    { name: "Dr. Vivek Nair", dept: "Civil", role: "Professor · Structural engineering, sustainable materials", initials: "VN" }
  ];

  /* ------------------------------------------------------------- utilities */

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function fmtDate(iso) {
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear();
  }

  function dayMonth(iso) {
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return { day: "—", mon: "" };
    return { day: String(d.getDate()).padStart(2, "0"), mon: MONTHS[d.getMonth()] };
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[m]));
  }

  function toast(message, kind) {
    const host = $("#toasts");
    if (!host) return;
    const el = document.createElement("div");
    el.className = "toast " + (kind || "ok");
    el.textContent = message;
    host.appendChild(el);
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateX(20px)";
      setTimeout(() => el.remove(), 300);
    }, 4200);
  }

  function setErr(id, message) {
    const el = $('[data-err="' + id + '"]');
    const input = document.getElementById(id);
    if (el) el.textContent = message || "";
    if (input) input.classList.toggle("invalid", Boolean(message));
  }

  function clearErrors(ids) {
    ids.forEach((id) => setErr(id, ""));
  }

  /* --------------------------------------------------------------- theme */

  const THEME_KEY = "vidyanova.theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = $("#themeToggle");
    if (btn) {
      btn.textContent = theme === "dark" ? "◐" : "☀";
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* ignore */ }
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    applyTheme(saved || (prefersLight ? "light" : "dark"));
    const btn = $("#themeToggle");
    if (btn) btn.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  /* ---------------------------------------------------------- navigation */

  function initNav() {
    const menuBtn = $("#menuBtn");
    const links = $("#navLinks");
    if (menuBtn && links) {
      menuBtn.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.textContent = open ? "✕" : "☰";
      });
      $$("a", links).forEach((a) => a.addEventListener("click", () => {
        links.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
      }));
    }

    const sections = $$("main section[id]");
    const navAnchors = $$(".nav-links a");
    const setActive = () => {
      const y = window.scrollY + 140;
      let current = sections[0] ? sections[0].id : "";
      sections.forEach((s) => { if (s.offsetTop <= y) current = s.id; });
      navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
    };
    window.addEventListener("scroll", setActive, { passive: true });
    setActive();

    const toTop = $("#toTop");
    if (toTop) {
      window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 600), { passive: true });
      toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    const apply = $("#navApply");
    if (apply) {
      const show = () => { apply.style.display = window.innerWidth > 1180 ? "inline-flex" : "none"; };
      show();
      window.addEventListener("resize", show);
    }
  }

  /* --------------------------------------------------------------- hero */

  function renderHeroTimeline(notices) {
    const host = $("#heroTimeline");
    if (!host) return;
    host.innerHTML = notices.slice(0, 3).map((n) => {
      const d = dayMonth(n.published_on);
      return '<div class="timeline-row"><span class="timeline-date">' + esc(d.day) + " " + esc(d.mon) +
        '</span><p>' + esc(n.title) + "<small><br>" + esc((n.body || "").slice(0, 58)) + "…</small></p></div>";
    }).join("");
  }

  function initCounters() {
    const host = $("#stats");
    if (!host) return;
    const run = () => {
      $$("[data-count]", host).forEach((el) => {
        const target = Number(el.getAttribute("data-count"));
        const suffix = el.getAttribute("data-suffix") || "";
        const start = performance.now();
        const dur = 1400;
        const step = (now) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased).toLocaleString("en-IN") + suffix;
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } });
      }, { threshold: 0.4 });
      io.observe(host);
    } else {
      run();
    }
  }

  /* ------------------------------------------------------------- courses */

  let courseFilter = { school: "All", q: "" };

  function renderCourseChips() {
    const host = $("#deptChips");
    if (!host) return;
    host.innerHTML = SCHOOLS.map((s) =>
      '<button class="chip" type="button" data-school="' + esc(s) + '" aria-pressed="' +
      (s === courseFilter.school) + '">' + esc(s) + "</button>"
    ).join("");
    $$(".chip", host).forEach((chip) => chip.addEventListener("click", () => {
      courseFilter.school = chip.getAttribute("data-school");
      renderCourseChips();
      renderCourses();
    }));
  }

  function renderCourses() {
    const host = $("#courseGrid");
    if (!host) return;
    const q = courseFilter.q.toLowerCase().trim();
    const list = COURSES.filter((c) => {
      const schoolOk = courseFilter.school === "All" || c.school === courseFilter.school;
      const textOk = !q || (c.name + " " + c.blurb + " " + c.school).toLowerCase().includes(q);
      return schoolOk && textOk;
    });

    host.innerHTML = list.map((c) => (
      '<button class="card glass course reveal in" type="button" data-course="' + esc(c.id) + '">' +
        '<div class="tagrow"><span class="tag">' + esc(c.level) + "</span><span class=\"tag\">" + esc(c.school) + "</span></div>" +
        "<h3>" + esc(c.name) + "</h3>" +
        "<p>" + esc(c.blurb) + "</p>" +
        '<div class="meta"><span>' + esc(c.duration.split(" · ")[0]) + "</span><span>" + c.seats + " seats</span><span>Tap for details</span></div>" +
      "</button>"
    )).join("");

    const empty = $("#courseEmpty");
    if (empty) empty.style.display = list.length ? "none" : "block";

    $$("[data-course]", host).forEach((btn) => btn.addEventListener("click", () => {
      const c = COURSES.find((x) => x.id === btn.getAttribute("data-course"));
      if (c) openCourseModal(c);
    }));
  }

  function openCourseModal(c) {
    openModal(
      '<div class="modal-head"><div><span class="tag">' + esc(c.school) + "</span>" +
      "<h3 style=\"margin:.6rem 0 .2rem\">" + esc(c.name) + "</h3>" +
      '<p style="margin:0;font-size:.85rem">' + esc(c.duration) + "</p></div>" +
      '<button class="del" data-close aria-label="Close">✕</button></div>' +
      "<p style=\"margin-top:1rem\">" + esc(c.blurb) + "</p>" +
      "<dl><dt>Seats</dt><dd>" + c.seats + "</dd>" +
      "<dt>Eligibility</dt><dd>" + esc(c.eligibility) + "</dd>" +
      "<dt>Tuition</dt><dd>" + esc(c.fee) + "</dd></dl>" +
      '<div style="display:flex;gap:.6rem;margin-top:1.3rem;flex-wrap:wrap">' +
      '<a class="btn btn-primary btn-sm" href="#admissions" data-close>Apply for this programme</a>' +
      '<button class="btn btn-sm btn-ghost" data-close>Close</button></div>'
    );
    // preselect the programme in the admission form
    const sel = $("#apCourse");
    if (sel) {
      const opt = Array.from(sel.options).find((o) => o.value === c.name);
      if (opt) sel.value = c.name;
    }
  }

  /* ------------------------------------------------------------ admissions */

  function fillCourseSelect() {
    const sel = $("#apCourse");
    if (!sel) return;
    COURSES.forEach((c) => {
      const o = document.createElement("option");
      o.value = c.name;
      o.textContent = c.name + " — " + c.school;
      sel.appendChild(o);
    });
  }

  function initAdmissions() {
    const form = $("#applyForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const ids = ["apName", "apEmail", "apPhone", "apCourse", "apMarks"];
      clearErrors(ids);

      const data = {
        name: $("#apName").value.trim(),
        email: $("#apEmail").value.trim(),
        phone: $("#apPhone").value.trim(),
        course: $("#apCourse").value,
        marks: $("#apMarks").value,
        category: $("#apCategory").value,
        note: $("#apNote").value.trim()
      };

      let bad = false;
      if (data.name.length < 3) { setErr("apName", "Please enter your full name."); bad = true; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) { setErr("apEmail", "That email address doesn't look right."); bad = true; }
      if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\D/g, "").slice(-10))) { setErr("apPhone", "Enter a 10-digit Indian mobile number."); bad = true; }
      if (!data.course) { setErr("apCourse", "Choose the programme you want to apply for."); bad = true; }
      const m = Number(data.marks);
      if (!data.marks || isNaN(m) || m < 0 || m > 100) { setErr("apMarks", "Enter a percentage between 0 and 100."); bad = true; }
      if (bad) { toast("Please fix the highlighted fields.", "err"); return; }

      const btn = $("#applyBtn");
      btn.disabled = true;
      btn.textContent = "Submitting…";
      try {
        const row = await Store.addApplication(data);
        form.reset();
        openModal(
          '<div class="modal-head"><div><span class="tag">Application received</span>' +
          '<h3 style="margin:.6rem 0 .2rem">Thank you, ' + esc(data.name.split(" ")[0]) + "</h3>" +
          '<p style="margin:0;font-size:.85rem">Keep this number — you will need it to check your status.</p></div>' +
          '<button class="del" data-close aria-label="Close">✕</button></div>' +
          '<p style="font-size:2rem;font-weight:800;letter-spacing:.02em;margin:1.2rem 0 .4rem" class="grad">' +
          esc(row.app_no) + "</p>" +
          "<dl><dt>Programme</dt><dd>" + esc(data.course) + "</dd>" +
          "<dt>Status</dt><dd>" + esc(row.status || "Under review") + "</dd>" +
          "<dt>Next step</dt><dd>Our team calls you within two working days.</dd></dl>" +
          '<div style="margin-top:1.3rem"><button class="btn btn-sm btn-primary" data-close>Done</button></div>'
        );
        const statusInput = $("#statusId");
        if (statusInput) statusInput.value = row.app_no;
        toast("Application " + row.app_no + " submitted.", "ok");
      } catch (err) {
        toast("Could not submit right now: " + err.message, "err");
      } finally {
        btn.disabled = false;
        btn.textContent = "Submit application";
      }
    });

    form.addEventListener("reset", () => {
      clearErrors(["apName", "apEmail", "apPhone", "apCourse", "apMarks"]);
    });

    const statusBtn = $("#statusBtn");
    if (statusBtn) statusBtn.addEventListener("click", async () => {
      const out = $("#statusOut");
      const value = $("#statusId").value.trim();
      if (!value) { out.innerHTML = '<p style="color:var(--danger);font-size:.85rem;margin:0">Enter an application number first.</p>'; return; }
      out.innerHTML = '<p style="font-size:.85rem;margin:0">Checking…</p>';
      const row = await Store.findApplication(value);
      if (!row) {
        out.innerHTML = '<p style="color:var(--danger);font-size:.85rem;margin:0">No application found with that number on this device.</p>';
        return;
      }
      out.innerHTML =
        '<div class="kv" style="grid-template-columns:1fr 1fr;margin:0">' +
        "<div><small>Applicant</small><b style=\"font-size:.95rem\">" + esc(row.name) + "</b></div>" +
        "<div><small>Status</small><b style=\"font-size:.95rem\">" + esc(row.status) + "</b></div>" +
        "<div><small>Programme</small><b style=\"font-size:.8rem;font-weight:600\">" + esc(row.course) + "</b></div>" +
        "<div><small>Submitted</small><b style=\"font-size:.95rem\">" + esc(fmtDate(String(row.created_at).slice(0, 10))) + "</b></div>" +
        "</div>";
    });
  }

  /* --------------------------------------------------------------- portal */

  function initPortal() {
    const form = $("#loginForm");
    if (!form) return;
    const msg = $("#loginMsg");
    const body = $("#portalBody");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearErrors(["rollNo", "dob"]);
      const roll = $("#rollNo").value.trim();
      const dob = $("#dob").value;
      let bad = false;
      if (!roll) { setErr("rollNo", "Enter your roll number."); bad = true; }
      if (!dob) { setErr("dob", "Choose your date of birth."); bad = true; }
      if (bad) return;

      msg.textContent = "Checking…";
      msg.style.color = "var(--muted)";
      const student = await Store.login(roll, dob);

      if (!student) {
        msg.textContent = "No student found with that roll number and date of birth. Try the demo account above.";
        msg.style.color = "var(--danger)";
        body.innerHTML = "";
        return;
      }

      msg.textContent = "";
      const credits = student.marks.reduce((s, m) => s + m.credits, 0);
      const points = student.marks.reduce((s, m) => s + m.credits * m.points, 0);
      const sgpa = credits ? (points / credits).toFixed(2) : "—";

      body.innerHTML =
        '<div class="result-head">' +
          "<div><h3 style=\"margin:0\">" + esc(student.name) + "</h3>" +
          '<p style="margin:.2rem 0 0;font-size:.85rem">' + esc(student.programme) + " · Semester " + student.semester + "</p></div>" +
          '<button class="btn btn-sm btn-ghost" id="logoutBtn" type="button">Sign out</button>' +
        "</div>" +
        '<div class="kv">' +
          "<div><small>CGPA</small><b>" + student.cgpa.toFixed(2) + "</b></div>" +
          "<div><small>Semester SGPA</small><b>" + sgpa + "</b></div>" +
          "<div><small>Attendance</small><b class=\"" + (student.attendance >= 75 ? "badge-ok" : "") + "\">" + student.attendance + "%</b></div>" +
        "</div>" +
        "<table><thead><tr><th>Code</th><th>Subject</th><th>Credits</th><th>Grade</th><th>Points</th></tr></thead><tbody>" +
        student.marks.map((m) =>
          "<tr><td>" + esc(m.code) + "</td><td><b>" + esc(m.subject) + "</b></td><td>" + m.credits +
          "</td><td>" + esc(m.grade) + "</td><td>" + m.points + "</td></tr>"
        ).join("") +
        "</tbody></table>" +
        '<p style="font-size:.8rem;margin-top:1rem">Fee status: <b style="color:' +
          (student.fee_status === "Paid" ? "var(--ok)" : "var(--warn)") + '">' + esc(student.fee_status) + "</b>" +
          (student.attendance < 75 ? ' · <span style="color:var(--danger)">Attendance below the 75% requirement</span>' : "") + "</p>";

      const out = $("#logoutBtn");
      if (out) out.addEventListener("click", () => {
        body.innerHTML = "";
        form.reset();
        msg.textContent = "Signed out.";
        msg.style.color = "var(--muted)";
      });
      toast("Signed in as " + student.name + ".", "ok");
    });
  }

  /* --------------------------------------------------------------- events */

  let eventFilter = "all";

  function renderEvents() {
    const host = $("#eventGrid");
    if (!host) return;
    const list = EVENTS
      .map((e) => Object.assign({}, e, { past: new Date(e.date + "T23:59:59") < today }))
      .filter((e) => eventFilter === "all" || (eventFilter === "past" ? e.past : !e.past))
      .sort((a, b) => (eventFilter === "past" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));

    host.innerHTML = list.map((e) =>
      '<article class="card glass event ' + (e.past ? "past" : "") + ' reveal in">' +
      '<span class="when">' + esc(fmtDate(e.date)) + (e.past ? " · past" : "") + "</span>" +
      "<h3>" + esc(e.title) + "</h3>" +
      "<p>" + esc(e.desc) + "</p>" +
      '<p style="font-size:.8rem;margin:0"><strong style="color:var(--text)">' + esc(e.place) + "</strong></p>" +
      "</article>"
    ).join("");

    if (!list.length) host.innerHTML = '<p class="glass" style="padding:1.6rem">Nothing scheduled in this filter yet.</p>';

    $$("[data-ev]").forEach((chip) => {
      chip.setAttribute("aria-pressed", String(chip.getAttribute("data-ev") === eventFilter));
    });
  }

  function initEvents() {
    $$("[data-ev]").forEach((chip) => chip.addEventListener("click", () => {
      eventFilter = chip.getAttribute("data-ev");
      renderEvents();
    }));
    renderEvents();
  }

  /* -------------------------------------------------------------- notices */

  const CATEGORIES = ["All", "general", "exam", "event", "admin"];
  let noticeFilter = { cat: "All", q: "" };
  let noticeCache = [];

  function renderNoticeChips() {
    const host = $("#noticeChips");
    if (!host) return;
    host.innerHTML = CATEGORIES.map((c) => {
      const label = c === "All" ? "All" : c.charAt(0).toUpperCase() + c.slice(1);
      return '<button class="chip" type="button" data-cat="' + esc(c) + '" aria-pressed="' +
        (c === noticeFilter.cat) + '">' + label + "</button>";
    }).join("");
    $$(".chip", host).forEach((chip) => chip.addEventListener("click", () => {
      noticeFilter.cat = chip.getAttribute("data-cat");
      renderNoticeChips();
      renderNotices();
    }));
  }

  function renderNotices() {
    const host = $("#noticeList");
    if (!host) return;
    const q = noticeFilter.q.toLowerCase().trim();
    const list = noticeCache.filter((n) => {
      const catOk = noticeFilter.cat === "All" || n.category === noticeFilter.cat;
      const textOk = !q || (n.title + " " + n.body).toLowerCase().includes(q);
      return catOk && textOk;
    });

    if (!list.length) {
      host.innerHTML = '<p class="glass" style="padding:1.6rem">No notices match this filter.</p>';
      return;
    }

    host.innerHTML = list.map((n) => {
      const d = dayMonth(n.published_on);
      return '<article class="glass notice reveal in">' +
        '<span class="notice-date">' + esc(d.day) + " " + esc(d.mon) + "</span>" +
        "<div><h4>" + esc(n.title) + "</h4><p>" + esc(n.body) + "</p></div>" +
        '<div style="display:flex;gap:.5rem;align-items:center">' +
          '<span class="pill ' + esc(n.category) + '">' + esc(n.category) + "</span>" +
          '<button class="del" type="button" data-del="' + esc(n.id) + '" aria-label="Delete notice" title="Delete">✕</button>' +
        "</div>" +
      "</article>";
    }).join("");

    $$("[data-del]", host).forEach((btn) => btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-del");
      const ok = await Store.deleteNotice(id);
      if (!ok) { toast("Could not delete that notice.", "err"); return; }
      await loadNotices();
      toast("Notice deleted.", "ok");
    }));
  }

  /* Reload the authoritative list. A sequence guard keeps a slow, older read
     from overwriting a newer one — otherwise a load that resolves after a
     publish can render the same notice twice. */
  let noticesSeq = 0;

  async function loadNotices() {
    const seq = ++noticesSeq;
    const rows = await Store.listNotices();
    if (seq !== noticesSeq) return;
    const seen = new Set();
    noticeCache = rows.filter((n) => {
      if (seen.has(n.id)) return false;
      seen.add(n.id);
      return true;
    });
    renderNotices();
    renderHeroTimeline(noticeCache);
  }

  function initNoticeForm() {
    const form = $("#noticeForm");
    if (!form) return;
    const dateInput = $("#ntDate");
    if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearErrors(["ntTitle", "ntBody"]);
      const title = $("#ntTitle").value.trim();
      const body = $("#ntBody").value.trim();
      let bad = false;
      if (title.length < 5) { setErr("ntTitle", "Give the notice a title of at least 5 characters."); bad = true; }
      if (body.length < 10) { setErr("ntBody", "Add a little more detail — at least 10 characters."); bad = true; }
      if (bad) return;

      const btn = $("#noticeForm button[type=submit]");
      if (btn) { btn.disabled = true; btn.textContent = "Publishing…"; }

      await Store.addNotice({
        title: title,
        body: body,
        category: $("#ntCat").value,
        published_on: $("#ntDate").value || new Date().toISOString().slice(0, 10)
      });

      // re-read rather than splicing the row in locally: one source of truth
      await loadNotices();
      if (btn) { btn.disabled = false; btn.textContent = "Publish notice"; }
      form.reset();
      if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);
      toast("Notice published.", "ok");
    });
  }

  /* -------------------------------------------------------------- faculty */

  function renderFaculty(q) {
    const host = $("#facultyGrid");
    if (!host) return;
    const needle = (q || "").toLowerCase().trim();
    const list = FACULTY.filter((f) =>
      !needle || (f.name + " " + f.dept + " " + f.role).toLowerCase().includes(needle)
    );
    host.innerHTML = list.map((f) =>
      '<article class="glass person reveal in"><div class="avatar">' + esc(f.initials) + "</div>" +
      "<div><strong>" + esc(f.name) + "</strong><small>" + esc(f.role) + "</small></div></article>"
    ).join("");
    if (!list.length) host.innerHTML = '<p class="glass" style="padding:1.4rem">No faculty member matches that search.</p>';
  }

  /* --------------------------------------------------------------- contact */

  function initContact() {
    const form = $("#contactForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ids = ["ctName", "ctEmail", "ctSubject", "ctMsg"];
      clearErrors(ids);
      const name = $("#ctName").value.trim();
      const email = $("#ctEmail").value.trim();
      const subject = $("#ctSubject").value.trim();
      const message = $("#ctMsg").value.trim();
      let bad = false;
      if (name.length < 2) { setErr("ctName", "Please tell us your name."); bad = true; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setErr("ctEmail", "That email address doesn't look right."); bad = true; }
      if (subject.length < 3) { setErr("ctSubject", "Add a short subject."); bad = true; }
      if (message.length < 10) { setErr("ctMsg", "Add a little more detail."); bad = true; }
      if (bad) { toast("Please fix the highlighted fields.", "err"); return; }
      form.reset();
      toast("Message sent. Admissions replies within one working day.", "ok");
    });
  }

  /* ---------------------------------------------------------------- modal */

  let lastFocused = null;

  function openModal(html) {
    const backdrop = $("#modal");
    const card = $("#modalCard");
    if (!backdrop || !card) return;
    lastFocused = document.activeElement;
    card.innerHTML = html;
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    $$("[data-close]", card).forEach((el) => el.addEventListener("click", closeModal));
    const closeBtn = $("[data-close]", card);
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    const backdrop = $("#modal");
    if (!backdrop) return;
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function initModal() {
    const backdrop = $("#modal");
    if (!backdrop) return;
    backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  }

  /* ------------------------------------------------------- scroll reveals */

  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
  }

  /* ----------------------------------------------------------------- boot */

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNav();
    initCounters();
    initReveal();
    initModal();

    renderCourseChips();
    renderCourses();
    fillCourseSelect();
    initAdmissions();

    initPortal();
    initEvents();
    renderFaculty("");

    const search = $("#courseSearch");
    if (search) search.addEventListener("input", () => { courseFilter.q = search.value; renderCourses(); });

    const nSearch = $("#noticeSearch");
    if (nSearch) nSearch.addEventListener("input", () => { noticeFilter.q = nSearch.value; renderNotices(); });

    const fSearch = $("#facultySearch");
    if (fSearch) fSearch.addEventListener("input", () => renderFaculty(fSearch.value));

    renderNoticeChips();
    initNoticeForm();
    loadNotices();

    initContact();

    const year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());

    const modeNote = document.createElement("p");
    modeNote.style.cssText = "font-size:.72rem;color:var(--muted);margin:.4rem 0 0";
    modeNote.textContent = Store.mode === "supabase"
      ? "Connected to Supabase — notices and applications are shared."
      : "Offline demo mode — notices and applications are saved in this browser. Add Supabase keys to share them.";
    const host = $("#noticeList");
    if (host && host.parentNode) host.parentNode.insertBefore(modeNote, host);
  });
})();
