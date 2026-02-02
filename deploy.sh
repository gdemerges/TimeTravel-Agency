#!/bin/bash

# Script de déploiement pour GitHub Pages
# Remplace config.js par config.production.js pour protéger la clé API

echo "🚀 Préparation pour le déploiement GitHub Pages..."

# Sauvegarder config.js si il existe
if [ -f "js/config.js" ]; then
    echo "💾 Sauvegarde de js/config.js → js/config.local.js"
    cp js/config.js js/config.local.js
fi

# Utiliser la config de production
echo "🔄 Utilisation de config.production.js pour le déploiement"
cp js/config.production.js js/config.js

# Ajouter les fichiers
git add .

# Commit
read -p "📝 Message de commit: " commit_message
git commit -m "$commit_message"

# Push
echo "⬆️  Push vers GitHub..."
git push

# Restaurer la config locale
if [ -f "js/config.local.js" ]; then
    echo "♻️  Restauration de la config locale"
    mv js/config.local.js js/config.js
fi

echo "✅ Déploiement terminé !"
echo "🌐 Votre site sera disponible sur GitHub Pages dans quelques instants"
