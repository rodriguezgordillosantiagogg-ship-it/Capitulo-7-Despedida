const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const footer = document.getElementById('footerTexto');
const solContenedor = document.getElementById('solFinal');

// Chispas al tocar para ella
function crearChispa(x, y) {
    for(let i=0; i<6; i++){
        const c = document.createElement('div');
        c.className = 'chispa';
        c.style.left = x + 'px'; c.style.top = y + 'px';
        document.body.appendChild(c);
        const a = Math.random() * Math.PI * 2;
        const d = Math.random() * 80 + 30;
        c.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(a)*d}px, ${Math.sin(a)*d}px) scale(0)`, opacity: 0 }
        ], { duration: 600, easing: 'ease-out' });
        setTimeout(() => c.remove(), 600);
    }
}

// Iniciar Show
async function iniciarTodo(e) {
    crearChispa(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
    pantalla.style.opacity = "0";
    setTimeout(() => {
        pantalla.style.display = 'none';
        contenido.style.display = 'flex';
        video.play();
        video.volume = 0;
        // Fade in audio
        let v = 0; 
        const f = setInterval(() => { if(v<1){ v+=0.1; video.volume=v; } else clearInterval(f); }, 100);
    }, 1000);
}

pantalla.addEventListener('click', iniciarTodo);
video.addEventListener('touchstart', (e) => crearChispa(e.touches[0].clientX, e.touches[0].clientY));

video.onended = function() {
    video.style.opacity = "0";
    setTimeout(() => footer.classList.add('al-centro'), 800);
    setTimeout(() => {
        footer.style.opacity = "0";
        footer.style.filter = "blur(20px)";
        setTimeout(() => {
            footer.style.display = 'none';
            solContenedor.classList.add('mostrar-sol');
        }, 1500);
    }, 5500);
};
