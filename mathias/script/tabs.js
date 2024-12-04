// Gestion des onglets
document.addEventListener('DOMContentLoaded', () => {
    const optionButtons = document.querySelectorAll('.option-card-choice');
    const articleSections = document.querySelectorAll('.article-section');

    // Ajouter des gestionnaires d'événements aux boutons
    optionButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetArticle = button.dataset.article;

            // Masquer toutes les sections d'articles
            articleSections.forEach((section) => section.classList.remove('active'));

            // Afficher la section correspondante
            const targetSection = document.getElementById(targetArticle);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Activer par défaut la première section au chargement
    if (articleSections.length > 0) {
        articleSections[0].classList.add('active');
    }
});
