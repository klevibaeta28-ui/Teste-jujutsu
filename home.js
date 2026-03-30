function configurarBotao(idContainer, idImgInicio, idVideo, idImgFinal) {
    const container = document.getElementById(idContainer);
    const imgInicio = document.getElementById(idImgInicio);
    const video = document.getElementById(idVideo);
    const imgFinal = document.getElementById(idImgFinal);

    if (!container || !video || !imgInicio || !imgFinal) return;

    container.addEventListener('mouseenter', () => {
        // Esconde as imagens e mostra o vídeo
        imgInicio.style.display = 'none';
        imgFinal.style.display = 'none';
        video.style.display = 'block';
        video.play().catch(e => console.log("Erro ao dar play:", e));
    });

    video.onended = () => {
        // Quando o vídeo acaba, mostra a imagem final
        video.style.display = 'none';
        imgFinal.style.display = 'block';
    };

    container.addEventListener('mouseleave', () => {
        // Quando o mouse sai, reseta tudo para a imagem inicial
        video.pause();
        video.currentTime = 0;
        video.style.display = 'none';
        imgFinal.style.display = 'none';
        imgInicio.style.display = 'block';
    });
}