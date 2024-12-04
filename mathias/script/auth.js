//import { supabaseClient } from './supabaseClient.js';

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://lxvfirrxgdinwlwoxgpc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4dmZpcnJ4Z2Rpbndsd294Z3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MTc0MjUsImV4cCI6MjA0ODI5MzQyNX0.i-YA0qXXL_EVyoCZpP0D0utiBtDlv453jWpM9uNpGTw';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

console.log('Supabase Client initialisé:', supabaseClient);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-form').addEventListener('submit', async (event) => {
        event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.createElement('p'); // Message d'erreur dynamique

    // Réinitialiser les messages d'erreur
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove(); // Supprimer les anciens messages d'erreur

    try {
        // Étape 1 : Tentative de connexion
        const { data: session, error: loginError } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        if (loginError) {
            errorMessage.textContent = 'Erreur : ' + loginError.message;
            errorMessage.className = 'error-message';
            document.querySelector('.login-card').appendChild(errorMessage); // Ajoute l'erreur à la carte
            return;
        }

        // Étape 2 : Récupérer le rôle de l'utilisateur
        const { data: userRoles, error: roleError } = await supabaseClient
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id);

        if (roleError || !userRoles || userRoles.length === 0) {
            errorMessage.textContent = 'Erreur : Impossible de vérifier votre rôle.';
            errorMessage.className = 'error-message';
            document.querySelector('.login-card').appendChild(errorMessage); // Ajoute l'erreur à la carte
            return;
        }

        // Étape 3 : Vérifier le rôle de l'utilisateur
        const isAdmin = userRoles.some((role) => role.role === 'admin');
        const isUser = userRoles.some((role) => role.role === 'user');

        if (isAdmin) {
            // Redirection vers la page admin
            window.location.href = '../mathias/admin.html';
        } else if (isUser) {
            // Redirection vers la page utilisateur
            window.location.href = 'article.html';
        } else {
            // Cas où l'utilisateur n'a aucun rôle valide
            errorMessage.textContent = 'Erreur : Accès refusé. Rôle inconnu.';
            errorMessage.className = 'error-message';
            document.querySelector('.login-card').appendChild(errorMessage); // Ajoute l'erreur à la carte
        }
    } catch (err) {
        console.error('Erreur inattendue :', err);
        errorMessage.textContent = 'Une erreur inattendue est survenue.';
        errorMessage.className = 'error-message';
        document.querySelector('.login-card').appendChild(errorMessage); // Ajoute l'erreur à la carte
    }
    });
});
