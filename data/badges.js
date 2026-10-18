/* =====================================================================
   TryHackMe Badge Finder — badge dataset
   ---------------------------------------------------------------------
   This file is the single source of truth. index.html reads it, and
   scripts/build.py turns it into the README table + sitemap.

   Each badge:
     slug      unique id, also the image file name: assets/badges/<slug>.png
     name      badge name exactly as shown on TryHackMe
     category  one of: fundamentals | web | offensive | defensive |
               devsecops | engineering | events | series | discontinued
     rooms     list of { title, url, kind } — kind: "room" | "module" | "path"
     note      how the badge is actually awarded / gotchas (optional)
     aliases   other names people use for it (optional, searchable)
     verify    true when the room/badge pairing still needs confirmation
   ===================================================================== */
window.BADGES = [
  /* ----------------------------- Fundamentals ------------------------ */
  {
    slug: "world-wide-web",
    name: "World Wide Web",
    category: "fundamentals",
    rooms: [
      { title: "Putting it all together", url: "https://tryhackme.com/room/puttingitalltogether", kind: "room" }
    ],
    note: "Last room of the Web Fundamentals module (Pre Security path)."
  },
  {
    slug: "webbed",
    name: "Webbed",
    category: "fundamentals",
    rooms: [
      { title: "HTTP in Detail", url: "https://tryhackme.com/room/httpindetail", kind: "room" }
    ]
  },
  {
    slug: "cat-linux-txt",
    name: "cat linux.txt",
    category: "fundamentals",
    rooms: [
      { title: "Linux Fundamentals Part 1", url: "https://tryhackme.com/room/linuxfundamentalspart1", kind: "room" },
      { title: "Linux Fundamentals Part 2", url: "https://tryhackme.com/room/linuxfundamentalspart2", kind: "room" },
      { title: "Linux Fundamentals Part 3", url: "https://tryhackme.com/room/linuxfundamentalspart3", kind: "room" }
    ],
    note: "Awarded on completing the Linux Fundamentals trilogy — finish all three parts."
  },
  {
    slug: "networking-nerd",
    name: "Networking Nerd",
    category: "fundamentals",
    rooms: [
      { title: "Network Fundamentals (module)", url: "https://tryhackme.com/module/network-fundamentals", kind: "module" },
      { title: "Extending Your Network", url: "https://tryhackme.com/room/extendingyournetwork", kind: "room" }
    ],
    note: "Complete the whole Network Fundamentals module. The badge is granted when you finish its last room, Extending Your Network."
  },
  {
    slug: "pentesting-principles",
    name: "Pentesting Principles",
    category: "fundamentals",
    rooms: [
      { title: "Principles of Security", url: "https://tryhackme.com/room/principlesofsecurity", kind: "room" }
    ]
  },
  {
    slug: "security-awareness",
    name: "Security Awareness",
    category: "fundamentals",
    rooms: [
      { title: "Common Attacks", url: "https://tryhackme.com/room/commonattacks", kind: "room" }
    ]
  },

  /* --------------------------------- Web ----------------------------- */
  {
    slug: "owasp-top-10",
    name: "OWASP Top 10",
    category: "web",
    rooms: [
      { title: "OWASP Top 10 - 2021", url: "https://tryhackme.com/room/owasptop102021", kind: "room" },
      { title: "OWASP Top 10 (original 2017 room)", url: "https://tryhackme.com/room/owasptop10", kind: "room" }
    ],
    note: "The 2021 room is the current one. The original room also awarded the badge for users who completed it before the refresh."
  },
  {
    slug: "intro-to-web-hacking",
    name: "Intro to Web Hacking",
    category: "web",
    rooms: [
      { title: "Intro to Web Hacking (module)", url: "https://tryhackme.com/module/intro-to-web-hacking", kind: "module" },
      { title: "Command Injection", url: "https://tryhackme.com/room/oscommandinjection", kind: "room" }
    ],
    note: "Module badge — it unlocks on the module's final room, Command Injection."
  },
  {
    slug: "burped",
    name: "Burp'ed",
    category: "web",
    aliases: ["Burped", "Burp Suite"],
    rooms: [
      { title: "Burp Suite (module)", url: "https://tryhackme.com/module/learn-burp-suite", kind: "module" },
      { title: "Burp Suite: Extensions", url: "https://tryhackme.com/room/burpsuiteextensions", kind: "room" }
    ],
    note: "Module badge — awarded when you complete Burp Suite: Extensions, the last room of the module."
  },
  {
    slug: "sql-slayer",
    name: "SQL Slayer",
    category: "web",
    rooms: [
      { title: "Advanced SQL Injection", url: "https://tryhackme.com/room/advancedsqlinjection", kind: "room" }
    ]
  },
  {
    slug: "sword-apprentice",
    name: "Sword Apprentice",
    category: "web",
    rooms: [
      { title: "SQLMap: The Basics", url: "https://tryhackme.com/room/sqlmapthebasics", kind: "room" }
    ]
  },
  {
    slug: "authentication-striker",
    name: "Authentication Striker",
    category: "web",
    rooms: [
      { title: "Hammer", url: "https://tryhackme.com/room/hammer", kind: "room" }
    ]
  },
  {
    slug: "system-sniffer",
    name: "System Sniffer",
    category: "web",
    rooms: [
      { title: "File Inclusion, Path Traversal", url: "https://tryhackme.com/room/filepathtraversal", kind: "room" }
    ]
  },
  {
    slug: "client-side-champ",
    name: "Client-Side Champ",
    category: "web",
    rooms: [
      { title: "Whats Your Name?", url: "https://tryhackme.com/room/whatsyourname", kind: "room" }
    ]
  },
  {
    slug: "http-smuggler",
    name: "HTTP Smuggler",
    category: "web",
    rooms: [
      { title: "El Bandito", url: "https://tryhackme.com/room/elbandito", kind: "room" }
    ]
  },
  {
    slug: "opt-m0th3r",
    name: "/opt/m0th3r",
    category: "web",
    aliases: ["opt mother", "Mother's Secret"],
    rooms: [
      { title: "Mother's Secret", url: "https://tryhackme.com/room/codeanalysis", kind: "room" }
    ]
  },

  /* ------------------------------ Offensive -------------------------- */
  {
    slug: "blue",
    name: "Blue",
    category: "offensive",
    rooms: [
      { title: "Blue", url: "https://tryhackme.com/room/blue", kind: "room" }
    ],
    note: "The classic EternalBlue box. One of the first badges most people earn."
  },
  {
    slug: "ice",
    name: "Ice",
    category: "offensive",
    rooms: [
      { title: "Ice", url: "https://tryhackme.com/room/ice", kind: "room" }
    ]
  },
  {
    slug: "hash-cracker",
    name: "Hash Cracker",
    category: "offensive",
    rooms: [
      { title: "Crack The Hash", url: "https://tryhackme.com/room/crackthehash", kind: "room" },
      { title: "Crack The Hash Level 2", url: "https://tryhackme.com/room/crackthehashlevel2", kind: "room" }
    ],
    note: "Both rooms are required. John The Ripper: The Basics does not award this badge even though the old room page suggested it."
  },
  {
    slug: "linux-privesc",
    name: "Linux PrivEsc",
    category: "offensive",
    rooms: [
      { title: "Linux PrivEsc", url: "https://tryhackme.com/room/linuxprivesc", kind: "room" },
      { title: "Linux PrivEsc Arena", url: "https://tryhackme.com/room/linuxprivescarena", kind: "room" }
    ],
    note: "Either room has been reported to award it; completing both is the safe route."
  },
  {
    slug: "windows-priv-esc",
    name: "Windows Priv Esc",
    category: "offensive",
    rooms: [
      { title: "Privilege Escalation (module)", url: "https://tryhackme.com/module/privilege-escalation", kind: "module" },
      { title: "Windows PrivEsc Arena", url: "https://tryhackme.com/room/windowsprivescarena", kind: "room" }
    ],
    note: "Module badge — unlocks on Windows PrivEsc Arena."
  },
  {
    slug: "metasploitable",
    name: "Metasploitable",
    category: "offensive",
    rooms: [
      { title: "Metasploit (module)", url: "https://tryhackme.com/module/metasploit", kind: "module" },
      { title: "Metasploit: Meterpreter", url: "https://tryhackme.com/room/meterpreter", kind: "room" }
    ],
    note: "Module badge — unlocks on the final room, Metasploit: Meterpreter."
  },
  {
    slug: "ohsint",
    name: "OhSINT",
    category: "offensive",
    rooms: [
      { title: "OhSINT", url: "https://tryhackme.com/room/ohsint", kind: "room" }
    ]
  },
  {
    slug: "mr-robot",
    name: "Mr. Robot",
    category: "offensive",
    rooms: [
      { title: "Mr Robot CTF", url: "https://tryhackme.com/room/mrrobot", kind: "room" }
    ]
  },
  {
    slug: "wreath",
    name: "Wreath",
    category: "offensive",
    rooms: [
      { title: "Wreath", url: "https://tryhackme.com/room/wreath", kind: "room" }
    ],
    note: "Long network-pivoting room; expect several sessions."
  },
  {
    slug: "hololive",
    name: "HoloLive",
    category: "offensive",
    rooms: [
      { title: "Holo", url: "https://tryhackme.com/room/hololive", kind: "room" }
    ],
    note: "Full Active Directory network. Large, hard, and worth it."
  },
  {
    slug: "adversary",
    name: "ADversary",
    category: "offensive",
    aliases: ["Adversary", "Active Directory"],
    rooms: [
      { title: "Compromising Active Directory (module)", url: "https://tryhackme.com/module/hacking-active-directory", kind: "module" },
      { title: "Persisting Active Directory", url: "https://tryhackme.com/room/persistingad", kind: "room" }
    ],
    note: "Module badge — unlocks on Persisting Active Directory."
  },
  {
    slug: "red-teamer-of-the-month",
    name: "Red Teamer of the Month",
    category: "offensive",
    rooms: [
      { title: "Red Team Capstone Challenge", url: "https://tryhackme.com/room/redteamcapstonechallenge", kind: "room" }
    ]
  },
  {
    slug: "changing-hats",
    name: "Changing Hats",
    category: "offensive",
    aliases: ["Purple team"],
    rooms: [
      { title: "Threat Emulation (module)", url: "https://tryhackme.com/module/threat-emulation", kind: "module" },
      { title: "Atomic Bird Goes Purple #2", url: "https://tryhackme.com/room/atomicbirdtwo", kind: "room" }
    ],
    note: "Module badge — unlocks on Atomic Bird Goes Purple #2."
  },

  /* ------------------------------ Defensive -------------------------- */
  {
    slug: "wireshark",
    name: "Wireshark",
    category: "defensive",
    rooms: [
      { title: "Wireshark 101", url: "https://tryhackme.com/room/wireshark", kind: "room" }
    ]
  },
  {
    slug: "packet-master",
    name: "Packet Master",
    category: "defensive",
    rooms: [
      { title: "Network Security and Traffic Analysis (module)", url: "https://tryhackme.com/module/network-security-and-traffic-analysis", kind: "module" },
      { title: "TShark Challenge II: Directory", url: "https://tryhackme.com/room/tsharkchallengestwo", kind: "room" }
    ],
    note: "Module badge — unlocks on the last room, TShark Challenge II. Reports say only the final four rooms of the module are needed."
  },
  {
    slug: "logging-legend",
    name: "Logging Legend",
    category: "defensive",
    rooms: [
      { title: "Log Analysis (module)", url: "https://tryhackme.com/module/log-analysis", kind: "module" },
      { title: "Intro to Log Analysis", url: "https://tryhackme.com/room/introtologanalysis", kind: "room" }
    ],
    note: "Module badge — the trigger room is Intro to Log Analysis."
  },
  {
    slug: "phishing",
    name: "Phishing",
    category: "defensive",
    rooms: [
      { title: "Phishing (module)", url: "https://tryhackme.com/module/phishing", kind: "module" },
      { title: "The Greenholt Phish", url: "https://tryhackme.com/room/phishingemails5fgjlzxc", kind: "room" }
    ],
    note: "Module badge — unlocks on the final room, The Greenholt Phish."
  },
  {
    slug: "skilled-navigator",
    name: "Skilled Navigator",
    category: "defensive",
    rooms: [
      { title: "Eviction", url: "https://tryhackme.com/room/eviction", kind: "room" }
    ],
    note: "MITRE ATT&CK Navigator practice."
  },
  {
    slug: "manic-monday",
    name: "Manic Monday",
    category: "defensive",
    rooms: [
      { title: "Monday Monitor", url: "https://tryhackme.com/room/mondaymonitor", kind: "room" }
    ]
  },
  {
    slug: "friday-fixer",
    name: "Friday Fixer",
    category: "defensive",
    rooms: [
      { title: "Friday Overtime", url: "https://tryhackme.com/room/fridayovertime", kind: "room" }
    ]
  },
  {
    slug: "handle-the-disgruntled",
    name: "Handle the Disgruntled",
    category: "defensive",
    rooms: [
      { title: "Disgruntled", url: "https://tryhackme.com/room/disgruntled", kind: "room" }
    ]
  },
  {
    slug: "to-benign-or-not-benign",
    name: "To benign or not benign?",
    category: "defensive",
    rooms: [
      { title: "Benign", url: "https://tryhackme.com/room/benign", kind: "room" }
    ]
  },
  {
    slug: "boogeyman-slayer",
    name: "Boogeyman Slayer",
    category: "defensive",
    rooms: [
      { title: "SOC Level 1 Capstone Challenges (module)", url: "https://tryhackme.com/module/soclevel1-capstone", kind: "module" },
      { title: "Boogeyman 1", url: "https://tryhackme.com/room/boogeyman1", kind: "room" },
      { title: "Boogeyman 2", url: "https://tryhackme.com/room/boogeyman2", kind: "room" },
      { title: "Boogeyman 3", url: "https://tryhackme.com/room/boogeyman3", kind: "room" }
    ],
    note: "Awarded on Boogeyman 3. The three rooms form the SOC Level 1 capstone module."
  },
  {
    slug: "intruder-alert",
    name: "Intruder Alert",
    category: "defensive",
    rooms: [
      { title: "SigHunt", url: "https://tryhackme.com/room/sighunt", kind: "room" }
    ]
  },
  {
    slug: "elksquisite",
    name: "ELKsquisite",
    category: "defensive",
    rooms: [
      { title: "Slingshot", url: "https://tryhackme.com/room/slingshot", kind: "room" }
    ]
  },
  {
    slug: "splunking",
    name: "SPLUNKing",
    category: "defensive",
    rooms: [
      { title: "Splunk: Data Manipulation", url: "https://tryhackme.com/room/splunkdatamanipulation", kind: "room" }
    ]
  },
  {
    slug: "threat-hunter",
    name: "Threat Hunter",
    category: "defensive",
    rooms: [
      { title: "Hunt Me I: Payment Collectors", url: "https://tryhackme.com/room/paymentcollectors", kind: "room" }
    ]
  },
  {
    slug: "the-best-responder",
    name: "The Best Responder",
    category: "defensive",
    rooms: [
      { title: "Lessons Learned", url: "https://tryhackme.com/room/lessonslearned", kind: "room" }
    ]
  },
  {
    slug: "malware-analysis",
    name: "Malware Analysis",
    category: "defensive",
    rooms: [
      { title: "Dynamic Analysis: Debugging", url: "https://tryhackme.com/room/advanceddynamicanalysis", kind: "room" }
    ]
  },
  {
    slug: "shield-apprentice",
    name: "Shield Apprentice",
    category: "defensive",
    rooms: [
      { title: "FlareVM: Arsenal of Tools", url: "https://tryhackme.com/room/flarevmarsenaloftools", kind: "room" }
    ]
  },
  {
    slug: "mac-sleuth",
    name: "Mac Sleuth",
    category: "defensive",
    rooms: [
      { title: "MacHunt", url: "https://tryhackme.com/room/machunt", kind: "room" }
    ]
  },
  {
    slug: "filesystem-sleuth",
    name: "Filesystem Sleuth",
    category: "defensive",
    rooms: [
      { title: "Diskrupt", url: "https://tryhackme.com/room/diskrupt", kind: "room" }
    ]
  },
  {
    slug: "memory-sleuth",
    name: "Memory Sleuth",
    category: "defensive",
    rooms: [
      { title: "Supplemental Memory", url: "https://tryhackme.com/room/supplementalmemory", kind: "room" }
    ]
  },
  {
    slug: "linux-sleuth",
    name: "Linux Sleuth",
    category: "defensive",
    rooms: [
      { title: "IronShade", url: "https://tryhackme.com/room/ironshade", kind: "room" }
    ]
  },
  {
    slug: "windows-sleuth",
    name: "Windows Sleuth",
    category: "defensive",
    rooms: [
      { title: "Blizzard", url: "https://tryhackme.com/room/blizzard", kind: "room" }
    ]
  },

  /* ---------------------- Cloud, containers, DevSecOps --------------- */
  {
    slug: "docker",
    name: "Docker",
    category: "devsecops",
    rooms: [
      { title: "The Docker Rodeo", url: "https://tryhackme.com/room/dockerrodeo", kind: "room" }
    ]
  },
  {
    slug: "diplodocker",
    name: "Diplodocker",
    category: "devsecops",
    rooms: [
      { title: "Container Vulnerabilities", url: "https://tryhackme.com/room/containervulnerabilitiesDG", kind: "room" }
    ]
  },
  {
    slug: "the-course-awakens",
    name: "The Course Awakens",
    category: "devsecops",
    rooms: [
      { title: "Introduction to DevSecOps", url: "https://tryhackme.com/room/introductiontodevsecops", kind: "room" }
    ]
  },
  {
    slug: "terminated",
    name: "Terminated!",
    category: "devsecops",
    rooms: [
      { title: "Intro to IaC", url: "https://tryhackme.com/room/introtoiac", kind: "room" }
    ]
  },
  {
    slug: "pipeline-lieutenant",
    name: "Pipeline Lieutenant",
    category: "devsecops",
    aliases: ["CI/CD and Build Security"],
    rooms: [
      { title: "CI/CD and Build Security", url: "https://tryhackme.com/room/cicdandbuildsecurity", kind: "room" }
    ]
  },

  /* -------------------------- Security engineering ------------------- */
  {
    slug: "introduction-to-security-engineering",
    name: "Introduction to Security Engineering",
    category: "engineering",
    rooms: [
      { title: "Security Engineer Intro", url: "https://tryhackme.com/room/securityengineerintro", kind: "room" }
    ]
  },
  {
    slug: "software-security",
    name: "Software Security",
    category: "engineering",
    rooms: [
      { title: "OWASP API Security Top 10 - 1", url: "https://tryhackme.com/room/owaspapisecuritytop105w", kind: "room" },
      { title: "OWASP API Security Top 10 - 2", url: "https://tryhackme.com/room/owaspapisecuritytop10d0", kind: "room" }
    ],
    note: "The badge triggers on part 2; part 1 is listed as its prerequisite."
  },
  {
    slug: "network-and-system-security",
    name: "Network and System Security",
    category: "engineering",
    rooms: [
      { title: "Auditing and Monitoring", url: "https://tryhackme.com/room/auditingandmonitoringse", kind: "room" }
    ]
  },
  {
    slug: "calculated-risk",
    name: "Calculated Risk",
    category: "engineering",
    rooms: [
      { title: "Risk Management", url: "https://tryhackme.com/room/seriskmanagement", kind: "room" }
    ]
  },
  {
    slug: "just-have-to-deal-with-it",
    name: "Just have to deal with it",
    category: "engineering",
    rooms: [
      { title: "Cyber Crisis Management", url: "https://tryhackme.com/room/cybercrisismanagement", kind: "room" }
    ]
  },
  {
    slug: "cyber-ready",
    name: "Cyber Ready",
    category: "engineering",
    rooms: [
      { title: "Training Impact on Teams", url: "https://tryhackme.com/room/training", kind: "room" }
    ]
  },

  /* -------------------------------- Events --------------------------- */
  {
    slug: "christmas-2019",
    name: "Christmas 2019",
    category: "events",
    aliases: ["Advent of Cyber 1", "AoC 2019"],
    rooms: [
      { title: "Advent of Cyber 1 (2019)", url: "https://tryhackme.com/room/25daysofchristmas", kind: "room" }
    ]
  },
  {
    slug: "advent-of-cyber-2",
    name: "Advent of Cyber 2",
    category: "events",
    aliases: ["AoC 2020"],
    rooms: [
      { title: "Advent of Cyber 2 (2020)", url: "https://tryhackme.com/room/adventofcyber2", kind: "room" }
    ],
    verify: true,
    note: "Badge existence for the 2020 event still needs confirmation from someone who completed it."
  },
  {
    slug: "advent-of-cyber-3",
    name: "Advent of Cyber 3",
    category: "events",
    aliases: ["AoC 2021"],
    rooms: [
      { title: "Advent of Cyber 3 (2021)", url: "https://tryhackme.com/room/adventofcyber3", kind: "room" }
    ]
  },
  {
    slug: "advent-of-cyber-4",
    name: "Advent of Cyber 4",
    category: "events",
    aliases: ["AoC 2022"],
    rooms: [
      { title: "Advent of Cyber 4 (2022)", url: "https://tryhackme.com/room/adventofcyber4", kind: "room" }
    ]
  },
  {
    slug: "advent-of-cyber-2023",
    name: "Advent of Cyber 2023",
    category: "events",
    aliases: ["AoC 2023"],
    rooms: [
      { title: "Advent of Cyber 2023", url: "https://tryhackme.com/room/adventofcyber2023", kind: "room" }
    ]
  },
  {
    slug: "snow-off",
    name: "SNOW/OFF",
    category: "events",
    aliases: ["Side Quest 2023"],
    rooms: [
      { title: "Advent of Cyber '23 Side Quest", url: "https://tryhackme.com/room/adventofcyber23sidequest", kind: "room" }
    ],
    note: "Submit all four side-quest flags in this room."
  },
  {
    slug: "the-return-of-the-yeti",
    name: "The Return of the Yeti",
    category: "events",
    rooms: [
      { title: "Frosteau Busy with Vim", url: "https://tryhackme.com/room/busyvimfrosteau", kind: "room" },
      { title: "Snowy ARMageddon", url: "https://tryhackme.com/room/armageddon2r", kind: "room" },
      { title: "The Bandit Surfer", url: "https://tryhackme.com/room/surfingyetiiscomingtotown", kind: "room" },
      { title: "The Return of the Yeti", url: "https://tryhackme.com/room/adv3nt0fdbopsjcap", kind: "room" }
    ],
    note: "The four 2023 side-quest challenge rooms themselves. SNOW/OFF is the separate badge for submitting their flags."
  },
  {
    slug: "advent-of-cyber-2024",
    name: "Advent of Cyber 2024",
    category: "events",
    aliases: ["AoC 2024"],
    rooms: [
      { title: "Advent of Cyber 2024", url: "https://tryhackme.com/room/adventofcyber2024", kind: "room" }
    ]
  },
  {
    slug: "defrosted-five",
    name: "Defrosted Five",
    category: "events",
    aliases: ["Side Quest 2024"],
    rooms: [
      { title: "Advent of Cyber '24 Side Quest", url: "https://tryhackme.com/room/adventofcyber24sidequest", kind: "room" }
    ],
    note: "Submit all five side-quest flags in this room."
  },
  {
    slug: "advent-of-cyber-2025",
    name: "Advent of Cyber 2025",
    category: "events",
    aliases: ["AoC 2025"],
    rooms: [
      { title: "Advent of Cyber 2025", url: "https://tryhackme.com/room/adventofcyber2025", kind: "room" }
    ],
    verify: true,
    note: "Room slug and badge name to be confirmed after the 2025 event."
  },
  {
    slug: "advent-of-cyber-25-side-quest",
    name: "Advent of Cyber '25 Side Quest",
    category: "events",
    aliases: ["Side Quest 2025"],
    rooms: [
      { title: "Advent of Cyber '25 Side Quest", url: "https://tryhackme.com/room/adventofcyber25sidequest", kind: "room" }
    ],
    verify: true,
    note: "Badge name and room slug to be confirmed."
  },
  {
    slug: "3-million-legend",
    name: "3 Million Legend",
    category: "events",
    aliases: ["TryHack3M"],
    rooms: [
      { title: "TryHack3M (module)", url: "https://tryhackme.com/module/three-million-special", kind: "module" },
      { title: "TryHack3M: Bricks Heist", url: "https://tryhackme.com/room/tryhack3mbricksheist", kind: "room" },
      { title: "TryHack3M: Burg3r Bytes", url: "https://tryhackme.com/room/burg3rbytes", kind: "room" },
      { title: "TryHack3M: Sch3Ma D3Mon", url: "https://tryhackme.com/room/sch3mad3mon", kind: "room" },
      { title: "TryHack3M: Subscribe", url: "https://tryhackme.com/room/subscribe", kind: "room" },
      { title: "TryHack3M: TriCipher Summit", url: "https://tryhackme.com/room/tryhack3mencryptionchallenge", kind: "room" }
    ],
    note: "Complete every room of the 3-million-users celebration module."
  },

  /* -------------------------------- Series --------------------------- */
  {
    slug: "investigations",
    name: "Investigations",
    category: "series",
    aliases: ["Investigating Windows"],
    rooms: [
      { title: "Investigating Windows", url: "https://tryhackme.com/room/investigatingwindows", kind: "room" },
      { title: "Investigating Windows 2.0", url: "https://tryhackme.com/room/investigatingwindows2", kind: "room" },
      { title: "Investigating Windows 3.x", url: "https://tryhackme.com/room/investigatingwindows3", kind: "room" }
    ],
    note: "Series badge. Enrol through Learn, then Practice, then Series — completing the rooms outside the series page may not count."
  },
  {
    slug: "windcorp",
    name: "WindCorp",
    category: "series",
    rooms: [
      { title: "WindCorp (series)", url: "https://tryhackme.com/module/windcorp", kind: "module" },
      { title: "Ra", url: "https://tryhackme.com/room/ra", kind: "room" },
      { title: "Ra 2", url: "https://tryhackme.com/room/ra2", kind: "room" },
      { title: "Set", url: "https://tryhackme.com/room/set", kind: "room" },
      { title: "Osiris", url: "https://tryhackme.com/room/osiris", kind: "room" }
    ],
    note: "Series badge. Enrol via Learn, Practice, Series."
  },
  {
    slug: "overpassed",
    name: "Overpassed",
    category: "series",
    aliases: ["Overpass"],
    rooms: [
      { title: "Overpass (series)", url: "https://tryhackme.com/module/overpass", kind: "module" },
      { title: "Overpass", url: "https://tryhackme.com/room/overpass", kind: "room" },
      { title: "Overpass 2 - Hacked", url: "https://tryhackme.com/room/overpass2hacked", kind: "room" },
      { title: "Overpass 3 - Hosting", url: "https://tryhackme.com/room/overpass3hosting", kind: "room" }
    ],
    note: "Series badge. Enrol via Learn, Practice, Series."
  },
  {
    slug: "pentester-tools",
    name: "Pentester Tools",
    category: "series",
    aliases: ["Pentesting Tools"],
    rooms: [
      { title: "Pentesting Tools (series)", url: "https://tryhackme.com/module/pentestingtools", kind: "module" },
      { title: "Nmap", url: "https://tryhackme.com/room/furthernmap", kind: "room" },
      { title: "Metasploit: Introduction", url: "https://tryhackme.com/room/metasploitintro", kind: "room" },
      { title: "Burp Suite: The Basics", url: "https://tryhackme.com/room/burpsuitebasics", kind: "room" },
      { title: "John The Ripper: The Basics", url: "https://tryhackme.com/room/johntheripperbasics", kind: "room" },
      { title: "Nessus", url: "https://tryhackme.com/room/rpnessusredux", kind: "room" },
      { title: "Hydra", url: "https://tryhackme.com/room/hydra", kind: "room" }
    ],
    note: "Series badge. Enrol via Learn, Practice, Series."
  },

  /* ----------------------------- Discontinued ------------------------ */
  {
    slug: "throwback",
    name: "Throwback",
    category: "discontinued",
    rooms: [],
    note: "The Throwback network was retired. The badge can no longer be earned; existing holders keep it."
  },
  {
    slug: "act-of-kindness",
    name: "Act of Kindness",
    category: "discontinued",
    rooms: [],
    note: "Removed badge. Kept here for collectors who still display it."
  }
];

