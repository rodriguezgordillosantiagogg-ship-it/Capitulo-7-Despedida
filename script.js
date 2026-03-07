const pantalla = document.getElementById('pantallaInicio');
const contenido = document.getElementById('contenidoPrincipal');
const video = document.getElementById('miVideo');
const footer = document.getElementById('footerTexto');
const solContenedor = document.getElementById('solFinal');

function crearChispa(x, y) {
    for(let i=0; i<6; i++) {
        const c = document.createElement('div');
        c.className = 'chispa';
        c.style.left = x + 'px'; c.style.top = y + 'px';
        document.body.appendChild(c);
        const mx = (Math.random() - 0.5) * 150;
        const my = (Math.random() - 0.5) * 150;
        setTimeout(() => {
            c.style.transform = `translate(${mx}px, ${my}px) scale(0)`;
            c.style.opacity = '0';
        }, 10);
        setTimeout(() => c.remove(), 700);
    }
}

function iniciarTodo(e) {
    if (pantalla.style.display === 'none') return;
    const x = e.pageX || (e.touches ? e.touches[0].pageX : 0);
    const y = e.pageY || (e.touches ? e.touches[0].pageY : 0);
    crearChispa(x, y);

    pantalla.style.opacity = "0";
    setTimeout(() => {
        pantalla.style.display = 'none';
        contenido.style.display = 'flex';
        video.play();
    }, 800);
}

pantalla.onclick = iniciarTodo;
pantalla.ontouchstart = iniciarTodo;

video.onended = function() {
    video.style.opacity = "0";
    setTimeout(() => {
        footer.classList.add('al-centro');
    }, 1000);
    setTimeout(() => {
        footer.style.opacity = "0";
        setTimeout(() => {
            footer.style.display = 'none';
            solContenedor.classList.add('mostrar-sol');
        }, 1500);
    }, 6000);
};
