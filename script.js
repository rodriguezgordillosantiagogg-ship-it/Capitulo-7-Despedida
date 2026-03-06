const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const audio = document.getElementById('miAudio');
const sakuraContainer = document.getElementById('sakura-container');

// Generador de pétalos
function crearPetalo() {
    const petalo = document.createElement('div');
    petalo.classList.add('petalo');
    
    const size = Math.random() * 8 + 5 + 'px';
    petalo.style.left = Math.random() * 100 + 'vw';
    petalo.style.width = size;
    petalo.style.height = size;
    petalo.style.animationDuration = Math.random() * 3 + 4 + 's';
    
    sakuraContainer.appendChild(petalo);
    
    setTimeout(() => { petalo.remove(); }, 6000);
}

// Al hacer clic en la pantalla de inicio
pantalla.addEventListener('click', () => {
    // 1. Desvanecer inicio
    pantalla.style.opacity = '0';
    
    setTimeout(() => {
        pantalla.style.display = 'none';
        
        // 2. Mostrar contenido con fade-in
        contenido.style.display = 'flex';
        setTimeout(() => { contenido.style.opacity = '1'; }, 100);
        
        // 3. Play multimedia
        video.play().catch(err => console.log("Video en espera..."));
        audio.play().catch(err => console.log("Audio en espera..."));
        
        // 4. Iniciar Sakura
        setInterval(crearPetalo, 250);
    }, 1500);
});
