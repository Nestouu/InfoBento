import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://lxvfirrxgdinwlwoxgpc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4dmZpcnJ4Z2Rpbndsd294Z3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MTc0MjUsImV4cCI6MjA0ODI5MzQyNX0.i-YA0qXXL_EVyoCZpP0D0utiBtDlv453jWpM9uNpGTw';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

console.log('Supabase Client initialisé:', supabaseClient);

document.addEventListener("DOMContentLoaded", async () => {
    // Mappage des IDs avec leurs sections correspondantes
    const sectionsMapping = [
        { id: 18, sectionId: "salty", titleId: "salty-title", descriptionId: "salty-description" },
        { id: 19, sectionId: "sweet", titleId: "sweet-title", descriptionId: "sweet-description" },
        { id: 20, sectionId: "energetic", titleId: "energetic-title", descriptionId: "energetic-description" },
        { id: 21, sectionId: "potion", titleId: "potion-title", descriptionId: "potion-description" },
    ];

    // Fonction pour mettre à jour une section
    const updateSection = async ({ id, sectionId, titleId, descriptionId }) => {
        const section = document.getElementById(sectionId);
        const titleElement = document.getElementById(titleId);
        const descriptionElement = document.getElementById(descriptionId);

        if (!section || !titleElement || !descriptionElement) {
            console.error(`Les éléments HTML pour la section ${sectionId} ne sont pas trouvés.`);
            return;
        }

        try {
            // Récupérer les données de l'article par ID
            const { data: article, error } = await supabaseClient
                .from("article")
                .select("title, content")
                .eq("id", id)
                .single();

            if (error) {
                console.error(`Erreur lors de la récupération de l'article pour la section ${sectionId} :`, error.message);
                return;
            }

            // Mettre à jour le contenu de la section
            titleElement.textContent = article.title || "Titre non disponible";
            descriptionElement.textContent = article.content || "Description non disponible";
        } catch (err) {
            console.error(`Erreur inattendue lors de la récupération de l'article pour la section ${sectionId} :`, err);
        }
    };

    // Mettre à jour chaque section
    for (const section of sectionsMapping) {
        await updateSection(section);
    }
});
