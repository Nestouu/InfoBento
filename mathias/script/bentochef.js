import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://lxvfirrxgdinwlwoxgpc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4dmZpcnJ4Z2Rpbndsd294Z3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MTc0MjUsImV4cCI6MjA0ODI5MzQyNX0.i-YA0qXXL_EVyoCZpP0D0utiBtDlv453jWpM9uNpGTw';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

console.log('Supabase Client initialisé:', supabaseClient);

document.addEventListener("DOMContentLoaded", async () => {
    const block1 = document.getElementById("block1");

    if (!block1) {
        console.error("L'élément avec l'ID 'block1' est introuvable.");
        return;
    }

    const videoId = 13; // Remplacez par l'ID de votre vidéo dans la base

    try {
        // Récupérer les données de la vidéo depuis la table featured_video
        const { data: video, error } = await supabaseClient
            .from("featured_video")
            .select("video_url")
            .eq("id", videoId)
            .single();

        if (error || !video || !video.video_url) {
            block1.innerHTML = "<p>Vidéo non disponible.</p>";
            console.error(error || "Aucune vidéo trouvée.");
            return;
        }

        // Ajouter les paramètres nécessaires pour autoplay, loop, etc.
        let videoEmbedUrl = video.video_url;

        if (videoEmbedUrl.includes("youtube-nocookie.com")) {
            videoEmbedUrl += `&autoplay=1&mute=1&loop=1&playlist=${extractYouTubeId(videoEmbedUrl)}`;
        } else if (videoEmbedUrl.includes("youtube.com") || videoEmbedUrl.includes("youtu.be")) {
            const videoId = extractYouTubeId(videoEmbedUrl);
            videoEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
        }

        block1.innerHTML = `
            <iframe
                src="${videoEmbedUrl}"
                style="width: 100%; height: 300px; border: none;"
                allow="autoplay; encrypted-media"
                allowfullscreen
            ></iframe>
        `;

        // Fonction pour extraire l'ID de la vidéo
        function extractYouTubeId(url) {
            const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
            return match ? match[1] : null;
        }
    } catch (err) {
        console.error("Erreur inattendue :", err);
        block1.innerHTML = "<p>Erreur lors du chargement des vidéos.</p>";
    }
});


document.addEventListener("DOMContentLoaded", async () => {
    const block3 = document.getElementById("block3");

    if (!block3) {
        console.error("L'élément avec l'ID 'block3' est introuvable.");
        return;
    }

    const articleId = 22; // Changez l'ID pour celui de l'article souhaité

    try {
        // Récupérer les données de l'article depuis la table "article"
        const { data: article, error } = await supabaseClient
            .from("article")
            .select("title, image_url")
            .eq("id", articleId)
            .single();

        if (error || !article) {
            block3.innerHTML = "<p>Article non disponible.</p>";
            console.error(error || "Aucun article trouvé.");
            return;
        }

        // Mettre à jour le contenu de block3 avec l'image et le titre de l'article
        block3.innerHTML = `
            <div class="block-content">
                <img src="${article.image_url}" alt="${article.title}" />
                <h3>${article.title}</h3>
            </div>
        `;

        // Ajouter un événement de clic à block3
        block3.style.cursor = "pointer"; // Changer le curseur pour indiquer un élément cliquable
        block3.addEventListener("click", () => {
            // Rediriger vers une autre page ou exécuter une action
            window.location.href = `articlekendrick.html`; // Exemple : redirection vers une page avec un ID
        });
    } catch (err) {
        console.error("Erreur inattendue lors de la récupération de l'article :", err);
        block3.innerHTML = "<p>Erreur lors du chargement de l'article.</p>";
    }
});


