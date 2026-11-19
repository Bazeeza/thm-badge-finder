#!/usr/bin/env python3
"""Attack tests for scripts/safe_data.py.

Each case takes the real data/badges.js, plants one payload, and checks that
the validator refuses it. If one of these ever passes, the site is exposed.

    python3 -I scripts/test_safe_data.py
"""
import pathlib, sys, unittest

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from safe_data import DATA, DataError, parse_text

BASE = DATA.read_text(encoding="utf-8")
NAME = '"Hash Cracker"'  # a badge name present in the data
URL = '"https://tryhackme.com/room/'  # start of a real room link


def plant(old, new):
    assert old in BASE, "test fixture not found: %r" % old
    return BASE.replace(old, new, 1)


ATTACKS = {
    # code execution in the browser (badges.js is loaded as a <script>)
    "code after a statement": BASE + "\nalert(1);\n",
    "code as a value": BASE.replace("window.SITE =", "window.SITE = alert(1) ||", 1),
    "function call in data": plant(NAME, "String(1)"),
    "template literal": plant(NAME, "`x${alert(1)}`"),
    "unknown global": BASE + '\nwindow.location = "https://evil.example";\n',
    "global set twice": BASE + '\nwindow.SITE = {"version": "2026.1.1", "updated": "2026-01-01"};\n',
    "code hidden after \\r in a comment": BASE + "\n// note\ralert(1)\n",
    "code hidden after U+2028 in a comment": BASE + "\n// note\u2028alert(1)\n",
    "unclosed block comment": BASE + "\n/* alert(1)",
    "prototype pollution": plant("window.SITE = {", 'window.SITE = {"__proto__": {"x": 1}, '),
    # HTML / XSS in text
    "script tag": plant(NAME, '"<script>alert(1)</script>"'),
    "img onerror": plant(NAME, '"<img src=x onerror=alert(1)>"'),
    "event handler text": plant(NAME, '"x onmouseover=alert(1)"'),
    "escaped tag": plant(NAME, '"\\u003cscript\\u003e"'),
    "javascript url in text": plant(NAME, '"javascript:alert(1)"'),
    # links and images
    "javascript url": plant(URL, '"javascript:alert(1)//'),
    "other domain": plant(URL, '"https://evil.example/room/'),
    "look-alike domain": plant(URL, '"https://tryhackme.com.evil.example/room/'),
    "http downgrade": plant(URL, '"http://tryhackme.com/room/'),
    "quote breakout in url": plant(URL, '"https://tryhackme.com/room/x\\" onclick=\\"alert(1)'),
    "image path traversal": plant('img: "', 'img: "../../evil.svg?'),
    "image base changed": BASE.replace('window.BADGE_IMG_BASE = "https://assets.tryhackme.com/img/badges/"',
                                       'window.BADGE_IMG_BASE = "https://evil.example/"', 1),
    # Markdown injection (BADGES.md, README) and hidden text
    "markdown link": plant(NAME, '"x](https://evil.example) [y"'),
    "table breakout": plant(NAME, '"x | y"'),
    "bidi override": plant(NAME, '"Hash \u202eCracker"'),
    "zero-width space": plant(NAME, '"Hash\u200bCracker"'),
    "bidi in a comment": plant("window.SITE", "/* \u202e */ window.SITE"),
    "text too long": plant(NAME, '"' + "A" * 700 + '"'),
}


class AttackTests(unittest.TestCase):
    def test_real_data_is_accepted(self):
        parse_text(BASE)

    def test_every_attack_is_rejected(self):
        for name, text in ATTACKS.items():
            with self.subTest(attack=name):
                with self.assertRaises(DataError):
                    parse_text(text)


if __name__ == "__main__":
    unittest.main(verbosity=1)
