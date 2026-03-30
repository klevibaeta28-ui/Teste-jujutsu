// Elementos da página do Sukuna
const btnSukuna = document.getElementById("S");
const audiosr = document.getElementById("dominior");
const todosOsTextos = document.querySelectorAll("h1, h2, .p2");
const aura = document.getElementById("cursor-aura");
const blocoResumo = document.getElementById("bloco-resumo");
const blocoDerrota = document.getElementById("bloco-derrota");
let textosOriginais = [];

if (btnSukuna) {
    btnSukuna.addEventListener("click", () => {
        // Salva o estado original de todos os textos antes de fatiar
        textosOriginais = [];
        todosOsTextos.forEach(el => textosOriginais.push(el.innerHTML));

        if (audiosr) {
            audiosr.currentTime = 0;
            audiosr.play();
        }

        // Inicia o corte após 6 segundos (conforme seu áudio)
        setTimeout(() => {
            todosOsTextos.forEach(el => fatiarTexto(el));
            
            // Efeito visual de flash no fundo
            document.body.style.backgroundColor = "#4a0000";
            setTimeout(() => { document.body.style.backgroundColor = "black"; }, 200);
        }, 6000);

        // Restaura os textos após 10 segundos
        setTimeout(() => {
            restaurarTodosOsTextos();
        }, 10000);
    });
}

function fatiarTexto(elemento) {
    const palavras = elemento.innerText.split(" ");
    elemento.innerHTML = "";
    palavras.forEach((palavra, i) => {
        const span = document.createElement("span");
        span.innerText = palavra + " ";
        span.style.display = "inline-block";
        setTimeout(() => {
            span.classList.add("corta-objeto");
        }, i * 30);
        elemento.appendChild(span);
    });
}

function restaurarTodosOsTextos() {
    todosOsTextos.forEach((el, index) => {
        if (textosOriginais[index]) {
            el.innerHTML = textosOriginais[index];
            el.style.opacity = "0";
            setTimeout(() => {
                el.style.transition = "opacity 1s";
                el.style.opacity = "1";
            }, 100);
        }
    });
}
if (aura) {
    document.addEventListener("mousemove", (e) => {
        // Usa clientX/Y para posição fixa na tela
        aura.style.left = e.clientX + "px";
        aura.style.top = e.clientY + "px";
    });
}

// --- 2. LÓGICA PARA TROCAR AS IMAGENS NOS BLOCOS ---
function resetAura() {
    if (aura) {
        aura.className = ""; // Remove todas as classes de corte
    }
}

// Bloco Resumo: Ativa o Corte Normal (Preto e Branco)
if (blocoResumo) {
    blocoResumo.addEventListener("mouseenter", () => {
        resetAura();
        aura.classList.add("corte-normal");
    });
    blocoResumo.addEventListener("mouseleave", () => {
        resetAura();
    });
}

// Bloco Derrota: Ativa o Corte Mundial (Colorido)
if (blocoDerrota) {
    blocoDerrota.addEventListener("mouseenter", () => {
        resetAura();
        aura.classList.add("corte-mundial");
    });
    blocoDerrota.addEventListener("mouseleave", () => {
        resetAura();
    });
}

// --- 3. LÓGICA DO CLIQUE (FATIAMENTO) - Mantenha igual ---
if (btnSukuna) {
    btnSukuna.addEventListener("click", () => {
        // Salva o estado original de todos os textos antes de fatiar
        textosOriginais = [];
        todosOsTextos.forEach(el => textosOriginais.push(el.innerHTML));

        if (audiosr) {
            audiosr.currentTime = 0;
            audiosr.play();
        }

        // Inicia o corte após 6 segundos (conforme seu áudio)
        setTimeout(() => {
            // Pegamos os blocos separadamente para aplicar classes diferentes
            const resumoTextos = document.querySelectorAll("#bloco-resumo h2, #bloco-resumo p");
            const derrotaTextos = document.querySelectorAll("#bloco-derrota h2, #bloco-derrota p");

            // Aplica corte normal no Resumo
            resumoTextos.forEach(el => fatiarTexto(el, "corta-objeto"));

            // Aplica o "Corte Mundial" (outro efeito) na Derrota
            derrotaTextos.forEach(el => fatiarTexto(el, "corta-mundial"));

            // Corta o H1 também
            const h1 = document.querySelector("h1");
            if (h1) fatiarTexto(h1, "corta-objeto");

            // Efeito visual de flash no fundo
            document.body.style.backgroundColor = "#4a0000";
            setTimeout(() => { document.body.style.backgroundColor = "black"; }, 200);
        }, 6000);

        // Restaura os textos após 10 segundos
        setTimeout(() => {
            restaurarTodosOsTextos();
        }, 10000);
    });
}

