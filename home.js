function configurarBotao(idContainer, idImgInicio, idVideo, idImgFinal) {
    const container = document.getElementById(idContainer);
    const imgInicio = document.getElementById(idImgInicio);
    const video = document.getElementById(idVideo);
    const imgFinal = document.getElementById(idImgFinal);

    if (!container || !video) return;

    container.addEventListener('mouseenter', () => {
        imgInicio.style.display = 'none';
        imgFinal.style.display = 'none';
        video.style.display = 'block';
        video.play();
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

// Ativa para o Gojo
configurarBotao('container-gojo', 'img-inicio-gojo', 'video-gojo', 'img-final-gojo');

// Ativa para o Sukuna
configurarBotao('container-sukuna', 'img-inicio-sukuna', 'video-sukuna', 'img-final-sukuna');