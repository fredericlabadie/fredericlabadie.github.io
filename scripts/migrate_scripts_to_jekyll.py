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

SCRIPT_RE = re.compile(
    r"\n\s*<script\s+src=[\"'][^\"']*js/main\.js[\"']\s*>\s*</script>\s*\n"
    r"\s*<script\s+type=[\"']module[\"']\s+src=[\"']/js/amplitude-init\.js[\"']\s*>\s*</script>\s*\n"
    r"\s*<script\s+type=[\"']module[\"']\s+src=[\"']/js/analytics\.js[\"']\s*>\s*</script>\s*\n",
    re.IGNORECASE,
)


def rel_path(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def migrate_file(path: Path) -> str:
    if not path.exists():
        return f"MISS  {rel_path(path)}"

    text = path.read_text(encoding="utf-8")
    original = text

    text, count = SCRIPT_RE.subn("\n    {% include site-scripts.html %}\n", text, count=1)

    if count == 0:
        if "site-scripts.html" in text:
            return f"SKIP  {rel_path(path)} — already migrated"
        return f"SKIP  {rel_path(path)} — script block not found"

    if text != original:
        path.write_text(text, encoding="utf-8")
        return f"OK    {rel_path(path)}"

    return f"SKIP  {rel_path(path)} — no changes"


def main() -> None:
    print("Migrating repeated script blocks to Jekyll include...\n")
    for path in FILES:
        print(migrate_file(path))
    print("\nDone. Next: run `git diff`, then `bundle exec jekyll serve`.")


if __name__ == "__main__":
    main()
