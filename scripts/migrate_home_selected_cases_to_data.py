from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "index.html"

CASE_COPY_RE = re.compile(
    r"<div\s+class=[\"']bp-case-copy[\"']>[\s\S]*?</div>\s*\n\s*<figure",
    re.IGNORECASE,
)

INCLUDES = [
    "{% include home-selected-case-copy.html selected=site.data.home_selected_cases[0] %}",
    "{% include home-selected-case-copy.html selected=site.data.home_selected_cases[1] %}",
    "{% include home-selected-case-copy.html selected=site.data.home_selected_cases[2] %}",
]


def main() -> None:
    text = PATH.read_text(encoding="utf-8")

    if "home-selected-case-copy.html" in text:
        print("SKIP  index.html — already migrated")
        return

    replacements = iter(INCLUDES)

    def replace(match: re.Match) -> str:
        include = next(replacements)
        return f"{include}\n\n          <figure"

    new_text, count = CASE_COPY_RE.subn(replace, text, count=3)
    if count != 3:
        raise SystemExit(f"Expected to replace three homepage selected case copy blocks, replaced {count}.")

    PATH.write_text(new_text, encoding="utf-8")
    print("OK    index.html — selected case copy now data-driven")
    print("Next: run `git diff`, then `bundle exec jekyll serve`.")


if __name__ == "__main__":
    main()
