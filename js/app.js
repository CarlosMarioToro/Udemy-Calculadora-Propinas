let cliente = {
    mesa: '',
    hora: '',
    pedido: []
};

const categorias = {
    1: 'Comida', 
    2: 'Bebidas', 
    3: 'Postres'
}

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
        card.classList.add('row', 'py-3', 'border-top');

        const nombre = document.createElement('DIV');
        nombre.classList.add('col-md-4');
        nombre.textContent = `${platillo.nombre}`;
        
        const precio = document.createElement('DIV');
        precio.classList.add('col-md-3', 'fw-bold');
        precio.textContent = `Precio Venta: $${platillo.precio}`;

        const categoria = document.createElement('DIV');
        categoria.classList.add('col-md-3');
        categoria.textContent = `Categoria: ${categorias[platillo.categoria]}`;

        const inputCantidad = document.createElement('INPUT');
        inputCantidad.type = "number";
        inputCantidad.min = 0;
        inputCantidad.id = `producto-${platillo.id}`;
        inputCantidad.value = 0;
        inputCantidad.classList.add('form-control');

        // Funcion que detecta la cantidad de platillo que se esta agregando
        inputCantidad.onchange = function() {
            const cantidad =parseInt(inputCantidad.value);
            agregarPlatillo({...platillo, cantidad});            
        } 

        const agregar = document.createElement('DIV');
        agregar.classList.add('col-md-2');
        agregar.appendChild(inputCantidad);

        card.appendChild(nombre);
        card.appendChild(precio);
        card.appendChild(categoria);
        card.appendChild(agregar);

        contenido.appendChild(card);
    })    
}

function agregarPlatillo(producto) {
    // Extraer el pedido  actual
    let {pedido} = cliente;

    // Revisar que la cantidad sea mayor a 0
    if (producto.cantidad > 0 ) {
        // Comprueba si el elemento ya existe en el array
        if (pedido.some(articulo => articulo.id === producto.id)) {
            // El articulo ya existe, actualizar la cantidad
            const pedidoActualizado = pedido.map(articulo => {
                if (articulo.id === producto.id) {
                    articulo.cantidad = producto.cantidad;
                }
                return articulo;
            });
            // Se asigna el nuevo array a cliente.pedido
            cliente.pedido = [...pedidoActualizado];
        } else {
            // Si no existia lo agregamos al arreglo del pedido
            cliente.pedido = [...pedido, producto];
        }
    } else {
        // Eliminar elementos cuando la cantidad es 0
        const resultado = pedido.filter(articulo => articulo.id !== producto.id);
        cliente.pedido = [...resultado];
    }
}