const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const audio = document.getElementById('miAudio');
const sakuraContainer = document.getElementById('sakura-container');

function crearPetalo() {
    const petalo = document.createElement('div');
    petalo.classList.add('petalo');
    const size = Math.random() * 7 + 4 + 'px';
    petalo.style.left = Math.random() * 100 + 'vw';
    petalo.style.width = size;
    petalo.style.height = size;
    petalo.style.animationDuration = Math.random() * 3 + 4 + 's';
    sakuraContainer.appendChild(petalo);
    setTimeout(() => { petalo.remove(); }, 6000);
}

pantalla.addEventListener('click', () => {
    // 1. Quitar portada inmediatamente
    pantalla.style.display = 'none';
    
    // 2. Mostrar contenido
    contenido.style.display = 'flex';
    
    // 3. Intentar reproducir audio y video
    // Activamos el sonido del video después de iniciar si el audio.mp3 falla
    audio.play().catch(e => console.log("Audio en espera"));
    
    video.play().then(() => {
        video.muted = false; // Intenta quitar el silencio si el navegador lo permite
    }).catch(error => {
        console.error("Error al reproducir video:", error);
    });

    // 4. Iniciar Sakura
    setInterval(crearPetalo, 300);
});
