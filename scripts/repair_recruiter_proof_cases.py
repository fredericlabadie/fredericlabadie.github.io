from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "recruiters" / "index.html"

BAD = '''        <div class="bp-rec-main">
        <div class="bp-rec-main">
          {% include recruiter-proof-cases.html %}
        </div>
      </section>
'''

GOOD = '''        <div class="bp-rec-main">
          {% include recruiter-proof-cases.html %}
        </div>
      </section>
'''


def main() -> None:
    text = PATH.read_text(encoding="utf-8")
    if BAD not in text:
        print("SKIP  recruiters/index.html — duplicate wrapper not found")
        return
    PATH.write_text(text.replace(BAD, GOOD, 1), encoding="utf-8")
    print("OK    recruiters/index.html — duplicate proof-case wrapper removed")


if __name__ == "__main__":
    main()
