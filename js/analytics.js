import * as amplitude from "https://cdn.jsdelivr.net/npm/@amplitude/unified/+esm";

// ── Helpers ────────────────────────────────────────────────────────────────────

function track(event, props) {
  amplitude.track(event, { domain: window.location.hostname, ...props });
}

const path = () => window.location.pathname;

function referrerType() {
  const ref = document.referrer;
  if (!ref) return "direct";
  if (/linkedin\.com/i.test(ref)) return "linkedin";
  if (/github\.com/i.test(ref)) return "github";
  if (/google\.|bing\.|duckduckgo\.|yahoo\./i.test(ref)) return "search";
  if (/t\.co|twitter\.com|x\.com/i.test(ref)) return "twitter";
  return "referral";
}

function landingSection() {
  const p = path();
  if (p.includes("/work")) return "work";
  if (p.includes("/notebook")) return "notebook";
  if (p.includes("/contact")) return "contact";
  if (p.includes("/recruiters")) return "recruiters";
  if (p.includes("/about")) return "about";
  if (p.includes("/philips")) return "case-study";
  return "home";
}

function visitorIntent() {
  if (path().includes("/recruiters")) return "recruiter";
  if (path().includes("/work") || path().includes("/philips"))
    return "portfolio";
  if (path().includes("/notebook")) return "content";
  return "general";
}

function isReturning() {
  try {
    const seen = localStorage.getItem("vfl_seen");
    if (seen) return "true";
    localStorage.setItem("vfl_seen", "1");
    return "false";
  } catch {
    return "unknown";
  }
}

// ── User properties (set once or updated) ─────────────────────────────────────

function initUserProperties() {
  const identify = new amplitude.Identify();
  const returning = isReturning();

  identify.setOnce("First Landing Section", landingSection());
  identify.setOnce("First Referrer Type", referrerType());
  identify.setOnce("Visitor Intent", visitorIntent());
  identify.set("Is Returning Visitor", returning);

  if (path().includes("/recruiters")) {
    identify.setOnce("Is Recruiter", "true");
  }

  amplitude.identify(identify);
}

// ── Engagement tracking ────────────────────────────────────────────────────────

let engagedActionsCount = 0;
let engagedSessionFired = false;

function recordEngagedAction(trigger) {
  if (engagedSessionFired) return;
  engagedActionsCount += 1;
  if (engagedActionsCount >= 2) {
    engagedSessionFired = true;
    track("Engaged Session Started", {
      engagement_trigger: trigger,
      engaged_actions_count: String(engagedActionsCount),
      source_page_path: path(),
    });
  }
}

// ── Event: Portfolio Lens Selected ────────────────────────────────────────────

function attachLensTracking() {
  document.querySelectorAll(".case-toc-item a").forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href") || "";
      const lensName = href.replace("#topic-", "").replace(/-/g, " ") || href;
      track("Portfolio Lens Selected", {
        lens_name: lensName,
        source_page_path: path(),
        ui_location: "sidebar",
      });
    });
  });
}

// ── Event: Case Study Opened ──────────────────────────────────────────────────

function attachCaseStudyTracking() {
  // Links that navigate to case study pages
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const isCaseStudy =
      /\/(philips|work)\/[a-z]/.test(href) && !href.endsWith("/");
    if (!isCaseStudy) return;
    link.addEventListener("click", () => {
      track("Case Study Opened", {
        case_study_slug: href.split("/").filter(Boolean).pop() || href,
        case_study_title: link.textContent?.trim() || "",
        source_page_path: path(),
        entry_context: "work_list",
      });
    });
  });
}

// ── Event: Case Study Completed (scroll depth on case study pages) ────────────

