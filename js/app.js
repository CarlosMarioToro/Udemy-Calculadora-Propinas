let cliente = {
    mesa: '',
    hora: '',
    pedido: []
};

const btnGuardarClinete = document.querySelector('#guardar-cliente');
btnGuardarClinete.addEventListener('click', guardarCliente);

function guardarCliente() {
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    // Revisar si hay campos vacios
    const camposVacios = [mesa, hora].some(campo => campo === '');
    
    if (camposVacios) {
        // Verificar si ya existe una alerta
        const alertaExiste = document.querySelector('.invalid-feedback');
                
        if (!alertaExiste) {
            const alerta = document.createElement('DIV');
            alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
            alerta.textContent = "Todos los campos son obligatorios";                
            document.querySelector('.modal-body form').appendChild(alerta);
                        
            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }
        return;
    }
    // Asignar datos del formulario a cliente
    cliente = {...cliente, mesa, hora};

    // Ocultar modal
    const modalFormulario = document.querySelector('#formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBootstrap.hide();

    // Mostrar las secciones
    mostrarSecciones();

    // Obtener Platillos de la API de JSON-Server
    ObtenerPlatillos();
}

function mostrarSecciones() {
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));
}

function ObtenerPlatillos() {
    const url = 'http://localhost:3000/Platillos';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarPlatillos(resultado))
        .catch(error => console.log(error))
}

function mostrarPlatillos(platillos) {
    const contenido = document.querySelector('#platillos .contenido');
    platillos.forEach(platillo => {
        const card = document.createElement('DIV');
        card.classList.add('row');

        const nombre = document.createElement('DIV');
        nombre.classList.add('col-md-4');
        nombre.textContent = `${platillo.nombre}`;

        card.appendChild(nombre);
        contenido.appendChild(card);
    })    
}