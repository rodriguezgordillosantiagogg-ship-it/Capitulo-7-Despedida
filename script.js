const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const footer = document.getElementById('footerTexto');
const solContenedor = document.getElementById('solFinal');
const starShowerContainer = document.getElementById('star-shower-container');

// --- GENERADOR DE ESTRELLAS CAÍDAS PARPADEANTES (MAGIA ORIGINAL) ---
function crearEstrella() {
    const p = document.createElement('div');
    p.classList.add('estrella-caida');
    p.style.left = Math.random() * 100 + 'vw';
    
    // Tamaño aleatorio pequeño y parpadeante
    const size = Math.random() * 6 + 2 + 'px'; // Entre 2px y 8px
    p.style.width = size; p.style.height = size;
    
    // Velocidades aleatorias suavemente diagonales
    const caidaDur = Math.random() * 2 + 5 + 's'; // Caída lenta de 5s a 7s
    p.style.animationDuration = `${caidaDur}, ${Math.random() * 2 + 2}s`; // Caída y Parpadeo
    p.style.animationName = 'caer, parpadear'; // Ambos efectos
    
    if(starShowerContainer) starShowerContainer.appendChild(p);
    
    // Limpieza
    setTimeout(() => p.remove(), 7000);
}

function dispararExplosion() {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < 80; i++) {
        const e = document.createElement('div');
        e.classList.add('estrella-sparkle');
        document.body.appendChild(e);
        const ang = Math.random() * Math.PI * 2;
        const dist = Math.random() * 500 + 50;
        e.style.left = cx + 'px'; e.style.top = cy + 'px';
        const dur = Math.random() * 1.5 + 2;
        setTimeout(() => {
            e.style.opacity = '1';
            e.style.transition = `all ${dur}s cubic-bezier(0.1, 0.8, 0.2, 1)`;
            e.style.left = cx + Math.cos(ang) * dist + 'px';
            e.style.top = cy + Math.sin(ang) * dist + 'px';
        }, 10);
        setTimeout(() => e.style.animation = `parpadear ${Math.random() + 1}s infinite`, dur * 1000);
    }
}

video.onended = function() {
    video.style.opacity = "0";
    
    // Texto sube al centro (Mismo comportamiento original)
    setTimeout(() => footer.classList.add('al-centro'), 800);

    // Destello Supernova
    setTimeout(() => {
        footer.classList.add('supernova');
    }, 5000);

    // Explosión y Sol final
    setTimeout(() => {
        footer.style.display = 'none';
        dispararExplosion();
        // Aparece el Sol Minimalista en lugar de la galaxia
        setTimeout(() => {
            solContenedor.classList.add('mostrar-sol');
        }, 500);
    }, 7500);
};

// Fade out volumen suave
video.ontimeupdate = function() {
    const r = video.duration - video.currentTime;
    if (r < 2 && r > 0) { video.volume = r / 2; }
};

async function iniciarTodo() {
    pantalla.style.display = 'none';
    contenido.style.display = 'flex';
    video.load();
    video.volume = 1.0; // Usamos solo el audio del video
    try { await video.play(); } catch (e) { video.play(); }
    
    // --- GENERAR ESTRELLAS CONSTANTEMENTE (Lógica Original) ---
    setInterval(crearEstrella, 300); // Una estrella cada 300ms
}

pantalla.addEventListener('click', iniciarTodo);
