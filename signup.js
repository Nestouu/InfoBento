//import { supabaseClient } from './supabaseClient.js';

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://lxvfirrxgdinwlwoxgpc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4dmZpcnJ4Z2Rpbndsd294Z3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MTc0MjUsImV4cCI6MjA0ODI5MzQyNX0.i-YA0qXXL_EVyoCZpP0D0utiBtDlv453jWpM9uNpGTw';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

console.log('Supabase Client initialisé:', supabaseClient);

document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    // Réinitialiser les messages
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';

    // Étape 1 : Créer un utilisateur avec Supabase
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: {
                role: 'user', // Attribuer le rôle 'user'
            },
        },
    });

    if (error) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Erreur : ' + error.message;
        return;
    }

    // Étape 2 : Ajouter l'utilisateur dans la table 'user_roles'
    if (data.user) {
        const { error: roleError } = await supabaseClient
            .from('user_roles')
            .insert([{ user_id: data.user.id, role: 'user' }]);

        if (roleError) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Erreur lors de l\'attribution du rôle : ' + roleError.message;
            return;
        }

        successMessage.style.display = 'block';
        window.location.href = 'userPage.html';
        successMessage.textContent = 'Inscription réussie et rôle attribué ! Veuillez vérifier votre e-mail.';
    }
});