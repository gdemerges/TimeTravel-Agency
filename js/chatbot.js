/**
 * TimeTravel Agency - Chatbot Agent powered by Gemini AI
 * Conseiller en voyages temporels avec IA générative
 * Utilise le SDK JavaScript officiel de Google GenAI
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

class TravelChatbot {
    constructor() {
        // ═══════════════════════════════════════════════════════════════════
        // CONFIGURATION - La clé API est chargée depuis js/config.js
        // Voir js/config.example.js pour créer votre fichier de config
        // ═══════════════════════════════════════════════════════════════════
        this.API_KEY = typeof CONFIG !== 'undefined' ? CONFIG.GEMINI_API_KEY : null;
        this.MODEL_NAME = 'gemini-pro';

        // Initialiser le client Gemini
        this.genAI = null;
        this.model = null;
        this.chat = null;

        // System prompt définissant la personnalité du chatbot
        this.systemPrompt = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)

Tu connais parfaitement ces trois destinations :

1. PARIS 1889 (Belle Époque)
   - Inauguration de la Tour Eiffel lors de l'Exposition Universelle
   - Cafés littéraires avec Maupassant et Verlaine
   - Moulin Rouge à ses débuts
   - Grands boulevards haussmanniens
   - Prix : à partir de 12 500€ (3 jours)

2. CRÉTACÉ -65 MILLIONS D'ANNÉES (Ère des Dinosaures)
   - Observation de T-Rex, Tricératops, Ptéranodons en liberté
   - Vol en capsule d'observation blindée sécurisée
   - Forêts primitives aux végétations géantes
   - Expérience la plus extraordinaire et unique
   - Prix : à partir de 45 000€ (équipement sécurité spécial inclus)

3. FLORENCE 1504 (Renaissance italienne)
   - Atelier de Michel-Ange achevant son David
   - Carnets de Léonard de Vinci
   - Palais des Médicis dans leur splendeur
   - Duomo et Ponte Vecchio à leur apogée
   - Prix : à partir de 18 900€ (3 jours)

Informations sur l'agence :
- Fondée en 2847 par le Pr. Helena Vance
- Plus de 2 millions de voyageurs transportés
- Taux de satisfaction : 98.7%
- Technologie : précision ±0.3 secondes, bulle de protection temporelle, protocole de non-interférence
- Sécurité absolue garantie, aucun paradoxe possible

Tu peux suggérer des destinations selon les intérêts du client :
- Romantique/art de vivre → Paris 1889
- Aventure/extraordinaire → Crétacé
- Art/culture → Florence 1504

Réponds toujours en français, de manière concise (2-4 phrases max sauf si on te demande des détails).
Ne mentionne jamais que tu es une IA ou un modèle de langage. Tu ES l'agent temporel de l'agence.`;

        // Éléments DOM
        this.widget = document.getElementById('chatbot');
        this.toggle = document.getElementById('chatbotToggle');
        this.closeBtn = document.getElementById('chatbotClose');
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.form = document.getElementById('chatbotForm');
        this.input = document.getElementById('chatbotInput');
        this.suggestions = document.getElementById('chatbotSuggestions');

        this.isOpen = false;
        this.isTyping = false;
        this.hasGreeted = false;

        this.init();
    }

    init() {
        // Vérifier si la clé API est configurée
        if (!this.API_KEY || this.API_KEY === 'VOTRE_CLE_API_GEMINI_ICI') {
            console.warn('⚠️ Clé API Gemini non configurée. Le chatbot utilisera des réponses de secours.');
            console.info('💡 Créez js/config.js depuis js/config.example.js pour activer l\'IA Gemini.');
        } else {
            // Initialiser le SDK Gemini
            this.genAI = new GoogleGenerativeAI(this.API_KEY);
            this.model = this.genAI.getGenerativeModel({
                model: this.MODEL_NAME,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 500,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            });

            // Initialiser le chat avec le system prompt
            this.chat = this.model.startChat({
                history: [
                    {
                        role: 'user',
                        parts: [{ text: this.systemPrompt }]
                    },
                    {
                        role: 'model',
                        parts: [{ text: "Compris ! Je suis l'agent temporel de TimeTravel Agency, prêt à conseiller nos clients sur nos destinations extraordinaires." }]
                    }
                ]
            });

            console.log('✅ Gemini SDK initialisé avec le modèle:', this.MODEL_NAME);
        }

        // Toggle button
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());

        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUserMessage();
        });

        // Suggestion buttons
        this.suggestions.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.input.value = btn.dataset.question;
                this.handleUserMessage();
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.widget.contains(e.target)) {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        this.isOpen ? this.closeChat() : this.openChat();
    }

    openChat() {
        this.isOpen = true;
        this.widget.classList.add('active');
        this.widget.classList.add('opened');
        this.input.focus();

        if (!this.hasGreeted) {
            this.showGreeting();
            this.hasGreeted = true;
        }
    }

    closeChat() {
        this.isOpen = false;
        this.widget.classList.remove('active');
    }

    showGreeting() {
        setTimeout(() => {
            const greeting = "Bienvenue chez TimeTravel Agency ! Je suis votre conseiller en voyages temporels. " +
                "Que vous rêviez de la Belle Époque parisienne, de l'ère des dinosaures ou de la Renaissance florentine, " +
                "je suis là pour vous guider. Comment puis-je vous aider ?";
            this.addBotMessage(greeting);
        }, 500);
    }

    async handleUserMessage() {
        const message = this.input.value.trim();
        if (!message || this.isTyping) return;

        this.addUserMessage(message);
        this.input.value = '';
        this.hideSuggestions();

        // Afficher l'indicateur de frappe
        this.showTypingIndicator();

        try {
            const response = await this.callGeminiAPI(message);
            this.hideTypingIndicator();
            this.addBotMessage(response);
        } catch (error) {
            console.error('Erreur Gemini:', error);
            this.hideTypingIndicator();

            // Réponse de secours en cas d'erreur
            const fallbackResponse = this.getFallbackResponse(message);
            this.addBotMessage(fallbackResponse);
        }
    }

    async callGeminiAPI(userMessage) {
        // Si pas de clé API ou SDK non initialisé, utiliser les réponses de secours
        if (!this.chat) {
            return this.getFallbackResponse(userMessage);
        }

        try {
            // Envoyer le message au chat (équivalent de client.models.generate_content en Python)
            const result = await this.chat.sendMessage(userMessage);
            const response = await result.response;
            const text = response.text();

            return text;
        } catch (error) {
            console.error('Erreur lors de l\'appel à l\'API Gemini:', error);

            // Afficher le détail de l'erreur si disponible
            if (error.message) {
                console.error('Message d\'erreur:', error.message);
            }

            throw error;
        }
    }

    /**
     * Réponses de secours si l'API Gemini n'est pas disponible
     */
    getFallbackResponse(input) {
        const text = input.toLowerCase();

        // Destinations
        if (this.matchesPattern(text, ['destination', 'époque', 'où', 'voyager', 'proposez'])) {
            return "Nous proposons trois destinations exceptionnelles : Paris 1889 (Belle Époque, Tour Eiffel), " +
                "le Crétacé -65M (dinosaures en liberté), et Florence 1504 (Renaissance, Michel-Ange). " +
                "Quelle époque vous attire ?";
        }

        // Paris
        if (this.matchesPattern(text, ['paris', '1889', 'eiffel', 'belle époque'])) {
            return "Paris 1889 vous plonge dans la magie de l'Exposition Universelle ! " +
                "Assistez à l'inauguration de la Tour Eiffel, découvrez le Moulin Rouge naissant. " +
                "À partir de 12 500€ pour 3 jours d'immersion totale.";
        }

        // Crétacé
        if (this.matchesPattern(text, ['crétacé', 'dinosaure', 't-rex', 'préhistoire', '-65'])) {
            return "Le Crétacé est notre aventure la plus extraordinaire ! " +
                "Observez T-Rex et Tricératops depuis notre capsule blindée sécurisée. " +
                "À partir de 45 000€, une expérience unique dans l'univers.";
        }

        // Florence
        if (this.matchesPattern(text, ['florence', '1504', 'renaissance', 'michel-ange', 'vinci'])) {
            return "Florence 1504 est le paradis des amateurs d'art ! " +
                "Voyez Michel-Ange achever son David, explorez les ateliers de Léonard. " +
                "À partir de 18 900€ pour un voyage culturel inoubliable.";
        }

        // Prix
        if (this.matchesPattern(text, ['prix', 'tarif', 'coût', 'combien', 'budget'])) {
            return "Nos tarifs (3 jours) : Paris 1889 dès 12 500€, Florence 1504 dès 18 900€, " +
                "Crétacé -65M dès 45 000€. Tout inclus : transport temporel, guide, équipement, assurance.";
        }

        // Conseils
        if (this.matchesPattern(text, ['choisir', 'conseil', 'recommand', 'hésite'])) {
            return "Pour choisir : romantique et art de vivre → Paris 1889. " +
                "Aventure extraordinaire → Crétacé. Passion art et culture → Florence 1504. " +
                "Quels sont vos centres d'intérêt ?";
        }

        // Sécurité
        if (this.matchesPattern(text, ['sécurité', 'danger', 'risque', 'sûr'])) {
            return "Sécurité absolue garantie ! Notre bulle de protection temporelle et le protocole " +
                "de non-interférence assurent votre sécurité. Aucun paradoxe possible. " +
                "200 ans d'opération sans incident.";
        }

        // Salutations
        if (this.matchesPattern(text, ['bonjour', 'salut', 'hello', 'hey'])) {
            return "Bonjour et bienvenue ! Prêt à explorer les couloirs du temps ? " +
                "Je peux vous conseiller sur nos trois destinations exceptionnelles.";
        }

        // Remerciements
        if (this.matchesPattern(text, ['merci', 'thanks', 'super', 'génial'])) {
            return "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. " +
                "L'aventure temporelle vous attend !";
        }

        // Réponse par défaut
        return "Je serais ravi de vous renseigner sur nos voyages temporels ! " +
            "Souhaitez-vous découvrir nos destinations (Paris 1889, Crétacé, Florence 1504), " +
            "connaître les tarifs, ou obtenir des conseils personnalisés ?";
    }

    matchesPattern(text, patterns) {
        return patterns.some(pattern => text.includes(pattern));
    }

    addUserMessage(text) {
        const messageEl = document.createElement('div');
        messageEl.className = 'message user';
        messageEl.textContent = text;
        this.messagesContainer.appendChild(messageEl);
        this.scrollToBottom();
    }

    addBotMessage(text) {
        const messageEl = document.createElement('div');
        messageEl.className = 'message bot';
        messageEl.textContent = text;
        this.messagesContainer.appendChild(messageEl);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        this.isTyping = true;
        const typingEl = document.createElement('div');
        typingEl.className = 'message bot typing';
        typingEl.id = 'typingIndicator';
        typingEl.innerHTML = '<span></span><span></span><span></span>';
        this.messagesContainer.appendChild(typingEl);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingEl = document.getElementById('typingIndicator');
        if (typingEl) typingEl.remove();
    }

    hideSuggestions() {
        this.suggestions.style.display = 'none';
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.travelChatbot = new TravelChatbot();
});
