const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const footer = document.getElementById('footerTexto');
const solContenedor = document.getElementById('solFinal');
const pixelContainer = document.getElementById('pixel-container');

function crearPixel() {
    const p = document.createElement('div');
    p.className = 'pixel-caida';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '-5vh';
    pixelContainer.appendChild(p);

    const duracion = Math.random() * 2000 + 1500; // Más rápidos para que se vea más lleno
    const anim = p.animate([
        { transform: 'translateY(0)', opacity: 0.9 },
        { transform: 'translateY(110vh)', opacity: 0 }
    ], { duration: duracion, easing: 'linear' });

    anim.onfinish = () => p.remove();
}

function iniciarTodo() {
    if (pantalla.style.display === 'none') return;
    pantalla.style.opacity = "0";
    setTimeout(() => {
        pantalla.style.display = 'none';
        contenido.style.display = 'flex';
        video.play().catch(e => console.log(e));
        
        // LLUVIA MUY DENSA: cada 80ms para que se llene el fondo
        setInterval(crearPixel, 80); 
    }, 800);
}

pantalla.onclick = iniciarTodo;
pantalla.ontouchstart = iniciarTodo;

video.onended = function() {
    video.style.opacity = "0";
    setTimeout(() => { footer.classList.add('al-centro'); }, 1000);
    setTimeout(() => {
        footer.style.opacity = "0";
        setTimeout(() => {
            footer.style.display = 'none';
            solContenedor.classList.add('mostrar-sol');
        }, 1200);
    }, 5000);
};
