from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
WORK_DIR = ROOT / "work"
FILES = sorted(path for path in WORK_DIR.glob("*.html") if path.name != "index.html")

FM_RE = re.compile(r"^---\s*\n([\s\S]*?)\n---\s*\n")
TITLE_RE = re.compile(r"<title>\s*([\s\S]*?)\s*</title>", re.IGNORECASE)
META_DESC_RE = re.compile(
    r"<meta\s+name=[\"']description[\"']\s+content=[\"']([^\"']*)[\"']\s*/?>",
    re.IGNORECASE,
)
OG_TITLE_RE = re.compile(
    r"<meta\s+property=[\"']og:title[\"']\s+content=[\"']([^\"']*)[\"']\s*/?>",
    re.IGNORECASE,
)
OG_DESC_RE = re.compile(
    r"<meta\s+property=[\"']og:description[\"']\s+content=[\"']([^\"']*)[\"']\s*/?>",
    re.IGNORECASE,
)
OG_URL_RE = re.compile(
    r"<meta\s+property=[\"']og:url[\"']\s+content=[\"']([^\"']*)[\"']\s*/?>",
    re.IGNORECASE,
)
TWITTER_TITLE_RE = re.compile(
    r"<meta\s+name=[\"']twitter:title[\"']\s+content=[\"']([^\"']*)[\"']\s*/?>",
    re.IGNORECASE,
)
TWITTER_DESC_RE = re.compile(
    r"<meta\s+name=[\"']twitter:description[\"']\s+content=[\"']([^\"']*)[\"']\s*/?>",
    re.IGNORECASE,
)
MAIN_RE = re.compile(
    r"<main\s+class=[\"']bp-case-shell[\"']\s+id=[\"']top[\"']>\s*\n([\s\S]*?)\n\s*</main>",
    re.IGNORECASE,
)


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def yaml_quote(value: str) -> str:
    value = clean(value).replace('"', '\\"')
    return f'"{value}"'


def extract(pattern: re.Pattern, text: str) -> str:
    match = pattern.search(text)
    return clean(match.group(1)) if match else ""


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def migrate_file(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    fm_match = FM_RE.match(text)
    existing_fm = fm_match.group(1).strip() if fm_match else ""

    main_match = MAIN_RE.search(text)
    if not main_match:
      if "layout: case" in existing_fm:
        return f"SKIP  {rel(path)} — already migrated"
      return f"SKIP  {rel(path)} — case main shell not found"

    raw_title = extract(TITLE_RE, text)
    title = raw_title.replace(" — case study — Frederic Labadie", "").replace(" &mdash; case study &mdash; Frederic Labadie", "")
    description = extract(META_DESC_RE, text)
    og_title = extract(OG_TITLE_RE, text)
    og_description = extract(OG_DESC_RE, text)
    og_url = extract(OG_URL_RE, text)
    twitter_title = extract(TWITTER_TITLE_RE, text)
    twitter_description = extract(TWITTER_DESC_RE, text)
    content = main_match.group(1).rstrip() + "\n"

    fm_lines = []
    existing = {}
    for line in existing_fm.splitlines():
        if ":" in line:
            key = line.split(":", 1)[0].strip()
            existing[key] = line

    # Preserve useful existing keys, then overwrite with layout/page metadata.
    for key in ["nav_key", "footer_label"]:
        if key in existing:
            fm_lines.append(existing[key])

    if "nav_key" not in existing:
        fm_lines.append("nav_key: work")
    if "footer_label" not in existing:
        fm_lines.append("footer_label: Case study")

    fm_lines.extend([
        "layout: case",
        f"title: {yaml_quote(title)}",
        f"description: {yaml_quote(description)}",
    ])

    optional = {
        "og_title": og_title,
        "og_description": og_description,
        "og_url": og_url,
        "twitter_title": twitter_title,
        "twitter_description": twitter_description,
    }
    for key, value in optional.items():
        if value:
            fm_lines.append(f"{key}: {yaml_quote(value)}")

    new_text = "---\n" + "\n".join(fm_lines) + "\n---\n" + content
    path.write_text(new_text, encoding="utf-8")
    return f"OK    {rel(path)}"


def main() -> None:
    print("Migrating case pages to _layouts/case.html...\n")
    for path in FILES:
        print(migrate_file(path))
    print("\nDone. Next: run `git diff`, then `bundle exec jekyll serve`.")


if __name__ == "__main__":
    main()
