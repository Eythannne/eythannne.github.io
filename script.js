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
// EASTER EGG 67 - SIX SEVEN  (→ ↓ ← ↑)
// ---------------------------------------------
const egg2Sequence = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
let egg2Index = 0;

document.addEventListener("keydown", e => {
    if (e.key === egg2Sequence[egg2Index]) {
        egg2Index++;
        if (egg2Index === egg2Sequence.length) {
            egg2Index = 0;
            triggerSixSeven();
        }
    } else {
        egg2Index = e.key === egg2Sequence[0] ? 1 : 0;
    }
});

function triggerSixSeven() {
    if (document.getElementById("ss-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "ss-overlay";

    let particlesHTML = "";
    const pColors = ["#ff0080","#ff6600","#ffff00","#00ff88","#00cfff","#bf00ff","#ff3366","#c9a227"];
    for (let i = 0; i < 60; i++) {
        const c = pColors[Math.floor(Math.random() * pColors.length)];
        const x = Math.random() * 100, y = Math.random() * 100;
        const size = 4 + Math.random() * 10;
        particlesHTML += `<div class="ss-particle" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;background:${c};animation-delay:${(Math.random()*3).toFixed(2)}s;animation-duration:${(2+Math.random()*3).toFixed(2)}s;box-shadow:0 0 ${size*2}px ${c};"></div>`;
    }

    overlay.innerHTML = `
        <canvas id="ss-canvas"></canvas>
        <div class="ss-particles">${particlesHTML}</div>
        <div class="ss-content">
            <div class="ss-number">67</div>
            <div class="ss-title">SIX SEVEN</div>
            <div class="ss-divider"></div>
            <img class="ss-gif" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnRqNWswcTB3Zm0xYWpxaXM0dHJlazFpOHZvc2g2Y2lkdXkyeXFkYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XCsACkMFiPrwJI9rQv/giphy.gif" alt="six seven">
            <div class="ss-members">SIIIIIIIIIX · SEEEEEEVEN</div>
            <div class="ss-quote">"Step into the 6, better know that we're 7"</div>
            <div class="ss-close">[ cliquer pour fermer ]</div>
        </div>
    `;
    overlay.style.cssText = "position:fixed;inset:0;background:#000;z-index:99999;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.5s ease;cursor:pointer;overflow:hidden;";

    const ssStyle = document.createElement("style");
    ssStyle.id = "ss-style";
    ssStyle.textContent = `
        #ss-canvas{position:absolute;inset:0;width:100%;height:100%;}
        .ss-particles{position:absolute;inset:0;pointer-events:none;}
        .ss-particle{position:absolute;border-radius:50%;animation:ss-float linear infinite;}
        @keyframes ss-float{0%,100%{transform:translateY(0) scale(1);opacity:1;}50%{transform:translateY(-40px) scale(1.3);opacity:0.8;}}
        .ss-content{position:relative;text-align:center;z-index:2;animation:ss-appear 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards;}
        @keyframes ss-appear{from{transform:scale(0.5) rotate(-5deg);opacity:0;}to{transform:scale(1) rotate(0deg);opacity:1;}}
        .ss-number{font-size:clamp(120px,25vw,220px);font-weight:900;line-height:1;background:linear-gradient(135deg,#ff0080,#ff6600,#ffff00,#00ff88,#00cfff,#bf00ff,#ff0080);background-size:300% 300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:ss-rainbow 2s linear infinite,ss-pulse 1.5s ease-in-out infinite;}
        @keyframes ss-rainbow{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
        @keyframes ss-pulse{0%,100%{transform:scale(1);filter:drop-shadow(0 0 30px rgba(255,100,0,0.8));}50%{transform:scale(1.04);filter:drop-shadow(0 0 60px rgba(0,200,255,0.9));}}
        .ss-title{font-size:clamp(18px,4vw,36px);font-weight:700;letter-spacing:0.5em;color:#fff;margin-top:-10px;text-shadow:0 0 20px #fff,0 0 40px rgba(200,150,255,0.7);}
        .ss-gif{width:clamp(140px,20vw,240px);border-radius:12px;margin-bottom:16px;box-shadow:0 0 30px rgba(201,162,39,0.5),0 0 60px rgba(255,0,128,0.3);}
        .ss-divider{width:120px;height:3px;background:linear-gradient(90deg,#ff0080,#ffff00,#00cfff,#bf00ff);background-size:200% 100%;margin:24px auto;border-radius:2px;animation:ss-rainbow 1.5s linear infinite;box-shadow:0 0 12px rgba(255,200,0,0.6);}
        .ss-members{font-size:clamp(11px,2vw,15px);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:16px;background:linear-gradient(90deg,#ff0080,#ff6600,#ffff00,#00cfff,#bf00ff);background-size:300% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:ss-rainbow 3s linear infinite;}
        .ss-quote{font-size:clamp(13px,2.2vw,18px);color:#c9a227;font-style:italic;opacity:0.9;margin-bottom:36px;text-shadow:0 0 15px rgba(201,162,39,0.8);}
        .ss-close{font-size:11px;color:#555;letter-spacing:0.1em;}
    `;
    document.head.appendChild(ssStyle);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    const ssCanvas = document.getElementById("ss-canvas");
    ssCanvas.width = window.innerWidth;
    ssCanvas.height = window.innerHeight;
    const ssCtx = ssCanvas.getContext("2d");
    const ssCx = ssCanvas.width / 2, ssCy = ssCanvas.height / 2;
    const rayColors = ["#ff0080","#ff6600","#ffff00","#00ff88","#00cfff","#bf00ff","#ff3366","#c9a227","#ffffff"];
    let ssAngle = 0, ssRafId;

    function hexToRgba(hex, alpha) {
        return `rgba(${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)},${alpha})`;
    }
    function drawRays() {
        ssCtx.clearRect(0, 0, ssCanvas.width, ssCanvas.height);
        for (let i = 0; i < 18; i++) {
            const a = ssAngle + (i / 18) * Math.PI * 2;
            const color = rayColors[i % rayColors.length];
            const grad = ssCtx.createLinearGradient(ssCx, ssCy, ssCx + Math.cos(a) * 1200, ssCy + Math.sin(a) * 1200);
            grad.addColorStop(0, hexToRgba(color, 0.3));
            grad.addColorStop(1, hexToRgba(color, 0));
            ssCtx.beginPath();
            ssCtx.moveTo(ssCx, ssCy);
            ssCtx.arc(ssCx, ssCy, 1200, a - 0.08, a + 0.08);
            ssCtx.closePath();
            ssCtx.fillStyle = grad;
            ssCtx.fill();
        }
        ssAngle += 0.004;
        ssRafId = requestAnimationFrame(drawRays);
    }
    drawRays();
    requestAnimationFrame(() => { overlay.style.opacity = "1"; });

    function closeSS() {
        overlay.style.opacity = "0";
        cancelAnimationFrame(ssRafId);
        setTimeout(() => { overlay.remove(); ssStyle.remove(); document.body.style.overflow = ""; }, 500);
    }
    overlay.addEventListener("click", closeSS);
    document.addEventListener("keydown", function onKey(e) {
        if (e.key === "Escape") { closeSS(); document.removeEventListener("keydown", onKey); }
    });
}


// ---------------------------------------------
// EASTER EGG FIREWORKS  (↓ ← ↑ →)
// ---------------------------------------------
const egg3Sequence = ["ArrowDown", "ArrowLeft", "ArrowUp", "ArrowRight"];
let egg3Index = 0;

document.addEventListener("keydown", e => {
    if (e.key === egg3Sequence[egg3Index]) {
        egg3Index++;
        if (egg3Index === egg3Sequence.length) {
            egg3Index = 0;
            triggerFireworks();
        }
    } else {
        egg3Index = e.key === egg3Sequence[0] ? 1 : 0;
    }
});

function triggerFireworks() {
    if (document.getElementById("fw-canvas")) return;

    const fwStyle = document.createElement("style");
    fwStyle.id = "fw-style";
    fwStyle.textContent = `
        .fw-text{font-size:clamp(40px,10vw,100px);font-weight:900;letter-spacing:0.1em;background:linear-gradient(90deg,#ff0080,#ffff00,#00cfff,#ff0080);background-size:300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:fw-rainbow 1s linear infinite;}
        @keyframes fw-rainbow{0%{background-position:0%;}100%{background-position:300%;}}
        .fw-sub{font-size:clamp(12px,2.5vw,20px);color:#fff;letter-spacing:0.3em;text-transform:uppercase;margin-top:14px;text-shadow:0 0 20px #fff;}
        .fw-close{margin-top:40px;font-size:11px;color:#666;letter-spacing:0.1em;}
    `;
    document.head.appendChild(fwStyle);

    const fwCanvas = document.createElement("canvas");
    fwCanvas.id = "fw-canvas";
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
    fwCanvas.style.cssText = "position:fixed;inset:0;z-index:99999;pointer-events:none;";
    document.body.appendChild(fwCanvas);

    const msg = document.createElement("div");
    msg.id = "fw-msg";
    msg.innerHTML = `<div class="fw-text">SECRET #3</div><div class="fw-sub">T'as trouve un easter egg</div><div class="fw-close">[ cliquer pour fermer ]</div>`;
    msg.style.cssText = "position:fixed;inset:0;z-index:100000;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;pointer-events:none;";
    document.body.appendChild(msg);

    const ctx = fwCanvas.getContext("2d");
    const W = fwCanvas.width, H = fwCanvas.height;
    const fwColors = ["#ff0080","#ff6600","#ffff00","#00ff88","#00cfff","#bf00ff","#ff3366","#fff","#c9a227"];
    let particles = [], fwRafId;

    function spawnFirework() {
        const x = W * 0.15 + Math.random() * W * 0.7;
        const y = H * 0.1 + Math.random() * H * 0.45;
        const color = fwColors[Math.floor(Math.random() * fwColors.length)];
        const count = 70 + Math.floor(Math.random() * 50);
        for (let i = 0; i < count; i++) {
            const a = (i / count) * Math.PI * 2;
            const speed = 2 + Math.random() * 6;
            particles.push({ x, y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, alpha: 1, color, size: 1.5 + Math.random() * 2.5 });
        }
    }

    spawnFirework();
    const spawnInterval = setInterval(spawnFirework, 700);

    function drawFw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            p.vy += 0.07;
            p.vx *= 0.99;
            p.alpha -= 0.011;
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        particles = particles.filter(p => p.alpha > 0);
        fwRafId = requestAnimationFrame(drawFw);
    }
    drawFw();

    let fwClosed = false;
    function closeFw() {
        if (fwClosed) return;
        fwClosed = true;
        clearInterval(spawnInterval);
        cancelAnimationFrame(fwRafId);
        fwCanvas.remove();
        msg.remove();
        fwStyle.remove();
    }
    setTimeout(closeFw, 7000);
    document.addEventListener("click", function onFwClick() { closeFw(); document.removeEventListener("click", onFwClick); });
    document.addEventListener("keydown", function onFwKey(e) {
        if (e.key === "Escape") { closeFw(); document.removeEventListener("keydown", onFwKey); }
    });
}


// ---------------------------------------------
// EASTER EGG GLITCH  (← ↑ → ↓)
// ---------------------------------------------
const egg4Sequence = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
let egg4Index = 0;

document.addEventListener("keydown", e => {
    if (e.key === egg4Sequence[egg4Index]) {
        egg4Index++;
        if (egg4Index === egg4Sequence.length) {
            egg4Index = 0;
            triggerGlitch();
        }
    } else {
        egg4Index = e.key === egg4Sequence[0] ? 1 : 0;
    }
});

function triggerGlitch() {
    if (document.getElementById("gl-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "gl-overlay";
    overlay.innerHTML = `
        <div class="gl-content">
            <div class="gl-label">// NIVEAU 4 / 4 — SEQUENCE COMPLETE</div>
            <div class="gl-title" data-text="ERROR 404">ERROR 404</div>
            <div class="gl-sub">CERVEAU INTROUVABLE</div>
            <div class="gl-divider"></div>
            <div class="gl-msg">t'as trouve les 4 easter eggs cachés.</div>
            <div class="gl-msg2">respect.</div>
            <div class="gl-close">[ cliquer pour fermer ]</div>
        </div>
    `;
    overlay.style.cssText = "position:fixed;inset:0;background:#000;z-index:99999;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.4s;cursor:pointer;overflow:hidden;";

    const glStyle = document.createElement("style");
    glStyle.id = "gl-style";
    glStyle.textContent = `
        .gl-content{text-align:center;animation:gl-appear 0.5s ease forwards;}
        @keyframes gl-appear{from{transform:translateY(20px);opacity:0;}to{transform:translateY(0);opacity:1;}}
        .gl-label{font-size:11px;letter-spacing:0.35em;color:#0f0;text-transform:uppercase;margin-bottom:24px;animation:gl-blink 1.2s step-end infinite;}
        @keyframes gl-blink{0%,100%{opacity:1;}50%{opacity:0;}}
        .gl-title{position:relative;font-size:clamp(50px,12vw,110px);font-weight:900;color:#fff;letter-spacing:0.05em;margin-bottom:4px;}
        .gl-title::before,.gl-title::after{content:attr(data-text);position:absolute;top:0;left:0;right:0;}
        .gl-title::before{color:#ff0080;animation:gl-g1 2.5s infinite;}
        .gl-title::after{color:#00cfff;animation:gl-g2 2.5s infinite;}
        @keyframes gl-g1{0%,89%,100%{clip-path:none;transform:none;}90%{clip-path:polygon(0 10%,100% 10%,100% 35%,0 35%);transform:translateX(-5px);}94%{clip-path:polygon(0 60%,100% 60%,100% 80%,0 80%);transform:translateX(5px);}}
        @keyframes gl-g2{0%,86%,100%{clip-path:none;transform:none;}87%{clip-path:polygon(0 40%,100% 40%,100% 65%,0 65%);transform:translateX(5px);}92%{clip-path:polygon(0 5%,100% 5%,100% 25%,0 25%);transform:translateX(-5px);}}
        .gl-sub{font-size:clamp(13px,2.8vw,22px);color:#0f0;letter-spacing:0.4em;text-transform:uppercase;text-shadow:0 0 15px #0f0;}
        .gl-divider{width:100px;height:1px;background:#0f0;margin:28px auto;box-shadow:0 0 10px #0f0;}
        .gl-msg{font-size:clamp(13px,2.2vw,17px);color:#888;margin-bottom:10px;}
        .gl-msg2{font-size:clamp(20px,4.5vw,38px);font-weight:900;color:#0f0;text-shadow:0 0 25px #0f0,0 0 50px #0f0;margin-bottom:44px;letter-spacing:0.1em;}
        .gl-close{font-size:11px;color:#333;letter-spacing:0.1em;}
    `;
    document.head.appendChild(glStyle);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => { overlay.style.opacity = "1"; });

    function closeGl() {
        overlay.style.opacity = "0";
        setTimeout(() => { overlay.remove(); glStyle.remove(); document.body.style.overflow = ""; }, 400);
    }
    overlay.addEventListener("click", closeGl);
    document.addEventListener("keydown", function onGlKey(e) {
        if (e.key === "Escape") { closeGl(); document.removeEventListener("keydown", onGlKey); }
    });
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
