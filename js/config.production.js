/**
 * Configuration de Production - TimeTravel Agency
 *
 * Ce fichier est utilisé pour le déploiement sur GitHub Pages.
 * Il n'inclut pas de clé API - le chatbot utilisera les réponses de secours.
 *
 * Pour activer l'IA en production :
 * - Utilisez un backend pour protéger votre clé API
 * - Ou utilisez GitHub Secrets + GitHub Actions
 */

const CONFIG = {
    GEMINI_API_KEY: null  // Pas de clé en production = réponses de secours
};
