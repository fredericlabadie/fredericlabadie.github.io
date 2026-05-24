from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "work" / "index.html"

START_RE = re.compile(
    r"\n\s*<div\s+class=[\"']bp-section-tag[\"']\s+aria-hidden=[\"']true[\"']>\s*\n\s*<span>// 02 / Lens 04 / AI Workflow Design</span>[\s\S]*?\n\s*(?=<div\s+class=[\"']bp-section-tag[\"']\s+aria-hidden=[\"']true[\"']>\s*\n\s*<span>// 09 / next</span>)",
    re.IGNORECASE,
)

LIQUID_BLOCK = """

      {% for lens in site.data.lenses %}
        {% assign section_index = forloop.index | plus: 1 | prepend: '0' | slice: -2, 2 %}
        {% include work-lens-section.html lens=lens index=section_index %}
      {% endfor %}

"""


def main() -> None:
    text = PATH.read_text(encoding="utf-8")

    if "work-lens-section.html" in text:
        print("SKIP  work/index.html — already migrated")
        return

    new_text, count = START_RE.subn(LIQUID_BLOCK, text, count=1)
    if count != 1:
        raise SystemExit(f"Expected to replace one static lens-library block, replaced {count}.")

    PATH.write_text(new_text, encoding="utf-8")
    print("OK    work/index.html — static lens sections replaced with data-driven include")
    print("Next: run `git diff`, then `bundle exec jekyll serve`.")


if __name__ == "__main__":
    main()
