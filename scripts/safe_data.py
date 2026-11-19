#!/usr/bin/env python3
"""Reads data/badges.js WITHOUT executing it, then validates every field.

Why: data/badges.js is loaded as a <script> by the site, so a contribution
that hides code in it would run in every visitor's browser. This reader
accepts only plain data (strings, numbers, booleans, arrays, objects)
assigned to a fixed list of globals; anything else is rejected.

    python scripts/safe_data.py      -> exit 0 if the file is safe, 1 otherwise
"""
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "badges.js"

ALLOWED_GLOBALS = ("BADGE_IMG_BASE", "BADGES", "OTHER_BADGES", "CATEGORIES", "SITE")
IMG_BASE = "https://assets.tryhackme.com/img/badges/"
BADGE_KEYS = {"slug", "name", "desc", "img", "category", "rooms", "note", "aliases", "verify"}
ROOM_KEYS = {"title", "url", "kind"}
ROOM_KINDS = {"room", "module", "path", "feature"}
RE_SLUG = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
RE_IMG = re.compile(r"^[A-Za-z0-9._-]+\.(?:png|svg|jpe?g|gif|webp)$")
RE_URL = re.compile(r"^https://tryhackme\.com/[A-Za-z0-9/_.\-?=&%#]*$")
RE_DANGER = re.compile(r"<|>|javascript:|data:|vbscript:|on[a-z]+\s*=", re.I)
# Text also goes into BADGES.md and the README: [ ] | ` \ could inject a
# Markdown link or break the table. Invisible and bidi characters can hide
# text from a reviewer ("Trojan Source"), so they are refused too.
RE_MARKDOWN = re.compile(r"[\[\]|`\\]")
RE_INVISIBLE = re.compile("[\x00-\x1f\x7f-\x9f\xad\u200b-\u200f\u2028-\u202e\u2060-\u2069\ufeff]")
MAX_TEXT = 600


class DataError(Exception):
    pass


