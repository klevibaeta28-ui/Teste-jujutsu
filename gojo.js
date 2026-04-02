const aura = document.getElementById("cursor-aura");
const botao2 = document.getElementById("Gojo");
const videog = document.getElementById("dominio");
const videog2 = document.getElementById("dominio-rapido");

// --- LOGICA DA AURA (MOUSE + TOUCH) ---
function moverAura(e) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    
    if (aura) {
        aura.style.left = x + "px";
        aura.style.top = y + "px";
        aura.style.opacity = "1";
    }
}

document.addEventListener("mousemove", moverAura);
document.addEventListener("touchstart", moverAura);
document.addEventListener("touchmove", moverAura);

// --- TROCA DE CORES ---
const blocos = [
    { el: document.querySelector("h1"), classe: "aura-azur" },
    { el: document.querySelector(".img2"), classe: "aura-azur" },
    { el: document.querySelector("#bloco-resumo"), classe: "aura-vermelho" },
    { el: document.querySelector("#bloco-derrota"), classe: "aura-roxo" }
];

blocos.forEach(item => {
    if (item.el) {
        item.el.addEventListener("mouseenter", () => {
            aura.className = ""; 
            aura.classList.add(item.classe);
        });
    }
});

// --- LÓGICA DOS VÍDEOS ---
let cliques = 0;
let timer;

botao2.addEventListener("click", () => {
    cliques++;
    if (cliques === 1) {
        timer = setTimeout(() => {
            if (cliques === 1) rodarDominio(videog, 1.0);
            cliques = 0;
        }, 300);
    } else if (cliques === 2) {
        clearTimeout(timer);
        rodarDominio(videog2, 1.5);
        cliques = 0;
    }
});

function rodarDominio(video, velocidade) {
    document.body.classList.add("modo-braco");
    video.classList.add("mostra-video");
    video.playbackRate = velocidade;
    video.currentTime = 0;
    video.play();
    
    video.onended = () => {
        video.classList.remove("mostra-video");
        document.body.classList.remove("modo-braco");
    };
}