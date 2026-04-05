const btnSukuna = document.getElementById("S");
const audiosr = document.getElementById("dominior");
const todosOsTextos = document.querySelectorAll("h1, h2, .p2");
const aura = document.getElementById("cursor-aura");
const blocoResumo = document.getElementById("bloco-resumo");
const blocoDerrota = document.getElementById("bloco-derrota");
let textosOriginais = [];
function manipularMovimento(e) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    if (aura) {
        aura.style.opacity = "1";
        aura.style.left = x + "px";
        aura.style.top = y + "px";
    }

    const diffX = x - prevX;
    const diffY = y - prevY;
    const velocidade = Math.sqrt(diffX * diffX + diffY * diffY);
    const angulo = Math.atan2(diffY, diffX) * (180 / Math.PI);

    if (velocidade > 5) {
        const alvo = document.elementFromPoint(x, y);
        if (alvo) {
            if (alvo.closest('#bloco-resumo')) {
                criarRastro(x, y, angulo, 'img/Corte.png');
            } else if (alvo.closest('#bloco-derrota')) {
                criarRastro(x, y, angulo, 'img/Corte_mudial.png');
            }
        }
    }

    prevX = x;
    prevY = y;
}
document.addEventListener("mousemove", manipularMovimento);
document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const diffX = Math.abs(touch.clientX - prevX);
    const diffY = Math.abs(touch.clientY - prevY);

    if (diffX > diffY) {
        if (e.cancelable) e.preventDefault(); 
        manipularMovimento(e);
    }
}, { passive: false });document.addEventListener("touchend", () => {
    if (aura) aura.style.opacity = "0";
});
if (btnSukuna) {
    btnSukuna.addEventListener("click", () => {
        textosOriginais = [];
        todosOsTextos.forEach(el => textosOriginais.push(el.innerHTML));

        if (audiosr) {
            audiosr.currentTime = 0;
            audiosr.play();
        }
        setTimeout(() => {
            todosOsTextos.forEach(el => fatiarTexto(el));
            document.body.style.backgroundColor = "#4a0000";
            setTimeout(() => { document.body.style.backgroundColor = "black"; }, 200);
        }, 6000);
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
        aura.style.left = e.clientX + "px";
        aura.style.top = e.clientY + "px";
    });
}

function resetAura() {
    if (aura) {
        aura.className = "";
    }
}


if (blocoResumo) {
    blocoResumo.addEventListener("mouseenter", () => {
        resetAura();
        aura.classList.add("corte-normal");
    });
    blocoResumo.addEventListener("mouseleave", () => {
        resetAura();
    });
}

if (blocoDerrota) {
    blocoDerrota.addEventListener("mouseenter", () => {
        resetAura();
        aura.classList.add("corte-mundial");
    });
    blocoDerrota.addEventListener("mouseleave", () => {
        resetAura();
    });
}

