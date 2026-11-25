# Politique de sécurité

[![Français](https://img.shields.io/badge/Langue-Français-3fe0a0?style=for-the-badge)](SECURITY.fr.md)
[![English](https://img.shields.io/badge/Language-English-2b9dff?style=for-the-badge)](SECURITY.md)

TryHackMe Badge Finder est un site statique (HTML, CSS, JavaScript) hébergé sur GitHub Pages.
Il n'y a ni serveur, ni connexion, ni base de données, ni cookie. Votre progression est
enregistrée uniquement dans votre propre navigateur.

Oui, ce projet est fait pour une communauté de hackers. Il est conçu pour tenir le coup.

## Ce qui est en place

**Le site**
- Politique de sécurité du contenu (CSP) stricte : seuls les scripts du site s'exécutent. Aucun
  script en ligne, aucun style en ligne, aucun `eval`, aucun plugin, aucun formulaire envoyé
  nulle part, aucun détournement par `<base>`. Images seulement depuis le site et le CDN des
  badges de TryHackMe ; aucune requête réseau (`connect-src` n'est pas autorisé).
- Chaque texte est échappé en HTML avant d'être affiché.
- Les liens et les images sont vérifiés une seconde fois dans le navigateur : seuls les liens
  `https://tryhackme.com/...` et de simples noms de fichiers d'images sont utilisés.
- Les fichiers de progression importés et la progression enregistrée sont considérés comme non
  fiables : taille limitée, et seuls les identifiants de vrais badges sont conservés.
- Les liens externes s'ouvrent avec `rel="noopener noreferrer"`.

**Les données (`data/badges.js`)**
- Le fichier n'est jamais exécuté par les outils de construction. `scripts/safe_data.py` le lit
  comme de simples données et refuse le code, le HTML, les liens `javascript:`/`data:`, les URL
  qui ne sont pas de TryHackMe, l'injection Markdown, la pollution de prototype et les caractères
  cachés (contrôle, largeur nulle, bidi / « Trojan Source »).
- `scripts/test_safe_data.py` lance des charges d'attaque contre ce validateur à chaque push et
  à chaque pull request.

**Le dépôt**
- Seul le mainteneur peut modifier le code. Les pull requests sont réservées aux collaborateurs ;
  tout le monde peut ouvrir une issue et commenter.
- `main` est protégée contre le force-push et la suppression.
- GitHub Actions : épinglées sur des SHA de commit complets, jeton en lecture seule, aucun secret,
  `pull_request` (jamais `pull_request_target`), limite de temps sur chaque job.
- Détection de secrets avec protection au push, alertes et mises à jour Dependabot.

## Signaler une vulnérabilité

Merci de la signaler en privé, pas dans une issue publique :

- **GitHub :** [Signaler une vulnérabilité](https://github.com/Bazeeza/thm-badge-finder/security/advisories/new)
  (avis de sécurité privé)
- **Courriel :** info@bazeeza.ca

Indiquez les étapes pour reproduire le problème et ce qu'un attaquant y gagnerait. Vous recevrez
une réponse sous 7 jours. Les signalements valides sont crédités dans le journal des
modifications si vous le souhaitez. Il n'y a pas de programme de récompense (*bug bounty*).

## Règles pour les tests

Bienvenu :
- Tester le site dans votre propre navigateur, lire le code source, lancer le validateur et les
  tests en local, essayer des charges dans une copie (*fork*).

Pas bienvenu :
- Attaquer TryHackMe, GitHub ou d'autres utilisateurs. L'API et le CDN de TryHackMe ne font pas
  partie de ce projet ; signalez leurs problèmes à TryHackMe.
- Déni de service, spam, requêtes massives automatisées ou ingénierie sociale.

Les signalements faits de bonne foi selon ces règles n'entraîneront aucune plainte.

## Limites connues

- GitHub Pages ne peut pas envoyer d'en-têtes HTTP personnalisés : la CSP est donc définie avec
  une balise `<meta>`. `frame-ancestors` (protection contre l'intégration dans un cadre) ne peut
  pas être défini de cette façon. Le site n'a ni compte ni action sensible : l'intégrer dans un
  cadre ne rapporte rien.
- La feuille de style de Google Fonts ne peut pas utiliser l'intégrité des sous-ressources (SRI),
  car Google change le fichier selon le navigateur. Les polices ne servent qu'à la mise en forme
  et ne peuvent pas exécuter de code sous la CSP.
