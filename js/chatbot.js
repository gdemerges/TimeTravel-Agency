/**
 * TimeTravel Agency - Chatbot Agent
 * AI-powered travel advisor for temporal destinations
 */

class TravelChatbot {
    constructor() {
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
            this.addBotMessage(
                "Bienvenue chez TimeTravel Agency ! Je suis votre conseiller en voyages temporels. " +
                "Je peux vous aider à choisir votre destination, vous informer sur nos tarifs, " +
                "ou répondre à toutes vos questions sur l'expérience de voyage dans le temps. " +
                "Comment puis-je vous aider aujourd'hui ?"
            );
        }, 500);
    }

    handleUserMessage() {
        const message = this.input.value.trim();
        if (!message || this.isTyping) return;

        this.addUserMessage(message);
        this.input.value = '';
        this.hideSuggestions();

        // Process and respond
        setTimeout(() => {
            this.showTypingIndicator();
            const response = this.generateResponse(message);

            setTimeout(() => {
                this.hideTypingIndicator();
                this.addBotMessage(response);
            }, 1000 + Math.random() * 1000);
        }, 300);
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

    /**
     * Response Generation Logic
     * Pattern matching for common travel queries
     */
    generateResponse(input) {
        const text = input.toLowerCase();

        // Greetings
        if (this.matchesPattern(text, ['bonjour', 'salut', 'hello', 'hey', 'coucou', 'bonsoir'])) {
            return this.getRandomResponse([
                "Bonjour ! Ravi de vous accueillir chez TimeTravel Agency. Quelle époque vous fait rêver ?",
                "Bienvenue, voyageur temporel ! Comment puis-je vous guider vers votre prochaine aventure ?",
                "Bonjour ! Prêt à explorer les couloirs du temps ? Je suis là pour vous conseiller."
            ]);
        }

        // Destinations overview
        if (this.matchesPattern(text, ['destination', 'époque', 'où', 'voyager', 'aller', 'proposez', 'offres'])) {
            return "Nous proposons trois destinations temporelles exceptionnelles :\n\n" +
                "🗼 Paris 1889 - Vivez la Belle Époque et l'inauguration de la Tour Eiffel\n" +
                "🦖 Crétacé (-65M) - Observez les dinosaures dans leur habitat naturel\n" +
                "🎨 Florence 1504 - Rencontrez les maîtres de la Renaissance\n\n" +
                "Quelle époque vous attire le plus ?";
        }

        // Paris 1889
        if (this.matchesPattern(text, ['paris', '1889', 'eiffel', 'belle époque', 'exposition'])) {
            return "Paris 1889 est notre destination la plus romantique ! Vous pourrez :\n\n" +
                "• Assister à l'inauguration de la Tour Eiffel lors de l'Exposition Universelle\n" +
                "• Dîner dans les cafés littéraires où se réunissent Maupassant et Verlaine\n" +
                "• Découvrir le Moulin Rouge à ses débuts\n" +
                "• Flâner sur les grands boulevards haussmanniens\n\n" +
                "Tarif : à partir de 12 500€ pour un séjour de 3 jours. Un voyage dans l'élégance !";
        }

        // Crétacé
        if (this.matchesPattern(text, ['crétacé', 'dinosaure', 't-rex', 'préhistoire', '-65', 'jurassique'])) {
            return "Le Crétacé est notre aventure la plus extraordinaire ! Imaginez :\n\n" +
                "• Observer des T-Rex, Tricératops et Ptéranodons en liberté\n" +
                "• Survoler les plaines préhistoriques en capsule d'observation blindée\n" +
                "• Explorer des forêts primitives aux végétations géantes\n" +
                "• Sécurité maximale garantie par notre bulle temporelle\n\n" +
                "Tarif : à partir de 45 000€ (justifié par l'équipement de sécurité spécial). Une expérience unique dans l'univers !";
        }

        // Florence 1504
        if (this.matchesPattern(text, ['florence', '1504', 'renaissance', 'michel-ange', 'vinci', 'italie', 'david'])) {
            return "Florence 1504 est le paradis des amateurs d'art ! Vous découvrirez :\n\n" +
                "• L'atelier de Michel-Ange alors qu'il achève son David\n" +
                "• Les carnets de Léonard de Vinci en personne\n" +
                "• Les palais des Médicis dans leur splendeur originelle\n" +
                "• Le Duomo et le Ponte Vecchio à leur apogée\n\n" +
                "Tarif : à partir de 18 900€. Un voyage culturel inoubliable !";
        }

        // Prices
        if (this.matchesPattern(text, ['prix', 'tarif', 'coût', 'combien', 'budget', 'cher', 'argent', '€', 'euro'])) {
            return "Voici nos tarifs de base (séjour 3 jours, 1 voyageur) :\n\n" +
                "🗼 Paris 1889 : à partir de 12 500€\n" +
                "🦖 Crétacé -65M : à partir de 45 000€\n" +
                "🎨 Florence 1504 : à partir de 18 900€\n\n" +
                "Ces prix incluent : transport temporel, guide historien, équipement d'immersion, et assurance temporelle complète.\n\n" +
                "Des options premium existent : séjours prolongés, groupes, expériences VIP... Souhaitez-vous un devis personnalisé ?";
        }

        // How to choose
        if (this.matchesPattern(text, ['choisir', 'conseil', 'recommand', 'suggér', 'hésite', 'lequel', 'laquelle', 'meilleur', 'préfér'])) {
            return "Excellente question ! Voici mes conseils pour choisir :\n\n" +
                "👉 Vous êtes romantique et aimez l'art de vivre ? → Paris 1889\n" +
                "👉 Vous cherchez l'aventure et l'extraordinaire ? → Crétacé\n" +
                "👉 Vous êtes passionné d'art et de culture ? → Florence 1504\n\n" +
                "Pour les familles, je recommande souvent Paris 1889 (accessible à tous les âges). " +
                "Pour une première expérience temporelle, c'est également idéal.\n\n" +
                "Pouvez-vous me dire ce qui vous attire le plus dans un voyage ?";
        }

        // Safety
        if (this.matchesPattern(text, ['sécurité', 'danger', 'risque', 'sûr', 'safe', 'protection', 'paradoxe'])) {
            return "La sécurité est notre priorité absolue ! Notre technologie garantit :\n\n" +
                "🛡️ Bulle de protection temporelle personnelle\n" +
                "🔒 Protocole de non-interférence historique (vous observez sans modifier)\n" +
                "⏰ Précision de ±0.3 secondes sur les coordonnées temporelles\n" +
                "🧬 Pas de risque de paradoxe (technologie quantique brevetée)\n" +
                "👨‍⚕️ Assistance médicale temporelle 24/7\n\n" +
                "En 200 ans d'opération (depuis 2847), nous n'avons jamais eu d'incident grave. Voyagez l'esprit tranquille !";
        }

        // Booking
        if (this.matchesPattern(text, ['réserv', 'book', 'commander', 'acheter', 'inscription', 'réserver'])) {
            return "Pour réserver votre voyage temporel :\n\n" +
                "1️⃣ Remplissez le formulaire de réservation sur notre site\n" +
                "2️⃣ Un conseiller vous contactera sous 24h pour personnaliser votre expérience\n" +
                "3️⃣ Après validation, vous recevrez votre kit de préparation historique\n" +
                "4️⃣ Séance de briefing obligatoire 48h avant le départ\n\n" +
                "Vous pouvez aussi nous appeler au +33 1 23 45 67 89 pour un conseil personnalisé. Prêt à franchir le pas ?";
        }

        // Duration
        if (this.matchesPattern(text, ['durée', 'combien de temps', 'jours', 'semaine', 'long'])) {
            return "Nos formules de séjour :\n\n" +
                "• 1 jour : Découverte express (idéal pour une première expérience)\n" +
                "• 3 jours : Notre formule classique (la plus populaire)\n" +
                "• 1 semaine : Immersion complète\n" +
                "• 2 semaines : Pour les passionnés qui veulent tout voir\n\n" +
                "Le temps s'écoule normalement dans l'époque visitée, mais nous vous ramenons exactement au moment de votre départ. Aucun jet-lag temporel !";
        }

        // What to bring
        if (this.matchesPattern(text, ['emporter', 'valise', 'bagages', 'préparer', 'amener', 'vetement'])) {
            return "Pour votre voyage temporel, nous fournissons tout !\n\n" +
                "✅ Inclus dans votre réservation :\n" +
                "• Garde-robe d'époque authentique\n" +
                "• Traducteur temporel universel\n" +
                "• Monnaie d'époque\n" +
                "• Kit de survie adapté\n\n" +
                "⛔ Interdit :\n" +
                "• Appareils électroniques modernes\n" +
                "• Objets anachroniques\n" +
                "• Médicaments non validés\n\n" +
                "Vous recevrez un guide complet 2 semaines avant le départ.";
        }

        // Who / Company
        if (this.matchesPattern(text, ['qui êtes', 'agence', 'entreprise', 'société', 'histoire', 'fondateur'])) {
            return "TimeTravel Agency a été fondée en 2847 par le Pr. Helena Vance, pionnière de la chronophysique.\n\n" +
                "Depuis, nous avons transporté plus de 2 millions de voyageurs à travers le temps, " +
                "avec un taux de satisfaction de 98,7%.\n\n" +
                "Notre siège se trouve dans la Zone Temporelle Neutre de Genève. " +
                "Nous détenons l'accréditation de l'Autorité Temporelle Internationale.\n\n" +
                "Notre mission : rendre l'Histoire accessible et vivante pour tous.";
        }

        // Languages
        if (this.matchesPattern(text, ['langue', 'parler', 'anglais', 'comprendre', 'communication'])) {
            return "Excellente question ! Grâce à notre traducteur temporel universel, " +
                "vous comprendrez et serez compris dans n'importe quelle époque.\n\n" +
                "Ce dispositif discret (implanté temporairement dans l'oreille) traduit " +
                "instantanément toutes les langues, y compris le vieux français, l'italien médiéval, " +
                "et même les signaux des dinosaures !\n\n" +
                "Nos guides parlent couramment français, anglais, et les langues de destination.";
        }

        // Thank you
        if (this.matchesPattern(text, ['merci', 'thanks', 'super', 'génial', 'parfait', 'excellent'])) {
            return this.getRandomResponse([
                "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Bon voyage à travers le temps ! 🕰️",
                "Je suis ravi d'avoir pu vous aider ! L'aventure temporelle vous attend. ✨",
                "C'est un plaisir de vous accompagner dans cette aventure ! À bientôt à bord de notre machine temporelle."
            ]);
        }

        // Goodbye
        if (this.matchesPattern(text, ['au revoir', 'bye', 'à bientôt', 'ciao', 'adieu'])) {
            return "Au revoir et à bientôt ! Que le temps vous soit favorable. " +
                "N'hésitez pas à revenir si vous avez d'autres questions. " +
                "L'équipe TimeTravel Agency sera toujours là pour vous guider. 🕰️✨";
        }

        // Default response
        return this.getRandomResponse([
            "Question intéressante ! Pour vous répondre au mieux, pourriez-vous préciser votre demande ? " +
            "Je peux vous renseigner sur nos destinations (Paris 1889, Crétacé, Florence 1504), " +
            "les tarifs, la sécurité, ou comment réserver.",

            "Je ne suis pas sûr de bien comprendre. Souhaitez-vous des informations sur :\n" +
            "• Nos trois destinations temporelles\n" +
            "• Les tarifs et formules\n" +
            "• La sécurité et le déroulement du voyage\n" +
            "• Comment réserver ?",

            "Je suis spécialisé dans les voyages temporels ! Dites-moi ce qui vous intéresse : " +
            "découvrir nos époques, comparer les prix, ou obtenir des conseils pour choisir votre destination ?"
        ]);
    }

    matchesPattern(text, patterns) {
        return patterns.some(pattern => text.includes(pattern));
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.travelChatbot = new TravelChatbot();
});
