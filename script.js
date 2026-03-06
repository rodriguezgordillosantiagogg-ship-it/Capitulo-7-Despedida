const btn = document.getElementById('btnEntrar');
const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const audio = document.getElementById('miAudio');

btn.addEventListener('click', () => {
    pantalla.style.opacity = '0';
    setTimeout(() => {
        pantalla.style.display = 'none';
        contenido.style.display = 'flex';
        video.play();
        audio.play();
    }, 500); // Pequeña pausa para que se vea suave la transición
});