function attachCaseStudyCompletionTracking() {
  const isCasePage = /\/(philips|work)\/[a-z]/.test(path());
  if (!isCasePage) return;

  const slug = path().split("/").filter(Boolean).pop() || "";
  const title = document.querySelector("h1")?.textContent?.trim() || slug;
  const startTime = Date.now();
  let fired50 = false;
  let fired90 = false;

  const onScroll = () => {
    const scrolled = window.scrollY + window.innerHeight;
    const total = document.documentElement.scrollHeight;
    const pct = Math.round((scrolled / total) * 100);

    if (pct >= 50 && !fired50) {
      fired50 = true;
      track("Case Study Completed", {
        case_study_slug: slug,
        case_study_title: title,
        completion_threshold_percent: "50",
        time_on_page_seconds: String(
          Math.round((Date.now() - startTime) / 1000),
        ),
        source_page_path: path(),
      });
      recordEngagedAction("case_study_50pct");
    }
    if (pct >= 90 && !fired90) {
      fired90 = true;
      track("Case Study Completed", {
        case_study_slug: slug,
        case_study_title: title,
        completion_threshold_percent: "90",
        time_on_page_seconds: String(
          Math.round((Date.now() - startTime) / 1000),
        ),
        source_page_path: path(),
      });
      recordEngagedAction("case_study_90pct");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

// ── Event: Case Library Continued (from case study back to work) ──────────────

function attachCaseLibraryTracking() {
  const isCasePage = /\/(philips|work)\/[a-z]/.test(path());
  if (!isCasePage) return;

  const fromSlug = path().split("/").filter(Boolean).pop() || "";
  const fromTitle =
    document.querySelector("h1")?.textContent?.trim() || fromSlug;

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const isLibrary =
      /\/work\/?$/.test(href) || /\/(philips|work)\/[a-z]/.test(href);
    if (!isLibrary) return;

    link.addEventListener("click", () => {
      track("Case Library Continued", {
        from_case_study_slug: fromSlug,
        from_case_study_title: fromTitle,
        destination_type: /\/work\/?$/.test(href)
          ? "work_list"
          : "another_case",
        source_page_path: path(),
      });
    });
  });
}

// ── Event: Notebook Topic Opened ──────────────────────────────────────────────

function attachNotebookTracking() {
  document
    .querySelectorAll(".post-entry .post-title a, .post-title a")
    .forEach((link) => {
      link.addEventListener("click", () => {
        track("Notebook Topic Opened", {
          topic_id: (link.getAttribute("href") || "").replace("#", ""),
          topic_title: link.textContent?.trim() || "",
          source_page_path: path(),
        });
      });
    });

  // Anchor links within notebook pages
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const isNotebook = path().includes("/notebook");
    if (!isNotebook) return;
    link.addEventListener("click", () => {
      const anchor = (link.getAttribute("href") || "").replace("#", "");
      track("Notebook Topic Opened", {
        topic_id: anchor,
        topic_title: link.textContent?.trim() || anchor,
        source_page_path: path(),
      });
    });
  });
}

// ── Event: Notebook Section Reached (scroll tracking) ────────────────────────

function attachNotebookSectionTracking() {
  if (!path().includes("/notebook")) return;

  const sections = Array.from(document.querySelectorAll("h2, h3"));
  if (!sections.length) return;

  const startTime = Date.now();
  const fired = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id =
          entry.target.id ||
          entry.target.textContent?.trim().toLowerCase().replace(/\s+/g, "-") ||
          "";
        if (fired.has(id)) return;
        fired.add(id);

        const total = document.documentElement.scrollHeight;
        const top = entry.target.getBoundingClientRect().top + window.scrollY;
        const scrollPct = Math.round((top / total) * 100);

        track("Notebook Section Reached", {
          section_id: id,
          section_title: entry.target.textContent?.trim() || "",
          scroll_percent: String(scrollPct),
          time_on_page_seconds: String(
            Math.round((Date.now() - startTime) / 1000),
          ),
          source_page_path: path(),
        });
      });
    },
    { threshold: 0.3 },
  );

  sections.forEach((s) => observer.observe(s));
}

// ── Event: Resume Downloaded ───────────────────────────────────────────────────

function attachResumeTracking() {
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (!/resume|cv|curriculum/i.test(href)) return;
    link.addEventListener("click", () => {
      const identify = new amplitude.Identify();
      identify.setOnce("CV Downloaded", "true");
      amplitude.identify(identify);

      track("Resume Downloaded", {
        asset_path: href,
        file_type: href.split(".").pop() || "pdf",
        resume_version: "2025",
        source_page_path: path(),
        download_context: path().includes("/recruiters")
          ? "recruiters"
          : "general",
      });
      recordEngagedAction("resume_downloaded");
    });
  });
}

