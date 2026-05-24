from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "index.html"

RECEIPTS_RE = re.compile(
    r"\n\s*<div\s+class=[\"']bp-receipts[\"']\s+aria-label=[\"']Selected proof points[\"']>[\s\S]*?</div>\s*\n\s*</section>",
    re.IGNORECASE,
)

REPLACEMENT = """
        {% include receipt-grid.html receipts=site.data.home_receipts class="bp-receipts" aria_label="Selected proof points" %}
      </section>"""


def main() -> None:
    text = PATH.read_text(encoding="utf-8")

    if "site.data.home_receipts" in text:
        print("SKIP  index.html — homepage receipts already migrated")
        return

    new_text, count = RECEIPTS_RE.subn(REPLACEMENT, text, count=1)
    if count != 1:
        raise SystemExit(f"Expected to replace one homepage receipts block, replaced {count}.")

    PATH.write_text(new_text, encoding="utf-8")
    print("OK    index.html — homepage receipts now use receipt-grid include")
    print("Next: run `git diff`, then `bundle exec jekyll serve`.")


if __name__ == "__main__":
    main()
