import * as amplitude from "https://cdn.jsdelivr.net/npm/@amplitude/unified/+esm";

// ── Helpers ────────────────────────────────────────────────────────────────────

function hasAnalyticsConsent() {
  return window.Cookiebot?.consent?.statistics === true;
}

function track(event, props) {
  if (!hasAnalyticsConsent()) return;
  amplitude.track(event, { Domain: window.location.hostname, ...props });
}

function identifyUser(identify) {
  if (!hasAnalyticsConsent()) return;
  amplitude.identify(identify);
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

  identifyUser(identify);
}

// ── Engagement tracking ────────────────────────────────────────────────────────

let engagedActionsCount = 0;
let engagedSessionFired = false;

function recordEngagedAction(trigger) {
  if (engagedSessionFired) return;
  engagedActionsCount += 1;
  if (engagedActionsCount >= 2) {
    engagedSessionFired = true;
    track("engagedSessionStarted", {
      EngagementTrigger: trigger,
      EngagedActionsCount: String(engagedActionsCount),
      SourcePagePath: path(),
    });
  }
}

// ── Event: portfolioLensSelected ──────────────────────────────────────────────

function attachLensTracking() {
  document.querySelectorAll(".case-toc-item a").forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href") || "";
      const lensName = href.replace("#topic-", "").replace(/-/g, " ") || href;
      track("portfolioLensSelected", {
        LensName: lensName,
        SourcePagePath: path(),
        UiLocation: "sidebar",
      });
    });
  });
}

// ── Event: caseStudyOpened ────────────────────────────────────────────────────

function attachCaseStudyTracking() {
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const isCaseStudy =
      /\/(philips|work)\/[a-z]/.test(href) && !href.endsWith("/");
    if (!isCaseStudy) return;
    link.addEventListener("click", () => {
      track("caseStudyOpened", {
        CaseStudySlug: href.split("/").filter(Boolean).pop() || href,
        CaseStudyTitle: link.textContent?.trim() || "",
        SourcePagePath: path(),
        EntryContext: "work_list",
      });
    });
  });
}

// ── Event: caseStudyCompleted (scroll depth) ──────────────────────────────────

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
      track("caseStudyCompleted", {
        CaseStudySlug: slug,
        CaseStudyTitle: title,
        CompletionThresholdPercent: "50",
        TimeOnPageSeconds: String(Math.round((Date.now() - startTime) / 1000)),
        SourcePagePath: path(),
      });
      recordEngagedAction("case_study_50pct");
    }
    if (pct >= 90 && !fired90) {
      fired90 = true;
      track("caseStudyCompleted", {
        CaseStudySlug: slug,
        CaseStudyTitle: title,
        CompletionThresholdPercent: "90",
        TimeOnPageSeconds: String(Math.round((Date.now() - startTime) / 1000)),
        SourcePagePath: path(),
      });
      recordEngagedAction("case_study_90pct");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

// ── Event: caseLibraryContinued ───────────────────────────────────────────────

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
      track("caseLibraryContinued", {
        FromCaseStudySlug: fromSlug,
        FromCaseStudyTitle: fromTitle,
        DestinationType: /\/work\/?$/.test(href) ? "work_list" : "another_case",
        SourcePagePath: path(),
      });
    });
  });
}

// ── Event: notebookTopicOpened ────────────────────────────────────────────────

function attachNotebookTracking() {
  document
    .querySelectorAll(".post-entry .post-title a, .post-title a")
    .forEach((link) => {
      link.addEventListener("click", () => {
        track("notebookTopicOpened", {
          TopicId: (link.getAttribute("href") || "").replace("#", ""),
          TopicTitle: link.textContent?.trim() || "",
          SourcePagePath: path(),
        });
      });
    });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const isNotebook = path().includes("/notebook");
    if (!isNotebook) return;
    link.addEventListener("click", () => {
      const anchor = (link.getAttribute("href") || "").replace("#", "");
      track("notebookTopicOpened", {
        TopicId: anchor,
        TopicTitle: link.textContent?.trim() || anchor,
        SourcePagePath: path(),
      });
    });
  });
}

