// Gestion des onglets
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const targetTab = event.target.dataset.tab;

        // Supprime la classe active de tous les onglets et boutons
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

        // Active l'onglet et le bouton correspondant
        document.getElementById(targetTab).classList.add('active');
        event.target.classList.add('active');
    });
});
