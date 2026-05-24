from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

FILES = [
    ROOT / "index.html",
    ROOT / "work" / "index.html",
    ROOT / "about" / "index.html",
    ROOT / "thoughts" / "index.html",
    ROOT / "recruiters" / "index.html",
    ROOT / "credentials" / "index.html",
    ROOT / "contact" / "index.html",
    *sorted((ROOT / "work").glob("*.html")),
]

FOOTER_RE = re.compile(
    r"\n\s*<footer\b[^>]*class=[\"'][^\"']*bp-footer[^\"']*[\"'][\s\S]*?</footer>\s*\n",
    re.IGNORECASE,
)

FOOTER_LABELS = {
    "index.html": "Homepage",
    "work/index.html": "Work",
    "about/index.html": "About",
    "thoughts/index.html": "Current Meditations",
    "recruiters/index.html": "Recruiter quick scan",
    "credentials/index.html": "Credentials",
    "contact/index.html": "Contact",
}


def rel_path(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def front_matter_bounds(text: str):
    if not text.startswith("---"):
        return None
    match = re.match(r"---\s*\n([\s\S]*?)\n---\s*\n", text)
    if not match:
        raise ValueError("Malformed front matter")
    return match


def add_or_update_footer_label(text: str, label: str) -> str:
    match = front_matter_bounds(text)
    if not match:
        return f"---\nfooter_label: {label}\n---\n{text}"

    body = text[match.end():]
    fm = match.group(1)

    if re.search(r"^footer_label:\s*.+$", fm, flags=re.MULTILINE):
        fm = re.sub(
            r"^footer_label:\s*.+$",
            f"footer_label: {label}",
            fm,
            flags=re.MULTILINE,
        )
    else:
        fm = f"{fm.rstrip()}\nfooter_label: {label}"

    return f"---\n{fm.strip()}\n---\n{body}"


def label_for(path: Path) -> str:
    rel = rel_path(path)
    if rel in FOOTER_LABELS:
        return FOOTER_LABELS[rel]
    if rel.startswith("work/"):
        return "Case study"
    return "Portfolio"


def migrate_file(path: Path) -> str:
    if not path.exists():
        return f"MISS  {rel_path(path)}"

    text = path.read_text(encoding="utf-8")
    original = text
    label = label_for(path)

    text = add_or_update_footer_label(text, label)
    text, count = FOOTER_RE.subn("\n    {% include site-footer.html %}\n\n", text, count=1)

    if count == 0:
        return f"SKIP  {rel_path(path)} — no bp-footer block found"

    if text != original:
        path.write_text(text, encoding="utf-8")
        return f"OK    {rel_path(path)} — footer_label={label}"

    return f"SKIP  {rel_path(path)} — no changes"


def main() -> None:
    print("Migrating repeated footer blocks to Jekyll include...\n")
    for path in FILES:
        print(migrate_file(path))
    print("\nDone. Next: run `git diff`, then `bundle exec jekyll serve`.")


if __name__ == "__main__":
    main()
