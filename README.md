<div align="center">

<img src="assets/og-image.png" alt="TryHackMe Badge Finder" width="720">

# TryHackMe Badge Finder

**Every TryHackMe badge, and the exact room that unlocks it.**

[![Live site](https://img.shields.io/badge/live%20site-bazeeza.github.io-E0B45A?style=flat-square)](https://bazeeza.github.io/thm-badge-finder/)
[![Badges indexed](https://img.shields.io/badge/badges-138-141821?style=flat-square)](#badge-table)
[![Room links](https://img.shields.io/badge/room%20links-200%2B-141821?style=flat-square)](BADGES.md)
[![Link check](https://img.shields.io/github/actions/workflow/status/bazeeza/thm-badge-finder/links.yml?label=room%20links%20valid&style=flat-square)](https://github.com/bazeeza/thm-badge-finder/actions/workflows/links.yml)
[![Last commit](https://img.shields.io/github/last-commit/bazeeza/thm-badge-finder?style=flat-square)](https://github.com/bazeeza/thm-badge-finder/commits/main)
[![License: MIT](https://img.shields.io/badge/license-MIT-2E3749?style=flat-square)](LICENSE)

</div>

---

## Why this exists

On TryHackMe, badge icons on a profile are not clickable. If you see a badge you want, there is no built-in way to find the room that awards it — you search the platform, guess, or ask on Discord. Several badges also have traps: the room was renamed, the badge moved to a newer version of the room, or it only triggers on the last room of a module.

This project is the lookup table TryHackMe does not provide: a static, searchable site that maps **all 138 TryHackMe badges** to the room, module, path or platform feature that awards them, with TryHackMe's own badge descriptions, the official artwork, notes on how each is really triggered, and a progress tracker.

> Not affiliated with TryHackMe. Badge names and artwork belong to TryHackMe.

## Project overview

| Element | Description |
|---|---|
| **Subject** | A searchable index of all 138 TryHackMe badges, each linked to the room(s), module, path or feature that awards it. |
| **Owner / maintainer** | **bazeeza** |
| **Goal** | Let any TryHackMe user find, in under ten seconds, which room to complete for a given badge — and track which badges they already own. |
| **Audience** | TryHackMe users of every level, from Pre Security to Red Team path; anyone building a badge collection. |
| **Channel** | Public GitHub repository, published with GitHub Pages at `https://bazeeza.github.io/thm-badge-finder/`. |
| **Format** | Static site (HTML, CSS, vanilla JavaScript) driven by one data file. No backend, no build step required to run. |
| **Language** | English. |
| **Status** | Live, community-maintained. v2 (October 2026): full catalogue, official descriptions and artwork. 14 badges flagged *needs verification* are awaiting confirmation from a holder. |
| **Licence** | MIT for the code and data. Badge artwork remains the property of TryHackMe. |

## What the site does

| Feature | Detail |
|---|---|
| Search | Press `/` and type a badge name, a room name, or part of a room URL. |
| Filters | Fundamentals, Web, Offensive, Defensive, AI security, DevSecOps, Security engineering, Events, Series, SOC Simulator, Leagues, Streaks, Platform, Discontinued. |
| Badge cards | Official badge art, TryHackMe's badge description, the room links, the kind of link (room, module, path, feature), and a note on gotchas. |
| Progress tracker | Tick a badge as earned, or type a TryHackMe username to import its public badge list. Progress is stored in your browser only; export, import and share text are built in. |
| Deep links | Every badge has a permanent anchor, e.g. `/#blue`, `/#hash-cracker`, for sharing on Discord or Reddit. |
| Non-room badges | SOC Simulator, streaks, weekly leagues (Bronze to Sapphire, Chaos Reigns), King, Monthly Hacker, mobile app, events — all trackable. |
| Guidance | How module and series badges really trigger, a suggested order, and a "didn't get the badge?" checklist. |

## How it is built

```mermaid
flowchart LR
    D[("data/badges.js<br/>single source of truth")]
    D --> H["index.html + app.js<br/>search · filters · tracker"]
    D --> B["scripts/build.py"]
    B --> T["BADGES.md<br/>Markdown table"]
    B --> S["sitemap.xml"]
    B --> R["README badge table"]
    H --> P["GitHub Pages"]
    I["assets.tryhackme.com<br/>official badge art"] --> H
    L["assets/badges/*.png<br/>local fallback"] --> H
    A["TryHackMe public<br/>badge API"] -. descriptions .-> D
    W["GitHub Action<br/>weekly link check"] --> D
```

**One file to edit.** Every badge lives in `data/badges.js`. The site reads it directly in the browser; the build script turns the same file into the Markdown table, the sitemap and this README's table, so the three never drift apart.

```js
{
  slug: "hash-cracker",                 // unique id + image file name
  name: "Hash Cracker",                 // exactly as shown on TryHackMe
  category: "offensive",
  rooms: [
    { title: "Crack The Hash",         url: "https://tryhackme.com/room/crackthehash",       kind: "room" },
    { title: "Crack The Hash Level 2", url: "https://tryhackme.com/room/crackthehashlevel2", kind: "room" }
  ],
  note: "Both rooms are required.",     // optional
  aliases: ["crackthehash"],            // optional, searchable
  verify: true                          // optional: flag it as unconfirmed
}
```

## How a visitor uses it

```mermaid
flowchart TD
    A([Sees a badge on a profile]) --> B[Opens the Badge Finder]
    B --> C{Search or filter}
    C --> D[Badge card]
    D --> E[Opens the room on TryHackMe]
    E --> F[Completes the room]
    F --> G[Ticks the badge as earned]
    G --> H[Exports or shares progress]
    D -. wrong or missing? .-> I[Opens an issue / PR]
    I --> J[data/badges.js updated]
    J --> B
```

## How badges are awarded

```mermaid
flowchart LR
    subgraph Room["Single room"]
        R1[Complete every task] --> R2[Badge appears]
    end
    subgraph Module["Module badge"]
        M1[Finish all earlier rooms] --> M2[Finish the last room] --> M3[Badge appears]
    end
    subgraph Series["Series badge"]
        S1[Enrol via Learn → Practice → Series] --> S2[Complete every room inside the series page] --> S3[Badge appears]
    end
```

The three paths are not interchangeable: completing the last room of a module without the earlier ones, or completing series rooms outside the series page, usually does **not** award the badge. Each card on the site says which path applies.

## Repository layout

```
thm-badge-finder/
├── index.html                     the site (single page)
├── styles.css                     design tokens and layout
├── app.js                         search, filters, progress tracker, JSON-LD
├── data/
│   └── badges.js                  ← the only file you normally edit
├── assets/
│   ├── badges/                    badge PNGs named by slug (see assets/badges/README.md)
│   ├── og-image.png               social preview card
│   └── favicon.svg
├── scripts/
│   └── build.py                   regenerates BADGES.md, sitemap.xml and the README table
├── .github/
│   ├── workflows/links.yml        weekly dead-link check (lychee)
│   └── ISSUE_TEMPLATE/badge-fix.yml  structured "fix a badge" form
├── BADGES.md                      generated Markdown table
├── sitemap.xml                    generated
├── robots.txt
├── 404.html
├── CONTRIBUTING.md
└── LICENSE
```

## Run it locally

No dependencies. Clone and open `index.html` in a browser, or serve the folder:

```bash
git clone https://github.com/bazeeza/thm-badge-finder.git
cd thm-badge-finder
python3 -m http.server 8000     # then open http://localhost:8000
```

After editing `data/badges.js`:

```bash
python3 scripts/build.py --site https://bazeeza.github.io/thm-badge-finder/
```

## Badge artwork

Cards load the official artwork straight from TryHackMe's badge CDN (`https://assets.tryhackme.com/img/badges/<file>`), the same URLs TryHackMe's own profile pages use, so nothing is redistributed by this repo. If a CDN image fails, the site tries `assets/badges/<slug>.png`, then shows a placeholder with the badge's initials.

19 badges have no known CDN file yet (the five Sleuth badges, MalBuster, Flow Hunter, APT X Hunter, M365 Sentry, Domain Guardian, Tooling Specialist, SOC Level-Up, League Locked Legend, Study Group, Best Friends Forever, TryTrailMe, Alpha, Beta, Monthly Hacker). To fill one in, either find its file name through the public badge API of a user who holds it (see below) and set `img`, or drop a PNG at `assets/badges/<slug>.png`.

## The data source: TryHackMe's public badge API

Room pages no longer say which badge they award — that text is loaded client-side — but TryHackMe exposes every user's badge list publicly:

```
https://tryhackme.com/api/v2/public-profile/badges?username=<user>&page=1&limit=100
```

Each entry carries the badge slug, title, official description, image URL and the date it was earned. That is where the descriptions and image file names in `data/badges.js` come from, and the earn-date order on a user who followed a path end to end is how the SOC Level 1 module badges were mapped to their modules. If you earn a badge that is marked *needs verification*, your own entry from that URL is all we need to confirm it.

## Roadmap

| Stage | Scope | Status |
|---|---|---|
| 1 | Data model, site, search, filters, tracker, deploy to Pages | Done |
| 2 | Official badge artwork via TryHackMe's CDN, local fallback for the 19 without a known file | Done |
| 3 | Confirm the 14 *needs verification* entries (SOC Level 2 module badges, Tooling Specialist, WAF Evasion, platform badges) | Open |
| 4 | Submit to Google Search Console and Bing; post on r/tryhackme and the TryHackMe Discord | Open |
| 5 | Per-badge difficulty and estimated time, sourced from the community | Idea |
| 6 | Nightly Action that diffs the public badge API against the dataset and opens an issue for new badges | Idea |

## Contributing

```mermaid
flowchart LR
    A[Spot a wrong or missing badge] --> B{How do you want to help?}
    B -->|Quick| C[Open an issue with the<br/>"Fix a badge" template]
    B -->|Full| D[Fork → edit data/badges.js]
    D --> E[Run scripts/build.py]
    E --> F[Pull request, one badge per PR]
    C --> G[Maintainer verifies and updates]
    F --> G
```

See [CONTRIBUTING.md](CONTRIBUTING.md). Please do not add walkthroughs, flags, or artwork you do not have the right to redistribute — this is an index, not a cheat sheet.

## Changelog

See [CHANGELOG.md](CHANGELOG.md). Latest: **2026.10.2** — full 138-badge catalogue, official descriptions and artwork, import-from-username.

## Credits

- Original room list compiled by **PYROMANIA6** on r/tryhackme, with corrections from the comment thread.
- Cross-checked against **thmrevenant/tryhackme** `Badges.md`, which contributed Ice, Pentesting Principles, Security Awareness, Shield Apprentice, Red Teamer of the Month, Advent of Cyber 3 and the series badges.
- Official badge descriptions, artwork URLs and the SOC path mappings come from TryHackMe's public profile-badges API and path outlines.
- Built and maintained by **bazeeza**.

---

## Badge table

Generated from `data/badges.js`. The same data, with notes, is on the [live site](https://bazeeza.github.io/thm-badge-finder/) and in [BADGES.md](BADGES.md).

<!-- BADGES:START -->
| Badge | Category | Awarded by | Notes |
|---|---|---|---|
| <img src="https://assets.tryhackme.com/img/badges/linux.png" width="36" alt=""> **cat linux.txt** | Fundamentals | [Linux Fundamentals Part 1](https://tryhackme.com/room/linuxfundamentalspart1)<br>[Linux Fundamentals Part 2](https://tryhackme.com/room/linuxfundamentalspart2)<br>[Linux Fundamentals Part 3](https://tryhackme.com/room/linuxfundamentalspart3) | *"Being competent in Linux"* Awarded on finishing the Linux Fundamentals trilogy. |
| <img src="https://assets.tryhackme.com/img/badges/networkfundamentals.png" width="36" alt=""> **Networking Nerd** | Fundamentals | [Network Fundamentals (module)](https://tryhackme.com/module/network-fundamentals) *(module)*<br>[Extending Your Network](https://tryhackme.com/room/extendingyournetwork) | *"Completing the 'Network Fundamentals' module"* Module badge. Finish every room; it unlocks on the last one, Extending Your Network. |
| <img src="https://assets.tryhackme.com/img/badges/introtooffensivesecurity.png" width="36" alt=""> **Pentesting Principles** | Fundamentals | [Introduction to Pentesting (module)](https://tryhackme.com/module/introduction-to-pentesting) *(module)*<br>[Principles of Security](https://tryhackme.com/room/principlesofsecurity) | *"Completing the 'Introduction to Pentesting' module"* Module badge; Principles of Security is the room that triggers it. |
| <img src="https://assets.tryhackme.com/img/badges/securityawareness.png" width="36" alt=""> **Security Awareness** | Fundamentals | [Security Awareness (module)](https://tryhackme.com/module/security-awareness) *(module)*<br>[Common Attacks](https://tryhackme.com/room/commonattacks) | *"Completing the cyber security awareness module"* Module badge; Common Attacks is the room that triggers it. |
| <img src="https://assets.tryhackme.com/img/badges/webbed.png" width="36" alt=""> **Webbed** | Fundamentals | [HTTP in Detail](https://tryhackme.com/room/httpindetail) | *"Understands how the world wide web works"* |
| <img src="https://assets.tryhackme.com/img/badges/howthewebworks.png" width="36" alt=""> **World Wide Web** | Fundamentals | [How The Web Works (module)](https://tryhackme.com/module/how-the-web-works) *(module)*<br>[Putting it all together](https://tryhackme.com/room/puttingitalltogether) | *"Completing the 'How The Web Works' module"* Module badge from the Pre Security path. Triggers on the last room, Putting it all together. |
| <img src="https://assets.tryhackme.com/img/badges/authentication.png" width="36" alt=""> **Authentication Striker** | Web | [Hammer](https://tryhackme.com/room/hammer) | *"Used the Hammer to bypass authentication"* |
| <img src="https://assets.tryhackme.com/img/badges/burpsuite.png" width="36" alt=""> **Burp'ed** | Web | [Burp Suite (module)](https://tryhackme.com/module/learn-burp-suite) *(module)*<br>[Burp Suite: Extensions](https://tryhackme.com/room/burpsuiteextensions) | *"Completing the Burp Suite module"* Module badge; unlocks on the last room, Burp Suite: Extensions. |
| <img src="https://assets.tryhackme.com/img/badges/clientsideattack.png" width="36" alt=""> **Client-Side Champ** | Web | [Whats Your Name?](https://tryhackme.com/room/whatsyourname) | *"Successfully exploited client-side vulnerabilities"* |
| <img src="https://assets.tryhackme.com/img/badges/httprequestsmuggling.png" width="36" alt=""> **HTTP Smuggler** | Web | [El Bandito](https://tryhackme.com/room/elbandito) | *"Finished the El Bandito challenge"* |
| <img src="https://assets.tryhackme.com/img/badges/introtowebsecurity.png" width="36" alt=""> **Intro to Web Hacking** | Web | [Intro to Web Hacking (module)](https://tryhackme.com/module/intro-to-web-hacking) *(module)*<br>[Command Injection](https://tryhackme.com/room/oscommandinjection) | *"Completing the 'Introduction to Web Hacking' module"* Module badge; unlocks on the final room, Command Injection. |
| <img src="https://assets.tryhackme.com/img/badges/noscoperce.svg" width="36" alt=""> **NoScopeRCE** | Web | [NoScope: Finding RCE](https://tryhackme.com/room/noscoperce) | *"Completing the NoScopeRCE room"* Part of the Custom Tooling module, but the badge is tied to this single room. |
| <img src="https://assets.tryhackme.com/img/badges/owasptop10.png" width="36" alt=""> **OWASP Top 10** | Web | [OWASP Top 10 - 2021](https://tryhackme.com/room/owasptop102021)<br>[OWASP Top 10 (original 2017 room)](https://tryhackme.com/room/owasptop10) | *"Understanding every OWASP vulnerability"* The 2021 room is the current trigger. The original room also awarded it before the refresh. |
| <img src="https://assets.tryhackme.com/img/badges/injection.png" width="36" alt=""> **SQL Slayer** | Web | [Advanced SQL Injection](https://tryhackme.com/room/advancedsqlinjection) | *"Conquered Advanced SQL Injection"* |
| <img src="https://assets.tryhackme.com/img/badges/swordapprentice.png" width="36" alt=""> **Sword Apprentice** | Web | [SQLMap: The Basics](https://tryhackme.com/room/sqlmapthebasics) | *"Completing the SQLMap room"* |
| <img src="https://assets.tryhackme.com/img/badges/serversideattack.png" width="36" alt=""> **System Sniffer** | Web | [File Inclusion, Path Traversal](https://tryhackme.com/room/filepathtraversal) | *"Completed the File Path traversal room"* |
| **Tooling Specialist** | Web | [Custom Tooling (module)](https://tryhackme.com/module/custom-tooling) *(module)*<br>[Custom Tooling Using Python](https://tryhackme.com/room/customtoolingpython)<br>[Custom Tooling using Burp](https://tryhackme.com/room/customtoolingviaburp)<br>[Tooling via Browser Automation](https://tryhackme.com/room/customtoolingviabrowserautomation)<br>[NoScope: Finding RCE](https://tryhackme.com/room/noscoperce)<br>[CAPTCHApocalypse](https://tryhackme.com/room/captchapocalypse) | **Needs verification.** Most likely the module badge for Custom Tooling (Web Application Pentesting path). Not yet confirmed by a holder. |
| <img src="https://assets.tryhackme.com/img/badges/web-application-3.png" width="36" alt=""> **WAF Evasion** | Web | [Bypassing WAF (module)](https://tryhackme.com/module/bypassingwaf) *(module)*<br>[WAF: Introduction](https://tryhackme.com/room/wafintroduction)<br>[WAF: Exploitation Techniques](https://tryhackme.com/room/wafexploitationtechniques)<br>[Padelify](https://tryhackme.com/room/padelify)<br>[Farewell](https://tryhackme.com/room/farewell) | **Needs verification.** *"Skilled in bypassing WAF"* Module badge for the Bypassing WAF module (Web Application Pentesting path). Mapping inferred from the badge description; confirm which room triggers it. |
| <img src="https://assets.tryhackme.com/img/badges/attackingad.png" width="36" alt=""> **ADversary** | Offensive | [Compromising Active Directory (module)](https://tryhackme.com/module/hacking-active-directory) *(module)*<br>[Persisting Active Directory](https://tryhackme.com/room/persistingad) | *"Completing all Active Directory networks"* Module badge; unlocks on Persisting Active Directory. |
| <img src="https://assets.tryhackme.com/img/badges/blue.png" width="36" alt=""> **Blue** | Offensive | [Blue](https://tryhackme.com/room/blue) | *"Hacking into Windows via EternalBlue"* The classic EternalBlue box. Usually the first badge people earn. |
| <img src="https://assets.tryhackme.com/img/badges/threatemulation.png" width="36" alt=""> **Changing Hats** | Offensive | [Threat Emulation (module)](https://tryhackme.com/module/threat-emulation) *(module)*<br>[Atomic Bird Goes Purple #1](https://tryhackme.com/room/atomicbirdone)<br>[Atomic Bird Goes Purple #2](https://tryhackme.com/room/atomicbirdtwo) | *"Successfully emulate threats in the Atomic Bird challenges!"* Module badge (SOC Level 2 Threat Emulation); unlocks on Atomic Bird Goes Purple #2. |
| <img src="https://assets.tryhackme.com/img/badges/hashcracker.png" width="36" alt=""> **Hash Cracker** | Offensive | [Crack The Hash](https://tryhackme.com/room/crackthehash)<br>[Crack The Hash Level 2](https://tryhackme.com/room/crackthehashlevel2) | *"Cracking all those hashes"* Both rooms are required. John The Ripper: The Basics does not award it. |
| <img src="https://assets.tryhackme.com/img/badges/hololive.png" width="36" alt=""> **HoloLive** | Offensive | [Holo](https://tryhackme.com/room/hololive) | *"Hacking HoloLive by exploiting and pivoting through a network"* Full Active Directory network. Large and hard. |
| <img src="https://assets.tryhackme.com/img/badges/ice.png" width="36" alt=""> **Ice** | Offensive | [Ice](https://tryhackme.com/room/ice) | *"Exploiting Windows via a media server"* |
| <img src="https://assets.tryhackme.com/img/badges/linuxprivesc.png" width="36" alt=""> **Linux PrivEsc** | Offensive | [Linux PrivEsc](https://tryhackme.com/room/linuxprivesc)<br>[Linux PrivEsc Arena](https://tryhackme.com/room/linuxprivescarena) | *"Mastering Linux Privilege Escalation"* Either room has been reported to award it; doing both is the safe route. |
| <img src="https://assets.tryhackme.com/img/badges/metasploit.png" width="36" alt=""> **Metasploitable** | Offensive | [Metasploit (module)](https://tryhackme.com/module/metasploit) *(module)*<br>[Metasploit: Meterpreter](https://tryhackme.com/room/meterpreter) | *"Contains the knowledge to use Metasploit"* Module badge; unlocks on the final room, Metasploit: Meterpreter. |
| <img src="https://assets.tryhackme.com/img/badges/mrrobot.png" width="36" alt=""> **Mr. Robot** | Offensive | [Mr Robot CTF](https://tryhackme.com/room/mrrobot) | *"Completing the Mr. Robot room"* |
| <img src="https://assets.tryhackme.com/img/badges/ohsint.png" width="36" alt=""> **OhSINT** | Offensive | [OhSINT](https://tryhackme.com/room/ohsint) | *"Completing the OhSINT room"* |
| <img src="https://assets.tryhackme.com/img/badges/redteamcapstone.png" width="36" alt=""> **Red Teamer of the Month** | Offensive | [Red Team Capstone Challenge](https://tryhackme.com/room/redteamcapstonechallenge) | *"Completing the Red Team Capstone Challenge!"* |
| <img src="https://assets.tryhackme.com/img/badges/windowsprivesc.png" width="36" alt=""> **Windows Priv Esc** | Offensive | [Privilege Escalation (module)](https://tryhackme.com/module/privilege-escalation) *(module)*<br>[Windows PrivEsc Arena](https://tryhackme.com/room/windowsprivescarena) | *"Mastering Windows Privilege Escalation"* Module badge; unlocks on Windows PrivEsc Arena. |
| <img src="https://assets.tryhackme.com/img/badges/wreath.png" width="36" alt=""> **Wreath** | Offensive | [Wreath](https://tryhackme.com/room/wreath) | *"Hacking Wreath by exploiting and pivoting through a network"* Long pivoting network; expect several sessions. |
| **APT X Hunter** | Defensive | [Cyber Threat Intelligence (SOC L2 module)](https://tryhackme.com/path/outline/soclevel2) *(module)*<br>[Trooper](https://tryhackme.com/room/trooper) | **Needs verification.** Trooper's first task is 'Unmasking APT X'; it is the last room of the Cyber Threat Intelligence module in SOC Level 2. Confirmation welcome. |
| <img src="https://assets.tryhackme.com/img/badges/boogeyman3.png" width="36" alt=""> **Boogeyman Slayer** | Defensive | [SOC Level 1 Capstone Challenges (module)](https://tryhackme.com/module/soclevel1-capstone) *(module)*<br>[Tempest](https://tryhackme.com/room/tempestincident)<br>[Boogeyman 1](https://tryhackme.com/room/boogeyman1)<br>[Boogeyman 2](https://tryhackme.com/room/boogeyman2)<br>[Boogeyman 3](https://tryhackme.com/room/boogeyman3) | *"Finishing the SOC L1 Capstone Module"* Module badge; the image is Boogeyman 3's, which is the room that triggers it. |
| <img src="https://assets.tryhackme.com/img/badges/defensive-toolsmith.png" width="36" alt=""> **Defensive Toolsmith** | Defensive | [SOC Level 1 path](https://tryhackme.com/path/outline/soclevel1) *(path)*<br>[Introduction to EDR](https://tryhackme.com/room/introductiontoedrs)<br>[Introduction to SIEM](https://tryhackme.com/room/introtosiem)<br>[Splunk: The Basics](https://tryhackme.com/room/splunk101)<br>[Elastic Stack: The Basics](https://tryhackme.com/room/investigatingwithelk101)<br>[Introduction to SOAR](https://tryhackme.com/room/soar) | *"Mastered essential SOC tools for detection"* Module badge for Core SOC Solutions (SOC Level 1). |
| **Domain Guardian** | Defensive | [Active Directory for SOC (SOC L2 module)](https://tryhackme.com/path/outline/soclevel2) *(module)*<br>[Monitoring Active Directory](https://tryhackme.com/room/monitoringactivedirectory)<br>[Detecting AD Initial Access](https://tryhackme.com/room/detectingadinitialaccess)<br>[Detecting AD Credential Attacks](https://tryhackme.com/room/detectingadcredentialattacks)<br>[Detecting AD Lateral Movement](https://tryhackme.com/room/detectingadlateralmovement)<br>[Detecting AD Post-Exploitation](https://tryhackme.com/room/detectingadpostexploitation) | **Needs verification.** Best guess: module badge for Active Directory for SOC in SOC Level 2. Unconfirmed. |
| <img src="https://assets.tryhackme.com/img/badges/advancedelk.png" width="36" alt=""> **ELKsquisite** | Defensive | [Slingshot](https://tryhackme.com/room/slingshot) | *"Completed the Slingshot challenge!"* Last room of the Advanced Elastic module (SOC Level 2). |
| **Filesystem Sleuth** | Defensive | [Diskrupt](https://tryhackme.com/room/diskrupt) | DFIR path challenge room. |
| <img src="https://assets.tryhackme.com/img/badges/first-step-into-soc.png" width="36" alt=""> **First Step into SOC** | Defensive | [SOC Level 1 path](https://tryhackme.com/path/outline/soclevel1) *(path)*<br>[Junior Security Analyst Intro](https://tryhackme.com/room/jrsecanalystintrouxo)<br>[SOC Role in Blue Team](https://tryhackme.com/room/socroleinblueteam)<br>[Humans as Attack Vectors](https://tryhackme.com/room/humansattackvectors)<br>[Systems as Attack Vectors](https://tryhackme.com/room/systemsattackvectors) | *"Explored emerging threats and SOC response"* Module badge for Blue Team Introduction, the first module of SOC Level 1. |
| **Flow Hunter** | Defensive | [Advanced Traffic Analysis (SOC L2 module)](https://tryhackme.com/path/outline/soclevel2) *(module)*<br>[The Silent Transfer](https://tryhackme.com/room/operationsilenttransfer) | **Needs verification.** Best guess: module badge for Advanced Traffic Analysis (Zeek, Zui, Snort, The Silent Transfer) in SOC Level 2. Unconfirmed. |
| <img src="https://assets.tryhackme.com/img/badges/cyberthreatintellegenceblue.png" width="36" alt=""> **Friday Fixer** | Defensive | [Friday Overtime](https://tryhackme.com/room/fridayovertime) | *"Finishing the Friday Overtime challenge!"* SOC Level 2 capstone room. |
| <img src="https://assets.tryhackme.com/img/badges/digitalforensicsandincidentresponse.png" width="36" alt=""> **Handle the Disgruntled** | Defensive | [Disgruntled](https://tryhackme.com/room/disgruntled) | *"Finishing the Disgruntled challenge!"* |
| <img src="https://assets.tryhackme.com/img/badges/detectionengineering.png" width="36" alt=""> **Intruder Alert** | Defensive | [SigHunt](https://tryhackme.com/room/sighunt) | *"Completed the Sighunt challenge!"* Detection Engineering for SOC module (SOC Level 2). |
| <img src="https://assets.tryhackme.com/img/badges/linux-guardian.png" width="36" alt=""> **Linux Guardian** | Defensive | [SOC Level 1 path](https://tryhackme.com/path/outline/soclevel1) *(path)*<br>[Linux Logging for SOC](https://tryhackme.com/room/linuxloggingforsoc)<br>[Linux Threat Detection 1](https://tryhackme.com/room/linuxthreatdetection1)<br>[Linux Threat Detection 2](https://tryhackme.com/room/linuxthreatdetection2)<br>[Linux Threat Detection 3](https://tryhackme.com/room/linuxthreatdetection3) | *"Stood guard against emerging Linux threats"* Module badge for Linux Security Monitoring (SOC Level 1). |
| **Linux Sleuth** | Defensive | [IronShade](https://tryhackme.com/room/ironshade) | DFIR path challenge room. |
| <img src="https://assets.tryhackme.com/img/badges/loganalysis.png" width="36" alt=""> **Logging Legend** | Defensive | [Log Analysis (module)](https://tryhackme.com/module/log-analysis) *(module)*<br>[Intro to Log Analysis](https://tryhackme.com/room/introtologanalysis) | *"Completed the Log Analysis room."* |
| <img src="https://assets.tryhackme.com/img/badges/lookup-champion.png" width="36" alt=""> **Lookup Champion** | Defensive | [SOC Level 1 path](https://tryhackme.com/path/outline/soclevel1) *(path)*<br>[Intro to Cyber Threat Intel](https://tryhackme.com/room/cyberthreatintel)<br>[File and Hash Threat Intel](https://tryhackme.com/room/fileandhashthreatintel)<br>[IP and Domain Threat Intel](https://tryhackme.com/room/ipanddomainthreatintel)<br>[Invite Only](https://tryhackme.com/room/invite-only) | *"Investigated the attack through TI lookups"* Module badge for Threat Analysis Tools (SOC Level 1). |
| **M365 Sentry** | Defensive | [Microsoft 365 for SOC (module)](https://tryhackme.com/module/m365-monitoring-soc) *(module)*<br>[M365 Monitoring Basics](https://tryhackme.com/room/m365monitoringbasics)<br>[Entra ID Monitoring](https://tryhackme.com/room/entraidmonitoring)<br>[Exchange Online Monitoring](https://tryhackme.com/room/exchangeonlinemonitoring)<br>[SharePoint Online Monitoring](https://tryhackme.com/room/sharepointonlinemonitoring)<br>[Microsoft Intune Monitoring](https://tryhackme.com/room/msintunemonitoring) | **Needs verification.** Best guess: module badge for Microsoft 365 for SOC in SOC Level 2. Unconfirmed. |
| **Mac Sleuth** | Defensive | [MacHunt](https://tryhackme.com/room/machunt) | DFIR path challenge room. |
| **MalBuster** | Defensive | [Static Malware Analysis (SOC L2 module)](https://tryhackme.com/path/outline/soclevel2) *(module)*<br>[MalBuster](https://tryhackme.com/room/malbuster) | **Needs verification.** Almost certainly awarded by the MalBuster room, the last room of the Static Malware Analysis module in SOC Level 2. Confirmation welcome. |
| <img src="https://assets.tryhackme.com/img/badges/malwareanalysis.png" width="36" alt=""> **Malware Analysis** | Defensive | [Dynamic Analysis: Debugging](https://tryhackme.com/room/advanceddynamicanalysis) | *"Completed the Advanced Dynamic Analysis room."* |
| <img src="https://assets.tryhackme.com/img/badges/malware-explorer.png" width="36" alt=""> **Malware Explorer** | Defensive | [SOC Level 1 path](https://tryhackme.com/path/outline/soclevel1) *(path)*<br>[Malware Classification](https://tryhackme.com/room/malwareclassification)<br>[Intro to Malware Analysis](https://tryhackme.com/room/intromalwareanalysis)<br>[Living Off the Land Attacks](https://tryhackme.com/room/livingoffthelandattacks)<br>[Shadow Trace](https://tryhackme.com/room/shadowtrace) | *"Identified and classified different types of malware"* Module badge for Malware Concepts for SOC (SOC Level 1). |
| <img src="https://assets.tryhackme.com/img/badges/endpointsecuritymonitoring.png" width="36" alt=""> **Manic Monday** | Defensive | [Monday Monitor](https://tryhackme.com/room/mondaymonitor) | *"Finishing the Monday Monitor challenge!"* Last room of the Wazuh for SOC and GRC module (SOC Level 2). |
| **Memory Sleuth** | Defensive | [Supplemental Memory](https://tryhackme.com/room/supplementalmemory) | DFIR path challenge room. |
| <img src="https://assets.tryhackme.com/img/badges/network-hog.png" width="36" alt=""> **Network Hog** | Defensive | [SOC Level 1 path](https://tryhackme.com/path/outline/soclevel1) *(path)*<br>[Network Security Essentials](https://tryhackme.com/room/networksecurityessentials)<br>[Network Discovery Detection](https://tryhackme.com/room/networkdiscoverydetection)<br>[Data Exfiltration Detection](https://tryhackme.com/room/dataexfildetection)<br>[Man-in-the-Middle Detection](https://tryhackme.com/room/mitmdetection)<br>[IDS Fundamentals](https://tryhackme.com/room/idsfundamentals)<br>[Snort](https://tryhackme.com/room/snort) | *"Sniffed out malicious traffic in the network"* Module badge for Network Security Monitoring (SOC Level 1). |
| <img src="https://assets.tryhackme.com/img/badges/networksecurityandtrafficanalysisv2.png" width="36" alt=""> **Packet Master** | Defensive | [Network Security and Traffic Analysis (module)](https://tryhackme.com/module/network-security-and-traffic-analysis) *(module)*<br>[TShark Challenge II: Directory](https://tryhackme.com/room/tsharkchallengestwo) | *"Finishing the TShark Exercises!"* Unlocks on the last room, TShark Challenge II. Reports say only the final four rooms of the module are needed. |
| <img src="https://assets.tryhackme.com/img/badges/phishing.png" width="36" alt=""> **Phish Hunter** | Defensive | [Phishing (module)](https://tryhackme.com/module/phishing) *(module)*<br>[Phishing Analysis Fundamentals](https://tryhackme.com/room/phishingemails1tryoe)<br>[Phishing Emails in Action](https://tryhackme.com/room/phishingemails2rytmuv)<br>[Phishing Analysis Tools](https://tryhackme.com/room/phishingemails3tryoe)<br>[Phishing Prevention](https://tryhackme.com/room/phishingemails4gkxh)<br>[The Greenholt Phish](https://tryhackme.com/room/phishingemails5fgjlzxc)<br>[Snapped Phish-ing Line](https://tryhackme.com/room/snappedphishingline) | *"Completed the Phishing Analysis room series"* This is the badge formerly named 'Phishing'. Complete the whole Phishing Analysis module (SOC Level 1 path). |
| <img src="https://assets.tryhackme.com/img/badges/shieldapprentice.png" width="36" alt=""> **Shield Apprentice** | Defensive | [FlareVM: Arsenal of Tools](https://tryhackme.com/room/flarevmarsenaloftools) | *"Completing the FlareVM room"* |
| <img src="https://assets.tryhackme.com/img/badges/cyberdefenceframework.png" width="36" alt=""> **Skilled Navigator** | Defensive | [Eviction](https://tryhackme.com/room/eviction) | *"Finishing the Eviction challenge!"* Last room of the Cyber Defence Frameworks module (SOC Level 1). MITRE ATT&CK Navigator practice. |
| <img src="https://assets.tryhackme.com/img/badges/soc-apprentice.png" width="36" alt=""> **SOC Apprentice** | Defensive | [SOC Level 1 path](https://tryhackme.com/path/outline/soclevel1) *(path)*<br>[SOC L1 Alert Triage](https://tryhackme.com/room/socl1alerttriage)<br>[SOC L1 Alert Reporting](https://tryhackme.com/room/socl1alertreporting)<br>[SOC Workbooks and Lookups](https://tryhackme.com/room/socworkbookslookups)<br>[SOC Metrics and Objectives](https://tryhackme.com/room/socmetricsobjectives) | *"Explored how a SOC team operates from inside"* Module badge for SOC Team Internals (SOC Level 1). The SOC Simulator scenario in this module also gives 'First alert closed'. |
| **SOC Level-Up** | Defensive | [Intro to SOC Level 2 (module)](https://tryhackme.com/module/intro-soc-level2) *(module)*<br>[Senior Security Analyst Intro](https://tryhackme.com/room/seniorsecanalystintro)<br>[SOC L2 Alert Triage](https://tryhackme.com/room/socl2alerttriage)<br>[Report Writing for SOC L2](https://tryhackme.com/room/reportwritingsocl2)<br>[Defensive Security Trends](https://tryhackme.com/room/defensivesecuritytrends) | **Needs verification.** Best guess: module badge for Intro to SOC Level 2. Unconfirmed. |
| <img src="https://assets.tryhackme.com/img/badges/advancedsplunk.png" width="36" alt=""> **SPLUNKing** | Defensive | [Splunk: Data Manipulation](https://tryhackme.com/room/splunkdatamanipulation) | *"Completed the Splunk: Parsing and Manipulating Data room!"* Advanced Splunk module (SOC Level 2). |
| <img src="https://assets.tryhackme.com/img/badges/incidentresponse.png" width="36" alt=""> **The Best Responder** | Defensive | [Lessons Learned](https://tryhackme.com/room/lessonslearned) | *"Completed the Lessons Learned room!"* |
| <img src="https://assets.tryhackme.com/img/badges/threathunting.png" width="36" alt=""> **Threat Hunter** | Defensive | [Hunt Me I: Payment Collectors](https://tryhackme.com/room/paymentcollectors) | *"Completed the Payment Collectors challenge!"* Threat Hunting module (SOC Level 2). |
| <img src="https://assets.tryhackme.com/img/badges/securityinformationandeventmanagement.png" width="36" alt=""> **To benign or not benign?** | Defensive | [Benign](https://tryhackme.com/room/benign) | *"Finishing the Benign challenge!"* Last room of the SIEM Triage for SOC module (SOC Level 1). |
| <img src="https://assets.tryhackme.com/img/badges/web-defender.png" width="36" alt=""> **Web Defender** | Defensive | [SOC Level 1 path](https://tryhackme.com/path/outline/soclevel1) *(path)*<br>[Web Security Essentials](https://tryhackme.com/room/websecurityessentials)<br>[Detecting Web Attacks](https://tryhackme.com/room/detectingwebattacks)<br>[Detecting Web Shells](https://tryhackme.com/room/detectingwebshells)<br>[Detecting Web DDoS](https://tryhackme.com/room/detectingwebddos) | *"Learned to detect common attacks on web apps"* Module badge for Web Security Monitoring (SOC Level 1). |
| <img src="https://assets.tryhackme.com/img/badges/windows-guardian.png" width="36" alt=""> **Windows Guardian** | Defensive | [SOC Level 1 path](https://tryhackme.com/path/outline/soclevel1) *(path)*<br>[Windows Logging for SOC](https://tryhackme.com/room/windowsloggingforsoc)<br>[Windows Threat Detection 1](https://tryhackme.com/room/windowsthreatdetection1)<br>[Windows Threat Detection 2](https://tryhackme.com/room/windowsthreatdetection2)<br>[Windows Threat Detection 3](https://tryhackme.com/room/windowsthreatdetection3) | *"Investigated and defended Windows against threats"* Module badge for Windows Security Monitoring (SOC Level 1). |
| **Windows Sleuth** | Defensive | [Blizzard](https://tryhackme.com/room/blizzard) | DFIR path challenge room. |
| <img src="https://assets.tryhackme.com/img/badges/wireshark.png" width="36" alt=""> **Wireshark** | Defensive | [Network Traffic Analysis (SOC L1 module)](https://tryhackme.com/path/outline/soclevel1) *(module)*<br>[Wireshark: The Basics](https://tryhackme.com/room/wiresharkthebasics)<br>[Wireshark: Packet Operations](https://tryhackme.com/room/wiresharkpacketoperations)<br>[Wireshark: Traffic Analysis](https://tryhackme.com/room/wiresharktrafficanalysis)<br>[Wireshark 101 (legacy room)](https://tryhackme.com/room/wireshark) | *"Competent with Wireshark & Packet Analysis"* Today it is awarded in the SOC Level 1 path after the Wireshark rooms of the Network Traffic Analysis module. The old Wireshark 101 room awarded it before the path refresh. |
| <img src="https://assets.tryhackme.com/img/badges/defensive-ai.png" width="36" alt=""> **Adversarial Defence Ops** | AI security | [Defending AI (module)](https://tryhackme.com/module/defensive-ai) *(module)*<br>[Detecting Adversarial Attacks](https://tryhackme.com/room/idadversarialattacks)<br>[Defending Adversarial Attacks](https://tryhackme.com/room/defadversarialattacks)<br>[AI Forensics](https://tryhackme.com/room/aiforensics)<br>[ContAInment](https://tryhackme.com/room/containment) | *"Trained to Defend, Built to Learn."* Module badge: its image file is literally 'defensive-ai', the Defending AI module's code. |
| <img src="https://assets.tryhackme.com/img/badges/ai-security-path-badge.png" width="36" alt=""> **AI Path** | AI security | [AI Security path](https://tryhackme.com/path/outline/aisecurity) *(path)* | *"Completing the AI Security learning path"* Path badge: finish every module of the AI Security learning path. |
| <img src="https://assets.tryhackme.com/img/badges/web-application-2.png" width="36" alt=""> **Model Compromise** | AI security | [Attacking LLMs (module)](https://tryhackme.com/module/attackingllm) *(module)*<br>[Input Manipulation & Prompt Injection](https://tryhackme.com/room/inputmanipulationpromptinjection)<br>[LLM Output Handling and Privacy Risks](https://tryhackme.com/room/outputhandlingandprivacyrisks)<br>[Data Integrity & Model Poisoning](https://tryhackme.com/room/modelpoisoning)<br>[Juicy](https://tryhackme.com/room/juicy)<br>[BankGPT](https://tryhackme.com/room/bankgpt)<br>[HealthGPT](https://tryhackme.com/room/healthgpt) | *"Completed the LLM Attacks Module"* Module badge for Attacking LLMs (Web Application Pentesting path). |
| <img src="https://assets.tryhackme.com/img/badges/securityinthepipeline.png" width="36" alt=""> **/opt/m0th3r** | DevSecOps | [Mother's Secret](https://tryhackme.com/room/codeanalysis) | *"Finishing Mother's Secret!"* Security in the Pipeline module of the DevSecOps path. |
| <img src="https://assets.tryhackme.com/img/badges/containersecurity.png" width="36" alt=""> **Diplodocker** | DevSecOps | [Container Vulnerabilities](https://tryhackme.com/room/containervulnerabilitiesDG) | *"Finishing the Container Vulnerability Room!"* |
| <img src="https://assets.tryhackme.com/img/badges/docker.png" width="36" alt=""> **Docker** | DevSecOps | [The Docker Rodeo](https://tryhackme.com/room/dockerrodeo) | *"Breaking out of a Docker container in 7 different ways"* |
| <img src="https://assets.tryhackme.com/img/badges/securityofthepipeline.png" width="36" alt=""> **Pipeline Lieutenant** | DevSecOps | [CI/CD and Build Security](https://tryhackme.com/room/cicdandbuildsecurity) | *"Finishing the CI/CD Build and Security Room!"* |
| <img src="https://assets.tryhackme.com/img/badges/iacsecurity.png" width="36" alt=""> **Terminated!** | DevSecOps | [Intro to IaC](https://tryhackme.com/room/introtoiac) | *"Intro to IaC cleared! The resistance is saved!"* |
| <img src="https://assets.tryhackme.com/img/badges/introtodevsecops.png" width="36" alt=""> **The Course Awakens** | DevSecOps | [Introduction to DevSecOps](https://tryhackme.com/room/introductiontodevsecops) | *"Finishing the first room in the DevSecOps path!"* |
| <img src="https://assets.tryhackme.com/img/badges/threatsandrisks.png" width="36" alt=""> **Calculated Risk** | Security engineering | [Risk Management](https://tryhackme.com/room/seriskmanagement) | *"Completed the Risk Management room!"* |
| <img src="https://assets.tryhackme.com/img/badges/careerready.png" width="36" alt=""> **Cyber Ready** | Security engineering | [Training Impact on Teams](https://tryhackme.com/room/training) | *"Understanding impact of training on teams"* |
| <img src="https://assets.tryhackme.com/img/badges/introtosecurityengineering.svg" width="36" alt=""> **Introduction to Security Engineering** | Security engineering | [Security Engineer Intro](https://tryhackme.com/room/securityengineerintro) | *"Completed the Security Engineer Intro room!"* |
| <img src="https://assets.tryhackme.com/img/badges/managingincidents.png" width="36" alt=""> **Just have to deal with it** | Security engineering | [Cyber Crisis Management](https://tryhackme.com/room/cybercrisismanagement) | *"Successfully managed a cyber crisis!"* |
| <img src="https://assets.tryhackme.com/img/badges/networkandsystemsecurity.png" width="36" alt=""> **Network and System Security** | Security engineering | [Auditing and Monitoring](https://tryhackme.com/room/auditingandmonitoringse) | *"Finished the Auditing and Monitoring room!"* |
| <img src="https://assets.tryhackme.com/img/badges/softwaresecurity.png" width="36" alt=""> **Software Security** | Security engineering | [OWASP API Security Top 10 - 1](https://tryhackme.com/room/owaspapisecuritytop105w)<br>[OWASP API Security Top 10 - 2](https://tryhackme.com/room/owaspapisecuritytop10d0) | *"Completed the OWASP API Security Top 10 rooms!"* Both rooms; part 2 triggers it. |
| <img src="https://assets.tryhackme.com/img/badges/3million.png" width="36" alt=""> **3 Million Legend** | Events | [TryHack3M (module)](https://tryhackme.com/module/three-million-special) *(module)*<br>[TryHack3M: Bricks Heist](https://tryhackme.com/room/tryhack3mbricksheist)<br>[TryHack3M: Burg3r Bytes](https://tryhackme.com/room/burg3rbytes)<br>[TryHack3M: Sch3Ma D3Mon](https://tryhackme.com/room/sch3mad3mon)<br>[TryHack3M: Subscribe](https://tryhackme.com/room/subscribe)<br>[TryHack3M: TriCipher Summit](https://tryhackme.com/room/tryhack3mencryptionchallenge) | *"Was a legend and solved any room in the 3 Million Users Special Module!"* Per TryHackMe's own description, solving ANY one room of the module is enough. |
| <img src="https://assets.tryhackme.com/img/badges/adventofcyber5.png" width="36" alt=""> **Advent of Cyber 2023** | Events | [Advent of Cyber 2023](https://tryhackme.com/room/adventofcyber2023) | *"Completed the Advent of Cyber 2023!"* |
| <img src="https://assets.tryhackme.com/img/badges/aoc5.png" width="36" alt=""> **Advent of Cyber 2024** | Events | [Advent of Cyber 2024](https://tryhackme.com/room/adventofcyber2024) | *"Completing Advent of Cyber 2024!"* |
| <img src="https://assets.tryhackme.com/img/badges/advent-of-cyber-2025.png" width="36" alt=""> **Advent of Cyber 2025** | Events | [Advent of Cyber 2025 (event hub)](https://tryhackme.com/adventofcyber25) *(path)*<br>[Advent of Cyber 2025 (module of 24 daily rooms)](https://tryhackme.com/module/aoc-2025-kra8blxfpajw0vn6) *(module)*<br>[Day 1 - Shells Bells](https://tryhackme.com/room/linuxcli-aoc2025-o1fpqkvxti) | *"Completing Advent of Cyber 2025!"* Unlike earlier years, 2025 is 24 separate daily rooms, not one room. Complete all 24. |
| <img src="https://assets.tryhackme.com/img/badges/advent-of-cyber-2025-side-quest.png" width="36" alt=""> **Advent of Cyber 2025 Side Quest** | Events | [Side Quest hub](https://tryhackme.com/adventofcyber25/sidequest) *(path)*<br>[SQ1 - The Great Disappearing Act](https://tryhackme.com/room/sq1-aoc2025-FzPnrt2SAu)<br>[SQ2 - Scheme Catcher](https://tryhackme.com/room/sq2-aoc2025-JxiOKUSD9R)<br>[SQ3 - Carrotbane of My Existence](https://tryhackme.com/room/sq3-aoc2025-bk3vvbcgiT)<br>[SQ4 - BreachBlocker Unlocker](https://tryhackme.com/room/sq4-aoc2025-32LoZ4zePK) | *"Completing Advent of Cyber 2025 Side Quest!"* Each side quest unlocks with a key hidden in the daily rooms. Complete all four. |
| <img src="https://assets.tryhackme.com/img/badges/adventofcyber.png" width="36" alt=""> **Advent of Cyber 3** | Events | [Advent of Cyber 3 (2021)](https://tryhackme.com/room/adventofcyber3) | *"Completing Advent of Cyber 3!"* There is no badge for Advent of Cyber 2 (2020). |
| <img src="https://assets.tryhackme.com/img/badges/adventofcyber4.png" width="36" alt=""> **Advent of Cyber 4** | Events | [Advent of Cyber 4 (2022)](https://tryhackme.com/room/adventofcyber4) | *"Completing Advent of Cyber 4!"* |
| <img src="https://assets.tryhackme.com/img/badges/ai-odyssey-participation.svg" width="36" alt=""> **AI Odyssey** | Events | — | *"Taking part in the AI Odyssey event!"* Participation badge for TryHackMe's AI Odyssey event. Only available while the event runs. |
| <img src="https://assets.tryhackme.com/img/badges/adventofcyber.png" width="36" alt=""> **Christmas 2019** | Events | [Advent of Cyber 1 (2019)](https://tryhackme.com/room/25daysofchristmas) | *"Taking part in the Christmas CTF!"* |
| <img src="https://assets.tryhackme.com/img/badges/aocsidequest5.png" width="36" alt=""> **Defrosted Five** | Events | [Advent of Cyber '24 Side Quest](https://tryhackme.com/room/adventofcyber24sidequest) | *"Completing AoC Side Quest 2024!"* Submit all five side-quest flags in this room. |
| <img src="https://assets.tryhackme.com/img/badges/hack2win.png" width="36" alt=""> **Raffle Royalty** | Events | [Hack2Win: how to grab extra tickets](https://tryhackme.com/room/hack2win) | *"Participating in Hack2Win 2025!"* Event badge from the Hack2Win raffle (September 2025). Can only be earned during the event. |
| <img src="https://assets.tryhackme.com/img/badges/aoc5sidequest2.png" width="36" alt=""> **SNOW/OFF** | Events | [Advent of Cyber '23 Side Quest](https://tryhackme.com/room/adventofcyber23sidequest) | *"Completed all Advent of Cyber 2023 Side Quest Challenges!"* Submit all four side-quest flags in this room. |
| <img src="https://assets.tryhackme.com/img/badges/aoc5sidequest1.png" width="36" alt=""> **The Return of the Yeti** | Events | [Advent of Cyber '23 Side Quest](https://tryhackme.com/room/adventofcyber23sidequest)<br>[The Return of the Yeti](https://tryhackme.com/room/adv3nt0fdbopsjcap)<br>[Snowy ARMageddon](https://tryhackme.com/room/armageddon2r)<br>[Frosteau Busy with Vim](https://tryhackme.com/room/busyvimfrosteau)<br>[The Bandit Surfer](https://tryhackme.com/room/surfingyetiiscomingtotown) | *"Completed at least one Advent of Cyber 2023 Side Quest Challenge!"* Complete any ONE of the four 2023 side-quest challenges. SNOW/OFF is for all four. |
| <img src="https://assets.tryhackme.com/img/badges/investigations_badge.png" width="36" alt=""> **Investigations** | Series | [Investigating Windows](https://tryhackme.com/room/investigatingwindows)<br>[Investigating Windows 2.0](https://tryhackme.com/room/investigatingwindows2)<br>[Investigating Windows 3.x](https://tryhackme.com/room/investigatingwindows3) | *"Completing the Cyber Defense Investigation series"* Series badge. Enrol via Learn, Practice, Series; rooms done outside the series page may not count. |
| <img src="https://assets.tryhackme.com/img/badges/overpass_badge.png" width="36" alt=""> **Overpassed** | Series | [Overpass (series)](https://tryhackme.com/module/overpass) *(module)*<br>[Overpass](https://tryhackme.com/room/overpass)<br>[Overpass 2 - Hacked](https://tryhackme.com/room/overpass2hacked)<br>[Overpass 3 - Hosting](https://tryhackme.com/room/overpass3hosting) | *"Completing the Overpass series"* Series badge. Enrol via Learn, Practice, Series. |
| <img src="https://assets.tryhackme.com/img/badges/pentestingtools_badge.png" width="36" alt=""> **Pentester Tools** | Series | [Pentesting Tools (series)](https://tryhackme.com/module/pentestingtools) *(module)*<br>[Nmap](https://tryhackme.com/room/furthernmap)<br>[Metasploit: Introduction](https://tryhackme.com/room/metasploitintro)<br>[Burp Suite: The Basics](https://tryhackme.com/room/burpsuitebasics)<br>[John The Ripper: The Basics](https://tryhackme.com/room/johntheripperbasics)<br>[Nessus](https://tryhackme.com/room/rpnessusredux)<br>[Hydra](https://tryhackme.com/room/hydra) | *"Completing the Pentesting Tools series"* Series badge. Enrol via Learn, Practice, Series. |
| <img src="https://assets.tryhackme.com/img/badges/windcorp_badge.png" width="36" alt=""> **WindCorp** | Series | [WindCorp (series)](https://tryhackme.com/module/windcorp) *(module)*<br>[Ra](https://tryhackme.com/room/ra)<br>[Ra 2](https://tryhackme.com/room/ra2)<br>[Set](https://tryhackme.com/room/set)<br>[Osiris](https://tryhackme.com/room/osiris) | *"Completing the WindCorp series"* Series badge. Enrol via Learn, Practice, Series. |
| <img src="https://assets.tryhackme.com/img/badges/soc-sim-100-percent-true-positive-rate.png" width="36" alt=""> **100% true positive rate** | SOC Simulator | [SOC Simulator](https://tryhackme.com/soc-sim) *(feature)* | *"Achieving 100% true positive rate in a scenario"* Classify every alert in a scenario correctly. Easiest on the short introductory scenarios. |
| <img src="https://assets.tryhackme.com/img/badges/first-ttx-completed.png" width="36" alt=""> **Completed a tabletop exercise** | SOC Simulator | [Tabletop exercises](https://tryhackme.com/tabletop) *(feature)* | **Needs verification.** *"Completed a tabletop exercise"* Finish any tabletop exercise (TTX). Feature URL to be confirmed. |
| <img src="https://assets.tryhackme.com/img/badges/soc-sim-first-alert-closed.png" width="36" alt=""> **First alert closed** | SOC Simulator | [SOC Simulator](https://tryhackme.com/soc-sim) *(feature)* | *"Closing your first alert"* Close one alert in any SOC Simulator scenario. The first scenario appears in the SOC Team Internals module of SOC Level 1. |
| <img src="https://assets.tryhackme.com/img/badges/soc-sim-first-scenario-completed.png" width="36" alt=""> **First scenario completed** | SOC Simulator | [SOC Simulator](https://tryhackme.com/soc-sim) *(feature)* | *"Completing your first scenario"* |
| <img src="https://assets.tryhackme.com/img/badges/soc-sim-five-scenarios-completed.png" width="36" alt=""> **Five scenarios completed** | SOC Simulator | [SOC Simulator](https://tryhackme.com/soc-sim) *(feature)* | *"Completing 5 scenarios"* |
| <img src="https://assets.tryhackme.com/img/badges/league-bronze.png" width="36" alt=""> **Bronze League** | Leagues | [Weekly leagues](https://tryhackme.com/leagues) *(feature)* | *"Bronze League 1st place"* |
| <img src="https://assets.tryhackme.com/img/badges/leagues-chaos.png" width="36" alt=""> **Chaos Reigns** | Leagues | [Weekly leagues](https://tryhackme.com/leagues) *(feature)* | *"Persistence pays: Awarded for overcoming league adversity."* League badge, not a room: awarded for bouncing back after a league setback (TryHackMe does not publish the exact rule). |
| <img src="https://assets.tryhackme.com/img/badges/league-diamond.png" width="36" alt=""> **Diamond League** | Leagues | [Weekly leagues](https://tryhackme.com/leagues) *(feature)* | *"Diamond League 1st place"* |
| <img src="https://assets.tryhackme.com/img/badges/league-gold.png" width="36" alt=""> **Gold League** | Leagues | [Weekly leagues](https://tryhackme.com/leagues) *(feature)* | *"Gold League 1st place"* |
| <img src="https://assets.tryhackme.com/img/badges/king.png" width="36" alt=""> **King** | Leagues | [King of the Hill](https://tryhackme.com/games/koth) *(feature)* | *"King of the Hill winner"* Win a King of the Hill game. |
| **League Locked Legend** | Leagues | [Weekly leagues](https://tryhackme.com/leagues) *(feature)* | **Needs verification.** League badge; exact condition not yet documented. |
| **Monthly Hacker** | Leagues | [Leaderboard](https://tryhackme.com/leaderboards) *(feature)* | Be the top hacker of the month on the global leaderboard. |
| <img src="https://assets.tryhackme.com/img/badges/league-platinum.png" width="36" alt=""> **Platinum League** | Leagues | [Weekly leagues](https://tryhackme.com/leagues) *(feature)* | *"Platinum League 1st place"* |
| <img src="https://assets.tryhackme.com/img/badges/league-ruby.png" width="36" alt=""> **Ruby League** | Leagues | [Weekly leagues](https://tryhackme.com/leagues) *(feature)* | *"Ruby League 1st place"* |
| <img src="https://assets.tryhackme.com/img/badges/league-saphire.png" width="36" alt=""> **Sapphire League** | Leagues | [Weekly leagues](https://tryhackme.com/leagues) *(feature)* | *"Sapphire League 1st place"* |
| <img src="https://assets.tryhackme.com/img/badges/league-silver.png" width="36" alt=""> **Silver League** | Leagues | [Weekly leagues](https://tryhackme.com/leagues) *(feature)* | *"Silver League 1st place"* |
| <img src="https://assets.tryhackme.com/img/badges/streak1000.png" width="36" alt=""> **1000 Day Streak** | Streaks | — | *"Hacking for 1000 days in a row"* |
| <img src="https://assets.tryhackme.com/img/badges/streak1250.png" width="36" alt=""> **1250 Day Streak** | Streaks | — | *"Hacking for 1250 days in a row"* |
| <img src="https://assets.tryhackme.com/img/badges/streak1500.png" width="36" alt=""> **1500 Day Streak** | Streaks | — | *"Hacking for 1500 days in a row"* |
| <img src="https://assets.tryhackme.com/img/badges/streak1750.png" width="36" alt=""> **1750 Day Streak** | Streaks | — |  |
| <img src="https://assets.tryhackme.com/img/badges/streak180.png" width="36" alt=""> **180 Day Streak** | Streaks | — | *"Hacking for 180 days in a row"* |
| <img src="https://assets.tryhackme.com/img/badges/streak2000.png" width="36" alt=""> **2000 Day Streak** | Streaks | — |  |
| <img src="https://assets.tryhackme.com/img/badges/streak3.png" width="36" alt=""> **3 Day Streak** | Streaks | — | *"Achieving a 3 day hacking streak"* |
| <img src="https://assets.tryhackme.com/img/badges/streak30.png" width="36" alt=""> **30 Day Streak** | Streaks | — | *"Hacking for 30 days solid"* |
| <img src="https://assets.tryhackme.com/img/badges/streak365.png" width="36" alt=""> **365 Day Streak** | Streaks | — | *"Hacking for 365 days in a row"* |
| <img src="https://assets.tryhackme.com/img/badges/streak500.png" width="36" alt=""> **500 Day Streak** | Streaks | — | *"Hacking for 500 days in a row"* |
| <img src="https://assets.tryhackme.com/img/badges/streak7.png" width="36" alt=""> **7 Day Streak** | Streaks | — | *"Achieving a 7 day hacking streak"* |
| <img src="https://assets.tryhackme.com/img/badges/streak750.png" width="36" alt=""> **750 Day Streak** | Streaks | — | *"Hacking for 750 days in a row"* |
| <img src="https://assets.tryhackme.com/img/badges/streak90.png" width="36" alt=""> **90 Day Streak** | Streaks | — | *"Hacking for 90 days in a row"* |
| **Alpha** | Platform | — | Early-access programme badge. Not earnable through rooms. |
| **Best Friends Forever** | Platform | — | **Needs verification.** Community badge tied to the friends/following feature. Exact condition not yet documented. |
| **Beta** | Platform | — | Early-access / beta-tester badge. Not earnable through rooms. |
| <img src="https://assets.tryhackme.com/img/badges/first-mobile-quiz.png" width="36" alt=""> **First Mobile Quiz** | Platform | [TryHackMe mobile app](https://tryhackme.com/mobile) *(feature)* | **Needs verification.** *"Completing your first quiz or recap on the mobile app!"* Finish one quiz or room recap in the iOS/Android app. |
| <img src="https://assets.tryhackme.com/img/badges/session-held.svg" width="36" alt=""> **Session Held** | Platform | [Weekly missions (dashboard)](https://tryhackme.com/dashboard) *(feature)* | *"Completing 4 weekly missions in a row!"* Complete the weekly missions four weeks running. |
| **Study Group** | Platform | — | **Needs verification.** Community badge tied to study groups / friends features. Exact condition not yet documented. |
| **TryTrailMe** | Platform | [TryHackMe Trail](https://tryhackme.com/trail) *(feature)* | **Needs verification.** Appears tied to the Trail feature. Exact condition not yet documented. |
| <img src="https://assets.tryhackme.com/img/badges/actofkindness.png" width="36" alt=""> **Act of Kindness** | Discontinued | — | *"To those who have shown to be truly kind"* Hand-awarded by TryHackMe staff in the early days; no longer given out. |
| <img src="https://assets.tryhackme.com/img/badges/throwback.png" width="36" alt=""> **Throwback** | Discontinued | — | *"Hacking Throwback by exploiting a Windows AD network"* The Throwback network was retired. Existing holders keep the badge. |
<!-- BADGES:END -->
