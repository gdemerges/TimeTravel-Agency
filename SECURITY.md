# Sécurité de la clé API Gemini

## ⚠️ IMPORTANT : Protéger votre clé API

Votre clé API Gemini est exposée côté client sur GitHub Pages. Pour minimiser les risques d'abus :

### 1. Ajouter des restrictions HTTP Referrer

1. Allez sur [Google AI Studio - API Keys](https://aistudio.google.com/apikey)
2. Cliquez sur votre clé API
3. Cliquez sur "Add an application restriction"
4. Sélectionnez **"HTTP referrers (websites)"**
5. Ajoutez ces referrers autorisés :
   ```
   https://VOTRE-USERNAME.github.io/*
   http://localhost:*
   http://127.0.0.1:*
   ```
   Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub

6. Cliquez sur "Save"

### 2. Surveiller l'utilisation

- Vérifiez régulièrement votre usage sur [Google AI Studio](https://aistudio.google.com/)
- Consultez les quotas sur https://ai.dev/rate-limit

### 3. Alternatives plus sécurisées

Si votre quota est souvent dépassé ou si vous recevez des abus :

#### Option A : Backend Serverless (Recommandé)
Créez un backend qui protège votre clé API :
- Vercel Functions (gratuit)
- Google Cloud Functions (gratuit jusqu'à 2M requêtes/mois)
- Cloudflare Workers (gratuit jusqu'à 100k requêtes/jour)

#### Option B : Désactiver l'API en production
Revenez aux réponses pré-programmées :
```bash
# Dans .github/workflows/deploy.yml
cp js/config.production.js js/config.js
```

### 4. En cas d'abus détecté

1. Régénérez immédiatement votre clé API
2. Mettez à jour le secret GitHub : `Settings > Secrets and variables > Actions > GEMINI_API_KEY`
3. Redéployez le site

## Monitoring

Créez des alertes pour être notifié si votre quota est proche de la limite :
- Google Cloud Console > Quotas
- Configurez des notifications par email
