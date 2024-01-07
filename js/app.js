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
}
