// Gestion du menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');

if (navToggle && navigation) {
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isExpanded));
        navigation.dataset.visible = String(!isExpanded);
    });

    navigation.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navigation.dataset.visible = 'false';
        });
    });
}

// Défilement fluide vers les sections
const navigationLinks = document.querySelectorAll('a[href^="#"]');

navigationLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            event.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Affichage dynamique de l'année courant dans le footer
const yearSpan = document.getElementById('current-year');

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