// ── Event: Contact Channel Selected / Email Compose Started ───────────────────

function attachContactTracking() {
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const text = link.textContent?.trim() || "";
    const cls = link.className || "";

    if (href.startsWith("mailto:")) {
      link.addEventListener("click", () => {
        const identify = new amplitude.Identify();
        identify.setOnce("Has Contacted", "true");
        identify.set("Primary Contact Channel", "email");
        amplitude.identify(identify);

        track("Email Compose Started", {
          source_page_path: path(),
          email_context: path().includes("/recruiters")
            ? "recruiter_outreach"
            : "general",
          mailto_template_used: href.includes("?") ? "prefilled" : "plain",
        });
        track("Contact Channel Selected", {
          contact_channel: "email",
          source_page_path: path(),
          source_section: cls.includes("primary") ? "primary" : "card",
          destination_domain: "mail",
        });
        recordEngagedAction("contact_email");
      });
      return;
    }

    if (/linkedin\.com/i.test(href)) {
      link.addEventListener("click", () => {
        const identify = new amplitude.Identify();
        identify.setOnce("Has Contacted", "true");
        identify.set("Primary Contact Channel", "linkedin");
        amplitude.identify(identify);

        track("LinkedIn Profile Opened", {
          source_page_path: path(),
          source_section: cls.includes("primary") ? "primary" : "card",
          destination_url: href,
        });
        track("Contact Channel Selected", {
          contact_channel: "linkedin",
          source_page_path: path(),
          source_section: cls.includes("primary") ? "primary" : "card",
          destination_domain: "linkedin.com",
        });
        recordEngagedAction("contact_linkedin");
      });
      return;
    }

    if (/github\.com\/fredericlabadie\/?$/i.test(href)) {
      link.addEventListener("click", () => {
        track("GitHub Profile Opened", {
          source_page_path: path(),
          source_section: cls.includes("card") ? "card" : "inline",
          destination_url: href,
        });
        track("Contact Channel Selected", {
          contact_channel: "github",
          source_page_path: path(),
          source_section: cls.includes("card") ? "card" : "inline",
          destination_domain: "github.com",
        });
      });
    }
  });
}

// ── Event: Project Source Opened ──────────────────────────────────────────────

function attachProjectSourceTracking() {
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const isGithubRepo = /github\.com\/fredericlabadie\/[^/]+\/?$/i.test(href);
    if (!isGithubRepo) return;
    link.addEventListener("click", () => {
      const parts = href.split("/");
      const repoName = parts[parts.length - 1] || parts[parts.length - 2] || "";
      track("Project Source Opened", {
        repository_name: repoName,
        destination_url: href,
        source_page_path: path(),
        source_module: link.closest("[class]")?.className || "inline",
      });
    });
  });
}

// ── Event: External Resource Opened ───────────────────────────────────────────

function attachExternalResourceTracking() {
  const SOCIAL = /linkedin\.com|github\.com|twitter\.com|x\.com|t\.co/i;
  const MAILTO = /^mailto:/i;

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (MAILTO.test(href) || SOCIAL.test(href)) return;
    if (!href.startsWith("http") && !href.startsWith("//")) return;

    let domain = "";
    try {
      domain = new URL(href).hostname;
    } catch {
      return;
    }

    link.addEventListener("click", () => {
      track("External Resource Opened", {
        resource_type: /resume|cv|pdf/i.test(href) ? "document" : "website",
        destination_domain: domain,
        destination_url: href,
        source_page_path: path(),
      });
    });
  });
}

// ── Init ───────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  initUserProperties();
  attachLensTracking();
  attachCaseStudyTracking();
  attachCaseStudyCompletionTracking();
  attachCaseLibraryTracking();
  attachNotebookTracking();
  attachNotebookSectionTracking();
  attachResumeTracking();
  attachContactTracking();
  attachProjectSourceTracking();
  attachExternalResourceTracking();
});
