# TimeTravel Agency

> Une webapp immersive pour une agence de voyage temporel de luxe fictive.

![TimeTravel Agency](https://img.shields.io/badge/Version-1.0.0-gold)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?logo=google&logoColor=white)

## Description

TimeTravel Agency est une expérience web interactive présentant une agence de voyages temporels de luxe. Le site propose trois destinations exceptionnelles à travers le temps : Paris 1889, le Crétacé (-65 millions d'années), et Florence 1504.

Le projet inclut un agent conversationnel (chatbot) intelligent propulsé par **Google Gemini AI**, capable de conseiller les visiteurs sur les destinations, répondre aux questions sur les tarifs, et guider les utilisateurs dans leur choix de voyage temporel.

### Équipe
- **Guillaume Demergès**
- **Gabriel Faucon**
- **Parvin Sultana**
- **Assaita mama Sakho**

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

### Agent Conversationnel (Chatbot IA)

Widget flottant en bas à droite propulsé par **Gemini 2.0 Flash** :
- Interface de chat moderne avec thème sombre et accents dorés
- Suggestions de questions rapides
- Indicateur de frappe animé
- **IA générative** avec mémoire conversationnelle
- Personnalité définie : professionnel, chaleureux, passionné d'histoire
- Réponses contextuelles sur :
  - Les destinations et leurs particularités
  - Les tarifs (Paris: 12 500€, Crétacé: 45 000€, Florence: 18 900€)
  - Conseils personnalisés pour choisir une époque
  - Informations sur la sécurité et les protocoles
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
| **Gemini AI** | Agent conversationnel intelligent (gemini-2.0-flash) |

## Structure du Projet

```
TimeTravel Agency/
├── index.html              # Page principale
├── css/
│   └── style.css           # Styles complets
├── js/
│   ├── main.js             # Scripts principaux
│   ├── chatbot.js          # Chatbot Gemini AI
│   ├── config.js           # Configuration avec clé API (non versionné)
│   └── config.example.js   # Template de configuration
├── assets/
│   ├── images/
│   │   ├── hero.png        # Image destination Paris 1889
│   │   ├── hero2.png       # Image destination Crétacé
│   │   └── hero3.png       # Image destination Florence
│   └── video/
│       └── video_ynov_complet.mp4  # Vidéo de fond hero
├── .gitignore              # Ignore config.js et autres fichiers sensibles
└── README.md               # Documentation
```

## Installation et Déploiement

### Prérequis

1. **Clé API Gemini (gratuite)** :
   - Allez sur [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Connectez-vous avec votre compte Google
   - Cliquez sur "Create API Key"
   - Copiez votre clé

### Configuration

1. Clonez le repository :
```bash
git clone https://github.com/votre-username/timetravel-agency.git
```

2. **Configurez la clé API Gemini** :
   ```bash
   # Copiez le fichier template
   cp js/config.example.js js/config.js

   # Éditez js/config.js et ajoutez votre clé API
   # Remplacez 'VOTRE_CLE_API_GEMINI_ICI' par votre vraie clé
   ```

   Le fichier `js/config.js` est dans `.gitignore` et ne sera **jamais poussé sur GitHub**.

3. Ajoutez vos assets :
   - `assets/video/video_ynov_complet.mp4` - Vidéo hero
   - `assets/images/hero.png` - Image Paris 1889
   - `assets/images/hero2.png` - Image Crétacé
   - `assets/images/hero3.png` - Image Florence 1504

4. Testez en local :
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js
npx serve

# Ou ouvrez simplement index.html dans votre navigateur
```

### Déploiement GitHub Pages

#### Première fois

1. Créez un repository sur GitHub

2. Initialisez Git et ajoutez le remote :
```bash
git init
git branch -M main
git remote add origin https://github.com/votre-username/timetravel-agency.git
```

3. Utilisez le script de déploiement sécurisé :
```bash
./deploy.sh
```

Ce script :
- Remplace automatiquement `config.js` par `config.production.js` (sans clé API)
- Pousse le code sur GitHub
- Restaure votre `config.js` local après le push

4. Activez GitHub Pages :
   - Allez dans Settings > Pages
   - Source : "Deploy from a branch"
   - Branch : main / (root)
   - Cliquez sur Save

5. Votre site sera accessible à : `https://votre-username.github.io/timetravel-agency/`

#### Déploiements suivants

Utilisez simplement :
```bash
./deploy.sh
```

Votre clé API locale reste protégée et n'est jamais envoyée sur GitHub !

### Sécurité de la clé API

**Important** : Le fichier `js/config.js` contenant votre clé API est dans `.gitignore` et ne sera **jamais poussé sur GitHub**.

Cependant, pour que le site fonctionne sur GitHub Pages, vous avez deux options :

**Option 1 - Site de développement local uniquement** :
- Gardez votre clé API dans `config.js` (non versionné)
- Le chatbot fonctionne en local avec Gemini AI
- Sur GitHub Pages, le chatbot utilisera les réponses de secours (pattern matching)

**Option 2 - Déployer avec l'IA sur GitHub Pages** :
- Créez une variable dans GitHub Secrets
- Utilisez GitHub Actions pour injecter la clé au build
- Ou acceptez que la clé soit visible (avec quotas Gemini gratuits)

Pour ce projet éducatif, l'**Option 1** est recommandée : développez en local avec l'IA, déployez avec les réponses de secours.

## Outils IA Utilisés

Ce projet a été développé avec l'assistance d'outils IA :

| Outil | Utilisation |
|-------|-------------|
| **Claude (Anthropic)** | Génération du code HTML/CSS/JS, architecture du projet |
| **Claude Code** | Environnement de développement assisté par IA |
| **Google Gemini 2.0 Flash** | Moteur IA du chatbot conversationnel |

### Transparence IA

- Le code front-end a été généré par Claude (modèle Opus 4.5) via Claude Code
- Le chatbot utilise l'API Gemini (gemini-2.5-flash) pour générer des réponses
- Un system prompt définit la personnalité et les connaissances de l'agent
- Des réponses de secours (fallback) sont prévues si l'API est indisponible

## Personnalisation

### Modifier le System Prompt du Chatbot

Le fichier `js/chatbot.js` contient le `systemPrompt` qui définit la personnalité du chatbot :

```javascript
this.systemPrompt = `Tu es l'assistant virtuel de TimeTravel Agency...`;
```

Modifiez ce texte pour ajuster le ton, les connaissances et le comportement de l'agent.

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
2. Mettez à jour le `systemPrompt` dans `chatbot.js` avec les infos de la destination
3. Ajoutez une image dans `assets/images/`
4. Mettez à jour les options du formulaire de réservation

## Assets Requis

| Fichier | Description | Format |
|---------|-------------|--------|
| `assets/video/video_ynov_complet.mp4` | Vidéo de fond hero | MP4 (H.264) |
| `assets/images/hero.png` | Destination Paris 1889 | PNG |
| `assets/images/hero2.png` | Destination Crétacé | PNG |
| `assets/images/hero3.png` | Destination Florence 1504 | PNG |

## Crédits

### Fonts
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) - Google Fonts (OFL)
- [Outfit](https://fonts.google.com/specimen/Outfit) - Google Fonts (OFL)

### APIs
- [Google Gemini AI](https://ai.google.dev/) - API d'IA générative

### Développement
- Projet réalisé dans le cadre d'un exercice Ynov
- Code généré avec l'assistance de Claude (Anthropic)

## Licence

Ce projet est à usage éducatif. Tous droits réservés.

---

*"Traversez le temps, vivez l'Histoire."* - TimeTravel Agency
