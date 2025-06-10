document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded & parsed.");

    // Si ya hay un usuario autenticado, forzar el ingreso al dashboard
    if (localStorage.getItem('access-name')) {
        window.location.href = "dashboard.html";
        return;
    }

    // --- Bloquear navegación atrás y adelante ---
    history.pushState(null, null, location.href);
    window.addEventListener('popstate', function(event) {
        history.pushState(null, null, location.href);
    });
    function preventBack() {
        window.history.forward();
    }
    setTimeout(preventBack, 0);
    window.onunload = function() { null; };

    // --- Referencias a elementos ---
    const nombreInput = document.getElementById('nombre');
    // Se elimina la referencia a password, ya que se omite ese campo.
    const loginButton = document.getElementById('login-button');
    const generatePinButton = document.getElementById('generate-pin');
    const validatePinButton = document.getElementById('validate-pin');
    const pinField = document.getElementById('pin');
    const circleBarContainer = document.getElementById('circle-bar-container');

    // Modal de Bootstrap para alertas
    const alertModalEl = document.getElementById('alertModal');
    const alertModal = new bootstrap.Modal(alertModalEl);
    const alertModalBody = document.getElementById('alertModalBody');

    // Variable que indica si el PIN fue validado
    let pinValidated = false;

    // "Base de datos" simulada:
    const registeredUsers = {
        "CRISMER": { fullName: "CRISMER AQUISE" },
        "GEANELLA":   { fullName: "GEANELLA HUANCARI" },
        "MARGOTH":   { fullName: "MARGOTH MENDEZ" },
        "LUIS":   { fullName: "LUIS MARTINEZ" },
        "DAVID":   { fullName: "DAVID ESTEBAN" },
        "WENDI":   { fullName: "WENDI SINCHI" },
        "CRISTHIAN":   { fullName: "CRISTHIAN CARRIZALES" },
         "MANUEL":   { fullName: "MANUEL MARMANILLO" },
         "JESSICA":   { fullName: "JESSICA CARHUAZ" },
         "JOSE":   { fullName: "JOSE VILLAVICENCIO" },
        // Agrega más usuarios según sea necesario.
    };

    // --- Evento para autocompletar el nombre ---
    nombreInput.addEventListener('blur', function() {
        const enteredName = nombreInput.value.trim().toUpperCase(); // Convertir a mayúsculas
        if (registeredUsers.hasOwnProperty(enteredName)) {
            const userData = registeredUsers[enteredName];
            nombreInput.value = userData.fullName;  // Autocompleta con el nombre completo
            console.log("User autocompleted:", userData.fullName);
        } else {
            alertModalBody.innerText = "Su nombre ingresado no está registrado.";
            alertModal.show();
            nombreInput.value = "";
        }
    });

    // --- Eventos para el manejo del PIN ---
    generatePinButton.addEventListener('click', function() {
        const newPIN = Math.floor(1000 + Math.random() * 9000).toString();
        pinField.value = newPIN;
        pinValidated = false;
        loginButton.disabled = true;
        console.log("PIN generado:", newPIN);
    });

    validatePinButton.addEventListener('click', function() {
        const pinValue = pinField.value.trim();
        const pinRegex = /^\d{4}$/;  
        if (pinRegex.test(pinValue)) {
            pinValidated = true;
            loginButton.disabled = false;
            console.log("PIN validado exitosamente:", pinValue);
            alertModalBody.innerText = "El PIN se validó con éxito.";
            alertModal.show();
        } else {
            pinValidated = false;
            loginButton.disabled = true;
            alertModalBody.innerText = "El PIN no es válido. Genera un PIN de 4 dígitos.";
            alertModal.show();
        }
    });

    // --- Lógica de inicio de sesión (sin contraseña) ---
    loginButton.addEventListener('click', function() {
        const fullName = nombreInput.value.trim();

        if (!fullName) {
            alertModalBody.innerText = "Por favor, ingrese sus nombres.";
            alertModal.show();
            return;
        }
        if (!pinValidated) {
            alertModalBody.innerText = "El PIN no ha sido validado. Valídalo antes de continuar.";
            alertModal.show();
            return;
        }
        let found = false;
        for (let key in registeredUsers) {
            if (registeredUsers[key].fullName === fullName) {
                found = true;
                break;
            }
        }
        if (!found) {
            alertModalBody.innerText = "Su nombre ingresado no está registrado.";
            alertModal.show();
            return;
        }

        // GUARDAR NOMBRE DE ACCESO EN LOCALSTORAGE
        localStorage.setItem('access-name', fullName);

        // --- Mostrar spinner y simular autenticación ---
        circleBarContainer.style.display = 'flex';
        setTimeout(function() {
            circleBarContainer.style.display = 'none';
            window.location.href = "dashboard.html";
        }, 2000);
    });
});
