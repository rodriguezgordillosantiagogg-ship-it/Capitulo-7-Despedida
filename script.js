const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const audio = document.getElementById('audioFondo');
const footer = document.getElementById('footerTexto');
const luna = document.getElementById('lunaFinal');
const sakuraContainer = document.getElementById('sakura-container');
let intervaloPetalos;

function crearPetalo() {
    const petalo = document.createElement('div');
    petalo.classList.add('petalo');
    const size = Math.random() * 6 + 3 + 'px';
    petalo.style.left = Math.random() * 100 + 'vw';
    petalo.style.width = size;
    petalo.style.height = size;
    petalo.style.animationDuration = Math.random() * 3 + 4 + 's';
    if(sakuraContainer) sakuraContainer.appendChild(petalo);
    setTimeout(() => { petalo.remove(); }, 6000);
}

function dispararExplosion() {
    const centroX = window.innerWidth / 2;
    const centroY = window.innerHeight / 2;

    for (let i = 0; i < 90; i++) {
        const chispa = document.createElement('div');
        chispa.classList.add('chispa');
        document.body.appendChild(chispa);

        const angulo = Math.random() * Math.PI * 2;
        const distancia = Math.random() * 450 + 50;
        const destinoX = centroX + Math.cos(angulo) * distancia;
        const destinoY = centroY + Math.sin(angulo) * distancia;

        chispa.style.left = centroX + 'px';
        chispa.style.top = centroY + 'px';

        setTimeout(() => {
            chispa.style.opacity = '1';
            chispa.style.transition = `all ${Math.random() * 3 + 2}s cubic-bezier(0.1, 0.8, 0.2, 1)`;
            chispa.style.left = destinoX + 'px';
            chispa.style.top = destinoY + 'px';
        }, 10);

        setTimeout(() => {
            chispa.style.opacity = (Math.random() * 0.4 + 0.2).toString();
        }, 4000);
    }
}

video.onended = function() {
    video.style.opacity = "0";
    clearInterval(intervaloPetalos);

    // 1. Subir al centro (sólido)
    setTimeout(() => {
        footer.classList.add('al-centro');
    }, 1000);

    // 2. Empezar a desvanecerse EN EL CENTRO
    setTimeout(() => {
        footer.classList.add('desvanecer-centro');
        
        // El audio baja mientras el texto se desvanece
        const bajarAudio = setInterval(() => {
            if (audio.volume > 0.05) audio.volume -= 0.05;
            else { audio.pause(); clearInterval(bajarAudio); }
        }, 600);
    }, 5000); // Empieza a desvanecerse después de subir

    // 3. EXPLOSIÓN FINAL
    setTimeout(() => {
        footer.style.display = 'none'; // Desaparece el texto original
        dispararExplosion();
        
        setTimeout(() => {
            luna.classList.add('mostrar-luna');
        }, 300);
    }, 11000); // 1s + 4s viaje + 6s desvanecer = 11s total

    setTimeout(() => { video.style.visibility = "hidden"; }, 6000);
};

// ... (Mantenemos iniciarTodo igual) ...

async function iniciarTodo() {
    pantalla.style.display = 'none';
    contenido.style.display = 'flex';
    video.load(); video.muted = true; 
    try {
        await video.play();
        setTimeout(() => { video.muted = false; }, 500);
    } catch (err) { video.play(); }
    audio.play();
    intervaloPetalos = setInterval(crearPetalo, 300);
}
pantalla.addEventListener('click', iniciarTodo);
