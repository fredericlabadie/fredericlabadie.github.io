from pathlib import Path
import re

path = Path("index.html")
text = path.read_text(encoding="utf-8")

if not text.startswith("---"):
    text = "---\nnav_key: home\n---\n" + text

nav_re = re.compile(
    r"\n\s*<nav\b[^>]*class=[\"']nav bp-nav[\"'][\s\S]*?</nav>\s*\n",
    re.IGNORECASE,
)

text, count = nav_re.subn("\n    {% include site-nav.html %}\n\n", text, count=1)

if count != 1:
    raise SystemExit(f"Expected to replace 1 homepage nav block, replaced {count}")

path.write_text(text, encoding="utf-8")
print("Homepage migrated to Jekyll nav include.")
