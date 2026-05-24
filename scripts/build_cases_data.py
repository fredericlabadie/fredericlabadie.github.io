from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
WORK_DIR = ROOT / "work"
OUT = ROOT / "_data" / "cases.yml"

FM_RE = re.compile(r"^---\s*\n([\s\S]*?)\n---\s*\n")
KICKER_RE = re.compile(r"<p\s+class=[\"']bp-case-kicker[^\"']*[\"']>\s*([\s\S]*?)\s*</p>", re.IGNORECASE)
H1_RE = re.compile(r"<h1>\s*([\s\S]*?)\s*</h1>", re.IGNORECASE)
DEK_RE = re.compile(r"<p\s+class=[\"']bp-case-dek[^\"']*[\"']>\s*([\s\S]*?)\s*</p>", re.IGNORECASE)
RECEIPTS_SECTION_RE = re.compile(
    r"<section\s+class=[\"']bp-case-receipts[\"'][^>]*>([\s\S]*?)</section>",
    re.IGNORECASE,
)
ARTICLE_RE = re.compile(r"<article[^>]*>([\s\S]*?)</article>", re.IGNORECASE)
STRONG_RE = re.compile(r"<strong[^>]*>([\s\S]*?)</strong\s*>", re.IGNORECASE)
SPAN_RE = re.compile(r"<span[^>]*>([\s\S]*?)</span\s*>", re.IGNORECASE)
CONTEXT_RE = re.compile(r"<div\s+class=[\"']bp-case-panel-row[\"']>\s*<span>Client context</span>\s*<p>([\s\S]*?)</p>\s*</div>", re.IGNORECASE)
ROLE_RE = re.compile(r"<div\s+class=[\"']bp-case-panel-row[\"']>\s*<span>Role</span>\s*<p>([\s\S]*?)</p>\s*</div>", re.IGNORECASE)

LENS_RE = re.compile(r"Lens\s+(\d+)\s*/\s*([^/]+)$", re.IGNORECASE)


def clean_html(value: str) -> str:
    value = value or ""
    value = re.sub(r"<[^>]+>", "", value)
    value = value.replace("&mdash;", "—").replace("&ndash;", "–").replace("&amp;", "&")
    return re.sub(r"\s+", " ", value).strip()


def yaml_quote(value: str) -> str:
    value = clean_html(value).replace('"', '\\"')
    return f'"{value}"'


def parse_front_matter(text: str) -> dict:
    match = FM_RE.match(text)
    if not match:
        return {}
    data = {}
    for line in match.group(1).splitlines():
        if ":" not in line or line.startswith("  -"):
            continue
        key, value = line.split(":", 1)
        value = value.strip()
        if value.startswith('"') and value.endswith('"'):
            value = value[1:-1].replace('\\"', '"')
        data[key.strip()] = value
    return data


def extract(pattern: re.Pattern, text: str) -> str:
    match = pattern.search(text)
    return clean_html(match.group(1)) if match else ""


def case_kind_from_kicker(kicker: str) -> str:
    if "compact" in kicker.lower():
        return "compact"
    return "case"


def lens_from_kicker(kicker: str):
    match = LENS_RE.search(kicker)
    if not match:
        return "", ""
    return match.group(1).zfill(2), clean_html(match.group(2))


def receipts(text: str) -> list[tuple[str, str]]:
    section_match = RECEIPTS_SECTION_RE.search(text)
    if not section_match:
        return []

    found = []
    for article in ARTICLE_RE.findall(section_match.group(1)):
        strong_match = STRONG_RE.search(article)
        span_match = SPAN_RE.search(article)
        if not strong_match or not span_match:
            continue

        value = clean_html(strong_match.group(1))
        label = clean_html(span_match.group(1))
        if value and label:
            found.append((value, label))

    return found[:4]


def render_case(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    fm = parse_front_matter(text)
    kicker = extract(KICKER_RE, text)
    lens_number, lens_name = lens_from_kicker(kicker)
    title = fm.get("title") or extract(H1_RE, text)
    description = fm.get("description") or extract(DEK_RE, text)
    url = f"/work/{path.name}"
    slug = path.stem
    context = extract(CONTEXT_RE, text)
    role = extract(ROLE_RE, text)
    case_receipts = receipts(text)

    lines = [
        f"- slug: {slug}",
        f"  title: {yaml_quote(title)}",
        f"  url: {yaml_quote(url)}",
        f"  kind: {yaml_quote(case_kind_from_kicker(kicker))}",
    ]
    if lens_number:
        lines.append(f"  lens_number: {yaml_quote(lens_number)}")
    if lens_name:
        lines.append(f"  lens: {yaml_quote(lens_name)}")
    if kicker:
        lines.append(f"  kicker: {yaml_quote(kicker)}")
    if context:
        lines.append(f"  context: {yaml_quote(context)}")
    if role:
        lines.append(f"  role: {yaml_quote(role)}")
    if description:
        lines.append(f"  description: {yaml_quote(description)}")
    if fm.get("og_description"):
        lines.append(f"  short_description: {yaml_quote(fm['og_description'])}")
    if case_receipts:
        lines.append("  receipts:")
        for value, label in case_receipts:
            lines.append(f"    - value: {yaml_quote(value)}")
            lines.append(f"      label: {yaml_quote(label)}")
    return "\n".join(lines)


def main() -> None:
    cases = sorted(path for path in WORK_DIR.glob("*.html") if path.name != "index.html")
    OUT.parent.mkdir(exist_ok=True)
    content = "# Generated from work/*.html by scripts/build_cases_data.py.\n# Edit carefully; later migrations can make this the source of truth.\n\n"
    content += "\n".join(render_case(path) for path in cases)
    content += "\n"
    OUT.write_text(content, encoding="utf-8")
    print(f"Wrote {OUT.relative_to(ROOT)} with {len(cases)} cases.")
    print("Next: review _data/cases.yml, then commit if it looks right.")


if __name__ == "__main__":
    main()
