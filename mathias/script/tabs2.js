import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://lxvfirrxgdinwlwoxgpc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4dmZpcnJ4Z2Rpbndsd294Z3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MTc0MjUsImV4cCI6MjA0ODI5MzQyNX0.i-YA0qXXL_EVyoCZpP0D0utiBtDlv453jWpM9uNpGTw';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

console.log('Supabase Client initialisé:', supabaseClient);

document.addEventListener("DOMContentLoaded", async () => {
    const sectionsMapping = [
        { id: 18, sectionId: "salty", titleId: "salty-title", descriptionId: "salty-description", imageId: "salty-image" },
        { id: 19, sectionId: "sweet", titleId: "sweet-title", descriptionId: "sweet-description", imageId: "sweet-image" },
        { id: 20, sectionId: "energetic", titleId: "energetic-title", descriptionId: "energetic-description", imageId: "energetic-image" },
        { id: 21, sectionId: "potion", titleId: "potion-title", descriptionId: "potion-description", imageId: "potion-image" },
    ];

    const continueButton = document.getElementById("continue-button");

    if (!continueButton) {
        console.error("Le bouton 'Continuer' est introuvable.");
        return;
    }

    // Masquer le bouton au départ
    continueButton.style.display = "none";

    const optionButtons = document.querySelectorAll(".option-card-choice");

    optionButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            const targetSectionId = button.getAttribute("data-article");

            // Désactiver toutes les sections
            document.querySelectorAll(".article-section").forEach((section) => {
                section.classList.remove("active");
            });

            // Activer la section correspondante
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.classList.add("active");
                continueButton.style.display = "block"; // Afficher le bouton "Continuer"
            }
        });
    });

    // Gestion du clic sur le bouton "Continuer"
    continueButton.addEventListener("click", () => {
        window.location.href = "new-account.html"; // Redirection vers la page new-account.html
    });

    // Fonction pour mettre à jour une section
    const updateSection = async ({ id, sectionId, titleId, descriptionId, imageId }) => {
        const titleElement = document.getElementById(titleId);
        const descriptionElement = document.getElementById(descriptionId);
        const imageElement = document.getElementById(imageId);

        if (!titleElement || !descriptionElement || !imageElement) {
            console.error(`Les éléments HTML pour la section ${sectionId} ne sont pas trouvés.`);
            return;
        }

        try {
            const { data: article, error } = await supabaseClient
                .from("article")
                .select("title, content, image_url")
                .eq("id", id)
                .single();

            if (error) {
                console.error(`Erreur lors de la récupération de l'article pour la section ${sectionId} :`, error.message);
                return;
            }

            // Mettre à jour les éléments
            titleElement.textContent = article.title || "Titre non disponible";
            descriptionElement.textContent = article.content || "Description non disponible";
            imageElement.src = article.image_url || ""; // Met à jour l'URL de l'image
            imageElement.alt = article.title || "Image non disponible";
        } catch (err) {
            console.error(`Erreur inattendue lors de la récupération de l'article pour la section ${sectionId} :`, err);
        }
    };

    // Charger les données pour chaque section
    for (const section of sectionsMapping) {
        await updateSection(section);
    }
});
