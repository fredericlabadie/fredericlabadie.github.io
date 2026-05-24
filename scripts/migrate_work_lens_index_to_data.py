from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "work" / "index.html"

LENS_INDEX_RE = re.compile(
    r"\n\s*<section\s*\n\s*class=[\"']bp-lens-index[\"']\s*\n\s*id=[\"']case-library[\"']\s*\n\s*aria-label=[\"']Case study lens index[\"']\s*\n\s*>[\s\S]*?</section>\s*\n",
    re.IGNORECASE,
)

INCLUDE = "\n      {% include work-lens-index.html %}\n\n"


def main() -> None:
    text = PATH.read_text(encoding="utf-8")

    if "work-lens-index.html" in text:
        print("SKIP  work/index.html — already migrated")
        return

    new_text, count = LENS_INDEX_RE.subn(INCLUDE, text, count=1)
    if count != 1:
        raise SystemExit(f"Expected to replace one lens index block, replaced {count}.")

    PATH.write_text(new_text, encoding="utf-8")
    print("OK    work/index.html — static lens index replaced with data-driven include")
    print("Next: run `git diff`, then `bundle exec jekyll serve`.")


if __name__ == "__main__":
    main()
