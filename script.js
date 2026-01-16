// ---------------------------------------------
// SURBRILLANCE DU LIEN ACTIF SELON LA SECTION
// ---------------------------------------------
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});


// ---------------------------------------------
// DÉFILEMENT FLUIDE ENTRE LES SECTIONS
// ---------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {

            // 🔥 TRACKING ICI
            if (this.id === "discover-btn") {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: "click_decouvrir"
                });
            }

            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// ---------------------------------------------
// VEILLE TECHNOLOGIQUE (voir plus / voir moins)
// ---------------------------------------------
const updates = document.querySelectorAll(".veille-updates .update");
const voirPlusBtn = document.getElementById("voir-plus-btn");

if (updates.length > 5 && voirPlusBtn) {
    updates.forEach((update, index) => {
        if (index >= 5) {
            update.classList.add("hidden");
        } else {
            update.classList.add("visible");
        }
    });

    let expanded = false;

    voirPlusBtn.addEventListener("click", () => {
        expanded = !expanded;

        updates.forEach((update, index) => {
            if (index >= 5) {
                if (expanded) {
                    update.classList.remove("hidden");
                    update.classList.add("visible");
                } else {
                    update.classList.remove("visible");
                    update.classList.add("hidden");
                }
            }
        });

        voirPlusBtn.textContent = expanded ? "Voir moins ▲" : "Voir plus ▼";
    });
}


// ---------------------------------------------
// ====== MODALS PROJETS ======
// ---------------------------------------------
function openProject(id) {
    document.getElementById(id).style.display = "flex";
    document.body.classList.add("no-scroll");  // empêche scroll du body
}

function closeProject(id) {
    document.getElementById(id).style.display = "none";
    document.body.classList.remove("no-scroll");
}

// Fermer si clic à l’extérieur
window.addEventListener("click", function(e) {
    document.querySelectorAll(".project-modal").forEach(modal => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.classList.remove("no-scroll");
        }
    });
});

// ===== TRACKING CLICK "DÉCOUVRIR" VIA GTM =====
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("discover-btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({
            event: "click_decouvrir"
        });

        console.log("click_decouvrir envoyé");
    });
});