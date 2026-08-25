document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnSobreMi');
    const panel = document.getElementById('panelSobreMi');

    if (btn && panel) {
        // Alternar apertura/cierre al hacer clic en el botón
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            panel.classList.toggle('activo');
        });

        // Evitar que los clics dentro del panel lo cierren
        panel.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Cerrar el panel al hacer clic en cualquier otra parte de la página
        document.addEventListener('click', () => {
            if (panel.classList.contains('activo')) {
                panel.classList.remove('activo');
            }
        });
    }
});

// Función para cambiar a la vista de proyectos sin abrir una nueva pestaña
function cargarProyecto(tipo) {
    const inicioView = document.getElementById('vistaDesarrollo');
    const muroView = document.querySelector('.muro');
    const techView = document.querySelector('.muro-tech-wrapper');
    const inicioSec = document.querySelector('.inicio');
    
    const proyectoView = document.getElementById('vistaProyecto');
    const titulo = document.getElementById('tituloProyectoDetalle');

    // Asignar título según el cuadro clickeado
    if (tipo === 'web') titulo.textContent = "Proyectos: Páginas Web";
    else if (tipo === 'auto') titulo.textContent = "Proyectos: Automatizaciones";
    else if (tipo === 'apps') titulo.textContent = "Proyectos: Apps Móviles";

    // Ocultar las secciones principales
    if (inicioSec) inicioSec.style.display = 'none';
    if (muroView) muroView.style.display = 'none';
    if (techView) techView.style.display = 'none';
    if (inicioView) inicioView.style.display = 'none';

    // Mostrar la vista del proyecto
    proyectoView.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función para regresar al Inicio cambiando de color el botón a Vinotinto
function volverAInicio() {
    const btnVolver = document.getElementById('btnVolverInicio');
    btnVolver.classList.add('activo-vinotinto');

    setTimeout(() => {
        // Restaurar vistas respetando las reglas de la maquetación CSS original
        document.querySelector('.inicio').style.display = '';
        document.querySelector('.muro').style.display = '';
        document.querySelector('.muro-tech-wrapper').style.display = '';
        document.getElementById('vistaDesarrollo').style.display = '';
        
        document.getElementById('vistaProyecto').style.display = 'none';
        btnVolver.classList.remove('activo-vinotinto');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300); // Pequeña pausa para apreciar el cambio de color al hacer clic
}