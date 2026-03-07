const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const footer = document.getElementById('footerTexto');
const solContenedor = document.getElementById('solFinal');
const pixelContainer = document.getElementById('pixel-container');

// Crear la lluvia de píxeles (MÁS GRANDES Y FRECUENTES)
function crearPixel() {
    const p = document.createElement('div');
    p.className = 'pixel-caida';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '-5vh';
    pixelContainer.appendChild(p);

    const duracion = Math.random() * 3000 + 2500;
    const anim = p.animate([
        { transform: 'translateY(0)', opacity: 0.8 }, /* Más opacos */
        { transform: 'translateY(110vh)', opacity: 0 }
    ], { duration: duracion, easing: 'linear' });

    anim.onfinish = () => p.remove();
}

// Iniciar Experiencia al tocar
function iniciarTodo() {
    if (pantalla.style.display === 'none') return;
    
    pantalla.style.opacity = "0";
    setTimeout(() => {
        pantalla.style.display = 'none';
        contenido.style.display = 'flex';
        
        video.play().catch(e => console.log("Error de reproducción:", e));
        
        // INICIAR LLUVIA CONSTANTE (MÁS RÁPIDO - antes 180ms)
        setInterval(crearPixel, 120); /* Crea un píxel cada 120ms para mayor densidad */
    }, 800);
}

// Eventos de entrada
pantalla.onclick = iniciarTodo;
pantalla.ontouchstart = iniciarTodo;

// Manejo del final
video.onended = function() {
    video.style.opacity = "0";
    
    setTimeout(() => {
        footer.classList.add('al-centro');
    }, 1000);
    
    setTimeout(() => {
        footer.style.opacity = "0";
        footer.style.filter = "blur(15px)";
        
        setTimeout(() => {
            footer.style.display = 'none';
            solContenedor.classList.add('mostrar-sol');
        }, 1500);
    }, 5500);
};
