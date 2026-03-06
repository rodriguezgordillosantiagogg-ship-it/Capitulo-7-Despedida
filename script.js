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
    // Quitar portada inmediatamente
    pantalla.style.display = 'none';
    
    // Mostrar contenido
    contenido.style.display = 'flex';
    
    // Reproducir audio
    audio.play().catch(e => console.log("Audio en espera"));
    
    // Reproducir video (primero intenta con sonido, si falla sigue)
    video.play().then(() => {
        video.muted = false; 
    }).catch(error => {
        console.error("Error al reproducir video:", error);
    });

    // Iniciar Sakura
    setInterval(crearPetalo, 300);
});
