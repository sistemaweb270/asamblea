// usuarios.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Script usuarios.js cargado.');

    // --- Referencias a elementos del DOM ---
    const cuerpoTablaUsuarios = document.getElementById('cuerpo-tabla-usuarios');
    const btnAgregarUsuario = document.getElementById('btn-agregar-usuario');

    // --- Referencias a elementos del Modal ---
    const userModal = new bootstrap.Modal(document.getElementById('userModal')); // Instancia del modal de Bootstrap
    const userModalLabel = document.getElementById('userModalLabel'); // Título del modal
    const userForm = document.getElementById('userForm'); // Formulario dentro del modal
    const userIdInput = document.getElementById('userId'); // Input oculto para el ID
    const userNameInput = document.getElementById('userName'); // Input Nombre
    const userEmailInput = document.getElementById('userEmail'); // Input Email
    const userRolInput = document.getElementById('userRol'); // Input Rol
    const btnGuardarUsuario = document.getElementById('btn-guardar-usuario'); // Botón Guardar


    // --- Clave para localStorage ---
    const LOCAL_STORAGE_KEY = 'gestionUsuarios';

    // --- Funciones de localStorage ---

    // Obtiene los usuarios de localStorage
    function obtenerUsuariosLocalStorage() {
        const usuariosJson = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (usuariosJson) {
            try {
                // Asegurarse de que los IDs sean números si es necesario (Date.now() los genera como números)
                const usuarios = JSON.parse(usuariosJson);
                 return usuarios.map(usuario => ({
                     ...usuario,
                     id: parseInt(usuario.id) // Convertir el ID a número por si acaso
                 }));
            } catch (e) {
                console.error("Error al parsear usuarios de localStorage:", e);
                return []; // Retornar un array vacío si hay un error de parseo
            }
        }
        return []; // Retornar un array vacío si no hay datos en localStorage
    }

    // Guarda los usuarios en localStorage
    function guardarUsuariosLocalStorage(usuarios) {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(usuarios));
        } catch (e) {
            console.error("Error al guardar usuarios en localStorage:", e);
            alert("No se pudieron guardar los datos de usuario. El almacenamiento local podría estar lleno.");
        }
    }

    // --- Event Listeners ---

    // Listener para el botón de agregar usuario
    if (btnAgregarUsuario) {
        btnAgregarUsuario.addEventListener('click', mostrarModalAgregar);
    }

    // Listener para el botón "Guardar Usuario" dentro del modal
    if (btnGuardarUsuario) {
        btnGuardarUsuario.addEventListener('click', guardarUsuario);
    }

    // Listener para los botones de acción (Editar/Eliminar) en la tabla
    // Usamos event delegation en el cuerpo de la tabla
    if (cuerpoTablaUsuarios) {
        cuerpoTablaUsuarios.addEventListener('click', (event) => {
            const target = event.target;

            // Verificar si se hizo clic en un botón de editar (o un icono dentro de él)
            // Usamos closest() para encontrar el botón si se clickea el icono
            const editButton = target.closest('.btn-editar-usuario');
            if (editButton) {
                const userId = parseInt(editButton.dataset.userId); // Obtener el ID del usuario y convertir a número
                mostrarModalEditar(userId);
                return; // Detener el procesamiento para evitar que se active otro listener si hay superposición
            }

            // Verificar si se hizo clic en un botón de eliminar (o un icono dentro de él)
            const deleteButton = target.closest('.btn-eliminar-usuario');
            if (deleteButton) {
                const userId = parseInt(deleteButton.dataset.userId); // Obtener el ID del usuario y convertir a número
                eliminarUsuario(userId);
                return; // Detener el procesamiento
            }
        });
    }


    // --- Funciones de Gestión de Usuarios (con Modal) ---

    // Función para cargar usuarios desde localStorage y mostrarlos
    function cargarUsuarios() {
        console.log('Cargando usuarios desde localStorage...');
        const usuarios = obtenerUsuariosLocalStorage();
        mostrarUsuarios(usuarios);
        console.log('Usuarios cargados.');
    }

    // Función para mostrar usuarios en la tabla
    function mostrarUsuarios(usuarios) {
        if (!cuerpoTablaUsuarios) return; // Salir si el cuerpo de la tabla no existe

        cuerpoTablaUsuarios.innerHTML = ''; // Limpiar la tabla actual

        if (!usuarios || usuarios.length === 0) {
            cuerpoTablaUsuarios.innerHTML = '<tr><td colspan="5" class="text-center">No hay usuarios disponibles.</td></tr>';
            return;
        }

        usuarios.forEach(usuario => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <th scope="row">${usuario.id}</th>
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td>${usuario.rol}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-accion btn-editar-usuario" data-user-id="${usuario.id}" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm btn-accion btn-eliminar-usuario" data-user-id="${usuario.id}" title="Eliminar">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;

            cuerpoTablaUsuarios.appendChild(fila);
        });
    }

    // Muestra el modal para agregar un nuevo usuario
    function mostrarModalAgregar() {
        userModalLabel.textContent = 'Agregar Usuario'; // Cambiar título del modal
        userIdInput.value = ''; // Limpiar el ID (indica modo agregar)
        userForm.reset(); // Limpiar el formulario
        userModal.show(); // Mostrar el modal
        console.log('Mostrando modal para agregar usuario.');
    }

    // Muestra el modal para editar un usuario existente
    function mostrarModalEditar(userId) {
        console.log(`Mostrando modal para editar usuario con ID: ${userId}`);
        const usuarios = obtenerUsuariosLocalStorage();
        const usuarioAEditar = usuarios.find(usuario => usuario.id === userId);

        if (!usuarioAEditar) {
            alert('Usuario no encontrado para editar.');
            console.error(`Usuario con ID ${userId} no encontrado.`);
            return;
        }

        userModalLabel.textContent = 'Editar Usuario'; // Cambiar título del modal
        userIdInput.value = usuarioAEditar.id; // Establecer el ID del usuario a editar
        userNameInput.value = usuarioAEditar.nombre; // Llenar campos con datos del usuario
        userEmailInput.value = usuarioAEditar.email;
        userRolInput.value = usuarioAEditar.rol;

        userModal.show(); // Mostrar el modal
    }


    // Guarda los datos del formulario del modal (agrega o edita)
    function guardarUsuario() {
        console.log('Botón "Guardar Usuario" clickeado.');

        // Validar campos básicos
        if (!userForm.checkValidity()) {
            userForm.reportValidity(); // Muestra mensajes de validación del navegador
            return;
        }

        const id = userIdInput.value ? parseInt(userIdInput.value) : null; // Obtener ID (si existe, es edición)
        const nombre = userNameInput.value.trim();
        const email = userEmailInput.value.trim();
        const rol = userRolInput.value.trim();

         // Validación básica adicional de email
        if (!email.includes('@') || !email.includes('.')) {
             alert('Formato de email inválido.');
             return;
        }


        let usuarios = obtenerUsuariosLocalStorage();

        if (id) { // Modo Edición
            console.log(`Guardando cambios para usuario con ID: ${id}`);
            const index = usuarios.findIndex(usuario => usuario.id === id);
            if (index !== -1) {
                usuarios[index] = { id: id, nombre: nombre, email: email, rol: rol };
                guardarUsuariosLocalStorage(usuarios);
                console.log('Usuario editado:', usuarios[index]);
                alert('Usuario editado con éxito.');
            } else {
                 console.error(`Error: Usuario con ID ${id} no encontrado durante el guardado.`);
                 alert('Error al guardar: Usuario no encontrado.');
            }
        } else { // Modo Agregar
             console.log('Guardando nuevo usuario.');
            const nuevoUsuario = {
                // Generar un ID simple (basado en timestamp)
                id: Date.now(),
                nombre: nombre,
                email: email,
                rol: rol
            };
            usuarios.push(nuevoUsuario);
            guardarUsuariosLocalStorage(usuarios);
            console.log('Nuevo usuario agregado:', nuevoUsuario);
            alert('Usuario agregado con éxito.');
        }

        userModal.hide(); // Ocultar el modal
        cargarUsuarios(); // Recargar la tabla
    }


    // Función para eliminar un usuario
    function eliminarUsuario(userId) {
        console.log(`Iniciando eliminación de usuario con ID: ${userId}`);

        // --- Confirmar eliminación ---
        if (confirm(`¿Estás seguro de que deseas eliminar al usuario con ID ${userId}?`)) {
            const usuarios = obtenerUsuariosLocalStorage();

            // --- Filtrar para eliminar el usuario ---
            const usuariosActualizados = usuarios.filter(usuario => usuario.id !== userId);

            // --- Guardar la lista actualizada ---
            guardarUsuariosLocalStorage(usuariosActualizados);

            console.log(`Usuario con ID ${userId} eliminado.`);
            alert('Usuario eliminado con éxito.');

            // --- Recargar la tabla ---
            cargarUsuarios();
        } else {
            console.log(`Eliminación de usuario con ID ${userId} cancelada.`);
        }
    }

    // --- Carga inicial de usuarios al cargar la página ---
    cargarUsuarios();

});