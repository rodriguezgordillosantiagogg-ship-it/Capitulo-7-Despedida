const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const footer = document.getElementById('footerTexto');
const solContenedor = document.getElementById('solFinal');
const pixelShowerContainer = document.getElementById('pixel-shower-container');

function crearPixel() {
    const p = document.createElement('div');
    p.classList.add('pixel-caida');
    p.style.left = Math.random() * 100 + 'vw';
    const dur = Math.random() * 2 + 3 + 's';
    
    // Animación de caída fluida
    p.animate([
        { transform: 'translateY(-10vh)', opacity: 0 },
        { opacity: 0.8, offset: 0.2 },
        { transform: 'translateY(110vh)', opacity: 0 }
    ], {
        duration: parseFloat(dur) * 1000,
        easing: 'linear'
    });

    pixelShowerContainer.appendChild(p);
    setTimeout(() => p.remove(), parseFloat(dur) * 1000);
}

video.onended = function() {
    video.style.opacity = "0";
    setTimeout(() => footer.classList.add('al-centro'), 800);
    setTimeout(() => {
        footer.style.filter = "blur(20px)";
        footer.style.opacity = "0";
        setTimeout(() => {
            footer.style.display = 'none';
            solContenedor.classList.add('mostrar-sol');
        }, 2000);
    }, 6000);
};

async function iniciarTodo() {
    pantalla.style.transition = "opacity 1s ease";
    pantalla.style.opacity = "0";
    setTimeout(() => {
        pantalla.style.display = 'none';
        contenido.style.display = 'flex';
        video.play();
        setInterval(crearPixel, 150);
    }, 1000);
}

pantalla.addEventListener('click', iniciarTodo);