// --- FUNÇÕES DE APOIO (Fatiar e Restaurar) - Mantenha igual ---
// Nota: Atualizei a fatiarTexto para aceitar a classe de animação
function fatiarTexto(elemento, classeAnimacao) {
    if (!elemento) return;
    const palavras = elemento.innerText.split(" ");
    elemento.innerHTML = "";
    palavras.forEach((palavra, i) => {
        const span = document.createElement("span");
        span.innerText = palavra + " ";
        span.style.display = "inline-block";
        setTimeout(() => {
            span.classList.add(classeAnimacao); // Usa a classe que enviamos
        }, i * 30);
        elemento.appendChild(span);
    });
}

function restaurarTodosOsTextos() {
    todosOsTextos.forEach((el, index) => {
        if (textosOriginais[index]) {
            el.innerHTML = textosOriginais[index];
            el.style.opacity = "0";
            setTimeout(() => {
                el.style.transition = "opacity 1s";
                el.style.opacity = "1";
            }, 100);
        }
    });
}
// --- SELEÇÃO DE ELEMENTOS ---
let mouseEmCimaDoBlocoDerrota = false;
let mouseEmCimaDoBlocoResumo = false;

// Variáveis para calcular a rotação do corte
let mouseX = 0, mouseY = 0;
let prevMouseX = 0, prevMouseY = 0;
let mouseRotation = 0;

// Configuração das imagens (Nomes exatos dos seus arquivos PNG transparentes)
const imagemCorteNormal = "img/Corte.png";
const imagemCorteMundial = "img/Corte_mudial.png";

// --- 1. LÓGICA DO RASTRO E ROTAÇÃO (mousemove) ---
document.addEventListener("mousemove", (e) => {
    // Atualiza a posição da Aura Fixa (se houver)
    if (aura) {
        aura.style.left = e.clientX + "px";
        aura.style.top = e.clientY + "px";
    }

    // Calcula a velocidade e direção para a rotação
    mouseX = e.clientX;
    mouseY = e.clientY;

    const deltaX = mouseX - prevMouseX;
    const deltaY = mouseY - prevMouseY;

    // Calcula o ângulo do movimento (em radianos, depois graus)
    const angle = Math.atan2(deltaY, deltaX);
    mouseRotation = angle * (180 / Math.PI); // Converte para graus

    // Só cria o rastro se o mouse estiver se movendo rápido o suficiente
    const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (speed > 5) {
        createTrailElement(e.clientX, e.clientY);
    }

    // Guarda a posição atual para o próximo cálculo
    prevMouseX = mouseX;
    prevMouseY = mouseY;
});

// Função para criar uma cópia do corte (o rastro)
function createTrailElement(x, y) {
    let currentImage = "";
    let trailSize = 60; // Tamanho padrão

    if (mouseEmCimaDoBlocoDerrota) {
        currentImage = imagemCorteMundial;
        trailSize = 80; // Maior para o Corte Mundial
    } else if (mouseEmCimaDoBlocoResumo) {
        currentImage = imagemCorteNormal;
    } else {
        // Se não estiver em bloco, não cria rastro (ou crie um diferente)
        return;
    }

    // Cria a div do rastro
    const trail = document.createElement("div");
    trail.className = "trail-element";
    trail.style.backgroundImage = `url('${currentImage}')`;
    trail.style.width = trailSize + "px";
    trail.style.height = trailSize + "px";
    trail.style.left = x + "px";
    trail.style.top = y + "px";

    // Aplica a rotação baseada na direção do mouse
    // Adicionamos +90 ou ajuste dependendo da orientação original da sua imagem
    trail.style.transform = `translate(-50%, -50%) rotate(${mouseRotation}deg)`;

    document.body.appendChild(trail);

    // Inicia o fade-out logo após a criação
    setTimeout(() => {
        trail.classList.add("fade");
    }, 10);

    // Remove do DOM após o tempo da animação CSS (0.5s)
    setTimeout(() => {
        trail.remove();
    }, 500);
}

// --- 2. LÓGICA DE DETECÇÃO DE BLOCOS (mouseenter/mouseleave) ---
if (blocoResumo) {
    blocoResumo.addEventListener("mouseenter", () => {
        mouseEmCimaDoBlocoResumo = true;
        if (aura) aura.classList.add("no-bloco"); // Efeito opcional na aura fixa
    });
    blocoResumo.addEventListener("mouseleave", () => {
        mouseEmCimaDoBlocoResumo = false;
        if (aura) aura.classList.remove("no-bloco");
    });
}

