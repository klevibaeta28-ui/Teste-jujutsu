const aura = document.getElementById("cursor-aura");
const botao2 = document.getElementById("Gojo");
const videog = document.getElementById("dominio");
const videog2 = document.getElementById("dominio-rapido");

// Função principal de movimento
function tratarMovimento(e) {
    // Pega as coordenadas se for Toque ou se for Mouse
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    if (aura) {
        aura.style.left = x + "px";
        aura.style.top = y + "px";
        aura.style.opacity = "1";
    }

    // Detecta o elemento embaixo da aura
    const alvo = document.elementFromPoint(x, y);
    
    if (alvo) {
        const blocoResumo = alvo.closest('#bloco-resumo');
        const blocoDerrota = alvo.closest('#bloco-derrota');

        if (blocoResumo) {
            aura.className = 'aura-vermelho'; 
        } else if (blocoDerrota) {
            aura.className = 'aura-roxo';
        } else {
            aura.className = 'aura-azul';
        }
    }
}

// Escuta o MOUSE (PC)
document.addEventListener("mousemove", tratarMovimento);

// Escuta o TOQUE (Celular)
document.addEventListener("touchmove", (e) => {
    tratarMovimento(e);
    // Impede a tela de balançar no mobile ao passar o dedo
    if (e.cancelable) e.preventDefault(); 
}, { passive: false });

// Faz a aura aparecer/sumir
document.addEventListener("mouseenter", () => aura.style.opacity = "1");
document.addEventListener("mouseleave", () => aura.style.opacity = "0");
document.addEventListener("touchstart", () => aura.style.opacity = "1");


// --- LÓGICA DOS VÍDEOS (IGUAL) ---
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
    video.play();
    video.onended = () => {
        video.classList.remove("mostra-video");
        document.body.classList.remove("modo-braco");
    };
}