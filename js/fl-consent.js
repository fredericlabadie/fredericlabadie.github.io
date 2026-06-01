// fl-consent.js — shared consent UI for fredericlabadie.com portfolio properties
// Load as a classic (non-module) blocking <script>. Configure BEFORE loading:
//
//   window.FLConsentConfig = {
//     appId:         "signal_conduit",
//     appName:       "Signal Conduit",
//     cookieName:    "fl_consent_signal_conduit",
//     bannerText:    "Signal Conduit uses ...",
//     theme:         "dark",   // "light" (default) | "dark"
//   };
//
// Cookie: host-local, Path=/, SameSite=Lax, Secure, Max-Age=15552000 (6 months).
// No Domain attribute — each subdomain stores its own decision.
// This file never touches Amplitude. Each app's analytics wrapper calls:
//   window.FLConsent.hasAnalytics()

(function () {
  "use strict";

  // ── Config ───────────────────────────────────────────────────────────────────

  var cfg = window.FLConsentConfig || {};
  var COOKIE = cfg.cookieName || "fl_consent_site";
  var VERSION = "2026-06-portfolio-v1";
  var MAX_AGE = 15552000; // 6 months in seconds
  var theme = cfg.theme || "light";
  var appName = cfg.appName || document.title || "This site";
  var bannerText =
    cfg.bannerText ||
    appName +
      " uses necessary storage to remember this choice. " +
      "With your permission, it also uses Amplitude analytics and session replay " +
      "to understand how the site performs. Analytics is optional — you can " +
      "decline and still use the site.";

  // ── Cookie read / write / clear ─────────────────────────────────────────────

  function readConsent() {
    var parts = document.cookie.split(";");
    for (var i = 0; i < parts.length; i++) {
      var c = parts[i].trim();
      if (c.indexOf(COOKIE + "=") === 0) {
        try {
          return JSON.parse(decodeURIComponent(c.slice(COOKIE.length + 1)));
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  }

  function writeConsent(analytics, source) {
    var val = JSON.stringify({
      version: VERSION,
      analytics: analytics === true,
      updatedAt: new Date().toISOString(),
      source: source || "banner",
    });
    var secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie =
      COOKIE +
      "=" +
      encodeURIComponent(val) +
      "; Path=/" +
      "; SameSite=Lax" +
      secure +
      "; Max-Age=" +
      MAX_AGE;
  }

  function clearCookie() {
    var secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie =
      COOKIE + "=; Path=/; SameSite=Lax" + secure + "; Max-Age=0";
  }

  // ── Public API ──────────────────────────────────────────────────────────────
  // window.FLConsent is the single source of truth every analytics wrapper reads.

  window.FLConsent = {
    get: readConsent,
    hasAnalytics: function () {
      var c = readConsent();
      return c !== null && c.analytics === true;
    },
    setAnalytics: function (granted, source) {
      writeConsent(granted, source || "banner");
      var el = document.getElementById("fl-consent-banner");
      if (el) el.style.display = "none";
      window.dispatchEvent(
        new CustomEvent("FLConsentChanged", {
          detail: { analytics: granted === true },
        }),
      );
    },
    open: function () {
      var el = document.getElementById("fl-consent-banner");
      if (el) el.style.display = "flex";
    },
    reset: function () {
      clearCookie();
      var el = document.getElementById("fl-consent-banner");
      if (el) el.style.display = "flex";
    },
  };

  // ── Styles ──────────────────────────────────────────────────────────────────

  var dark = theme === "dark";
  var css =
    "#fl-consent-banner{" +
    "position:fixed;bottom:0;left:0;right:0;z-index:99999;" +
    "display:none;" +
    "align-items:center;gap:16px;flex-wrap:wrap;" +
    "padding:14px 20px;" +
    (dark
      ? "background:#0d0905;border-top:1px solid rgba(180,79,255,0.3);"
      : "background:#fff;border-top:1px solid #d1d5db;") +
    "font:13px/1.5 system-ui,-apple-system,sans-serif;" +
    (dark ? "color:#a09880;" : "color:#374151;") +
    "}" +
    "#fl-consent-banner p{flex:1;margin:0;min-width:200px;}" +
    "#fl-consent-banner .fl-btns{display:flex;gap:8px;flex-shrink:0;}" +
    "#fl-consent-banner button{" +
    "padding:6px 16px;border-radius:4px;cursor:pointer;" +
    "font:600 11px/1 system-ui,-apple-system,sans-serif;" +
    "letter-spacing:0.06em;text-transform:uppercase;" +
    "border:1px solid transparent;transition:background 0.15s;" +
    "}" +
    "#fl-consent-accept{" +
    (dark
      ? "background:rgba(180,79,255,0.15);border-color:rgba(180,79,255,0.45);color:#b44fff;"
      : "background:#ede9fe;border-color:#7c3aed;color:#5b21b6;") +
    "}" +
    "#fl-consent-accept:hover{" +
    (dark ? "background:rgba(180,79,255,0.3);" : "background:#ddd6fe;") +
    "}" +
    "#fl-consent-decline{" +
    (dark
      ? "background:transparent;border-color:rgba(255,255,255,0.12);color:#6b6355;"
      : "background:transparent;border-color:#d1d5db;color:#6b7280;") +
    "}" +
    "#fl-consent-decline:hover{" +
    (dark
      ? "border-color:rgba(255,255,255,0.28);color:#a09880;"
      : "border-color:#9ca3af;color:#374151;") +
    "}" +
    "#fl-privacy-choices{" +
    "position:fixed;bottom:10px;right:16px;z-index:99998;" +
    "background:none;border:none;padding:4px 0;cursor:pointer;" +
    "font:600 10px/1 system-ui,-apple-system,sans-serif;" +
    "letter-spacing:0.05em;text-transform:uppercase;" +
    (dark ? "color:#6b6355;" : "color:#9ca3af;") +
    "}" +
    "#fl-privacy-choices:hover{" +
    (dark ? "color:#a09880;" : "color:#374151;") +
    "text-decoration:underline;" +
    "}" +
    "@media(max-width:480px){" +
    "#fl-consent-banner{flex-direction:column;align-items:flex-start;}" +
    "}";

  // ── DOM injection ────────────────────────────────────────────────────────────

  function injectUI() {
    if (document.getElementById("fl-consent-banner")) return;

    var style = document.createElement("style");
    style.id = "fl-consent-css";
    style.textContent = css;
    document.head.appendChild(style);

    var banner = document.createElement("div");
    banner.id = "fl-consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Analytics consent");
    banner.setAttribute("aria-live", "polite");
    banner.innerHTML =
      "<p>" +
      bannerText +
      "</p>" +
      "<div class='fl-btns'>" +
      "<button id='fl-consent-decline' type='button' " +
      "onclick='window.FLConsent.setAnalytics(false)'>Decline</button>" +
      "<button id='fl-consent-accept' type='button' " +
      "onclick='window.FLConsent.setAnalytics(true)'>Accept</button>" +
      "</div>";
    document.body.appendChild(banner);

    var privBtn = document.createElement("button");
    privBtn.id = "fl-privacy-choices";
    privBtn.type = "button";
    privBtn.setAttribute("aria-label", "Change privacy choices");
    privBtn.textContent = "Privacy choices";
    privBtn.onclick = function () {
      window.FLConsent.open();
    };
    document.body.appendChild(privBtn);

    if (readConsent() === null) {
      banner.style.display = "flex";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectUI);
  } else {
    injectUI();
  }
})();
