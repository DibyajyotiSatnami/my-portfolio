(() => {
  const root = document.documentElement;
  root.classList.add("js");

  const EMAIL = "dibyajyotisatnami123@gmail.com";
  const WHATSAPP = "919707782403";

  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* storage unavailable */ } },
  };

  /* ---------- Theme ---------- */
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const applyTheme = (theme) => root.setAttribute("data-theme", theme);
  applyTheme(store.get("theme") || (prefersDark.matches ? "dark" : "light"));

  document.getElementById("themeToggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    store.set("theme", next);
  });

  /* ---------- Nav ---------- */
  const nav = document.querySelector(".nav");
  const menuToggle = document.getElementById("menuToggle");
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  menuToggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  document.querySelectorAll(".nav__links a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Highlight the nav link for the section in view
  const links = new Map([...document.querySelectorAll('.nav__links a[href^="#"]')].map((a) => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.remove("is-active"));
      links.get(entry.target.id)?.classList.add("is-active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

  /* ---------- Project filters ---------- */
  const filters = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project");
  filters.forEach((btn) => btn.addEventListener("click", () => {
    filters.forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-selected", String(b === btn));
    });
    const cat = btn.dataset.filter;
    projects.forEach((p) => {
      p.hidden = cat !== "all" && p.dataset.cat !== cat;
      if (!p.hidden) p.classList.add("is-visible");
    });
  }));

  /* ---------- Certificate lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  document.querySelectorAll(".cert").forEach((btn) => btn.addEventListener("click", () => {
    lightboxImg.src = btn.dataset.full;
    lightboxImg.alt = btn.querySelector("img").alt;
    lightbox.showModal();
  }));
  document.getElementById("lightboxClose").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });

  /* ---------- Contact form (no backend: opens email or WhatsApp) ---------- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const missing = ["name", "email", "message"].filter((k) => !String(data[k] || "").trim());
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email || "").trim());

    if (missing.length || !emailOk) {
      note.textContent = missing.length ? "Please fill in your name, email and message." : "Please enter a valid email address.";
      note.classList.add("is-error");
      return;
    }
    note.classList.remove("is-error");

    const body = `Hi Dibyajyoti,\n\n${data.message}\n\nService: ${data.service}\nName: ${data.name}\nEmail: ${data.email}`;
    const via = e.submitter?.dataset.via || "email";

    if (via === "whatsapp") {
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
      note.textContent = "Opening WhatsApp…";
    } else {
      const subject = `Project enquiry: ${data.service}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      note.textContent = "Opening your email app…";
    }
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
