const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const audio = document.getElementById('miAudio');
const footer = document.getElementById('footerTexto');
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

video.onended = function() {
    // 1. Video se desvanece en 5 segundos (muy lento)
    video.style.transition = "opacity 5s ease";
    video.style.opacity = "0";

    // 2. Dejamos de crear pétalos
    clearInterval(intervaloPetalos);

    // 3. El texto inicia su desvanecimiento lento después de un momento
    setTimeout(() => {
        footer.classList.add('final-animacion');
        
        // 4. Bajamos el audio MUY lentamente
        const bajarAudio = setInterval(() => {
            if (audio.volume > 0.05) {
                audio.volume -= 0.05;
            } else {
                audio.pause();
                clearInterval(bajarAudio);
            }
        }, 500); // Baja volumen cada medio segundo
    }, 1500);

    setTimeout(() => {
        video.style.visibility = "hidden";
    }, 7000);
};

async function iniciarTodo() {
    pantalla.style.display = 'none';
    contenido.style.display = 'flex';
    video.load();
    video.muted = true; 
    try {
        await video.play();
        setTimeout(() => { video.muted = false; }, 500);
    } catch (err) { video.play(); }
    audio.play().catch(e => console.log("Audio ready"));
    intervaloPetalos = setInterval(crearPetalo, 300);
}
pantalla.addEventListener('click', iniciarTodo);