# ----------------------------------------------------------------- parser --
class _Parser:
    """Tiny parser for the JS object-literal subset used by badges.js."""

    def __init__(self, text):
        self.s, self.i = text, 0

    def err(self, msg):
        line = self.s.count("\n", 0, self.i) + 1
        raise DataError("data/badges.js line %d: %s" % (line, msg))

    def ws(self):
        s = self.s
        while self.i < len(s):
            c = s[self.i]
            if c in " \t\r\n\ufeff":
                self.i += 1
            elif s.startswith("/*", self.i):
                end = s.find("*/", self.i + 2)
                if end < 0:
                    self.err("unclosed comment")
                self.i = end + 2
            elif s.startswith("//", self.i):
                # A JS line comment also ends at \r (and U+2028/U+2029, which
                # are refused for the whole file). Stopping only at \n would let
                # code hide "inside" a comment that the browser would execute.
                m = re.compile(r"[\r\n]").search(s, self.i)
                self.i = len(s) if m is None else m.end()
            else:
                break

    def eat(self, tok):
        self.ws()
        if not self.s.startswith(tok, self.i):
            self.err("expected %r, found %r" % (tok, self.s[self.i:self.i + 20]))
        self.i += len(tok)

    def ident(self):
        self.ws()
        m = re.compile(r"[A-Za-z_][A-Za-z0-9_]*").match(self.s, self.i)
        if not m:
            self.err("expected a name, found %r" % self.s[self.i:self.i + 20])
        self.i = m.end()
        return m.group(0)

    def string(self):
        q = self.s[self.i]
        self.i += 1
        out = []
        esc = {"n": "\n", "t": "\t", "r": "\r", "\\": "\\", "'": "'", '"': '"', "/": "/"}
        while True:
            if self.i >= len(self.s):
                self.err("unclosed string")
            c = self.s[self.i]
            if c == q:
                self.i += 1
                return "".join(out)
            if c == "\n":
                self.err("line break inside a string")
            if c == "\\":
                n = self.s[self.i + 1:self.i + 2]
                if n in esc:
                    out.append(esc[n]); self.i += 2; continue
                if n == "u" and re.match(r"[0-9a-fA-F]{4}", self.s[self.i + 2:self.i + 6]):
                    out.append(chr(int(self.s[self.i + 2:self.i + 6], 16))); self.i += 6; continue
                self.err("unsupported escape \\%s" % n)
            out.append(c)
            self.i += 1

    def value(self):
        self.ws()
        c = self.s[self.i:self.i + 1]
        if c in ('"', "'"):
            return self.string()
        if c == "[":
            self.i += 1
            arr = []
            while True:
                self.ws()
                if self.s.startswith("]", self.i):
                    self.i += 1; return arr
                arr.append(self.value())
                self.ws()
                if self.s.startswith(",", self.i):
                    self.i += 1
                elif not self.s.startswith("]", self.i):
                    self.err("expected ',' or ']'")
        if c == "{":
            self.i += 1
            obj = {}
            while True:
                self.ws()
                if self.s.startswith("}", self.i):
                    self.i += 1; return obj
                k = self.string() if self.s[self.i] in ('"', "'") else self.ident()
                if k in obj or k == "__proto__":
                    self.err("duplicate or forbidden key %r" % k)
                self.eat(":")
                obj[k] = self.value()
                self.ws()
                if self.s.startswith(",", self.i):
                    self.i += 1
                elif not self.s.startswith("}", self.i):
                    self.err("expected ',' or '}'")
        m = re.compile(r"-?\d+(?:\.\d+)?").match(self.s, self.i)
        if m:
            self.i = m.end(); return json.loads(m.group(0))
        for word, val in (("true", True), ("false", False), ("null", None)):
            if re.match(word + r"\b", self.s[self.i:]):
                self.i += len(word); return val
        self.err("only plain data is allowed here, found %r" % self.s[self.i:self.i + 30])

    def program(self):
        out = {}
        while True:
            self.ws()
            if self.i >= len(self.s):
                return out
            if self.ident() != "window":
                self.err("each statement must start with window.NAME =")
            self.eat(".")
            name = self.ident()
            if name not in ALLOWED_GLOBALS or name in out:
                self.err("global %r is not allowed (or set twice)" % name)
            self.eat("=")
            out[name] = self.value()
            self.eat(";")


# ------------------------------------------------------------- validation --
def _text(v, where, required=True):
    if v is None and not required:
        return
    if not isinstance(v, str) or (required and not v.strip()):
        raise DataError("%s: must be a non-empty string" % where)
    if len(v) > MAX_TEXT:
        raise DataError("%s: longer than %d characters" % (where, MAX_TEXT))
    if RE_DANGER.search(v):
        raise DataError("%s: contains HTML or script-like text: %r" % (where, v[:60]))
    if RE_MARKDOWN.search(v):
        raise DataError("%s: characters [ ] | ` \\ are not allowed: %r" % (where, v[:60]))
    if RE_INVISIBLE.search(v):
        raise DataError("%s: contains an invisible or control character" % where)