document.addEventListener("DOMContentLoaded", async () => {
    const block3 = document.getElementById("block9");

    if (!block3) {
        console.error("L'élément avec l'ID 'block3' est introuvable.");
        return;
    }

    const articleId = 23; // Changez l'ID pour celui de l'article souhaité

    try {
        // Récupérer les données de l'article depuis la table "article"
        const { data: article, error } = await supabaseClient
            .from("article")
            .select("content")
            .eq("id", articleId)
            .single();

        if (error || !article) {
            block3.innerHTML = "<p>Article non disponible.</p>";
            console.error(error || "Aucun article trouvé.");
            return;
        }

        // Mettre à jour le contenu de block3 avec l'image et le titre de l'article
        block3.innerHTML = `
            <h3>${article.content}</h3>
        `;
    } catch (err) {
        console.error("Erreur inattendue lors de la récupération de l'article :", err);
        block3.innerHTML = "<p>Erreur lors du chargement de l'article.</p>";
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const block1 = document.getElementById("block4");

    if (!block1) {
        console.error("L'élément avec l'ID 'block1' est introuvable.");
        return;
    }

    const videoId = 8;

    try {
        // Récupérer les données de la vidéo depuis la table featured_video
        const { data: video, error } = await supabaseClient
            .from("featured_video")
            .select("video_url")
            .eq("id", videoId)
            .single();

        if (error || !video || !video.video_url) {
            block1.innerHTML = "<p>Vidéo non disponible.</p>";
            console.error(error || "Aucune vidéo trouvée.");
            return;
        }

        // Ajouter autoplay=1 à l'URL de la vidéo
        const videoUrlWithAutoplay = `${video.video_url}`;

        block1.innerHTML = `
            <iframe
                src="${videoUrlWithAutoplay}"
                style="width: 100%; height: 300px; border: none;"
                allowfullscreen
            </iframe>
        `;
    } catch (err) {
        console.error("Erreur inattendue :", err);
        block1.innerHTML = "<p>Erreur lors du chargement des vidéos.</p>";
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const block1 = document.getElementById("block5");

    if (!block1) {
        console.error("L'élément avec l'ID 'block1' est introuvable.");
        return;
    }

    const videoId = 3;

    try {
        // Récupérer les données de la vidéo depuis la table featured_video
        const { data: video, error } = await supabaseClient
            .from("featured_video")
            .select("video_url")
            .eq("id", videoId)
            .single();

        if (error || !video || !video.video_url) {
            block1.innerHTML = "<p>Vidéo non disponible.</p>";
            console.error(error || "Aucune vidéo trouvée.");
            return;
        }

        // Ajouter autoplay=1 à l'URL de la vidéo
        const videoUrlWithAutoplay = `${video.video_url}`;

        block1.innerHTML = `
            <iframe
                src="${videoUrlWithAutoplay}"
                style="width: 100%; height: 300px; border: none;"
                allowfullscreen
            </iframe>
        `;
    } catch (err) {
        console.error("Erreur inattendue :", err);
        block1.innerHTML = "<p>Erreur lors du chargement des vidéos.</p>";
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const block3 = document.getElementById("block10");

    if (!block3) {
        console.error("L'élément avec l'ID 'block3' est introuvable.");
        return;
    }

    const articleId = 20; // Changez l'ID pour celui de l'article souhaité

    try {
        // Récupérer les données de l'article depuis la table "article"
        const { data: article, error } = await supabaseClient
            .from("article")
            .select("title, image_url")
            .eq("id", articleId)
            .single();

        if (error || !article) {
            block3.innerHTML = "<p>Article non disponible.</p>";
            console.error(error || "Aucun article trouvé.");
            return;
        }

        // Mettre à jour le contenu de block3 avec l'image et le titre de l'article
        block3.innerHTML = `
            <img src="${article.image_url}" alt="${article.title}" />
            <h3>${article.title}</h3>
        `;
    } catch (err) {
        console.error("Erreur inattendue lors de la récupération de l'article :", err);
        block3.innerHTML = "<p>Erreur lors du chargement de l'article.</p>";
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const block3 = document.getElementById("block11");

    if (!block3) {
        console.error("L'élément avec l'ID 'block3' est introuvable.");
        return;
    }

    const articleId = 21; // Changez l'ID pour celui de l'article souhaité

    try {
        // Récupérer les données de l'article depuis la table "article"
        const { data: article, error } = await supabaseClient
            .from("article")
            .select("title, image_url")
            .eq("id", articleId)
            .single();

        if (error || !article) {
            block3.innerHTML = "<p>Article non disponible.</p>";
            console.error(error || "Aucun article trouvé.");
            return;
        }

        // Mettre à jour le contenu de block3 avec l'image et le titre de l'article
        block3.innerHTML = `
            <img src="${article.image_url}" alt="${article.title}" />
            <h3>${article.title}</h3>
        `;
    } catch (err) {
        console.error("Erreur inattendue lors de la récupération de l'article :", err);
        block3.innerHTML = "<p>Erreur lors du chargement de l'article.</p>";
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const block3 = document.getElementById("block12");

    if (!block3) {
        console.error("L'élément avec l'ID 'block3' est introuvable.");
        return;
    }

    const articleId = 18; // Changez l'ID pour celui de l'article souhaité

    try {
        // Récupérer les données de l'article depuis la table "article"
        const { data: article, error } = await supabaseClient
            .from("article")
            .select("title, image_url")
            .eq("id", articleId)
            .single();

        if (error || !article) {
            block3.innerHTML = "<p>Article non disponible.</p>";
            console.error(error || "Aucun article trouvé.");
            return;
        }

        // Mettre à jour le contenu de block3 avec l'image et le titre de l'article
        block3.innerHTML = `
            <img src="${article.image_url}" alt="${article.title}" />
            <h3>${article.title}</h3>
        `;
    } catch (err) {
        console.error("Erreur inattendue lors de la récupération de l'article :", err);
        block3.innerHTML = "<p>Erreur lors du chargement de l'article.</p>";
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const block3 = document.getElementById("block8");

    if (!block3) {
        console.error("L'élément avec l'ID 'block3' est introuvable.");
        return;
    }

    const articleId = 23; // Changez l'ID pour celui de l'article souhaité

    try {
        // Récupérer les données de l'article depuis la table "article"
        const { data: article, error } = await supabaseClient
            .from("article")
            .select("image_url")
            .eq("id", articleId)
            .single();

        if (error || !article) {
            block3.innerHTML = "<p>Article non disponible.</p>";
            console.error(error || "Aucun article trouvé.");
            return;
        }

        // Mettre à jour le contenu de block3 avec l'image et le titre de l'article
        block3.innerHTML = `
            <img src="${article.image_url}"/>
        `;
    } catch (err) {
        console.error("Erreur inattendue lors de la récupération de l'article :", err);
        block3.innerHTML = "<p>Erreur lors du chargement de l'article.</p>";
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const block3 = document.getElementById("block7");

    if (!block3) {
        console.error("L'élément avec l'ID 'block3' est introuvable.");
        return;
    }

    const articleId = 23; // Changez l'ID pour celui de l'article souhaité

    try {
        // Récupérer les données de l'article depuis la table "article"
        const { data: article, error } = await supabaseClient
            .from("article")
            .select("title")
            .eq("id", articleId)
            .single();

        if (error || !article) {
            block3.innerHTML = "<p>Article non disponible.</p>";
            console.error(error || "Aucun article trouvé.");
            return;
        }

        // Mettre à jour le contenu de block3 avec l'image et le titre de l'article
        block3.innerHTML = `
            <h3>${article.title}</h3>
        `;
    } catch (err) {
        console.error("Erreur inattendue lors de la récupération de l'article :", err);
        block3.innerHTML = "<p>Erreur lors du chargement de l'article.</p>";
    }
});