if (blocoDerrota) {
    blocoDerrota.addEventListener("mouseenter", () => {
        mouseEmCimaDoBlocoDerrota = true;
        if (aura) aura.classList.add("no-bloco");
    });
    blocoDerrota.addEventListener("mouseleave", () => {
        mouseEmCimaDoBlocoDerrota = false;
        if (aura) aura.classList.remove("no-bloco");
    });
}
if (btnSukuna) {
    btnSukuna.addEventListener("click", () => {
        // Seleciona todos os textos novamente no momento do clique
        const todosOsTextos = document.querySelectorAll("h1, h2, .p2");
        
        // Salva originais
        textosOriginais = [];
        todosOsTextos.forEach(el => textosOriginais.push(el.innerHTML));

        if (audiosr) {
            audiosr.currentTime = 0;
            audiosr.play();
        }

        // CORTE INSTANTÂNEO após 6 segundos
        setTimeout(() => {
            // Corta o título principal
            const h1 = document.querySelector("h1");
            if (h1) fatiarTexto(h1, "corta-objeto");

            // Corta o bloco Resumo
            const resumoParts = document.querySelectorAll("#bloco-resumo h2, #bloco-resumo p");
            resumoParts.forEach(el => fatiarTexto(el, "corta-objeto"));

            // Corta o bloco Derrota (Agora vai funcionar!)
            const derrotaParts = document.querySelectorAll("#bloco-derrota h2, #bloco-derrota p");
            derrotaParts.forEach(el => fatiarTexto(el, "corta-objeto"));

            // Flash de luz
            document.body.style.backgroundColor = "#4a0000";
            setTimeout(() => { document.body.style.backgroundColor = "black"; }, 200);
        }, 6000);

        // Restaura após 10 segundos
        setTimeout(restaurarTextos, 16000);
    });
}

function fatiarTexto(elemento, classe) {
    if (!elemento) return;
    const palavras = elemento.innerText.split(" ");
    elemento.innerHTML = "";
    palavras.forEach((palavra, i) => {
        const span = document.createElement("span");
        span.innerText = palavra + " ";
        span.style.display = "inline-block";
        // i * 1 para ser quase simultâneo
        setTimeout(() => {
            span.classList.add(classe);
        }, i * 10); 
        elemento.appendChild(span);
    });
}

function restaurarTextos() {
    const todos = document.querySelectorAll("h1, h2, .p2");
    todos.forEach((el, i) => {
        if (textosOriginais[i]) {
            el.innerHTML = textosOriginais[i];
            el.style.opacity = "1";
        }
    });
}

// Lógica do Rastro (Mantenha apenas uma vez)
document.addEventListener("mousemove", (e) => {
    if (aura) {
        aura.style.left = e.clientX + "px";
        aura.style.top = e.clientY + "px";
    }
});
let prevX = 0, prevY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Atualiza aura fixa
    if (aura) {
        aura.style.left = mouseX + "px";
        aura.style.top = mouseY + "px";
    }

    // Calcula direção para o rastro
    const diffX = mouseX - prevX;
    const diffY = mouseY - prevY;
    const angulo = Math.atan2(diffY, diffX) * (180 / Math.PI);
    const velocidade = Math.sqrt(diffX*diffX + diffY*diffY);

    // Cria rastro apenas se estiver dentro de um bloco e movendo o mouse
    if (velocidade > 4) {
        if (blocoResumo && blocoResumo.matches(':hover')) {
            criarRastro(mouseX, mouseY, angulo, 'Corte.png');
        } else if (blocoDerrota && blocoDerrota.matches(':hover')) {
            criarRastro(mouseX, mouseY, angulo, 'Corte_mudial.png');
        }
    }

    prevX = mouseX;
    prevY = mouseY;
});

function criarRastro(x, y, rot, img) {
    const rastro = document.createElement("div");
    rastro.className = "trail-element";
    rastro.style.backgroundImage = `url('${img}')`;
    rastro.style.width = "80px";
    rastro.style.height = "80px";
    rastro.style.left = x + "px";
    rastro.style.top = y + "px";
    
    // Faz a imagem girar na direção do mouse
    rastro.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;

    document.body.appendChild(rastro);

    setTimeout(() => rastro.classList.add("fade"), 20);
    setTimeout(() => rastro.remove(), 500);
}