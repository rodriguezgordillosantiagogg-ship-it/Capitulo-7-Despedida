const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const audio = document.getElementById('miAudio');
const sakuraContainer = document.getElementById('sakura-container');

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

// EFECTO DE DESVANECIMIENTO AL TERMINAR
video.onended = function() {
    // Transición suave de 2 segundos
    video.style.transition = "opacity 2s ease";
    video.style.opacity = "0";
    
    // Opcional: Después de que desaparezca, lo quitamos por completo
    setTimeout(() => {
        video.style.visibility = "hidden";
    }, 2000);
};

async function iniciarTodo() {
    pantalla.style.display = 'none';
    contenido.style.display = 'flex';

    video.load();
    video.muted = true; 
    
    try {
        await video.play();
        setTimeout(() => {
            video.muted = false;
        }, 500);
    } catch (err) {
        video.play();
    }

    audio.play().catch(e => console.log("Audio esperando..."));
    setInterval(crearPetalo, 300);
}

pantalla.addEventListener('click', iniciarTodo);
