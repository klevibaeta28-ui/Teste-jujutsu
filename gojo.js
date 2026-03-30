// Elementos da página do Gojo
const aura = document.getElementById("cursor-aura");
const botao2 = document.getElementById("Gojo");
const videog = document.getElementById("dominio");
const videog2 = document.getElementById("dominio-rapido");

// --- LOGICA DA AURA ---
if (aura) {
    document.addEventListener("mousemove", (e) => {
        aura.style.left = e.clientX + "px";
        aura.style.top = e.clientY + "px";
        aura.style.transform = "translate(-50%, -50%)";
    });

    const h1 = document.querySelector("h1");
    const img = document.querySelector("img");
    const h2_lista = document.querySelectorAll("h2");
    const p_lista = document.querySelectorAll(".p2");

    function resetAura() { aura.className = ""; }

    if (h1) h1.addEventListener("mouseenter", () => { resetAura(); aura.classList.add("aura-azur"); });
    if (img) img.addEventListener("mouseenter", () => { resetAura(); aura.classList.add("aura-azur"); });

    if (h2_lista[0]) h2_lista[0].addEventListener("mouseenter", () => { resetAura(); aura.classList.add("aura-vermelho"); });
    if (p_lista[0]) p_lista[1].addEventListener("mouseenter", () => { resetAura(); aura.classList.add("aura-vermelho"); });

    if (h2_lista[1]) h2_lista[1].addEventListener("mouseenter", () => { resetAura(); aura.classList.add("aura-roxo"); });
    if (p_lista[1]) p_lista[2].addEventListener("mouseenter", () => { resetAura(); aura.classList.add("aura-roxo"); });

    document.addEventListener("mouseover", (e) => {
        if (e.target.tagName === "BODY") { resetAura(); aura.classList.add("aura-azur"); }
    });
}

// --- LOGICA DOS VÍDEOS (EXPANSÃO) ---
let cliques = 0;
let timer;
if (botao2) {
    botao2.addEventListener("click", () => {
        cliques++;
        if (cliques === 1) {
            timer = setTimeout(() => {
                if (cliques === 1) expansãoNorma();
                cliques = 0;
            }, 300);
        } else if (cliques === 2) {
            clearTimeout(timer);
            expansãoVariação();
            cliques = 0;
        }
    });
}

function expansãoNorma() {
    document.body.classList.toggle("modo-braco");
    videog.classList.add("mostra-video");
    videog.currentTime = 0;
    videog.play();
    videog.onended = () => {
        videog.classList.remove("mostra-video");
        document.body.classList.remove("modo-braco");
    };
}

function expansãoVariação() {
    document.body.classList.toggle("modo-braco");
    videog2.classList.add("mostra-video");
    videog2.currentTime = 0;
    videog2.playbackRate = 1.5;
    videog2.play();
    videog2.onended = () => {
        document.body.classList.remove("modo-braco");
        videog2.classList.remove("mostra-video");
    };
}