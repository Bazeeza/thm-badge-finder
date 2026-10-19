# Update post (for r/tryhackme, Discord, LinkedIn)

Copy whichever version fits the channel. Replace nothing — links are already live.

---

## Reddit (r/tryhackme) — reply in the original badge thread or new post

**Title:** I turned the "links to all badge rooms" list into a searchable site — now covers all 138 badges

A while ago PYROMANIA6 posted the list of rooms behind each badge, because badge icons on profiles aren't clickable. I took that list, cross-checked it against the badge table in thmrevenant's repo and against TryHackMe's public badge API, and built a site around it:

https://bazeeza.github.io/thm-badge-finder/

What's there now:

- All 138 badges that exist on the platform today (the original list had ~80), each with the room, module, path or feature that awards it, plus TryHackMe's own badge description and the official icon.
- The whole SOC Level 1 family mapped module by module (First Step into SOC → Boogeyman Slayer), the SOC Level 2 module badges, AI Security, Web App Pentesting (WAF Evasion, NoScopeRCE, Model Compromise), Advent of Cyber 2025 and its side quest, SOC Simulator, leagues, streaks.
- Fixes to the old list: "Phishing" is now Phish Hunter; Wireshark comes from the SOC L1 Wireshark rooms (Wireshark 101 is legacy); there is no "Advent of Cyber 2" badge; 3 Million Legend needs only one room per TryHackMe's own text.
- A tracker: tick what you own, or type your username and it imports your public badge list. Stored in your browser only.

14 badges are still marked "needs verification" (mostly the SOC L2 module badges like MalBuster, APT X Hunter, Flow Hunter, Domain Guardian, M365 Sentry, plus Tooling Specialist and a few platform ones). If you hold one, the entry from `https://tryhackme.com/api/v2/public-profile/badges?username=YOU&limit=100` is all I need to confirm it — comment or open an issue on the repo.

Repo (MIT, PRs welcome): https://github.com/bazeeza/thm-badge-finder

---

## Discord (#resources) — short

Made a lookup site for TryHackMe badges → room: https://bazeeza.github.io/thm-badge-finder/
All 138 badges, official descriptions + icons, search, filters, and a tracker that can import your public badge list by username. 14 are still flagged "needs verification" — if you have MalBuster / APT X Hunter / Flow Hunter / Domain Guardian / M365 Sentry / Tooling Specialist, tell me which room gave it to you. Repo: github.com/bazeeza/thm-badge-finder

---

## LinkedIn / X

Shipped v2 of TryHackMe Badge Finder: every one of the platform's 138 badges mapped to the room, module or feature that awards it, with official descriptions and artwork, plus a tracker that imports your public badge list.

Built from the r/tryhackme community list, thmrevenant's table and TryHackMe's public badge API. Static site on GitHub Pages, MIT, one data file to edit.

https://bazeeza.github.io/thm-badge-finder/

#TryHackMe #cybersecurity #blueteam #SOC

---

## Changelog summary (for the GitHub release notes)

Paste the "2026.10.2" section of CHANGELOG.md.
