# Contributing

Thanks for helping keep the list accurate. Two ways to help:

## Report a wrong or missing badge
Open an issue using the **Fix a badge** template. Include the badge name exactly as TryHackMe shows it and the room URL that awarded it to you. A screenshot of the badge on your profile next to the completed room is ideal.

## Edit the data yourself
1. Fork the repo and edit `data/badges.js` only.
2. Follow the existing shape (see README → *Editing badges*). Use `https://tryhackme.com/room/<slug>` URLs without the `/r/` prefix.
3. If you're not 100% sure, set `verify: true` and say why in `note`.
4. Run `python3 scripts/build.py` so `BADGES.md`, `sitemap.xml` and the README table stay in sync.
5. Open a pull request. One badge per PR is easiest to review.

Please don't add badge artwork you don't have the right to redistribute, and don't add walkthroughs or flags — this is an index, not a cheat sheet.
