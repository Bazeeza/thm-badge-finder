# Changelog

All notable changes to the TryHackMe Badge Finder. Dates are the data version in `data/badges.js`.

## 2026.10.2 — 18 October 2026

The dataset now matches TryHackMe's full badge catalogue (138 badges, checked against a live profile's badge tab) instead of the 80 room badges of the original community list.

### Added
- 58 badges that were missing, including the whole SOC Level 1 module family (First Step into SOC, SOC Apprentice, Defensive Toolsmith, Network Hog, Web Defender, Windows Guardian, Linux Guardian, Malware Explorer, Lookup Champion), the SOC Level 2 module badges (MalBuster, APT X Hunter, Flow Hunter, Domain Guardian, M365 Sentry, SOC Level-Up), the AI Security badges (AI Path, Adversarial Defence Ops, Model Compromise, AI Odyssey), Web Application Pentesting badges (WAF Evasion, NoScopeRCE, Tooling Specialist), Advent of Cyber 2025 and its Side Quest (24 daily rooms + 4 side-quest rooms), the SOC Simulator badges, all seven leagues plus Chaos Reigns and League Locked Legend, the 3 / 1750 / 2000 day streaks, Raffle Royalty, Session Held, First Mobile Quiz, Study Group, Best Friends Forever, TryTrailMe, Alpha and Beta.
- TryHackMe's own one-line description on every badge where it is known (from the public profile-badges API).
- Official badge artwork loaded from TryHackMe's CDN, with a local-file and placeholder fallback.
- "Import from TryHackMe" in the tracker: type a username to tick every badge that profile holds.
- `desc` and `img` fields in the data model; `path` and `feature` link kinds; new categories AI security, SOC Simulator, Leagues, Streaks, Platform.
- `?q=` query parameter for pre-filled searches (used by the sitelinks search box markup).
- This changelog.

### Changed
- "Phishing" is now **Phish Hunter** (TryHackMe renamed it; same badge slug).
- **Wireshark** now points to the SOC Level 1 Wireshark rooms; Wireshark 101 is listed as the legacy trigger.
- **Boogeyman Slayer** lists the full SOC L1 capstone module (Tempest + Boogeyman 1–3).
- **3 Million Legend**: per TryHackMe's description, solving any one room of the module is enough (previously said all five).
- **The Return of the Yeti**: awarded for any one 2023 side-quest challenge; SNOW/OFF is for all four.
- **Changing Hats** lists both Atomic Bird rooms.
- Module badges now carry the module link first, then the rooms.
- Default sort is by category.

### Removed
- "Advent of Cyber 2" — no such badge exists on TryHackMe.

### Still to verify (14)
Tooling Specialist, WAF Evasion, MalBuster, APT X Hunter, Flow Hunter, Domain Guardian, M365 Sentry, SOC Level-Up, Completed a tabletop exercise (feature URL), First Mobile Quiz (feature URL), League Locked Legend, Study Group, Best Friends Forever, TryTrailMe. If you hold one, open an issue with your profile's badge API entry.

## 2026.10 — 5 October 2026

Initial release: 80 room badges from the r/tryhackme community list, cross-checked with thmrevenant's table; searchable site, category filters, progress tracker, SEO, GitHub Pages deployment, weekly link check.
