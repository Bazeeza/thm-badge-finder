# TryHackMe Badge Finder

**Every TryHackMe badge, and the exact room that unlocks it.**

Badge icons on TryHackMe profiles aren't clickable, so finding the room behind a badge means guessing or asking around. This repo is the lookup table the platform doesn't have: a fast, searchable site with every room badge, the room/module/series that awards it, and a progress tracker.

🔗 **Live site:** https://bazeeza.github.io/thm-badge-finder/

> Not affiliated with TryHackMe. Badge names and artwork belong to TryHackMe.

## What's on the site

- Searchable, filterable list of **70+ room badges** across Fundamentals, Web, Offensive, Defensive, DevSecOps, Security Engineering, Events and Series
- Notes on the gotchas (module badges that only trigger on the last room, series you must enrol in, old-vs-new rooms)
- A **progress tracker** (tick what you own, export/import, share text) — stored in your browser only
- Streak, league and competition badges that don't come from rooms
- A "didn't get the badge?" troubleshooting section and a suggested order
- Deep links to every badge (`/#blue`, `/#advent-of-cyber-2024`, …) for sharing in Discord/Reddit

---

## Deploy it in 10 minutes

1. **Create the repo.** On GitHub, create a public repository named `thm-badge-finder` (any name works, but keep it consistent with the URLs below).
2. **Upload the files.** Drag the contents of this folder into the repo (or `git push`). Keep the folder structure as-is.
3. **Replace `bazeeza`.** Search the repo for `bazeeza` and replace it with your GitHub username. It appears in `index.html`, `README.md`, `robots.txt`, `sitemap.xml`, `404.html` and the issue link.
4. **Turn on GitHub Pages.** Repo → *Settings* → *Pages* → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save. Your site goes live at `https://bazeeza.github.io/thm-badge-finder/` within a minute or two.
5. **Add the badge images** (see below). The site works without them — it shows a styled placeholder with the badge's initials — but the real artwork is what makes it pop.
6. **Rebuild the README table / sitemap** whenever you edit the data: `python3 scripts/build.py --site https://bazeeza.github.io/thm-badge-finder/`

Optional: add a custom domain (Settings → Pages → Custom domain) and put it in a `CNAME` file. Update `canonical`, `og:url`, `robots.txt` and `sitemap.xml` to match.

## Adding the badge images

The badge artwork is TryHackMe's, and their image URLs aren't stable enough to hotlink, so images live in the repo:

1. On TryHackMe, open any profile that has the badge (yours, or search the badge on the platform). Right-click the badge icon → *Save image as…*
2. Save it as **`assets/badges/<slug>.png`** where `<slug>` is the `slug` field in `data/badges.js`. Examples:
   - Blue → `assets/badges/blue.png`
   - cat linux.txt → `assets/badges/cat-linux-txt.png`
   - Advent of Cyber 2024 → `assets/badges/advent-of-cyber-2024.png`
3. Push. The site picks them up automatically; any missing file falls back to the placeholder.

The full slug list is in `assets/badges/README.md`. PNG with a transparent background around 200×200 px looks best inside the hexagon slot. If TryHackMe asks for the images to be removed, delete the folder — the site keeps working.

## Editing badges

Everything lives in **`data/badges.js`**. Each badge looks like this:

```js
{
  slug: "hash-cracker",                 // unique id + image file name
  name: "Hash Cracker",                 // exactly as shown on TryHackMe
  category: "offensive",                // fundamentals | web | offensive | defensive | devsecops | engineering | events | series | discontinued
  rooms: [
    { title: "Crack The Hash",          url: "https://tryhackme.com/room/crackthehash",       kind: "room" },
    { title: "Crack The Hash Level 2",  url: "https://tryhackme.com/room/crackthehashlevel2", kind: "room" }
  ],
  note: "Both rooms are required.",     // optional
  aliases: ["crackthehash"],            // optional, searchable
  verify: true                          // optional: flag it as unconfirmed
}
```

Then run `python3 scripts/build.py` to refresh `BADGES.md`, `sitemap.xml` and the table below. Bump `SITE.updated` / `SITE.version` at the bottom of the data file.

