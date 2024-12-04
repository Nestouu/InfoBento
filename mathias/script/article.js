//import { supabaseClient } from './supabaseClient.js';

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://lxvfirrxgdinwlwoxgpc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4dmZpcnJ4Z2Rpbndsd294Z3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MTc0MjUsImV4cCI6MjA0ODI5MzQyNX0.i-YA0qXXL_EVyoCZpP0D0utiBtDlv453jWpM9uNpGTw';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

console.log('Supabase Client initialisé:', supabaseClient);

// Fonction pour uploader une image dans Supabase Storage
async function insertArticle(title, content, imageUrl) {
    try {
        // Insérer l'article avec l'URL de l'image
        const { data, error } = await supabaseClient
            .from('article')
            .insert([{ title, content, image_url: imageUrl }]);

        if (error) {
            console.error('Erreur lors de l\'insertion des données :', error.message);
            alert('Une erreur est survenue lors de l\'ajout de l\'article.');
        } else {
            console.log('Données insérées avec succès :', data);
            alert('Article ajouté avec succès !');
            fetchArticles(); // Met à jour la liste après l'insertion
        }
    } catch (err) {
        console.error('Erreur inattendue :', err);
        alert('Une erreur inattendue est survenue.');
    }
}

async function fetchArticles() {
    try {
        const { data, error } = await supabaseClient
            .from('article')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.error('Erreur lors de la récupération des données :', error.message);
        } else {
            const articlesList = document.getElementById('articles-list');
            articlesList.innerHTML = '';
            data.forEach(article => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <h3>${article.title || 'Sans titre'}</h3>
                    <p>${article.content || 'Sans contenu'}</p>
                    ${article.image_url ? `<img src="${article.image_url}" alt="Image de l'article" style="width: 200px;" />` : ''}
                    <button class="edit-button" data-id="${article.id}">Modifier</button>
                    <button class="delete-button" data-id="${article.id}">Supprimer</button>
                `;
                articlesList.appendChild(li);
            });
        }
    } catch (err) {
        console.error('Erreur inattendue :', err);
    }
}

// Fonction pour supprimer un article
async function deleteArticle(id) {
    try {
        const { data, error } = await supabaseClient
            .from('article')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erreur lors de la suppression de l\'article :', error.message);
            alert('Une erreur est survenue lors de la suppression de l\'article.');
        } else {
            console.log('Article supprimé avec succès :', data);
            alert('Article supprimé avec succès !');
            fetchArticles(); // Rafraîchit la liste des articles
        }
    } catch (err) {
        console.error('Erreur inattendue :', err);
        alert('Une erreur inattendue est survenue.');
    }
}

// Fonction pour remplir le formulaire de modification avec les données d'un article
function populateEditForm(article) {
    document.getElementById('edit-id').value = article.id;
    document.getElementById('edit-title').value = article.title;
    document.getElementById('edit-content').value = article.content;
    document.getElementById('edit-image-url').value = article.image_url;
    document.getElementById('edit-article-form').style.display = 'block';
}

// Fonction pour mettre à jour un article
async function updateArticle(id, title, content, imageUrl) {
    try {
        const { data, error } = await supabaseClient
            .from('article')
            .update({ title, content, image_url: imageUrl })
            .eq('id', id);

        if (error) {
            console.error('Erreur lors de la mise à jour de l\'article :', error.message);
            alert('Une erreur est survenue lors de la mise à jour de l\'article.');
        } else {
            console.log('Article mis à jour avec succès :', data);
            alert('Article mis à jour avec succès !');
            fetchArticles(); // Rafraîchit la liste des articles
            document.getElementById('edit-article-form').style.display = 'none'; // Cache le formulaire de modification
        }
    } catch (err) {
        console.error('Erreur inattendue :', err);
        alert('Une erreur inattendue est survenue.');
    }
}

// Gestionnaire d'événement pour le formulaire d'ajout d'article
document.getElementById('article-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageUrl = document.getElementById('image-url').value; // Récupérer l'URL de l'image

    if (!imageUrl) {
        alert('Veuillez entrer une URL valide.');
        return;
    }

    await insertArticle(title, content, imageUrl);

    document.getElementById('article-form').reset(); // Réinitialiser le formulaire
});

// Gestionnaire d'événement pour le formulaire de modification
document.getElementById('edit-article-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const id = document.getElementById('edit-id').value;
    const title = document.getElementById('edit-title').value;
    const content = document.getElementById('edit-content').value;
    const imageUrl = document.getElementById('edit-image-url').value;

    await updateArticle(id, title, content, imageUrl);
});

// Gestionnaire d'événement pour les boutons Modifier
document.getElementById('articles-list').addEventListener('click', async (event) => {
    if (event.target.classList.contains('edit-button')) {
        const articleId = event.target.getAttribute('data-id');

        // Récupérer les données de l'article sélectionné
        const { data: article, error } = await supabaseClient
            .from('article')
            .select('*')
            .eq('id', articleId)
            .single();

        if (error) {
            console.error('Erreur lors de la récupération de l\'article :', error.message);
            alert('Une erreur est survenue lors de la récupération de l\'article.');
        } else {
            populateEditForm(article); // Remplit le formulaire de modification
        }
    }
    if (event.target.classList.contains('delete-button')) {
        const articleId = event.target.getAttribute('data-id');

        if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            await deleteArticle(articleId);
        }
    }
});

// Charger les articles au démarrage
fetchArticles();