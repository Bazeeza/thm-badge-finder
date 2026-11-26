# Message de mise à jour (pour r/tryhackme, Discord, LinkedIn)

[![Français](https://img.shields.io/badge/Langue-Français-3fe0a0?style=for-the-badge)](update-post.fr.md)
[![English](https://img.shields.io/badge/Language-English-2b9dff?style=for-the-badge)](update-post.md)

Copiez la version qui convient au canal. Rien à remplacer : les liens sont déjà en ligne.

---

## Reddit (r/tryhackme) : réponse dans le fil d'origine sur les badges ou nouveau message

**Titre :** J'ai transformé la liste « liens vers toutes les rooms des badges » en site avec recherche : il couvre maintenant les 138 badges

Il y a quelque temps, PYROMANIA6 a publié la liste des rooms derrière chaque badge, parce que les icônes de badges des profils ne sont pas cliquables. J'ai repris cette liste, je l'ai recoupée avec le tableau des badges du dépôt de thmrevenant et avec l'API publique des badges de TryHackMe, et j'ai construit un site autour :

https://bazeeza.github.io/thm-badge-finder/

Ce qu'on y trouve maintenant :

- Les 138 badges qui existent aujourd'hui sur la plateforme (la liste d'origine en avait environ 80), chacun avec la room, le module, le parcours ou la fonction qui l'attribue, plus la description du badge par TryHackMe et l'icône officielle.
- Toute la famille SOC Level 1 associée module par module (de First Step into SOC à Boogeyman Slayer), les badges de module de SOC Level 2, AI Security, Web App Pentesting (WAF Evasion, NoScopeRCE, Model Compromise), Advent of Cyber 2025 et sa side quest, SOC Simulator, les ligues, les séries de jours.
- Des corrections de l'ancienne liste : « Phishing » s'appelle maintenant Phish Hunter ; Wireshark vient des rooms Wireshark de SOC L1 (Wireshark 101 est l'ancien déclencheur) ; il n'existe pas de badge « Advent of Cyber 2 » ; 3 Million Legend ne demande qu'une room selon le texte même de TryHackMe.
- Un suivi : cochez ce que vous possédez, ou tapez votre nom d'utilisateur pour importer votre liste publique de badges. Enregistré dans votre navigateur seulement.

14 badges sont encore marqués « needs verification » (surtout les badges de module de SOC L2 comme MalBuster, APT X Hunter, Flow Hunter, Domain Guardian, M365 Sentry, plus Tooling Specialist et quelques badges de la plateforme). Si vous en possédez un, l'entrée de `https://tryhackme.com/api/v2/public-profile/badges?username=YOU&limit=100` suffit pour le confirmer : commentez ou ouvrez une issue sur le dépôt.

Dépôt (MIT, PR bienvenues) : https://github.com/bazeeza/thm-badge-finder

---

## Discord (#resources) : version courte

J'ai fait un site de correspondance badge TryHackMe → room : https://bazeeza.github.io/thm-badge-finder/
Les 138 badges, descriptions et icônes officielles, recherche, filtres, et un suivi qui peut importer votre liste publique de badges à partir de votre nom d'utilisateur. 14 sont encore marqués « needs verification » : si vous avez MalBuster / APT X Hunter / Flow Hunter / Domain Guardian / M365 Sentry / Tooling Specialist, dites-moi quelle room vous l'a donné. Dépôt : github.com/bazeeza/thm-badge-finder

---

## LinkedIn / X

Version 2 de TryHackMe Badge Finder publiée : chacun des 138 badges de la plateforme est associé à la room, au module ou à la fonction qui l'attribue, avec les descriptions et illustrations officielles, plus un suivi qui importe votre liste publique de badges.

Construit à partir de la liste communautaire de r/tryhackme, du tableau de thmrevenant et de l'API publique des badges de TryHackMe. Site statique sur GitHub Pages, licence MIT, un seul fichier de données à modifier.

https://bazeeza.github.io/thm-badge-finder/

#TryHackMe #cybersécurité #blueteam #SOC

---

## Résumé des changements (pour les notes de version GitHub)

Collez la section « 2026.10.2 » de [CHANGELOG.fr.md](../CHANGELOG.fr.md).
