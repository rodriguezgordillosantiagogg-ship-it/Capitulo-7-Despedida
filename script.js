const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const audio = document.getElementById('miAudio');
const footer = document.getElementById('footerTexto');
const estrellasContainer = document.getElementById('estrellas-container'); // Referencia
const sakuraContainer = document.getElementById('sakura-container');
let intervaloPetalos;
let intervaloEstrellas;

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

// FUNCIÓN PARA GENERAR UNA ESTRELLA INDIVIDUAL
function crearEstrella() {
    const estrella = document.createElement('div');
    estrella.classList.add('estrella');
    
    // Tamaño aleatorio para variar
    const size = Math.random() * 2 + 1 + 'px'; // Pequeñas, como estrellas
    estrella.style.width = size;
    estrella.style.height = size;
    
    // Posición aleatoria
    estrella.style.left = Math.random() * 100 + 'vw';
    estrella.style.top = Math.random() * 100 + 'vh';
    
    // Duración de parpadeo aleatoria para efecto asíncrono
    const duracionParpadeo = Math.random() * 2 + 1.5 + 's';
    estrella.style.animation = `parpadeoEstrella ${duracionParpadeo} ease-in-out infinite`;
    
    // Aparición lenta
    estrella.style.transition = 'opacity 5s ease-in-out';
    
    if(estrellasContainer) estrellasContainer.appendChild(estrella);
    
    // Activamos la aparición lenta tras añadirla
    setTimeout(() => { estrella.style.opacity = '1'; }, 100);
    
    // Limpieza opcional (después de 30s)
    setTimeout(() => { estrella.remove(); }, 30000);
}

video.onended = function() {
    // 1. El video se desvanece MUY lento (5s)
    video.style.opacity = "0";

    // 2. Dejamos de crear pétalos
    clearInterval(intervaloPetalos);

    // 3. El texto sube y desaparece lento (empieza a los 1.5s, dura 6s)
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
        }, 500);
    }, 1500);

    // 5. APARECEN LAS ESTRELLAS (Esperamos 7s para que el video ya casi no se vea)
    setTimeout(() => {
        estrellasContainer.classList.add('mostrar-estrellas');
        
        // Empezamos a crear estrellas rápidamente al principio
        for(let i = 0; i < 30; i++) { setTimeout(crearEstrella, i * 50); }
        
        // Luego seguimos creando estrellas suavemente cada 100ms
        intervaloEstrellas = setInterval(crearEstrella, 100);
    }, 7000); 

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
