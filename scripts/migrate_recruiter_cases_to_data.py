from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "recruiters" / "index.html"

CASE_LIST_RE = re.compile(
    r"\n\s*<div\s+class=[\"']bp-rec-case-list[\"']>[\s\S]*?</div>\s*\n\s*</div>\s*\n\s*</section>",
    re.IGNORECASE,
)

REPLACEMENT = """
        <div class="bp-rec-main">
          {% include recruiter-proof-cases.html %}
        </div>
      </section>
"""


def main() -> None:
    text = PATH.read_text(encoding="utf-8")

    if "recruiter-proof-cases.html" in text:
        print("SKIP  recruiters/index.html — already migrated")
        return

    # Scope the replacement to the proof-cases section only.
    marker = '<section class="bp-rec-content" id="cases">'
    marker_index = text.find(marker)
    if marker_index == -1:
        raise SystemExit("Could not find recruiter proof-cases section.")

    before = text[:marker_index]
    after = text[marker_index:]
    new_after, count = CASE_LIST_RE.subn(REPLACEMENT, after, count=1)
    if count != 1:
        raise SystemExit(f"Expected to replace one recruiter case list block, replaced {count}.")

    PATH.write_text(before + new_after, encoding="utf-8")
    print("OK    recruiters/index.html — recruiter proof cases now data-driven")
    print("Next: run `git diff`, then `bundle exec jekyll serve`.")


if __name__ == "__main__":
    main()
