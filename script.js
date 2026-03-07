const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const footer = document.getElementById('footerTexto');
const solContenedor = document.getElementById('solFinal');
const pixelShowerContainer = document.getElementById('pixel-shower-container');

function crearPixel() {
    const p = document.createElement('div');
    p.className = 'pixel-caida';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '-5vh';
    
    // Variación de velocidad para el efecto hoja
    const duracion = Math.random() * 4000 + 6000; // Entre 6 y 10 segundos (Muy lento)
    p.style.animationDuration = (Math.random() * 2 + 2) + 's'; // Velocidad del vaivén
    
    pixelShowerContainer.appendChild(p);

    const anim = p.animate([
        { transform: 'translateY(0)', opacity: 0.9 },
        { transform: 'translateY(115vh)', opacity: 0 }
    ], { 
        duration: duracion, 
        easing: 'linear' 
    });

    anim.onfinish = () => p.remove();
}

async function iniciarTodo() {
    pantalla.style.opacity = "0";
    setTimeout(() => {
        pantalla.style.display = 'none';
        contenido.style.display = 'flex';
        video.play().catch(e => console.log("Play error:", e));
        
        // Generar píxeles con calma
        setInterval(crearPixel, 150); 
    }, 800);
}

pantalla.addEventListener('click', iniciarTodo);
pantalla.addEventListener('touchstart', iniciarTodo);

video.onended = function() {
    video.style.opacity = "0";
    setTimeout(() => {
        footer.classList.add('al-centro');
        setTimeout(() => {
            footer.style.opacity = "0";
            footer.style.filter = "blur(10px)";
            setTimeout(() => {
                footer.style.display = 'none';
                solContenedor.classList.add('mostrar-sol');
            }, 1500);
        }, 5000);
    }, 1000);
};
