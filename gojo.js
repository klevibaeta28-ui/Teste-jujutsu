const aura = document.getElementById("cursor-aura");
const botao2 = document.getElementById("Gojo");
const videog = document.getElementById("dominio");
const videog2 = document.getElementById("dominio-rapido");

// Variáveis para calcular o rastro
let prevX = 0;
let prevY = 0;

// --- FUNÇÃO PARA CRIAR O RASTRO (ESTAVA FALTANDO!) ---
function criarRastro(x, y, angulo, imagemSrc) {
    const rastro = document.createElement('img');
    rastro.src = imagemSrc;
    rastro.className = 'trail-element'; // Certifique-se de ter essa classe no CSS
    rastro.style.left = x + 'px';
    rastro.style.top = y + 'px';
    rastro.style.transform = `translate(-50%, -50%) rotate(${angulo}deg)`;
    
    document.body.appendChild(rastro);

    // Remove o rastro depois de um tempinho
    setTimeout(() => {
        rastro.style.opacity = '0';
        setTimeout(() => rastro.remove(), 500);
    }, 100);
}

// --- MOVIMENTO (MOUSE E TOQUE) ---
function manipularMovimento(e) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    if (aura) {
        aura.style.left = x + "px";
        aura.style.top = y + "px";
        aura.style.opacity = "1";
        aura.style.pointerEvents = "none"; 
    }

    const alvo = document.elementFromPoint(x, y);
    
    if (alvo) {
        const blocoResumo = alvo.closest('#bloco-resumo');
        const blocoDerrota = alvo.closest('#bloco-derrota');

        // Cálculo de ângulo para o rastro
        const diffX = x - prevX;
        const diffY = y - prevY;
        const angulo = Math.atan2(diffY, diffX) * (180 / Math.PI);
        const velocidade = Math.sqrt(diffX * diffX + diffY * diffY);

        if (velocidade > 5) {
            if (blocoResumo) {
                aura.className = 'corte-gojo';
                criarRastro(x, y, angulo, 'img/Corte_Gojo.png');
            } else if (blocoDerrota) {
                aura.className = 'corte-mundial';
                criarRastro(x, y, angulo, 'img/Corte_Mundial.png');
            } else {
                aura.className = '';
            }
        }
    }
    prevX = x;
    prevY = y;
}

document.addEventListener("mousemove", manipularMovimento);
document.addEventListener("touchmove", (e) => {
    manipularMovimento(e);
    // Trava a rolagem apenas se estiver cortando lateralmente
    const touch = e.touches[0];
    const diffX = Math.abs(touch.clientX - prevX);
    const diffY = Math.abs(touch.clientY - prevY);
    if (diffX > diffY) e.preventDefault(); 
}, { passive: false });

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
    document.body.classList.add("modo-braco"); // Mantive "braco" para combinar com seu CSS
    video.classList.add("mostra-video");
    video.playbackRate = velocidade;
    video.currentTime = 0;
    video.play().catch(e => console.log("Erro ao tocar vídeo:", e));
    
    video.onended = () => {
        video.classList.remove("mostra-video");
        document.body.classList.remove("modo-braco");
    };
}