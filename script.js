const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const footer = document.getElementById('footerTexto');
const solContenedor = document.getElementById('solFinal');

// Función de chispas táctiles
function crearChispa(x, y) {
    for(let i=0; i<7; i++){
        const c = document.createElement('div');
        c.className = 'chispa';
        c.style.left = x + 'px'; 
        c.style.top = y + 'px';
        document.body.appendChild(c);
        
        const angulo = Math.random() * Math.PI * 2;
        const dist = Math.random() * 90 + 30;
        
        c.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angulo)*dist}px, ${Math.sin(angulo)*dist}px) scale(0)`, opacity: 0 }
        ], { duration: 700, easing: 'ease-out' });
        
        setTimeout(() => c.remove(), 700);
    }
}

// Iniciar Experiencia
async function iniciarTodo(e) {
    // Obtener coordenadas del clic o toque
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    if(x && y) crearChispa(x, y);

    pantalla.style.transition = "opacity 1s ease";
    pantalla.style.opacity = "0";
    
    setTimeout(() => {
        pantalla.style.display = 'none';
        contenido.style.display = 'flex';
        
        video.play();
        video.volume = 0;
        // Fade in suave de audio
        let vol = 0;
        const fadeAudio = setInterval(() => {
            if(vol < 1){ vol += 0.1; video.volume = vol; }
            else clearInterval(fadeAudio);
        }, 150);
    }, 1000);
}

// Eventos
pantalla.addEventListener('click', iniciarTodo);
video.addEventListener('touchstart', (e) => {
    crearChispa(e.touches[0].clientX, e.touches[0].clientY);
});

// Final del video
video.onended = function() {
    video.style.opacity = "0";
    setTimeout(() => {
        footer.classList.add('al-centro');
        if(navigator.vibrate) navigator.vibrate(50);
    }, 800);

    setTimeout(() => {
        footer.style.opacity = "0";
        footer.style.filter = "blur(20px)";
        setTimeout(() => {
            footer.style.display = 'none';
            solContenedor.classList.add('mostrar-sol');
        }, 1500);
    }, 5500);
};
