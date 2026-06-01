// amplitude-init.js — consent-gated Amplitude initialisation for the portfolio.
// Reads consent from window.FLConsent (set by fl-consent.js).
// Amplitude is imported dynamically ONLY after analytics consent is confirmed.
// Exposes window.__amp after init so analytics.js can use amplitude.Identify.

let amp = null;
let initialized = false;

function clearAmplitudeStorage() {
  try {
    const pat = /^(AMP_|amplitude_)/i;
    Object.keys(localStorage)
      .filter((k) => pat.test(k))
      .forEach((k) => localStorage.removeItem(k));
    Object.keys(sessionStorage)
      .filter((k) => pat.test(k))
      .forEach((k) => sessionStorage.removeItem(k));
    document.cookie.split(";").forEach((c) => {
      const name = c.trim().split("=")[0];
      if (/^AMP_/i.test(name))
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    });
  } catch {
    // storage access denied — ignore
  }
}

async function initAmplitude() {
  if (initialized) return;
  initialized = true;
  amp = await import("https://cdn.jsdelivr.net/npm/@amplitude/unified/+esm");
  amp.initAll("bb520ce286dcd9762c8e4360e9a3d51e", {
    serverZone: "EU",
    analytics: { autocapture: true },
    sessionReplay: { sampleRate: 0.1 },
  });
  window.__amp = amp;
  window.dispatchEvent(new CustomEvent("FLAmplitudeReady"));
}

async function syncConsent() {
  if (window.FLConsent?.hasAnalytics()) {
    await initAmplitude();
    if (amp) amp.setOptOut(false);
  } else {
    if (initialized && amp) amp.setOptOut(true);
    clearAmplitudeStorage();
  }
}

window.addEventListener("FLConsentChanged", syncConsent);
syncConsent();
