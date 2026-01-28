# TimeTravel Agency

> Une webapp immersive pour une agence de voyage temporel de luxe fictive.

![TimeTravel Agency](https://img.shields.io/badge/Version-1.0.0-gold)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Description

TimeTravel Agency est une expérience web interactive présentant une agence de voyages temporels de luxe. Le site propose trois destinations exceptionnelles à travers le temps : Paris 1889, le Crétacé (-65 millions d'années), et Florence 1504.

Le projet inclut un agent conversationnel (chatbot) intelligent capable de conseiller les visiteurs sur les destinations, répondre aux questions sur les tarifs, et guider les utilisateurs dans leur choix de voyage temporel.

## Fonctionnalités

### Pages et Sections

- **Hero Section** : Vidéo de fond immersive avec animation de présentation
- **Section À Propos** : Présentation des valeurs de l'agence (Précision, Expérience, Sécurité)
- **Galerie des Destinations** : 3 cartes interactives avec effet parallax
  - Paris 1889 - Belle Époque
  - Crétacé -65M - Ère des Dinosaures
  - Florence 1504 - Renaissance
- **Formulaire de Réservation** : Formulaire complet avec validation
- **Footer** : Navigation et informations de contact

### Agent Conversationnel (Chatbot)

Widget flottant en bas à droite avec :
- Interface de chat moderne
- Suggestions de questions rapides
- Indicateur de frappe
- Réponses contextuelles sur :
  - Les destinations et leurs particularités
  - Les tarifs (Paris: 12 500€, Crétacé: 45 000€, Florence: 18 900€)
  - Conseils personnalisés pour choisir une époque
  - Informations sur la sécurité et les protocoles
  - Processus de réservation
  - FAQ générale

### Design

- **Thème** : Sombre avec accents dorés (Art Déco futuriste)
- **Typographie** :
  - Titres : Cormorant Garamond (serif élégant)
  - Corps : Outfit (sans-serif moderne)
- **Effets** : Animations fluides, effet de lueur au curseur, parallax sur les cartes
- **Responsive** : Adapté à tous les écrans (mobile, tablette, desktop)

## Technologies Utilisées

| Technologie | Utilisation |
|-------------|-------------|
| HTML5 | Structure sémantique |
| CSS3 | Styles, animations, variables CSS, Grid/Flexbox |
| JavaScript (Vanilla) | Interactions, chatbot, animations scroll |
| Google Fonts | Typographies (Cormorant Garamond, Outfit) |

## Structure du Projet

```
TimeTravel Agency/
├── index.html              # Page principale
├── css/
│   └── style.css           # Styles complets
├── js/
│   ├── main.js             # Scripts principaux
│   └── chatbot.js          # Logique du chatbot
├── assets/
│   ├── images/
│   │   ├── paris-1889.jpg  # Image destination Paris
│   │   ├── cretace.jpg     # Image destination Crétacé
│   │   └── florence-1504.jpg # Image destination Florence
│   └── video/
│       └── hero.mp4        # Vidéo de fond hero
└── README.md               # Documentation
```

## Installation et Déploiement

### En Local

1. Clonez le repository :
```bash
git clone https://github.com/votre-username/timetravel-agency.git
```

2. Ajoutez vos assets :
   - Placez votre vidéo hero dans `assets/video/hero.mp4`
   - Placez vos images de destinations dans `assets/images/`

3. Ouvrez `index.html` dans votre navigateur ou utilisez un serveur local :
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js (npx serve)
npx serve
```

### Déploiement GitHub Pages

1. Créez un repository sur GitHub

2. Poussez le code :
```bash
git init
git add .
git commit -m "Initial commit - TimeTravel Agency webapp"
git branch -M main
git remote add origin https://github.com/votre-username/timetravel-agency.git
git push -u origin main
```

3. Activez GitHub Pages :
   - Allez dans Settings > Pages
   - Source : "Deploy from a branch"
   - Branch : main / (root)
   - Cliquez sur Save

4. Votre site sera accessible à : `https://votre-username.github.io/timetravel-agency/`

## Outils IA Utilisés

Ce projet a été développé avec l'assistance de :

| Outil | Utilisation |
|-------|-------------|
| **Claude (Anthropic)** | Génération du code HTML/CSS/JS, logique du chatbot, architecture du projet |
| **Claude Code** | Environnement de développement assisté par IA |

### Transparence IA

- Le code a été généré par Claude (modèle Opus 4.5) via Claude Code
- La logique de conversation du chatbot utilise du pattern matching (pas d'API IA externe)
- Les réponses du chatbot sont pré-définies pour assurer cohérence et contrôle

## Personnalisation

### Modifier le Chatbot

Le fichier `js/chatbot.js` contient la classe `TravelChatbot`. Pour ajouter de nouvelles réponses :

```javascript
// Dans la méthode generateResponse()
if (this.matchesPattern(text, ['votre', 'mot-clé'])) {
    return "Votre nouvelle réponse ici";
}
```

### Modifier les Couleurs

Les variables CSS sont définies dans `css/style.css` :

```css
:root {
    --color-gold: #c9a227;        /* Accent principal */
    --color-bg-deep: #08090c;     /* Fond sombre */
    /* ... */
}
```

### Ajouter une Destination

1. Ajoutez une nouvelle carte dans `index.html` (section `destinations-grid`)
2. Ajoutez les patterns de réponse dans `chatbot.js`
3. Mettez à jour les options du formulaire de réservation

## Assets Requis

Pour que le site fonctionne correctement, vous devez fournir :

| Fichier | Dimensions recommandées | Format |
|---------|------------------------|--------|
| `assets/video/hero.mp4` | 1920x1080 | MP4 (H.264) |
| `assets/images/paris-1889.jpg` | 800x600 | JPG/WebP |
| `assets/images/cretace.jpg` | 800x600 | JPG/WebP |
| `assets/images/florence-1504.jpg` | 800x600 | JPG/WebP |

## Crédits

### Fonts
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) - Google Fonts (OFL)
- [Outfit](https://fonts.google.com/specimen/Outfit) - Google Fonts (OFL)

### Développement
- Projet réalisé dans le cadre d'un exercice Ynov
- Code généré avec l'assistance de Claude (Anthropic)

## Licence

Ce projet est à usage éducatif. Tous droits réservés.

---

*"Traversez le temps, vivez l'Histoire."* - TimeTravel Agency
