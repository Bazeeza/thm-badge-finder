# Contributing

## Report a wrong or missing badge
Open an issue with the **Fix a badge** template. Include the badge name exactly as TryHackMe shows it and the room URL that awarded it. The strongest proof is your own entry from `https://tryhackme.com/api/v2/public-profile/badges?username=<you>&limit=100` (it shows slug, title, description, image and the date), next to the room you finished right before it.

## Edit the data yourself
1. Fork and edit `data/badges.js` only. Follow the existing shape (see README → *Editing badges*). Use `https://tryhackme.com/room/<slug>` URLs without `/r/`.
2. If a badge entry already exists with `verify: true` and you can confirm it, remove the flag and say in the PR how you confirmed it.
3. Set `img` to the file name from the badge API's image URL when you know it.
4. Run `python3 scripts/build.py --site https://bazeeza.github.io/thm-badge-finder/` so `BADGES.md`, `sitemap.xml` and the README table stay in sync.
5. Open a pull request, one badge per PR when possible.

No walkthroughs, flags or redistributed artwork — this is an index, not a cheat sheet.
