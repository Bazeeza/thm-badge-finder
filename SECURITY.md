# Security policy

[![Français](https://img.shields.io/badge/Langue-Français-3fe0a0?style=for-the-badge)](SECURITY.fr.md)
[![English](https://img.shields.io/badge/Language-English-2b9dff?style=for-the-badge)](SECURITY.md)

TryHackMe Badge Finder is a static site (HTML, CSS, JavaScript) on GitHub Pages.
There is no server, no login, no database and no cookie. Your progress is stored
only in your own browser.

Yes, this project is built for a community of hackers. It is meant to hold up.

## What is in place

**The site**
- Strict Content Security Policy: only the site's own scripts run. No inline
  script, no inline style, no `eval`, no plugins, no forms sent anywhere, no
  `<base>` hijacking. Images only from the site and TryHackMe's badge CDN;
  no network requests at all (`connect-src` is not allowed).
- Every piece of text is HTML-escaped before it is displayed.
- Links and images are checked again in the browser: only
  `https://tryhackme.com/...` links and plain image file names are used.
- Imported progress files and saved progress are untrusted: size-limited, and
  only the ids of real badges are kept.
- External links open with `rel="noopener noreferrer"`.

**The data (`data/badges.js`)**
- The file is never executed by the build tools. `scripts/safe_data.py` parses
  it as plain data and rejects code, HTML, `javascript:`/`data:` links,
  non-TryHackMe URLs, Markdown injection, prototype pollution and hidden
  characters (control, zero-width, bidi / "Trojan Source").
- `scripts/test_safe_data.py` runs attack payloads against that validator on
  every push and pull request.

**The repository**
- Only the maintainer can change the code. Pull requests are limited to
  collaborators; everyone else can open an issue and comment.
- `main` is protected against force-push and deletion.
- GitHub Actions: pinned to full commit SHAs, read-only token, no secrets,
  `pull_request` (never `pull_request_target`), time limits on every job.
- Secret scanning with push protection, Dependabot alerts and updates.

## Reporting a vulnerability

Please report privately, not in a public issue:

- **GitHub:** [Report a vulnerability](https://github.com/Bazeeza/thm-badge-finder/security/advisories/new)
  (private security advisory)
- **Email:** info@bazeeza.ca

Include the steps to reproduce and what an attacker would gain. You will get an
answer within 7 days. Valid reports are credited in the changelog if you want.
There is no bug bounty.

## Rules for testing

Welcome:
- Testing the site in your own browser, reading the source, running the
  validator and tests locally, trying payloads in a fork.

Not welcome:
- Attacking TryHackMe, GitHub, or other users. TryHackMe's API and CDN are not
  part of this project; report issues there to TryHackMe.
- Denial of service, spam, automated mass requests or social engineering.

Reports made in good faith under these rules will not lead to any complaint.

## Known limits

- GitHub Pages cannot send custom HTTP headers, so the CSP is set with a
  `<meta>` tag. `frame-ancestors` (anti-framing) cannot be set that way. The
  site has no account and no sensitive action, so framing it gains nothing.
- The Google Fonts stylesheet cannot use Subresource Integrity (Google changes
  the file per browser). Fonts are styling only and cannot run code under the CSP.
