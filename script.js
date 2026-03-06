const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const audio = document.getElementById('miAudio');
const sakuraContainer = document.getElementById('sakura-container');

function crearPetalo() {
    const petalo = document.createElement('div');
    petalo.classList.add('petalo');
    const size = Math.random() * 6 + 3 + 'px';
    petalo.style.left = Math.random() * 100 + 'vw';
    petalo.style.width = size;
    petalo.style.height = size;
    petalo.style.animationDuration = Math.random() * 3 + 4 + 's';
    if(sakuraContainer) sakuraContainer.appendChild(petalo);
    setTimeout(() => { petalo.remove(); }, 6000);
}

pantalla.addEventListener('click', () => {
    pantalla.style.display = 'none';
    contenido.style.display = 'flex';
    
    // Forzamos al navegador a cargar el video
    video.load();
    
    // Intentamos reproducir con sonido
    video.play().then(() => {
        video.muted = false;
    }).catch(err => {
        // Si el móvil lo bloquea, lo corre en silencio pero se verá la imagen
        video.play();
    });

    audio.play().catch(e => console.log("Audio esperando..."));
    
    setInterval(crearPetalo, 300);
});
