const aura = document.getElementById("cursor-aura");
const botao2 = document.getElementById("Gojo");
const videog = document.getElementById("dominio");
const videog2 = document.getElementById("dominio-rapido");

document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    if (aura) {
        aura.style.left = x + "px";
        aura.style.top = y + "px";
        aura.style.opacity = "1"; // Garante que ela apareça
        
        // --- TRUQUE MÁGICO ---
        // Desliga o clique da aura rapidinho para o código "atravessar" ela e ver o texto
        aura.style.pointerEvents = "none"; 
    }

    const alvo = document.elementFromPoint(x, y);
    
    if (alvo) {
        const blocoResumo = alvo.closest('#bloco-resumo');
        const blocoDerrota = alvo.closest('#bloco-derrota');

        if (blocoResumo) {
            aura.className = 'corte-gojo'; // Muda a cor no CSS
            // Só cria rastro se estiver movendo rápido (opcional)
            criarRastro(x, y, 0, 'img/Corte_Gojo.png');
        } else if (blocoDerrota) {
            aura.className = 'corte-mundial'; // Muda a cor no CSS
            criarRastro(x, y, 0, 'img/Corte_Mundial.png');
        } else {
            // Se sair dos blocos, limpa a classe ou volta ao padrão
            aura.className = '';
        }
    }
}, { passive: false });

// Adicione esse evento para a aura sumir quando soltar o dedo
document.addEventListener("touchend", () => {
    if (aura) aura.style.opacity = "0";
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