---

## Getting the site seen

A GitHub Pages site with no backlinks is invisible. Here's a realistic launch plan, in order.

### 1. Search engines (do this on day one)
- **Google Search Console:** add the property `https://bazeeza.github.io/thm-badge-finder/`, verify with the HTML-tag method (paste the tag in `<head>`), then *Sitemaps* → submit `sitemap.xml`. Use *URL Inspection → Request indexing* on the homepage.
- **Bing Webmaster Tools:** import from Search Console (one click) — Bing also feeds DuckDuckGo and ChatGPT search.
- The page already ships: descriptive `<title>` and meta description, Open Graph/Twitter cards, canonical URL, `robots.txt`, `sitemap.xml`, and JSON-LD (`WebSite`, `FAQPage`, `ItemList`). Don't stuff more keywords into the copy; Google ranks the page on the phrases people actually type, which are already in the headline and the description.

### 2. Target phrases (what people search)
Primary: `tryhackme badges`, `tryhackme badge rooms`, `how to get tryhackme badges`, `tryhackme badge list`
Long-tail (each badge card is a landing spot for these): `tryhackme blue badge`, `tryhackme hash cracker badge room`, `networking nerd badge tryhackme`, `advent of cyber 2024 badge`, `tryhackme sleuth badges`, `tryhackme series badges windcorp overpass`
Put the primary phrase in your repo description and topics too.

### 3. GitHub itself is a search engine
- Repo *About* description: "Every TryHackMe badge and the room that unlocks it — searchable list + progress tracker"
- Topics: `tryhackme`, `tryhackme-badges`, `cybersecurity`, `ctf`, `infosec`, `learning-resources`, `github-pages`
- Keep `BADGES.md` and the table below up to date — GitHub search and Google both index Markdown well, and people star repos they find useful.
- Add the site link to the *Website* field in the repo's About box.

### 4. Where TryHackMe users actually are
- **r/tryhackme** — post the link as an update to the original badge thread ("I turned the badge list into a searchable site"). Ask for corrections; that engagement is what makes it rank.
- **TryHackMe Discord** — `#resources` / `#general`. Don't spam; one post, then answer questions.
- **TryHackMe's own forum / community posts** and the *Lists of free rooms* repos on GitHub (open a PR adding your link to Hunterdii/TryHackMe-Roadmap and similar "awesome" lists — those backlinks matter).
- **LinkedIn / X** — short post with a screenshot of the grid. Tag TryHackMe; they occasionally reshare community tools.
- **Medium / dev.to** — a 600-word "How TryHackMe badges actually work (module vs series vs room)" article that links to the site. Articles rank for long-tail queries that a tool page can't.

### 5. Make it stick
- Add a line in the README of your own GitHub profile.
- Put a `?ref=reddit` style UTM on links you post, and check Search Console once a month for the queries you're appearing on — then make sure those badges have good notes.
- Every December, add the new Advent of Cyber badge the day it drops. Being first to list it is free traffic.

---

## Repo layout

```
index.html            the site (single page)
styles.css            design tokens + layout
app.js                search, filters, progress tracker, JSON-LD
data/badges.js        ← the only file you normally edit
assets/badges/        badge PNGs named by slug (see assets/badges/README.md)
assets/og-image.png   social preview card
assets/favicon.svg
BADGES.md             generated Markdown table
sitemap.xml           generated
robots.txt
404.html
scripts/build.py      regenerates BADGES.md, sitemap.xml and the README table
.github/workflows/links.yml      weekly dead-link check with lychee
.github/ISSUE_TEMPLATE/badge-fix.yml  structured "fix a badge" issue form
CONTRIBUTING.md
LICENSE               MIT for the code; badge artwork remains TryHackMe's
```

## Credits

- Original room list compiled by **PYROMANIA6** on r/tryhackme, with corrections from the comment thread.
- Cross-checked against **thmrevenant/tryhackme** `Badges.md`, which added Ice, Pentesting Principles, Security Awareness, Shield Apprentice, Red Teamer of the Month, Advent of Cyber 3 and the series badges.
- Site built by the community. PRs welcome.

