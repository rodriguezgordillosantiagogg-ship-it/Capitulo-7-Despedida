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
    const sizes = [4, 6, 8];
    const s = sizes[Math.floor(Math.random() * sizes.length)] + 'px';
    p.style.width = s; 
    p.style.height = s;
    const dur = Math.random() * 3 + 3 + 's';
    p.style.animationDuration = `${dur}, ${Math.random() * 0.5 + 0.3}s`;
    pixelShowerContainer.appendChild(p);
    setTimeout(() => { p.remove(); }, parseFloat(dur) * 1000);
}

function dispararExplosion() {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < 70; i++) {
        const e = document.createElement('div');
        e.classList.add('estrella-sparkle');
        document.body.appendChild(e);
        const ang = Math.random() * Math.PI * 2;
        const dist = Math.random() * 600 + 50;
        e.style.left = cx + 'px'; e.style.top = cy + 'px';
        const dur = Math.random() * 1.5 + 1.5;
        setTimeout(() => {
            e.style.opacity = '1';
            e.style.transition = `all ${dur}s cubic-bezier(0.1, 0.8, 0.2, 1)`;
            e.style.left = cx + Math.cos(ang) * dist + 'px';
            e.style.top = cy + Math.sin(ang) * dist + 'px';
        }, 20);
        setTimeout(() => e.remove(), dur * 1000 + 100);
    }
}

video.onended = function() {
    video.style.opacity = "0";
    setTimeout(() => footer.classList.add('al-centro'), 800);
    setTimeout(() => footer.classList.add('supernova'), 5500);
    setTimeout(() => {
        footer.style.display = 'none';
        dispararExplosion();
        setTimeout(() => solContenedor.classList.add('mostrar-sol'), 600);
    }, 8000);
};

video.ontimeupdate = function() {
    const r = video.duration - video.currentTime;
    if (r < 2 && r > 0) video.volume = r / 2;
};

async function iniciarTodo() {
    pantalla.style.display = 'none';
    contenido.style.display = 'flex';
    video.load();
    video.volume = 1.0;
    try { await video.play(); } catch (e) { video.play(); }
    setInterval(crearPixel, 150);
}

pantalla.addEventListener('click', iniciarTodo);
