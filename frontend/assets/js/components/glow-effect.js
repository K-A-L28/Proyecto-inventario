const glow = document.getElementById("cursor-glow");
const particlesContainer = document.getElementById("particles-container");

// Seguimiento del glow
let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;
let isExploding = false;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    if (!isExploding) {
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        glow.style.transform = `translate(${glowX - 125}px, ${glowY - 125}px)`;
    }
    requestAnimationFrame(animateGlow);
}
animateGlow();