def validate(g):
    for name in ALLOWED_GLOBALS:
        if name not in g:
            raise DataError("window.%s is missing" % name)
    if g["BADGE_IMG_BASE"] != IMG_BASE:
        raise DataError("BADGE_IMG_BASE must stay %s" % IMG_BASE)

    cats = g["CATEGORIES"]
    if not isinstance(cats, dict):
        raise DataError("CATEGORIES must be an object")
    for k, c in cats.items():
        if not RE_SLUG.match(k) or not isinstance(c, dict) or set(c) != {"label"}:
            raise DataError("CATEGORIES.%s: bad entry" % k)
        _text(c["label"], "CATEGORIES.%s.label" % k)

    seen = set()
    for n, b in enumerate(g["BADGES"]):
        where = "BADGES[%d]" % n
        if not isinstance(b, dict) or not set(b) <= BADGE_KEYS:
            raise DataError("%s: unknown field(s) %s" % (where, sorted(set(b) - BADGE_KEYS)))
        slug = b.get("slug")
        if not isinstance(slug, str) or not RE_SLUG.match(slug) or slug in seen:
            raise DataError("%s: slug missing, invalid or duplicated: %r" % (where, slug))
        seen.add(slug)
        where = "badge %r" % slug
        _text(b.get("name"), where + ".name")
        _text(b.get("desc"), where + ".desc", required=False)
        _text(b.get("note"), where + ".note", required=False)
        if b.get("category") not in cats:
            raise DataError("%s: unknown category %r" % (where, b.get("category")))
        if "img" in b and not (isinstance(b["img"], str) and (b["img"] == "" or RE_IMG.match(b["img"]))):
            raise DataError("%s.img: must be a plain file name like name.png" % where)
        if "verify" in b and not isinstance(b["verify"], bool):
            raise DataError("%s.verify: must be true or false" % where)
        for a in b.get("aliases", []) if isinstance(b.get("aliases", []), list) else [None]:
            _text(a, where + ".aliases")
        rooms = b.get("rooms")
        if not isinstance(rooms, list):
            raise DataError("%s.rooms: must be a list" % where)
        for r in rooms:
            if not isinstance(r, dict) or not set(r) <= ROOM_KEYS or "url" not in r or "title" not in r:
                raise DataError("%s.rooms: each room needs title, url and kind only" % where)
            _text(r["title"], where + ".rooms.title")
            if not isinstance(r["url"], str) or not RE_URL.match(r["url"]):
                raise DataError("%s.rooms.url: only https://tryhackme.com/... links are allowed: %r" % (where, r["url"]))
            if r.get("kind", "room") not in ROOM_KINDS:
                raise DataError("%s.rooms.kind: must be one of %s" % (where, sorted(ROOM_KINDS)))

    for n, o in enumerate(g["OTHER_BADGES"]):
        where = "OTHER_BADGES[%d]" % n
        if not isinstance(o, dict) or set(o) != {"group", "how", "items"} or not isinstance(o["items"], list):
            raise DataError("%s: needs exactly group, how and items" % where)
        _text(o["group"], where + ".group"); _text(o["how"], where + ".how")
        for it in o["items"]:
            _text(it, where + ".items")

    site = g["SITE"]
    if not isinstance(site, dict) or set(site) != {"version", "updated"}:
        raise DataError("SITE: needs exactly version and updated")
    if not re.match(r"^\d{4}\.\d{1,2}\.\d{1,3}$", str(site["version"])) or not re.match(r"^\d{4}-\d{2}-\d{2}$", str(site["updated"])):
        raise DataError("SITE: bad version or date format")


def load_data():
    """Returns (badges, other, categories, site) after full validation."""
    return parse_text(DATA.read_text(encoding="utf-8"))


def parse_text(text):
    """Parses and validates the content of a badges.js file (used by the tests)."""
    # Whole-file check, comments included: no control, invisible or bidi
    # character anywhere (tab and line breaks only), so what a reviewer reads
    # is what the browser runs.
    m = RE_INVISIBLE.search(text.lstrip("\ufeff").replace("\r\n", "\n").replace("\t", " ").replace("\n", " "))
    if m:
        raise DataError("data/badges.js: invisible or control character U+%04X is not allowed" % ord(m.group(0)))
    g = _Parser(text).program()
    validate(g)
    return g["BADGES"], g["OTHER_BADGES"], g["CATEGORIES"], g["SITE"]


if __name__ == "__main__":
    try:
        b, o, c, s = load_data()
    except DataError as e:
        print("REJECTED: %s" % e)
        sys.exit(1)
    print("ok: data/badges.js is plain data (%d badges, %d room links)" % (len(b), sum(len(x["rooms"]) for x in b)))
