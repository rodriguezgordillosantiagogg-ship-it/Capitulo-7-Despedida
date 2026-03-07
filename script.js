const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const footer = document.getElementById('footerTexto');
const solContenedor = document.getElementById('solFinal');

// 1. Función de chispas (Debe estar declarada antes de usarse)
function crearChispa(x, y) {
    if (!x || !y) return;
    for(let i=0; i<7; i++){
        const c = document.createElement('div');
        c.className = 'chispa';
        c.style.left = x + 'px'; 
        c.style.top = y + 'px';
        document.body.appendChild(c);
        
        const angulo = Math.random() * Math.PI * 2;
        const dist = Math.random() * 80 + 20;
        
        c.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angulo)*dist}px, ${Math.sin(angulo)*dist}px) scale(0)`, opacity: 0 }
        ], { duration: 600, easing: 'ease-out' });
        
        setTimeout(() => c.remove(), 600);
    }
}

// 2. Función principal de inicio
function iniciarShow(e) {
    // Evitamos que se ejecute dos veces
    if (pantalla.style.display === 'none') return;

    // Obtener coordenadas para la chispa
    let x, y;
    if (e.touches && e.touches[0]) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else {
        x = e.clientX;
        y = e.clientY;
    }
    
    crearChispa(x, y);

    // Transición visual
    pantalla.style.transition = "opacity 0.8s ease";
    pantalla.style.opacity = "0";
    
    setTimeout(() => {
        pantalla.style.display = 'none';
        contenido.style.display = 'flex';
        
        // Reproducción de video
        video.play().catch(err => console.log("Error al reproducir:", err));
        
        // Fade in de audio
        video.volume = 0;
        let vol = 0;
        const fadeAudio = setInterval(() => {
            if(vol < 0.9){ 
                vol += 0.1; 
                video.volume = vol; 
            } else {
                video.volume = 1;
                clearInterval(fadeAudio);
            }
        }, 200);
    }, 800);
}

// 3. Eventos (Escuchamos ambos pero la función controla que no se repita)
pantalla.addEventListener('click', iniciarShow);
pantalla.addEventListener('touchstart', iniciarShow, {passive: true});

// Chispas extra durante el video al tocar
video.addEventListener('touchstart', (e) => {
    if(e.touches[0]) crearChispa(e.touches[0].clientX, e.touches[0].clientY);
}, {passive: true});

// 4. Lógica de cierre (Sol final)
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