---

## Badge table

<!-- BADGES:START -->
| Badge | Category | Room(s) | Notes |
|---|---|---|---|
| **/opt/m0th3r** | Web | [Mother's Secret](https://tryhackme.com/room/codeanalysis) |  |
| **3 Million Legend** | Events | [TryHack3M (module)](https://tryhackme.com/module/three-million-special) *(module)*<br>[TryHack3M: Bricks Heist](https://tryhackme.com/room/tryhack3mbricksheist)<br>[TryHack3M: Burg3r Bytes](https://tryhackme.com/room/burg3rbytes)<br>[TryHack3M: Sch3Ma D3Mon](https://tryhackme.com/room/sch3mad3mon)<br>[TryHack3M: Subscribe](https://tryhackme.com/room/subscribe)<br>[TryHack3M: TriCipher Summit](https://tryhackme.com/room/tryhack3mencryptionchallenge) | Complete every room of the 3-million-users celebration module. |
| **Act of Kindness** | Discontinued | — | Removed badge. Kept here for collectors who still display it. |
| **Advent of Cyber '25 Side Quest** | Events | [Advent of Cyber '25 Side Quest](https://tryhackme.com/room/adventofcyber25sidequest) | **Needs verification.** Badge name and room slug to be confirmed. |
| **Advent of Cyber 2** | Events | [Advent of Cyber 2 (2020)](https://tryhackme.com/room/adventofcyber2) | **Needs verification.** Badge existence for the 2020 event still needs confirmation from someone who completed it. |
| **Advent of Cyber 2023** | Events | [Advent of Cyber 2023](https://tryhackme.com/room/adventofcyber2023) |  |
| **Advent of Cyber 2024** | Events | [Advent of Cyber 2024](https://tryhackme.com/room/adventofcyber2024) |  |
| **Advent of Cyber 2025** | Events | [Advent of Cyber 2025](https://tryhackme.com/room/adventofcyber2025) | **Needs verification.** Room slug and badge name to be confirmed after the 2025 event. |
| **Advent of Cyber 3** | Events | [Advent of Cyber 3 (2021)](https://tryhackme.com/room/adventofcyber3) |  |
| **Advent of Cyber 4** | Events | [Advent of Cyber 4 (2022)](https://tryhackme.com/room/adventofcyber4) |  |
| **ADversary** | Offensive | [Compromising Active Directory (module)](https://tryhackme.com/module/hacking-active-directory) *(module)*<br>[Persisting Active Directory](https://tryhackme.com/room/persistingad) | Module badge — unlocks on Persisting Active Directory. |
| **Authentication Striker** | Web | [Hammer](https://tryhackme.com/room/hammer) |  |
| **Blue** | Offensive | [Blue](https://tryhackme.com/room/blue) | The classic EternalBlue box. One of the first badges most people earn. |
| **Boogeyman Slayer** | Defensive | [SOC Level 1 Capstone Challenges (module)](https://tryhackme.com/module/soclevel1-capstone) *(module)*<br>[Boogeyman 1](https://tryhackme.com/room/boogeyman1)<br>[Boogeyman 2](https://tryhackme.com/room/boogeyman2)<br>[Boogeyman 3](https://tryhackme.com/room/boogeyman3) | Awarded on Boogeyman 3. The three rooms form the SOC Level 1 capstone module. |
| **Burp'ed** | Web | [Burp Suite (module)](https://tryhackme.com/module/learn-burp-suite) *(module)*<br>[Burp Suite: Extensions](https://tryhackme.com/room/burpsuiteextensions) | Module badge — awarded when you complete Burp Suite: Extensions, the last room of the module. |
| **Calculated Risk** | Security engineering | [Risk Management](https://tryhackme.com/room/seriskmanagement) |  |
| **cat linux.txt** | Fundamentals | [Linux Fundamentals Part 1](https://tryhackme.com/room/linuxfundamentalspart1)<br>[Linux Fundamentals Part 2](https://tryhackme.com/room/linuxfundamentalspart2)<br>[Linux Fundamentals Part 3](https://tryhackme.com/room/linuxfundamentalspart3) | Awarded on completing the Linux Fundamentals trilogy — finish all three parts. |
| **Changing Hats** | Offensive | [Threat Emulation (module)](https://tryhackme.com/module/threat-emulation) *(module)*<br>[Atomic Bird Goes Purple #2](https://tryhackme.com/room/atomicbirdtwo) | Module badge — unlocks on Atomic Bird Goes Purple #2. |
| **Christmas 2019** | Events | [Advent of Cyber 1 (2019)](https://tryhackme.com/room/25daysofchristmas) |  |
| **Client-Side Champ** | Web | [Whats Your Name?](https://tryhackme.com/room/whatsyourname) |  |
| **Cyber Ready** | Security engineering | [Training Impact on Teams](https://tryhackme.com/room/training) |  |
| **Defrosted Five** | Events | [Advent of Cyber '24 Side Quest](https://tryhackme.com/room/adventofcyber24sidequest) | Submit all five side-quest flags in this room. |
| **Diplodocker** | DevSecOps | [Container Vulnerabilities](https://tryhackme.com/room/containervulnerabilitiesDG) |  |
| **Docker** | DevSecOps | [The Docker Rodeo](https://tryhackme.com/room/dockerrodeo) |  |
| **ELKsquisite** | Defensive | [Slingshot](https://tryhackme.com/room/slingshot) |  |
| **Filesystem Sleuth** | Defensive | [Diskrupt](https://tryhackme.com/room/diskrupt) |  |
| **Friday Fixer** | Defensive | [Friday Overtime](https://tryhackme.com/room/fridayovertime) |  |
| **Handle the Disgruntled** | Defensive | [Disgruntled](https://tryhackme.com/room/disgruntled) |  |
| **Hash Cracker** | Offensive | [Crack The Hash](https://tryhackme.com/room/crackthehash)<br>[Crack The Hash Level 2](https://tryhackme.com/room/crackthehashlevel2) | Both rooms are required. John The Ripper: The Basics does not award this badge even though the old room page suggested it. |
| **HoloLive** | Offensive | [Holo](https://tryhackme.com/room/hololive) | Full Active Directory network. Large, hard, and worth it. |
| **HTTP Smuggler** | Web | [El Bandito](https://tryhackme.com/room/elbandito) |  |
| **Ice** | Offensive | [Ice](https://tryhackme.com/room/ice) |  |
| **Intro to Web Hacking** | Web | [Intro to Web Hacking (module)](https://tryhackme.com/module/intro-to-web-hacking) *(module)*<br>[Command Injection](https://tryhackme.com/room/oscommandinjection) | Module badge — it unlocks on the module's final room, Command Injection. |
| **Introduction to Security Engineering** | Security engineering | [Security Engineer Intro](https://tryhackme.com/room/securityengineerintro) |  |
| **Intruder Alert** | Defensive | [SigHunt](https://tryhackme.com/room/sighunt) |  |
| **Investigations** | Series | [Investigating Windows](https://tryhackme.com/room/investigatingwindows)<br>[Investigating Windows 2.0](https://tryhackme.com/room/investigatingwindows2)<br>[Investigating Windows 3.x](https://tryhackme.com/room/investigatingwindows3) | Series badge. Enrol through Learn, then Practice, then Series — completing the rooms outside the series page may not count. |
| **Just have to deal with it** | Security engineering | [Cyber Crisis Management](https://tryhackme.com/room/cybercrisismanagement) |  |
| **Linux PrivEsc** | Offensive | [Linux PrivEsc](https://tryhackme.com/room/linuxprivesc)<br>[Linux PrivEsc Arena](https://tryhackme.com/room/linuxprivescarena) | Either room has been reported to award it; completing both is the safe route. |
| **Linux Sleuth** | Defensive | [IronShade](https://tryhackme.com/room/ironshade) |  |
| **Logging Legend** | Defensive | [Log Analysis (module)](https://tryhackme.com/module/log-analysis) *(module)*<br>[Intro to Log Analysis](https://tryhackme.com/room/introtologanalysis) | Module badge — the trigger room is Intro to Log Analysis. |
| **Mac Sleuth** | Defensive | [MacHunt](https://tryhackme.com/room/machunt) |  |
| **Malware Analysis** | Defensive | [Dynamic Analysis: Debugging](https://tryhackme.com/room/advanceddynamicanalysis) |  |
| **Manic Monday** | Defensive | [Monday Monitor](https://tryhackme.com/room/mondaymonitor) |  |
| **Memory Sleuth** | Defensive | [Supplemental Memory](https://tryhackme.com/room/supplementalmemory) |  |
| **Metasploitable** | Offensive | [Metasploit (module)](https://tryhackme.com/module/metasploit) *(module)*<br>[Metasploit: Meterpreter](https://tryhackme.com/room/meterpreter) | Module badge — unlocks on the final room, Metasploit: Meterpreter. |
| **Mr. Robot** | Offensive | [Mr Robot CTF](https://tryhackme.com/room/mrrobot) |  |
| **Network and System Security** | Security engineering | [Auditing and Monitoring](https://tryhackme.com/room/auditingandmonitoringse) |  |
| **Networking Nerd** | Fundamentals | [Network Fundamentals (module)](https://tryhackme.com/module/network-fundamentals) *(module)*<br>[Extending Your Network](https://tryhackme.com/room/extendingyournetwork) | Complete the whole Network Fundamentals module. The badge is granted when you finish its last room, Extending Your Network. |
| **OhSINT** | Offensive | [OhSINT](https://tryhackme.com/room/ohsint) |  |
| **Overpassed** | Series | [Overpass (series)](https://tryhackme.com/module/overpass) *(module)*<br>[Overpass](https://tryhackme.com/room/overpass)<br>[Overpass 2 - Hacked](https://tryhackme.com/room/overpass2hacked)<br>[Overpass 3 - Hosting](https://tryhackme.com/room/overpass3hosting) | Series badge. Enrol via Learn, Practice, Series. |
| **OWASP Top 10** | Web | [OWASP Top 10 - 2021](https://tryhackme.com/room/owasptop102021)<br>[OWASP Top 10 (original 2017 room)](https://tryhackme.com/room/owasptop10) | The 2021 room is the current one. The original room also awarded the badge for users who completed it before the refresh. |
| **Packet Master** | Defensive | [Network Security and Traffic Analysis (module)](https://tryhackme.com/module/network-security-and-traffic-analysis) *(module)*<br>[TShark Challenge II: Directory](https://tryhackme.com/room/tsharkchallengestwo) | Module badge — unlocks on the last room, TShark Challenge II. Reports say only the final four rooms of the module are needed. |
| **Pentester Tools** | Series | [Pentesting Tools (series)](https://tryhackme.com/module/pentestingtools) *(module)*<br>[Nmap](https://tryhackme.com/room/furthernmap)<br>[Metasploit: Introduction](https://tryhackme.com/room/metasploitintro)<br>[Burp Suite: The Basics](https://tryhackme.com/room/burpsuitebasics)<br>[John The Ripper: The Basics](https://tryhackme.com/room/johntheripperbasics)<br>[Nessus](https://tryhackme.com/room/rpnessusredux)<br>[Hydra](https://tryhackme.com/room/hydra) | Series badge. Enrol via Learn, Practice, Series. |
| **Pentesting Principles** | Fundamentals | [Principles of Security](https://tryhackme.com/room/principlesofsecurity) |  |
| **Phishing** | Defensive | [Phishing (module)](https://tryhackme.com/module/phishing) *(module)*<br>[The Greenholt Phish](https://tryhackme.com/room/phishingemails5fgjlzxc) | Module badge — unlocks on the final room, The Greenholt Phish. |
| **Pipeline Lieutenant** | DevSecOps | [CI/CD and Build Security](https://tryhackme.com/room/cicdandbuildsecurity) |  |
| **Red Teamer of the Month** | Offensive | [Red Team Capstone Challenge](https://tryhackme.com/room/redteamcapstonechallenge) |  |
| **Security Awareness** | Fundamentals | [Common Attacks](https://tryhackme.com/room/commonattacks) |  |
| **Shield Apprentice** | Defensive | [FlareVM: Arsenal of Tools](https://tryhackme.com/room/flarevmarsenaloftools) |  |
| **Skilled Navigator** | Defensive | [Eviction](https://tryhackme.com/room/eviction) | MITRE ATT&CK Navigator practice. |
| **SNOW/OFF** | Events | [Advent of Cyber '23 Side Quest](https://tryhackme.com/room/adventofcyber23sidequest) | Submit all four side-quest flags in this room. |
| **Software Security** | Security engineering | [OWASP API Security Top 10 - 1](https://tryhackme.com/room/owaspapisecuritytop105w)<br>[OWASP API Security Top 10 - 2](https://tryhackme.com/room/owaspapisecuritytop10d0) | The badge triggers on part 2; part 1 is listed as its prerequisite. |
| **SPLUNKing** | Defensive | [Splunk: Data Manipulation](https://tryhackme.com/room/splunkdatamanipulation) |  |
| **SQL Slayer** | Web | [Advanced SQL Injection](https://tryhackme.com/room/advancedsqlinjection) |  |
| **Sword Apprentice** | Web | [SQLMap: The Basics](https://tryhackme.com/room/sqlmapthebasics) |  |
| **System Sniffer** | Web | [File Inclusion, Path Traversal](https://tryhackme.com/room/filepathtraversal) |  |
| **Terminated!** | DevSecOps | [Intro to IaC](https://tryhackme.com/room/introtoiac) |  |
| **The Best Responder** | Defensive | [Lessons Learned](https://tryhackme.com/room/lessonslearned) |  |
| **The Course Awakens** | DevSecOps | [Introduction to DevSecOps](https://tryhackme.com/room/introductiontodevsecops) |  |
| **The Return of the Yeti** | Events | [Frosteau Busy with Vim](https://tryhackme.com/room/busyvimfrosteau)<br>[Snowy ARMageddon](https://tryhackme.com/room/armageddon2r)<br>[The Bandit Surfer](https://tryhackme.com/room/surfingyetiiscomingtotown)<br>[The Return of the Yeti](https://tryhackme.com/room/adv3nt0fdbopsjcap) | The four 2023 side-quest challenge rooms themselves. SNOW/OFF is the separate badge for submitting their flags. |
| **Threat Hunter** | Defensive | [Hunt Me I: Payment Collectors](https://tryhackme.com/room/paymentcollectors) |  |
| **Throwback** | Discontinued | — | The Throwback network was retired. The badge can no longer be earned; existing holders keep it. |
| **To benign or not benign?** | Defensive | [Benign](https://tryhackme.com/room/benign) |  |
| **Webbed** | Fundamentals | [HTTP in Detail](https://tryhackme.com/room/httpindetail) |  |
| **WindCorp** | Series | [WindCorp (series)](https://tryhackme.com/module/windcorp) *(module)*<br>[Ra](https://tryhackme.com/room/ra)<br>[Ra 2](https://tryhackme.com/room/ra2)<br>[Set](https://tryhackme.com/room/set)<br>[Osiris](https://tryhackme.com/room/osiris) | Series badge. Enrol via Learn, Practice, Series. |
| **Windows Priv Esc** | Offensive | [Privilege Escalation (module)](https://tryhackme.com/module/privilege-escalation) *(module)*<br>[Windows PrivEsc Arena](https://tryhackme.com/room/windowsprivescarena) | Module badge — unlocks on Windows PrivEsc Arena. |
| **Windows Sleuth** | Defensive | [Blizzard](https://tryhackme.com/room/blizzard) |  |
| **Wireshark** | Defensive | [Wireshark 101](https://tryhackme.com/room/wireshark) |  |
| **World Wide Web** | Fundamentals | [Putting it all together](https://tryhackme.com/room/puttingitalltogether) | Last room of the Web Fundamentals module (Pre Security path). |
| **Wreath** | Offensive | [Wreath](https://tryhackme.com/room/wreath) | Long network-pivoting room; expect several sessions. |
<!-- BADGES:END -->
