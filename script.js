const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const audio = document.getElementById('audioFondo');
const footer = document.getElementById('footerTexto');
const galaxia = document.getElementById('galaxiaFinalContenedor'); // Cambio a Galaxia
const sakuraContainer = document.getElementById('sakura-container');

function crearParticula() {
    const p = document.createElement('div');
    p.classList.add('petalo');
    const size = Math.random() * 5 + 2 + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = size; p.style.height = size;
    p.style.animationDuration = Math.random() * 2 + 3 + 's';
    if(sakuraContainer) sakuraContainer.appendChild(p);
    setTimeout(() => p.remove(), 5000);
}

function dispararExplosion() {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < 75; i++) {
        const e = document.createElement('div');
        e.classList.add('estrella-sparkle');
        document.body.appendChild(e);
        const ang = Math.random() * Math.PI * 2;
        const dist = Math.random() * 450 + 50;
        e.style.left = cx + 'px'; e.style.top = cy + 'px';
        const dur = Math.random() * 2 + 1.5;
        setTimeout(() => {
            e.style.opacity = '1';
            e.style.transition = `all ${dur}s cubic-bezier(0.1, 0.8, 0.2, 1)`;
            e.style.left = cx + Math.cos(ang) * dist + 'px';
            e.style.top = cy + Math.sin(ang) * dist + 'px';
            e.style.transform = `scale(${Math.random() * 0.7 + 0.3})`;
        }, 10);
        setTimeout(() => e.style.animation = `blink ${Math.random() + 1}s infinite`, dur * 1000);
    }
}

video.onended = function() {
    // 1. Video desaparece suave
    video.style.opacity = "0";
    clearInterval(crearParticula);

    // 2. Texto sube al centro (Brillo normal)
    setTimeout(() => {
        footer.classList.add('al-centro');
    }, 1000);

    // 3. EL DESTELLO DE SUPERNOVA (5.5s después de subir)
    setTimeout(() => {
        footer.classList.add('supernova');
        
        // El audio baja muy rápido durante el destello
        const bajarAudio = setInterval(() => {
            if (audio.volume > 0.1) audio.volume -= 0.1;
            else { audio.pause(); clearInterval(bajarAudio); }
        }, 150);
    }, 5500); 

    // 4. LA EXPLOSIÓN Y EL NACIMIENTO DE LA GALAXIA (1.3s después del destello)
    setTimeout(() => {
        footer.style.visibility = 'hidden'; 
        dispararExplosion();
        // Aparece la Galaxia en lugar del sol
        setTimeout(() => galaxia.classList.add('mostrar-galaxia'), 300);
    }, 6800); 

    setTimeout(() => { video.style.visibility = "hidden"; }, 6000);
};

async function iniciarTodo() {
    pantalla.style.display = 'none';
    contenido.style.display = 'flex';
    video.load(); video.muted = true; 
    try { await video.play(); setTimeout(() => video.muted = false, 500); } catch (e) { video.play(); }
    audio.play().catch(e => console.log("Audio ready"));
    setInterval(crearParticula, 200);
}
pantalla.addEventListener('click', iniciarTodo);
