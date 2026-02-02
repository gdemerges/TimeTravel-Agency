#!/bin/bash

# Script de déploiement pour GitHub Pages
# ATTENTION: Ce script déploie la clé API présente dans js/config.js

echo "🚀 Préparation pour le déploiement GitHub Pages..."

# La partie qui échangeait les fichiers de configuration a été retirée
# pour permettre au chatbot de fonctionner en production (sur GitHub Pages).
# Assurez-vous que js/config.js contient la bonne clé API.

# Ajouter les fichiers
git add .

# Commit
read -p "📝 Message de commit: " commit_message
git commit -m "$commit_message"

# Push
echo "⬆️  Push vers GitHub..."
git push

echo "✅ Déploiement terminé !"
echo "🌐 Votre site sera disponible sur GitHub Pages dans quelques instants"
