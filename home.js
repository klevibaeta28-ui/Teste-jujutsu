// Use nomes simples, sem hífens, nos parênteses da função
function configurarBotao(idContainer, idImgInicio, idVideo, idImgFinal) {
    const container = document.getElementById(idContainer);
    const imgInicio = document.getElementById(idImgInicio);
    const video = document.getElementById(idVideo);
    const imgFinal = document.getElementById(idImgFinal);

    if (!container || !imgInicio || !video || !imgFinal) return;

    container.addEventListener('mouseenter', () => {
        imgInicio.style.display = 'none';
        imgFinal.style.display = 'none';
        video.style.display = 'block';
        video.play().catch(e => console.log("Erro ao dar play:", e));
    });

    video.onended = () => {
        video.style.display = 'none';
        imgFinal.style.display = 'block';
    };

    container.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
        video.style.display = 'none';
        imgFinal.style.display = 'none';
        imgInicio.style.display = 'block';
    });
}

// AQUI é onde você usa os nomes com hífens, dentro de ASPAS
configurarBotao('container-gojo', 'img-inicio-gojo', 'video-gojo', 'img-final-gojo');
configurarBotao('container-sukuna', 'img-inicio-sukuna', 'video-sukuna', 'img-final-sukuna');