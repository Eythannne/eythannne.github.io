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
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
    });
});


// ---------------------------------------------
// VEILLE TECHNOLOGIQUE (voir plus / voir moins)
// ---------------------------------------------
const updates = document.querySelectorAll(".veille-updates .update");
const voirPlusBtn = document.getElementById("voir-plus-btn");

if (updates.length > 5 && voirPlusBtn) {
    updates.forEach((update, index) => {
        update.classList.toggle("hidden", index >= 5);
        update.classList.toggle("visible", index < 5);
    });

    let expanded = false;

    voirPlusBtn.addEventListener("click", () => {
        expanded = !expanded;

        updates.forEach((update, index) => {
            if (index >= 5) {
                update.classList.toggle("hidden", !expanded);
                update.classList.toggle("visible", expanded);
            }
        });

        voirPlusBtn.textContent = expanded ? "Voir moins ▲" : "Voir plus ▼";
    });
}


// ---------------------------------------------
// MODALS PROJETS
// ---------------------------------------------
function openProject(id) {
    document.getElementById(id).style.display = "flex";
    document.body.classList.add("no-scroll");
}

function closeProject(id) {
    document.getElementById(id).style.display = "none";
    document.body.classList.remove("no-scroll");
}

window.addEventListener("click", e => {
    document.querySelectorAll(".project-modal").forEach(modal => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.classList.remove("no-scroll");
        }
    });
});


// ---------------------------------------------
// THÈME CLAIR / SOMBRE
// ---------------------------------------------
const themeToggle = document.getElementById("theme-toggle");
const savedTheme  = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
});


// ---------------------------------------------
// EASTER EGG MATRIX  (↑ → ↓ ←)
// ---------------------------------------------
const matrixSequence = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
let matrixIndex = 0;

document.addEventListener("keydown", e => {
    if (e.key === matrixSequence[matrixIndex]) {
        matrixIndex++;
        if (matrixIndex === matrixSequence.length) {
            matrixIndex = 0;
            triggerMatrix();
        }
    } else {
        matrixIndex = e.key === matrixSequence[0] ? 1 : 0;
    }
});

function triggerMatrix() {
    if (document.getElementById("matrix-canvas")) return;

    const canvas = document.createElement("canvas");
    canvas.id = "matrix-canvas";
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx      = canvas.getContext("2d");
    const chars    = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF<>/{}[];";
    const fontSize = 14;
    const cols     = Math.floor(canvas.width / fontSize);
    const drops    = Array(cols).fill(1);

    const interval = setInterval(() => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff41";
        ctx.font      = `${fontSize}px monospace`;

        drops.forEach((y, i) => {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, y * fontSize);
            if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }, 35);

    setTimeout(() => {
        canvas.style.opacity = "0";
        setTimeout(() => {
            clearInterval(interval);
            canvas.remove();
        }, 1000);
    }, 5000);
}


// ---------------------------------------------
// PRÉLOADER
// ---------------------------------------------
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("preloader").classList.add("hidden");
    }, 2800);
});


// ---------------------------------------------
// MENU HAMBURGER
// ---------------------------------------------
const hamburger = document.getElementById("hamburger");
const navMenu   = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navMenu.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navMenu.classList.remove("open");
        document.body.classList.remove("no-scroll");
    });
});


// ---------------------------------------------
// BARRE DE PROGRESSION SCROLL
// ---------------------------------------------
const scrollProgress = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + "%";
});


// ---------------------------------------------
// BOUTON RETOUR EN HAUT
// ---------------------------------------------
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// ---------------------------------------------
// ANIMATIONS AU SCROLL (INTERSECTION OBSERVER)
// ---------------------------------------------
const revealElements = [
    { selector: "#apropos h2",          cls: "reveal" },
    { selector: ".about-text",          cls: "reveal-left" },
    { selector: ".about-photo",         cls: "reveal-right" },
    { selector: "#competences h2",      cls: "reveal" },
    { selector: ".skills-column",       cls: "reveal" },
    { selector: ".soft-skills",         cls: "reveal-stagger" },
    { selector: "#projets h2",          cls: "reveal" },
    { selector: ".project-card",        cls: "reveal" },
    { selector: "#experiences h2",      cls: "reveal" },
    { selector: ".timeline-item",       cls: "reveal" },
    { selector: "#veille h2",           cls: "reveal" },
    { selector: ".veille-container",    cls: "reveal" },
    { selector: "#documents h2",        cls: "reveal" },
    { selector: ".doc-card",            cls: "reveal" },
    { selector: "#contact h2",          cls: "reveal" },
    { selector: ".contact-mail",        cls: "reveal" },
    { selector: ".contact-btn",         cls: "reveal" },
];

revealElements.forEach(({ selector, cls }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add(cls);
        if (cls === "reveal" && document.querySelectorAll(selector).length > 1) {
            el.style.transitionDelay = (i * 0.1) + "s";
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-stagger")
    .forEach(el => observer.observe(el));


// ---------------------------------------------
// TYPEWRITER SUR LE TAGLINE
// ---------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const tagline = document.querySelector(".tagline");
    if (!tagline) return;

    const fullText = tagline.textContent.trim();
    tagline.textContent = "";

    let i = 0;
    const speed = 38;

    function type() {
        if (i < fullText.length) {
            tagline.textContent += fullText.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            tagline.classList.add("typing-done");
        }
    }

    setTimeout(type, 600);
});


// ---------------------------------------------
// CURSEUR LUMINEUX
// ---------------------------------------------
const cursorGlow = document.getElementById("cursor-glow");

document.addEventListener("mousemove", e => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top  = e.clientY + "px";
});


// ---------------------------------------------
// TRACKING DU BOUTON "DÉCOUVRIR"
// ---------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("discover-btn");
    if (!btn || btn.dataset.tracked === "true") return;
    btn.dataset.tracked = "true";

    btn.addEventListener("click", () => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "click_decouvrir" });
    });
});
