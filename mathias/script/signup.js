import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://lxvfirrxgdinwlwoxgpc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4dmZpcnJ4Z2Rpbndsd294Z3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MTc0MjUsImV4cCI6MjA0ODI5MzQyNX0.i-YA0qXXL_EVyoCZpP0D0utiBtDlv453jWpM9uNpGTw';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

console.log('Supabase Client initialisé:', supabaseClient);


document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;

    const errorMessage = document.getElementById('error-message') || document.createElement('p');
    errorMessage.style.color = 'red';
    const successMessage = document.getElementById('success-message') || document.createElement('p');
    successMessage.style.color = 'green';

    // Réinitialiser les messages
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';

    try {
        // Étape 1 : Créer un utilisateur avec Supabase
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    prenom,
                    nom,
                },
            },
        });

        if (error) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Erreur : ' + error.message;
            return;
        }

        // Étape 2 : Ajouter les informations supplémentaires à la table 'user_roles'
        if (data.user) {
            const { error: roleError } = await supabaseClient
                .from('user_roles')
                .insert([{ 
                    user_id: data.user.id, 
                    role: 'user',
                    prenom: prenom,
                    nom: nom,
                }]);

            if (roleError) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Erreur lors de l\'attribution du rôle : ' + roleError.message;
                return;
            }

            // Étape 3 : Redirection après une inscription réussie
            successMessage.style.display = 'block';
            successMessage.textContent = 'Inscription réussie ! Redirection...';
            setTimeout(() => {
                window.location.href = 'info-choice.html';
            }, 1500); // Redirection après 1.5 secondes
        }
    } catch (err) {
        console.error('Erreur inattendue :', err);
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Une erreur inattendue est survenue.';
    }
});