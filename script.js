const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const audio = document.getElementById('audioFondo');
const footer = document.getElementById('footerTexto');
const galaxiaContenedor = document.getElementById('galaxiaGenerada');
const mensajeFinal = document.getElementById('mensajeFinal');

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
    
    // 1. Sube el texto
    setTimeout(() => footer.classList.add('al-centro'), 1000);

    // 2. Destello Supernova
    setTimeout(() => {
        footer.classList.add('supernova');
        const fadeAudio = setInterval(() => {
            if (audio.volume > 0.1) audio.volume -= 0.1;
            else { audio.pause(); clearInterval(fadeAudio); }
        }, 250);
    }, 5500);

    // 3. LA EXPLOSIÓN Y EL NACIMIENTO
    setTimeout(() => {
        footer.style.display = 'none';
        dispararExplosion();
        
        // Aparece la Galaxia
        setTimeout(() => {
            galaxiaContenedor.classList.add('mostrar-galaxia');
            // Aparece el texto final
            mensajeFinal.classList.add('mostrar-mensaje');
        }, 500);
        
    }, 8000);

    setTimeout(() => video.style.visibility = "hidden", 6000);
};

async function iniciarTodo() {
    pantalla.style.display = 'none';
    contenido.style.display = 'flex';
    generarGalaxia(); // Pre-generamos la galaxia en silencio
    video.load();
    video.muted = true;
    try {
        await video.play();
        setTimeout(() => video.muted = false, 400);
    } catch (e) { video.play(); }
    audio.play();
    setInterval(() => {
        const p = document.createElement('div');
        p.classList.add('petalo');
        p.style.left = Math.random() * 100 + 'vw';
        const s = Math.random() * 4 + 2 + 'px';
        p.style.width = s; p.style.height = s;
        p.style.animationDuration = Math.random() * 3 + 4 + 's';
        document.getElementById('sakura-container').appendChild(p);
        setTimeout(() => p.remove(), 6000);
    }, 300);
}

pantalla.addEventListener('click', iniciarTodo);
