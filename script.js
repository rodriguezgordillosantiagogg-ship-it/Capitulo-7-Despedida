const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const footer = document.getElementById('footerTexto');
const galaxiaContenedor = document.getElementById('galaxiaGenerada');
const pixelContainer = document.getElementById('pixel-container');

// --- GENERADOR DE PÍXELES DE VIDEOJUEGO ---
function crearPixel() {
    const p = document.createElement('div');
    p.classList.add('pixel-digital');
    
    // Forma cuadrada/bloque
    const size = Math.random() * 8 + 4 + 'px'; // Entre 4px y 12px
    p.style.width = size;
    p.style.height = size;
    
    p.style.left = Math.random() * 100 + 'vw';
    
    // Movimiento rápido y digital
    p.style.animationDuration = Math.random() * 1.5 + 2 + 's';
    
    // Colores Neón alternados
    const colores = ['#a855f7', '#3b82f6', '#d8b4fe', '#06b6d4']; // Púrpura, Azul, Lavanda, Cian
    const color = colores[Math.floor(Math.random() * colores.length)];
    p.style.backgroundColor = color;
    p.style.filter = `drop-shadow(0 0 5px ${color}) drop-shadow(0 0 10px ${color})`;
    
    if(pixelContainer) pixelContainer.appendChild(p);
    
    // Limpieza
    setTimeout(() => p.remove(), 4000);
}

function generarGalaxia() {
    const numEstrellas = 300;
    for (let i = 0; i < numEstrellas; i++) {
        const estrella = document.createElement('div');
        estrella.classList.add('estrella-galaxia');
        const angle = 0.15 * i;
        const radius = 1.2 * i;
        const x = radius * Math.cos(angle) + (Math.random() * 40 - 20);
        const y = radius * Math.sin(angle) + (Math.random() * 40 - 20);
        const size = Math.random() * 2.5 + 'px';
        estrella.style.width = size; estrella.style.height = size;
        estrella.style.left = x + 'px'; estrella.style.top = y + 'px';
        const colores = ['#ffffff', '#a855f7', '#3b82f6', '#d8b4fe'];
        const color = colores[Math.floor(Math.random() * colores.length)];
        estrella.style.background = color;
        estrella.style.boxShadow = `0 0 6px ${color}`;
        galaxiaContenedor.appendChild(estrella);
    }
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
    }
}

video.onended = function() {
    video.style.opacity = "0";
    setTimeout(() => footer.classList.add('al-centro'), 800);
    setTimeout(() => { footer.classList.add('supernova'); }, 5000);
    setTimeout(() => {
        footer.style.display = 'none';
        dispararExplosion();
        setTimeout(() => { galaxiaContenedor.classList.add('mostrar-galaxia'); }, 500);
    }, 7500);
};

// Fade out volumen
video.ontimeupdate = function() {
    const r = video.duration - video.currentTime;
    if (r < 2 && r > 0) { video.volume = r / 2; }
};

async function iniciarTodo() {
    pantalla.style.display = 'none';
    contenido.style.display = 'flex';
    generarGalaxia();
    video.load();
    video.volume = 1.0;
    try { await video.play(); } catch (e) { video.play(); }
    
    // --- GENERAR PÍXELES CONSTANTEMENTE (Lógica Urbana) ---
    setInterval(crearPixel, 150); // Crea un pixel cada 150ms
}

pantalla.addEventListener('click', iniciarTodo);
