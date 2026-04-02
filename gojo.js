const aura = document.getElementById("cursor-aura");
const botao2 = document.getElementById("Gojo");
const videog = document.getElementById("dominio");
const videog2 = document.getElementById("dominio-rapido");

document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    // Move a Aura
    if (aura) {
        aura.style.left = x + "px";
        aura.style.top = y + "px";
    }

    // Detecta o elemento embaixo do dedo
    const alvo = document.elementFromPoint(x, y);
    
    if (alvo) {
        // Se estiver no Resumo, usa a cor/corte do Gojo
        if (alvo.closest('#bloco-resumo')) {
            criarRastro(x, y, 0, 'img/Corte_Gojo.png'); // Use sua imagem azul
            aura.className = 'corte-gojo'; 
        } 
        // Se estiver na Derrota, muda a aura/cor
        else if (alvo.closest('#bloco-derrota')) {
            criarRastro(x, y, 0, 'img/Corte_Mundial.png');
            aura.className = 'corte-mundial';
        }
    }
}, { passive: false });
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