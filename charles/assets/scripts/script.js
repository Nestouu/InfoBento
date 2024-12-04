// main.js
document.querySelectorAll('.bento-item').forEach(item => {
    item.addEventListener('click', () => {
        alert(`Vous avez cliqué sur ${item.textContent}`);
    });
});

document.querySelector('.show-password').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '🙈'; // Change l'icône
});

// Articles prédéfinis
const articles = {
    "article-1": {
        title: "Joe Biden : le sel de la Maison Blanche",
        description: "Joe Biden fait la une après une série d’événements houleux. Une sauce piquante pour ses électeurs."
    },
    "article-2": {
        title: "SpaceX : Le Sucré Vers Mars",
        description: "Elon Musk envoie des friandises et une nouvelle mission qui nous fait rêver de l’espace."
    },
    "article-3": {
        title: "Marathon de Valence : Énergie Pure",
        description: "La course de l'année. Des performances incroyables qui marquent les esprits et l’histoire."
    },
    "article-4": {
        title: "Potion magique ou buzz marketing ?",
        description: "Découvrez l’histoire virale de la potion qui promet de booster vos collègues."
    }
};

// Ajout d'interactions
document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => {
        const articleKey = card.dataset.article;
        const article = articles[articleKey];

        // Mise à jour du contenu de l'article
        document.getElementById('article-title').textContent = article.title;
        document.getElementById('article-description').textContent = article.description;

        // Gestion des classes actives
        document.querySelectorAll('.option-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
    });
});