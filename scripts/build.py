#!/usr/bin/env python3
"""Regenerates BADGES.md, sitemap.xml and the badge table of README.md and README.fr.md from data/badges.js."""
import argparse, re, datetime, pathlib, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
# Security: the data file is never executed (no node, no eval). safe_data parses it
# as plain data and rejects code, HTML, javascript: links and non-TryHackMe URLs.
from safe_data import load_data, DataError
def md_table(badges, cats):
    rows = ["| Badge | Category | Awarded by | Notes |", "|---|---|---|---|"]
    order = list(cats.keys())
    for b in sorted(badges, key=lambda x: (order.index(x["category"]) if x["category"] in order else 99, x["name"].lower())):
        rooms = "<br>".join(f"[{r['title']}]({r['url']})" + (f" *({r['kind']})*" if r.get("kind") in ("module", "path", "feature") else "") for r in b["rooms"]) or "—"
        note = (b.get("note") or "").replace("|", "\\|")
        if b.get("desc"): note = f"*\"{b['desc']}\"* {note}".strip()
        if b.get("verify"): note = "**Needs verification.** " + note
        img = f"<img src=\"https://assets.tryhackme.com/img/badges/{b['img']}\" width=\"36\" alt=\"\"> " if b.get("img") else ""
        rows.append(f"| {img}**{b['name']}** | {cats.get(b['category'], {}).get('label', b['category'])} | {rooms} | {note} |")
    return "\n".join(rows)
def md_other(other):
    return "\n\n".join(f"**{g['group']}** — {g['how']}  \n" + ", ".join(g["items"]) for g in other)
def sitemap(site, badges, today):
    site = site.rstrip("/") + "/"
    urls = [f"  <url><loc>{site}</loc><lastmod>{today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>"]
    urls += [f"  <url><loc>{site}#{b['slug']}</loc><lastmod>{today}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>" for b in badges]
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(urls) + "\n</urlset>\n"
def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--site", default="https://bazeeza.github.io/thm-badge-finder/"); a = ap.parse_args()
    try:
        badges, other, cats, site_meta = load_data()
    except DataError as e:
        print("REJECTED: %s" % e); return 1
    today = site_meta.get("updated") or datetime.date.today().isoformat()
    table = md_table(badges, cats)
    (ROOT / "BADGES.md").write_text("# All TryHackMe badges and their rooms\n\n" f"Generated from `data/badges.js` on {today}. Edit the data file, not this one.\n\n" + table + "\n\n## Badges with no room\n\n" + md_other(other) + "\n", encoding="utf-8")
    (ROOT / "sitemap.xml").write_text(sitemap(a.site, badges, today), encoding="utf-8")
    # Both language versions of the README carry the same generated table.
    for name in ("README.md", "README.fr.md"):
        readme = ROOT / name
        if readme.exists():
            txt = readme.read_text(encoding="utf-8")
            readme.write_text(re.sub(r"(<!-- BADGES:START -->).*?(<!-- BADGES:END -->)", lambda m: m.group(1) + "\n" + table + "\n" + m.group(2), txt, flags=re.S), encoding="utf-8")
    print(f"ok: {len(badges)} badges, {sum(len(b['rooms']) for b in badges)} room links")
if __name__ == "__main__": sys.exit(main())
