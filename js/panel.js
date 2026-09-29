// js/panel.js - Navegación Interna para la Sección de Proyectos

function abrirDetalleProyecto(tipo) {
    const overlay = document.getElementById('overlayProyecto');
    const contenedor = document.getElementById('contenidoDinamico');

    contenedor.innerHTML = '';

    switch (tipo) {
        case 'auto':
            // 1. AUTOMATIZACIONES: Reproductor de video de referencia (YouTube)
            contenedor.innerHTML = `
                <h2 style="margin-bottom: 20px; color: var(--text-primary);">Proyectos de Automatizaciones</h2>
                <div style="width: 100%; max-width: 800px; aspect-ratio: 16/9; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Automatizaciones Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <p style="margin-top: 16px; color: var(--text-secondary); text-align: center;">Demostración en video de scripts y herramientas de optimización backend.</p>
            `;
            break;

        case 'apps':
            // 2. APPS MÓVILES: Simulador de marco de teléfono con Google embebido
            contenedor.innerHTML = `
                <h2 style="margin-bottom: 20px; color: var(--text-primary);">Simulador de Aplicaciones Móviles</h2>
                <div class="phone-frame">
                    <div class="phone-screen">
                        <iframe src="https://www.google.com/webhp?igu=1" title="Simulador Google Mobile"></iframe>
                    </div>
                </div>
                <p style="margin-top: 16px; color: var(--text-secondary); text-align: center;">Prueba de interfaz en entorno responsive móvil.</p>
            `;
            break;

        case 'db':
            // 3. BASE DE DATOS: Galería con la imagen de referencia (fondoa.png)
            contenedor.innerHTML = `
                <h2 style="margin-bottom: 20px; color: var(--text-primary);">Esquemas de Base de Datos y Auditoría</h2>
                <div class="album-grid">
                    <div class="web-card">
                        <img src="Imagenes/fondoa.png" alt="Esquema Base de Datos" onerror="this.src='https://via.placeholder.com/600x350?text=Esquema+PostgreSQL'">
                        <div class="web-card-info">
                            <h4>Arquitectura & Diagnóstico SQL</h4>
                            <p>Estructura relacional optimizada con triggers y procedimientos para control de calidad.</p>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'web':
            // 4. PÁGINAS WEB: Cuadrícula de proyectos desplegados
            contenedor.innerHTML = `
                <h2 style="margin-bottom: 20px; color: var(--text-primary);">Proyectos Páginas Web</h2>
                <div class="album-grid">
                    <div class="web-card">
                        <img src="Imagenes/caracas.jpg" alt="Proyecto Web 1">
                        <div class="web-card-info">
                            <h4>Plataforma Web Educativa</h4>
                            <p>Aplicación web full-stack desarrollada con HTML5, CSS3, JS y arquitectura modular.</p>
                        </div>
                    </div>
                    <div class="web-card">
                        <img src="Imagenes/juego.jpg" alt="Proyecto Web 2">
                        <div class="web-card-info">
                            <h4>Panel Interactivo con IA</h4>
                            <p>Interfaz optimizada para visualización de datos e integración de modelos generativos.</p>
                        </div>
                    </div>
                </div>
            `;
            break;
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Evita scroll secundario
}

function cerrarDetalleProyecto() {
    const overlay = document.getElementById('overlayProyecto');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// EFECTO TILT 3D PARA EL CUADRO DE BASE DE DATOS
document.addEventListener('DOMContentLoaded', () => {
    const subDb = document.querySelector('.sub-db');

    if (subDb) {
        subDb.addEventListener('mousemove', (e) => {
            const rect = subDb.getBoundingClientRect();
            
            // Posición del cursor relativa al centro del cuadro (-1 a 1)
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // Grados de inclinación (multiplicador para profundidad)
            const tiltX = y * 25;  // Inclinación en eje X
            const tiltY = -x * 25; // Inclinación en eje Y

            // Aplica la rotación 3D para hundir la esquina donde está el cursor
            subDb.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
            subDb.style.boxShadow = `${-x * 10}px ${-y * 10}px 15px rgba(0, 0, 0, 0.12)`;
        });

        subDb.addEventListener('mouseleave', () => {
            // Regresa a la posición plana original al quitar el cursor
            subDb.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            subDb.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.03)';
        });
    }
});

// Efecto de ruleta 3D para el apartado de Acerca de Mí
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.carousel-3d-wrapper');
    const container = document.getElementById('acercaCarousel');
    
    if (!container || !wrapper) return;

    const cards = Array.from(container.querySelectorAll('.carousel-card'));
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    
    let currentIndex = 0;
    let isCoolingDown = false;

    function updateCarousel() {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            
            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                card.classList.add('prev');
            } else if (index === (currentIndex + 1) % cards.length) {
                card.classList.add('next');
            }
        });
    }

    function navigate(direction) {
        if (isCoolingDown) return;
        isCoolingDown = true;

        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % cards.length;
        } else {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        }

        updateCarousel();

        setTimeout(() => {
            isCoolingDown = false;
        }, 300);
    }

    // Escuchar el scroll dentro de toda la zona del carrusel
    wrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
            navigate('next');
        } else {
            navigate('prev');
        }
    }, { passive: false });

    // Asignación de botones solo si existen en el DOM
    if (btnPrev) btnPrev.addEventListener('click', () => navigate('prev'));
    if (btnNext) btnNext.addEventListener('click', () => navigate('next'));

    // Inicialización
    updateCarousel();
});