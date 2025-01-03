import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://lxvfirrxgdinwlwoxgpc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4dmZpcnJ4Z2Rpbndsd294Z3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MTc0MjUsImV4cCI6MjA0ODI5MzQyNX0.i-YA0qXXL_EVyoCZpP0D0utiBtDlv453jWpM9uNpGTw';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

console.log('Supabase Client initialisé:', supabaseClient);


async function fetchAndDisplayVideos() {
    const videoList = document.getElementById('video-list');

    if (!videoList) {
        console.error("L'élément avec l'id 'video-list' est introuvable.");
        return;
    }

    try {
        // Récupérer les vidéos depuis la table "featured_video"
        const { data: videos, error } = await supabaseClient
            .from('featured_video')
            .select('video_url'); // Récupérer uniquement les URLs des vidéos

        if (error) {
            console.error('Erreur lors de la récupération des vidéos :', error.message);
            videoList.innerHTML = '<p>Erreur lors du chargement des vidéos.</p>';
            return;
        }

        if (!videos || videos.length === 0) {
            videoList.innerHTML = '<p>Aucune vidéo disponible.</p>';
            return;
        }

        // Nettoyer le conteneur avant d'afficher les vidéos
        videoList.innerHTML = '';

        // Créer dynamiquement les éléments iframe pour chaque vidéo
        videos.forEach(video => {
            // Créer un conteneur pour la vidéo et le bouton
            const videoContainer = document.createElement('div');
            videoContainer.style.marginBottom = '20px';

            // Créer l'élément iframe pour la vidéo
            const iframeElement = document.createElement('iframe');
            iframeElement.src = `${video.video_url}?autoplay=1&mute=1`;
            iframeElement.width = '560';
            iframeElement.height = '315';
            iframeElement.frameBorder = '0';
            iframeElement.allow =
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframeElement.allowFullscreen = true;

            // Créer le bouton "Supprimer"
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.style.marginTop = '10px';
            deleteButton.dataset.id = video.id; // Associer l'ID de la vidéo au bouton

            // Ajouter un gestionnaire d'événement pour la suppression
            deleteButton.addEventListener('click', async () => {
                if (confirm('Êtes-vous sûr de vouloir supprimer cette vidéo ?')) {
                    await deleteVideo(video.id);
                }
            });

            // Ajouter l'iframe et le bouton au conteneur
            videoContainer.appendChild(iframeElement);
            videoContainer.appendChild(deleteButton);

            // Ajouter le conteneur à la liste
            videoList.appendChild(videoContainer);
        });
    } catch (err) {
        console.error('Erreur inattendue lors de la récupération des vidéos :', err);
        videoList.innerHTML = '<p>Erreur inattendue lors du chargement des vidéos.</p>';
    }
}

// Fonction pour récupérer et afficher les vidéos
async function fetchVideos() {
    try {
        // Récupérer les vidéos depuis la table "featured_video"
        const { data: videos, error } = await supabaseClient
            .from('featured_video')
            .select('id, video_url');

        if (error) {
            console.error('Erreur lors de la récupération des vidéos :', error.message);
            return;
        }

        const videoList = document.getElementById('video-list');
        if (!videoList) {
            console.error("L'élément avec l'id 'video-list' est introuvable.");
            return;
        }

        videoList.innerHTML = ''; // Nettoyer la liste avant d'ajouter les vidéos

        // Ajouter chaque vidéo avec un bouton "Supprimer"
        videos.forEach(video => {
            const videoContainer = document.createElement('div');
            videoContainer.style.marginBottom = '20px';

            const iframeElement = document.createElement('iframe');
            iframeElement.src = `${video.video_url}?autoplay=1&mute=1`;
            iframeElement.width = '560';
            iframeElement.height = '315';
            iframeElement.frameBorder = '0';
            iframeElement.allow =
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframeElement.allowFullscreen = true;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.style.marginTop = '10px';
            deleteButton.dataset.id = video.id; // Associer l'ID de la vidéo au bouton

            deleteButton.addEventListener('click', async () => {
                if (confirm('Êtes-vous sûr de vouloir supprimer cette vidéo ?')) {
                    await deleteVideo(video.id);
                }
            });

            videoContainer.appendChild(iframeElement);
            videoContainer.appendChild(deleteButton);

            videoList.appendChild(videoContainer);
        });

        console.log('Vidéos affichées avec IDs :', videos);
    } catch (err) {
        console.error('Erreur inattendue lors de la récupération des vidéos :', err);
    }
}

// Fonction pour ajouter une vidéo
async function insertVideo(videoUrl, thumbnailUrl, autoplay, muted) {
    try {
        const { data, error } = await supabaseClient
            .from('featured_video')
            .insert([{ video_url: videoUrl, thumbnail_url: thumbnailUrl, autoplay, muted }]);

        if (error) {
            console.error('Erreur lors de l\'ajout de la vidéo :', error.message);
            alert('Une erreur est survenue lors de l\'ajout de la vidéo.');
        } else {
            console.log('Vidéo ajoutée avec succès :', data);
            fetchVideos(); // Rafraîchir la liste des vidéos
        }
    } catch (err) {
        console.error('Erreur inattendue :', err);
    }
}


// Fonction pour supprimer une vidéo
async function deleteVideo(id) {
    if (!id) {
        console.error('Erreur : ID de la vidéo non défini.');
        alert('Erreur : Impossible de supprimer cette vidéo.');
        return;
    }

    try {
        const { error } = await supabaseClient
            .from('featured_video')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erreur lors de la suppression de la vidéo :', error.message);
            alert('Une erreur est survenue lors de la suppression de la vidéo.');
        } else {
            alert('Vidéo supprimée avec succès !');
            fetchVideos(); // Rafraîchir la liste après suppression
        }
    } catch (err) {
        console.error('Erreur inattendue lors de la suppression de la vidéo :', err);
        alert('Une erreur inattendue est survenue.');
    }
}

// Gestionnaire d'événement pour le formulaire d'ajout de vidéo
document.getElementById('video-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const videoUrl = document.getElementById('video-url').value;
    const thumbnailUrl = document.getElementById('thumbnail-url').value;
    const autoplay = document.getElementById('autoplay').checked;
    const muted = document.getElementById('muted').checked;

    await insertVideo(videoUrl, thumbnailUrl, autoplay, muted);

    document.getElementById('video-form').reset(); // Réinitialiser le formulaire
});


// Gestion du formulaire d'ajout de vidéo
document.getElementById('video-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        // Appel asynchrone ici
        const videoUrl = document.getElementById('video-url').value;
        await insertVideo(videoUrl);
    } catch (error) {
        console.error('Erreur dans le gestionnaire d\'événement:', error);
    }
});


// Charger les vidéos au démarrage
fetchVideos();
// Appeler la fonction pour charger les vidéos
fetchAndDisplayVideos();