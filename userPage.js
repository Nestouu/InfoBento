import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://lxvfirrxgdinwlwoxgpc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4dmZpcnJ4Z2Rpbndsd294Z3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MTc0MjUsImV4cCI6MjA0ODI5MzQyNX0.i-YA0qXXL_EVyoCZpP0D0utiBtDlv453jWpM9uNpGTw';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

console.log('Supabase Client initialisé:', supabaseClient);

document.getElementById('logout-button').addEventListener('click', async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert('Erreur lors de la déconnexion : ' + error.message);
        return;
    }

    // Redirection vers la page de connexion
    window.location.href = 'login.html';
});

// Facultatif : Charger les informations utilisateur
(async () => {
    const { data: user, error } = await supabaseClient.auth.getUser();

    if (error) {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
        return;
    }

    if (user) {
        console.log('Utilisateur connecté :', user);
    } else {
        // Redirige si l'utilisateur n'est pas connecté
        window.location.href = 'login.html';
    }
})();