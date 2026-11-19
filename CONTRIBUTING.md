# Contributing

Contributions come in as **issues and comments**. Pull requests are limited to
collaborators: the maintainer applies every change to `data/badges.js` after
checking it, so nothing from outside reaches the site without review.

## Report a wrong or missing badge
Open an issue with the **Fix a badge** template. Include the badge name exactly as TryHackMe shows it and the room URL that awarded it. The strongest proof is your own entry from `https://tryhackme.com/api/v2/public-profile/badges?username=<you>&limit=100` (it shows slug, title, description, image and the date), next to the room you finished right before it.

## Confirm a "needs verification" badge
If you earned a badge marked *needs verification*, comment on its issue (or open one) with the room that triggered it and your API entry.

## Try it locally
Fork it, edit `data/badges.js`, then check your change the same way CI does:

```bash
python3 -I scripts/safe_data.py        # the data must be plain data
python3 -I scripts/test_safe_data.py   # attack tests
python3 scripts/build.py --site https://bazeeza.github.io/thm-badge-finder/
```

Paste the result in your issue if it helps.

## Security
Never report a vulnerability in a public issue. See [SECURITY.md](SECURITY.md).

No walkthroughs, flags or redistributed artwork — this is an index, not a cheat sheet.