// ── Event: notebookSectionReached (scroll) ────────────────────────────────────

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

        track("notebookSectionReached", {
          SectionId: id,
          SectionTitle: entry.target.textContent?.trim() || "",
          ScrollPercent: String(scrollPct),
          TimeOnPageSeconds: String(
            Math.round((Date.now() - startTime) / 1000),
          ),
          SourcePagePath: path(),
        });
      });
    },
    { threshold: 0.3 },
  );

  sections.forEach((s) => observer.observe(s));
}

// ── Event: resumeDownloaded ────────────────────────────────────────────────────

function attachResumeTracking() {
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (!/resume|cv|curriculum/i.test(href)) return;
    link.addEventListener("click", () => {
      const identify = new amplitude.Identify();
      identify.setOnce("CV Downloaded", "true");
      identifyUser(identify);

      track("resumeDownloaded", {
        AssetPath: href,
        FileType: href.split(".").pop() || "pdf",
        ResumeVersion: "2025",
        SourcePagePath: path(),
        DownloadContext: path().includes("/recruiters")
          ? "recruiters"
          : "general",
      });
      recordEngagedAction("resume_downloaded");
    });
  });
}

// ── Events: contactChannelSelected / emailComposeStarted ──────────────────────

function attachContactTracking() {
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const cls = link.className || "";

    if (href.startsWith("mailto:")) {
      link.addEventListener("click", () => {
        const identify = new amplitude.Identify();
        identify.setOnce("Has Contacted", "true");
        identify.set("Primary Contact Channel", "email");
        identifyUser(identify);

        track("emailComposeStarted", {
          SourcePagePath: path(),
          EmailContext: path().includes("/recruiters")
            ? "recruiter_outreach"
            : "general",
          MailtoTemplateUsed: href.includes("?") ? "prefilled" : "plain",
        });
        track("contactChannelSelected", {
          ContactChannel: "email",
          SourcePagePath: path(),
          SourceSection: cls.includes("primary") ? "primary" : "card",
          DestinationDomain: "mail",
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
        identifyUser(identify);

        track("linkedinProfileOpened", {
          SourcePagePath: path(),
          SourceSection: cls.includes("primary") ? "primary" : "card",
          DestinationUrl: href,
        });
        track("contactChannelSelected", {
          ContactChannel: "linkedin",
          SourcePagePath: path(),
          SourceSection: cls.includes("primary") ? "primary" : "card",
          DestinationDomain: "linkedin.com",
        });
        recordEngagedAction("contact_linkedin");
      });
      return;
    }

    if (/github\.com\/fredericlabadie\/?$/i.test(href)) {
      link.addEventListener("click", () => {
        track("githubProfileOpened", {
          SourcePagePath: path(),
          SourceSection: cls.includes("card") ? "card" : "inline",
          DestinationUrl: href,
        });
        track("contactChannelSelected", {
          ContactChannel: "github",
          SourcePagePath: path(),
          SourceSection: cls.includes("card") ? "card" : "inline",
          DestinationDomain: "github.com",
        });
      });
    }
  });
}

// ── Event: projectSourceOpened ────────────────────────────────────────────────

function attachProjectSourceTracking() {
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const isGithubRepo = /github\.com\/fredericlabadie\/[^/]+\/?$/i.test(href);
    if (!isGithubRepo) return;
    link.addEventListener("click", () => {
      const parts = href.split("/");
      const repoName = parts[parts.length - 1] || parts[parts.length - 2] || "";
      track("projectSourceOpened", {
        RepositoryName: repoName,
        DestinationUrl: href,
        SourcePagePath: path(),
        SourceModule: link.closest("[class]")?.className || "inline",
      });
    });
  });
}

// ── Event: externalResourceOpened ────────────────────────────────────────────

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
      track("externalResourceOpened", {
        ResourceType: /resume|cv|pdf/i.test(href) ? "document" : "website",
        DestinationDomain: domain,
        DestinationUrl: href,
        SourcePagePath: path(),
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
