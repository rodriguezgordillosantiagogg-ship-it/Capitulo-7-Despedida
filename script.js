const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const audio = document.getElementById('miAudio');
const sakuraContainer = document.getElementById('sakura-container');

// Generador de pétalos Sakura
function crearPetalo() {
    const petalo = document.createElement('div');
    petalo.classList.add('petalo');
    
    const size = Math.random() * 7 + 4 + 'px';
    petalo.style.left = Math.random() * 100 + 'vw';
    petalo.style.width = size;
    petalo.style.height = size;
    petalo.style.animationDuration = Math.random() * 3 + 4 + 's';
    
    sakuraContainer.appendChild(petalo);
    
    // Limpieza de memoria
    setTimeout(() => { petalo.remove(); }, 6000);
}

// Evento al hacer clic en cualquier parte
pantalla.addEventListener('click', () => {
    // 1. Iniciar desvanecimiento de la portada
    pantalla.style.opacity = '0';
    
    setTimeout(() => {
        pantalla.style.display = 'none';
        
        // 2. Mostrar video y texto con fade-in
        contenido.style.display = 'flex';
        setTimeout(() => { contenido.style.opacity = '1'; }, 50);
        
        // 3. Reproducir multimedia (Video + Audio)
        // Usamos catch por si el navegador bloquea el autoplay
        video.play().catch(e => console.log("Video listo..."));
        audio.play().catch(e => console.log("Audio listo..."));
        
        // 4. Iniciar lluvia de pétalos cada 300ms
        setInterval(crearPetalo, 300);
    }, 1200); // Tiempo de espera antes de mostrar el video
});
