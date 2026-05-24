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
]

FM_RE = re.compile(r"^---\s*\n([\s\S]*?)\n---\s*\n")
HEAD_RE = re.compile(r"<head>\s*\n([\s\S]*?)\n\s*</head>", re.IGNORECASE)
TITLE_RE = re.compile(r"<title>\s*([\s\S]*?)\s*</title>", re.IGNORECASE)
META_NAME_RE = lambda name: re.compile(
    rf"<meta\s+name=[\"']{re.escape(name)}[\"']\s+content=[\"']([^\"']*)[\"']\s*/?>",
    re.IGNORECASE,
)
META_PROP_RE = lambda prop: re.compile(
    rf"<meta\s+property=[\"']{re.escape(prop)}[\"']\s+content=[\"']([^\"']*)[\"']\s*/?>",
    re.IGNORECASE,
)
CSS_RE = re.compile(r"<link\s+rel=[\"']stylesheet[\"']\s+href=[\"']([^\"']+\.css)[\"'][^>]*>", re.IGNORECASE)

TOP_LEVEL_DEFAULTS = {
    "index.html": {
        "title": "Frederic Labadie",
        "nav_key": "home",
        "footer_label": "Homepage",
    },
    "work/index.html": {
        "title": "Work",
        "nav_key": "work",
        "footer_label": "Work",
    },
    "about/index.html": {
        "title": "About",
        "nav_key": "about",
        "footer_label": "About",
    },
    "thoughts/index.html": {
        "title": "Current Meditations",
        "nav_key": "thoughts",
        "footer_label": "Current Meditations",
    },
    "recruiters/index.html": {
        "title": "Frederic Labadie — for recruiters",
        "nav_key": "recruiters",
        "footer_label": "Recruiter quick scan",
    },
    "credentials/index.html": {
        "title": "Credentials",
        "nav_key": "credentials",
        "footer_label": "Credentials",
    },
    "contact/index.html": {
        "title": "Contact",
        "nav_key": "contact",
        "footer_label": "Contact",
    },
}


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def yaml_quote(value: str) -> str:
    value = clean(value).replace('"', '\\"')
    return f'"{value}"'


def extract(pattern: re.Pattern, text: str) -> str:
    match = pattern.search(text)
    return clean(match.group(1)) if match else ""


def normalize_css_href(href: str) -> str:
    href = href.strip()
    if href.startswith("../"):
        href = href[2:]
    if href.startswith("css/"):
        href = "/" + href
    return href


def extract_extra_css(head: str) -> list[str]:
    extra = []
    for href in CSS_RE.findall(head):
        normalized = normalize_css_href(href)
        if normalized.endswith("/css/style.css") or normalized == "/css/style.css" or normalized == "css/style.css":
            continue
        if normalized.startswith("https://"):
            continue
        if normalized not in extra:
            extra.append(normalized)
    return extra


def parse_front_matter(text: str):
    match = FM_RE.match(text)
    if not match:
        return {}, text

    fm = {}
    for line in match.group(1).splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        fm[key.strip()] = value.strip()
    return fm, text[match.end():]


def render_front_matter(data: dict) -> str:
    ordered_keys = [
        "nav_key",
        "footer_label",
        "title",
        "title_tag",
        "description",
        "robots",
        "theme_color",
        "og_type",
        "og_title",
        "og_description",
        "og_url",
        "twitter_title",
        "twitter_description",
        "extra_css",
    ]

    lines = []
    for key in ordered_keys:
        if key not in data or data[key] in (None, "", []):
            continue
        value = data[key]
        if isinstance(value, list):
            lines.append(f"{key}:")
            for item in value:
                lines.append(f"  - {yaml_quote(item)}")
        elif key in {"nav_key", "footer_label"}:
            # Keep these readable unless they require quoting.
            if any(char in str(value) for char in [":", "#", "\"", "'"]):
                lines.append(f"{key}: {yaml_quote(str(value))}")
            else:
                lines.append(f"{key}: {value}")
        else:
            lines.append(f"{key}: {yaml_quote(str(value))}")

    return "---\n" + "\n".join(lines) + "\n---\n"


def migrate_file(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    fm, body = parse_front_matter(text)

    head_match = HEAD_RE.search(body)
    if not head_match:
        if "{% include head.html %}" in text:
            return f"SKIP  {rel(path)} — already migrated"
        return f"SKIP  {rel(path)} — head block not found"

    head = head_match.group(1)
    defaults = TOP_LEVEL_DEFAULTS.get(rel(path), {})

    data = dict(defaults)
    data.update(fm)

    title_tag = extract(TITLE_RE, head)
    description = extract(META_NAME_RE("description"), head)
    robots = extract(META_NAME_RE("robots"), head)
    theme_color = extract(META_NAME_RE("theme-color"), head)
    og_type = extract(META_PROP_RE("og:type"), head)
    og_title = extract(META_PROP_RE("og:title"), head)
    og_description = extract(META_PROP_RE("og:description"), head)
    og_url = extract(META_PROP_RE("og:url"), head)
    twitter_title = extract(META_NAME_RE("twitter:title"), head)
    twitter_description = extract(META_NAME_RE("twitter:description"), head)
    extra_css = extract_extra_css(head)

    if title_tag:
        data["title_tag"] = title_tag
    if description:
        data["description"] = description
    if robots:
        data["robots"] = robots
    if theme_color:
        data["theme_color"] = theme_color
    if og_type:
        data["og_type"] = og_type
    if og_title:
        data["og_title"] = og_title
    if og_description:
        data["og_description"] = og_description
    if og_url:
        data["og_url"] = og_url
    if twitter_title:
        data["twitter_title"] = twitter_title
    if twitter_description:
        data["twitter_description"] = twitter_description
    if extra_css:
        data["extra_css"] = extra_css

    new_body = HEAD_RE.sub("<head>\n    {% include head.html %}\n  </head>", body, count=1)
    new_text = render_front_matter(data) + new_body
    path.write_text(new_text, encoding="utf-8")
    return f"OK    {rel(path)}"


def main() -> None:
    print("Migrating top-level <head> blocks to Jekyll include...\n")
    for path in FILES:
        print(migrate_file(path))
    print("\nDone. Next: run `git diff`, then `bundle exec jekyll serve`.")


if __name__ == "__main__":
    main()