/* Badges that do not come from a room at all. */
window.OTHER_BADGES = [
  { group: "Streaks", items: [
    "7 Day Streak", "30 Day Streak", "90 Day Streak", "180 Day Streak", "365 Day Streak",
    "500 Day Streak", "750 Day Streak", "1000 Day Streak", "1250 Day Streak", "1500 Day Streak"
  ], how: "Answer at least one question every day. Streak freezes are available to subscribers." },
  { group: "Weekly leagues", items: [
    "Bronze League", "Silver League", "Gold League", "Diamond League", "Sapphire League"
  ], how: "Finish first in your league bracket for the week." },
  { group: "Competition", items: ["King", "Monthly Hacker"],
    how: "King: win a King of the Hill game. Monthly Hacker: be the top hacker of the month." }
];

window.CATEGORIES = {
  fundamentals: { label: "Fundamentals", blurb: "Pre Security and Cyber Security 101 territory." },
  web:          { label: "Web",          blurb: "Web application hacking, from HTTP to request smuggling." },
  offensive:    { label: "Offensive",    blurb: "Boxes, networks, privilege escalation, Active Directory." },
  defensive:    { label: "Defensive",    blurb: "SOC, DFIR, threat hunting, log analysis, malware." },
  devsecops:    { label: "DevSecOps",    blurb: "Containers, pipelines, infrastructure as code." },
  engineering:  { label: "Security engineering", blurb: "Risk, crisis management, secure design." },
  events:       { label: "Events",       blurb: "Advent of Cyber, side quests, TryHack3M." },
  series:       { label: "Series",       blurb: "Multi-room series you must enrol in from Learn, Practice, Series." },
  discontinued: { label: "Discontinued", blurb: "Can no longer be earned." }
};

window.SITE = {
  version: "2026.10",
  updated: "2026-10-05"
};