if (btnSukuna) {
    btnSukuna.addEventListener("click", () => {
        textosOriginais = [];
        todosOsTextos.forEach(el => textosOriginais.push(el.innerHTML));

        if (audiosr) {
            audiosr.currentTime = 0;
            audiosr.play();
        }

        setTimeout(() => {
            const resumoTextos = document.querySelectorAll("#bloco-resumo h2, #bloco-resumo p");
            const derrotaTextos = document.querySelectorAll("#bloco-derrota h2, #bloco-derrota p");
            resumoTextos.forEach(el => fatiarTexto(el, "corta-objeto"));
            derrotaTextos.forEach(el => fatiarTexto(el, "corta-mundial"));
            const h1 = document.querySelector("h1");
            if (h1) fatiarTexto(h1, "corta-objeto");
            document.body.style.backgroundColor = "#4a0000";
            setTimeout(() => { document.body.style.backgroundColor = "black"; }, 200);
        }, 6000);
        setTimeout(() => {
            restaurarTodosOsTextos();
        }, 10000);
    });
}
function fatiarTexto(elemento, classeAnimacao) {
    if (!elemento) return;
    const palavras = elemento.innerText.split(" ");
    elemento.innerHTML = "";
    palavras.forEach((palavra, i) => {
        const span = document.createElement("span");
        span.innerText = palavra + " ";
        span.style.display = "inline-block";
        setTimeout(() => {
            span.classList.add(classeAnimacao);
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
let mouseEmCimaDoBlocoDerrota = false;
let mouseEmCimaDoBlocoResumo = false;
let mouseX = 0, mouseY = 0;
let prevMouseX = 0, prevMouseY = 0;
let mouseRotation = 0;
const imagemCorteNormal = "img/Corte.png";
const imagemCorteMundial = "img/Corte_mudial.png";

document.addEventListener("mousemove", (e) => {
    if (aura) {
        aura.style.left = e.clientX + "px";
        aura.style.top = e.clientY + "px";
    }
    mouseX = e.clientX;
    mouseY = e.clientY;

    const deltaX = mouseX - prevMouseX;
    const deltaY = mouseY - prevMouseY;

    const angle = Math.atan2(deltaY, deltaX);
    mouseRotation = angle * (180 / Math.PI);
    const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (speed > 5) {
        createTrailElement(e.clientX, e.clientY);
    }

    prevMouseX = mouseX;
    prevMouseY = mouseY;
});

function createTrailElement(x, y) {
    let currentImage = "";
    let trailSize = 60;

    if (mouseEmCimaDoBlocoDerrota) {
        currentImage = imagemCorteMundial;
        trailSize = 80;
    } else if (mouseEmCimaDoBlocoResumo) {
        currentImage = imagemCorteNormal;
    } else {
        return;
    }

    const trail = document.createElement("div");
    trail.className = "trail-element";
    trail.style.backgroundImage = `url('${currentImage}')`;
    trail.style.width = trailSize + "px";
    trail.style.height = trailSize + "px";
    trail.style.left = x + "px";
    trail.style.top = y + "px";
    trail.style.transform = `translate(-50%, -50%) rotate(${mouseRotation}deg)`;

    document.body.appendChild(trail);

    setTimeout(() => {
        trail.classList.add("fade");
    }, 10);

    setTimeout(() => {
        trail.remove();
    }, 500);
}

if (blocoResumo) {
    blocoResumo.addEventListener("mouseenter", () => {
        mouseEmCimaDoBlocoResumo = true;
        if (aura) aura.classList.add("no-bloco");
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
        const todosOsTextos = document.querySelectorAll("h1, h2, .p2");
        textosOriginais = [];
        todosOsTextos.forEach(el => textosOriginais.push(el.innerHTML));

        if (audiosr) {
            audiosr.currentTime = 0;
            audiosr.play();
        }

        setTimeout(() => {
            const h1 = document.querySelector("h1");
            if (h1) fatiarTexto(h1, "corta-objeto");

            const resumoParts = document.querySelectorAll("#bloco-resumo h2, #bloco-resumo p");
            resumoParts.forEach(el => fatiarTexto(el, "corta-objeto"));

            const derrotaParts = document.querySelectorAll("#bloco-derrota h2, #bloco-derrota p");
            derrotaParts.forEach(el => fatiarTexto(el, "corta-objeto"));

            document.body.style.backgroundColor = "#4a0000";
            setTimeout(() => { document.body.style.backgroundColor = "black"; }, 200);
        }, 6000);

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

    if (aura) {
        aura.style.left = mouseX + "px";
        aura.style.top = mouseY + "px";
    }

    const diffX = mouseX - prevX;
    const diffY = mouseY - prevY;
    const angulo = Math.atan2(diffY, diffX) * (180 / Math.PI);
    const velocidade = Math.sqrt(diffX*diffX + diffY*diffY);

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
    rastro.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;

    document.body.appendChild(rastro);

    setTimeout(() => rastro.classList.add("fade"), 20);
    setTimeout(() => rastro.remove(), 500);
}