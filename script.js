const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const audio = document.getElementById('audioFondo');
const footer = document.getElementById('footerTexto');
const luna = document.getElementById('lunaCreciente');
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

    for (let i = 0; i < 60; i++) {
        const estrella = document.createElement('div');
        estrella.classList.add('estrella-sparkle');
        document.body.appendChild(estrella);

        const angulo = Math.random() * Math.PI * 2;
        const distancia = Math.random() * 400 + 50;
        const destinoX = centroX + Math.cos(angulo) * distancia;
        const destinoY = centroY + Math.sin(angulo) * distancia;

        estrella.style.left = centroX + 'px';
        estrella.style.top = centroY + 'px';

        const duracionViaje = Math.random() * 2 + 2;

        setTimeout(() => {
            estrella.style.opacity = '1';
            estrella.style.transition = `all ${duracionViaje}s cubic-bezier(0.1, 0.8, 0.2, 1)`;
            estrella.style.left = destinoX + 'px';
            estrella.style.top = destinoY + 'px';
            // Tamaño aleatorio para variedad
            const escala = Math.random() * 0.8 + 0.4;
            estrella.style.transform = `scale(${escala})`;
        }, 10);

        setTimeout(() => {
            estrella.style.animation = `parpadeo ${Math.random() * 2 + 1}s infinite ease-in-out`;
        }, duracionViaje * 1000);
    }
}

video.onended = function() {
    video.style.opacity = "0";
    clearInterval(intervaloPetalos);

    setTimeout(() => { footer.classList.add('al-centro'); }, 1000);

    setTimeout(() => {
        footer.classList.add('desvanecer-centro');
        const bajarAudio = setInterval(() => {
            if (audio.volume > 0.05) audio.volume -= 0.05;
            else { audio.pause(); clearInterval(bajarAudio); }
        }, 600);
    }, 5000); 

    setTimeout(() => {
        footer.style.visibility = 'hidden'; 
        dispararExplosion();
        setTimeout(() => { luna.classList.add('mostrar-luna'); }, 400);
    }, 11000); 

    setTimeout(() => { video.style.visibility = "hidden"; }, 6000);
};

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
