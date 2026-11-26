# Contribuer

[![Français](https://img.shields.io/badge/Langue-Français-3fe0a0?style=for-the-badge)](CONTRIBUTING.fr.md)
[![English](https://img.shields.io/badge/Language-English-2b9dff?style=for-the-badge)](CONTRIBUTING.md)

Les contributions arrivent sous forme d'**issues et de commentaires**. Les pull requests sont
réservées aux collaborateurs : le mainteneur applique chaque changement à `data/badges.js`
après l'avoir vérifié, pour que rien de l'extérieur n'atteigne le site sans relecture.

## Signaler un badge faux ou manquant
Ouvrez une issue avec le modèle **Fix a badge**. Indiquez le nom du badge exactement comme TryHackMe l'affiche et l'URL de la room qui l'a attribué. La meilleure preuve est votre propre entrée à `https://tryhackme.com/api/v2/public-profile/badges?username=<you>&limit=100` (elle montre le slug, le titre, la description, l'image et la date), à côté de la room que vous avez terminée juste avant.

## Confirmer un badge « needs verification »
Si vous avez obtenu un badge marqué *needs verification* (à vérifier), commentez son issue (ou ouvrez-en une) avec la room qui l'a déclenché et votre entrée de l'API.

## Essayer en local
Faites une copie (*fork*), modifiez `data/badges.js`, puis vérifiez votre changement de la même façon que la CI :

```bash
python3 -I scripts/safe_data.py        # the data must be plain data
python3 -I scripts/test_safe_data.py   # attack tests
python3 scripts/build.py --site https://bazeeza.github.io/thm-badge-finder/
```

(Les commentaires signifient : les données doivent être de simples données ; tests d'attaque.)

Collez le résultat dans votre issue si cela aide.

## Sécurité
Ne signalez jamais une vulnérabilité dans une issue publique. Voir [SECURITY.fr.md](SECURITY.fr.md).

Pas de solutions (*walkthroughs*), de flags ni d'illustrations redistribuées : c'est un index, pas une antisèche.
