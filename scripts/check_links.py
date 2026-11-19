#!/usr/bin/env python3
"""Checks the room links in data/badges.js, politely.

TryHackMe rate-limits GitHub's runners (HTTP 429). A link that answers 429 or
403 is "not checked", not broken. After several 429s in a row the check stops
early instead of waiting for hours. Only 404 and 410 fail the job.

    python3 -I scripts/check_links.py
"""
import pathlib, sys, time, urllib.error, urllib.request

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from safe_data import load_data

DEAD = {404, 410}
STOP_AFTER_429 = 5
DELAY = 1.0


def status(url):
    req = urllib.request.Request(url, method="GET", headers={"User-Agent": "thm-badge-finder link check"})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception as e:  # DNS, timeout, TLS: report, do not fail on one network hiccup
        return "error: %s" % type(e).__name__


def main():
    badges = load_data()[0]
    urls = sorted({r["url"].split("#")[0] for b in badges for r in b["rooms"]})
    print("%d unique links" % len(urls))
    dead, unchecked, streak = [], 0, 0
    for i, url in enumerate(urls):
        s = status(url)
        if s in DEAD:
            dead.append((url, s)); streak = 0
        elif s == 429:
            unchecked += 1; streak += 1
            if streak >= STOP_AFTER_429:
                print("::warning::TryHackMe is rate-limiting this runner (429); stopped after %d of %d links." % (i + 1, len(urls)))
                break
        elif not isinstance(s, int) or s >= 400:
            unchecked += 1; streak = 0
            print("not checked (%s): %s" % (s, url))
        else:
            streak = 0
        time.sleep(DELAY)
    for url, s in dead:
        print("::error::dead link (%s): %s" % (s, url))
    print("done: %d dead, %d not checked" % (len(dead), unchecked))
    return 1 if dead else 0


if __name__ == "__main__":
    sys.exit(main())
