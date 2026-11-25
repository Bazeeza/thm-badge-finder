# Journal des modifications

[![Français](https://img.shields.io/badge/Langue-Français-3fe0a0?style=for-the-badge)](CHANGELOG.fr.md)
[![English](https://img.shields.io/badge/Language-English-2b9dff?style=for-the-badge)](CHANGELOG.md)

Tous les changements notables de TryHackMe Badge Finder. Les dates correspondent à la version des données dans `data/badges.js`.

## 2026.10.2 — 18 octobre 2026

Le jeu de données correspond maintenant au catalogue complet des badges de TryHackMe (138 badges, vérifiés avec l'onglet des badges d'un profil réel) au lieu des 80 badges de rooms de la liste communautaire d'origine.

### Ajouté
- 58 badges qui manquaient, dont toute la famille des modules de SOC Level 1 (First Step into SOC, SOC Apprentice, Defensive Toolsmith, Network Hog, Web Defender, Windows Guardian, Linux Guardian, Malware Explorer, Lookup Champion), les badges de module de SOC Level 2 (MalBuster, APT X Hunter, Flow Hunter, Domain Guardian, M365 Sentry, SOC Level-Up), les badges AI Security (AI Path, Adversarial Defence Ops, Model Compromise, AI Odyssey), les badges Web Application Pentesting (WAF Evasion, NoScopeRCE, Tooling Specialist), Advent of Cyber 2025 et sa Side Quest (24 rooms quotidiennes + 4 rooms de side quest), les badges SOC Simulator, les sept ligues plus Chaos Reigns et League Locked Legend, les séries de 3 / 1750 / 2000 jours, Raffle Royalty, Session Held, First Mobile Quiz, Study Group, Best Friends Forever, TryTrailMe, Alpha et Beta.
- La description d'une ligne de TryHackMe sur chaque badge où elle est connue (depuis l'API publique des badges de profil).
- Les illustrations officielles des badges chargées depuis le CDN de TryHackMe, avec une solution de repli par fichier local puis par espace réservé.
- « Import from TryHackMe » dans le suivi : tapez un nom d'utilisateur pour cocher tous les badges de ce profil.
- Les champs `desc` et `img` dans le modèle de données ; les types de liens `path` et `feature` ; les nouvelles catégories AI security, SOC Simulator, Leagues, Streaks, Platform.
- Le paramètre de requête `?q=` pour des recherches préremplies (utilisé par le balisage de la boîte de recherche sitelinks).
- Ce journal des modifications.

### Modifié
- « Phishing » s'appelle maintenant **Phish Hunter** (TryHackMe l'a renommé ; même slug de badge).
- **Wireshark** pointe maintenant vers les rooms Wireshark de SOC Level 1 ; Wireshark 101 est indiqué comme ancien déclencheur.
- **Boogeyman Slayer** liste tout le module capstone de SOC L1 (Tempest + Boogeyman 1–3).
- **3 Million Legend** : selon la description de TryHackMe, résoudre une seule room du module suffit (il était indiqué les cinq).
- **The Return of the Yeti** : attribué pour n'importe quel défi de la side quest 2023 ; SNOW/OFF est pour les quatre.
- **Changing Hats** liste les deux rooms Atomic Bird.
- Les badges de module affichent maintenant d'abord le lien du module, puis les rooms.
- Le tri par défaut se fait par catégorie.

### Retiré
- « Advent of Cyber 2 » : ce badge n'existe pas sur TryHackMe.

### Encore à vérifier (14)
Tooling Specialist, WAF Evasion, MalBuster, APT X Hunter, Flow Hunter, Domain Guardian, M365 Sentry, SOC Level-Up, Completed a tabletop exercise (URL de fonction), First Mobile Quiz (URL de fonction), League Locked Legend, Study Group, Best Friends Forever, TryTrailMe. Si vous en possédez un, ouvrez une issue avec l'entrée de l'API des badges de votre profil.

## 2026.10 — 5 octobre 2026

Première publication : 80 badges de rooms tirés de la liste communautaire de r/tryhackme, recoupés avec le tableau de thmrevenant ; site avec recherche, filtres par catégorie, suivi de progression, référencement (SEO), déploiement sur GitHub Pages, vérification hebdomadaire des liens.
