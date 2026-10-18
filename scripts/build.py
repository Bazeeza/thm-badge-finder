#!/usr/bin/env python3
"""
Regenerates the parts of the repo that mirror data/badges.js:

  BADGES.md          full Markdown table (what GitHub visitors see)
  sitemap.xml        one URL per badge anchor, for search engines
  README.md          only the block between <!-- BADGES:START --> and
                     <!-- BADGES:END --> is replaced

Usage:  python3 scripts/build.py --site https://bazeeza.github.io/thm-badge-finder/
Needs only the standard library.
"""
import argparse, json, re, datetime, pathlib, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent

def load_data():
    """Evaluate data/badges.js with Node if available, else a tolerant regex→JSON path."""
    js = (ROOT / "data" / "badges.js").read_text(encoding="utf-8")
    try:
        out = subprocess.run(
            ["node", "-e", "window={};" + js + ";process.stdout.write(JSON.stringify({b:window.BADGES,o:window.OTHER_BADGES,c:window.CATEGORIES,s:window.SITE}))"],
            capture_output=True, text=True, check=True)
        d = json.loads(out.stdout)
        return d["b"], d["o"], d["c"], d["s"]
    except Exception:
        # Fallback: strip comments, quote keys, convert to JSON.
        body = re.sub(r"/\*.*?\*/", "", js, flags=re.S)
        def grab(name):
            m = re.search(r"window\.%s\s*=\s*(\[.*?\]|\{.*?\});\s*$" % name, body, flags=re.S | re.M)
            txt = m.group(1)
            txt = re.sub(r"([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:", r'\1"\2":', txt)
            txt = re.sub(r",(\s*[}\]])", r"\1", txt)
            return json.loads(txt)
        return grab("BADGES"), grab("OTHER_BADGES"), grab("CATEGORIES"), grab("SITE")

def md_table(badges, cats):
    rows = ["| Badge | Category | Room(s) | Notes |", "|---|---|---|---|"]
    for b in sorted(badges, key=lambda x: x["name"].lower()):
        rooms = "<br>".join(f"[{r['title']}]({r['url']})" + (" *(module)*" if r.get("kind") == "module" else "") for r in b["rooms"]) or "—"
        note = (b.get("note") or "").replace("|", "\\|")
        if b.get("verify"):
            note = "**Needs verification.** " + note
        rows.append(f"| **{b['name']}** | {cats.get(b['category'], {}).get('label', b['category'])} | {rooms} | {note} |")
    return "\n".join(rows)

def md_other(other):
    out = []
    for g in other:
        out.append(f"**{g['group']}** — {g['how']}  \n" + ", ".join(g["items"]))
    return "\n\n".join(out)

def sitemap(site, badges, today):
    site = site.rstrip("/") + "/"
    urls = [f"  <url><loc>{site}</loc><lastmod>{today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>"]
    for b in badges:
        urls.append(f"  <url><loc>{site}#{b['slug']}</loc><lastmod>{today}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>")
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(urls) + "\n</urlset>\n"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", default="https://bazeeza.github.io/thm-badge-finder/")
    a = ap.parse_args()
    badges, other, cats, site_meta = load_data()
    today = site_meta.get("updated") or datetime.date.today().isoformat()

    table = md_table(badges, cats)
    (ROOT / "BADGES.md").write_text(
        "# All TryHackMe badges and their rooms\n\n"
        f"Generated from `data/badges.js` on {today}. Edit the data file, not this one.\n\n"
        + table + "\n\n## Badges with no room\n\n" + md_other(other) + "\n", encoding="utf-8")
    (ROOT / "sitemap.xml").write_text(sitemap(a.site, badges, today), encoding="utf-8")

    readme = ROOT / "README.md"
    if readme.exists():
        txt = readme.read_text(encoding="utf-8")
        new = re.sub(r"(<!-- BADGES:START -->).*?(<!-- BADGES:END -->)",
                     lambda m: m.group(1) + "\n" + table + "\n" + m.group(2), txt, flags=re.S)
        readme.write_text(new, encoding="utf-8")
    print(f"ok: {len(badges)} badges, {sum(len(b['rooms']) for b in badges)} room links")

if __name__ == "__main__":
    sys.exit(main())
