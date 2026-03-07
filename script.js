video.onended = function() {
    video.style.opacity = "0";
    
    // 1. Mueve el texto al centro (después de 800ms)
    setTimeout(() => footer.classList.add('al-centro'), 800);
    
    // 2. Empieza a desvanecer el texto (después de 6 segundos)
    setTimeout(() => {
        footer.style.filter = "blur(20px)";
        footer.style.opacity = "0";
        
        // 3. Quita el texto y muestra el sol (2 segundos después del blur)
        setTimeout(() => {
            footer.style.display = 'none';
            
            const contenedorRayos = document.querySelector('.rayos');
            contenedorRayos.innerHTML = ''; // Limpiamos por si acaso
            
            const totalRayos = 40; // Subí a 40 para que se vea más denso el magenta
            
            for (let i = 0; i < totalRayos; i++) {
                const rayo = document.createElement('div');
                rayo.classList.add('rayo-linea');
                
                const angulo = (360 / totalRayos) * i;
                // Rotamos y ajustamos el desplazamiento para el nuevo centro
                rayo.style.transform = `rotate(${angulo}deg) translateY(-45px)`; 
                
                contenedorRayos.appendChild(rayo);
            }

            // Mostrar el sol magenta con sus rayos
            solContenedor.classList.add('mostrar-sol');
            
        }, 2000);
    }, 6000);
};
