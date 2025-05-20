document.addEventListener('DOMContentLoaded', function() {
    console.log("script.js: DOMContentLoaded ejecutado.");

    // --- Variables y referencias a elementos ---
    const body = document.body;
    // Asegúrate de que estas rutas de imágenes sean correctas y existan.
    // Puedes usar rutas relativas si las imágenes están en tu proyecto, por ejemplo:
    // const backgroundImages = ['img/bg1.jpg', 'img/bg2.png', 'img/bg3.webp'];
    const backgroundImages = [
        'https://static.vecteezy.com/system/resources/previews/000/228/679/original/seamless-geometric-pattern-background-vector.jpg',
        'https://www.toptal.com/designers/subtlepatterns/patterns/double-bubble.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOvE2JpQ0B2o9D-gDk8t_bF-n-p-7_6_gWnA&s'
    ];


    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const generatePasswordButton = document.getElementById('generate-password');
    const loginContainer = document.getElementById('login-container'); // Referencia al contenedor del login
    const circleBarContainer = document.getElementById('circle-bar-container'); // Referencia al contenedor del circle bar


    const chatBox = document.getElementById('chat-box');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const supportIcon = document.getElementById('support-icon');
    const chatHeader = chatBox ? chatBox.querySelector('.chat-header') : null; // Asegurarse de que chatBox exista

    // Inicializa el modal de Bootstrap
    const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));

    // --- Funciones ---

    function setRandomBackgroundImage() {
        if (backgroundImages.length > 0) {
            const randomIndex = Math.floor(Math.random() * backgroundImages.length);
            const randomImage = backgroundImages[randomIndex];
            body.style.backgroundImage = `url('${randomImage}')`;
            console.log("script.js: Fondo cambiado a:", randomImage);
        } else {
            console.warn("script.js: No hay imágenes en backgroundImages para establecer el fondo.");
        }
    }

    function logConnection(username) {
        console.log("script.js: Intentando guardar conexión para el usuario:", username);
        const log = JSON.parse(localStorage.getItem('userConnectionLog') || '[]');
        const timestamp = new Date().toISOString();
        log.push({ username: username, loginTime: timestamp });
        localStorage.setItem('userConnectionLog', JSON.stringify(log));
        console.log("script.js: Datos guardados en localStorage:", JSON.parse(localStorage.getItem('userConnectionLog')));
    }

    // --- Ejecución inicial ---
    setRandomBackgroundImage();
    // Puedes opcionalmente cambiar la imagen cada cierto tiempo
    // setInterval(setRandomBackgroundImage, 5000); // Cambiar cada 5 segundos

    // Asegurarse de que el chatBox esté oculto al cargar
    if (chatBox) {
        chatBox.style.display = 'none';
        console.log("script.js: Initial chatBox display set to 'none'.");
    } else {
        console.error("script.js: chatBox element not found. Chat functionality might be affected.");
    }

    // Asegurarse de que el circleBarContainer esté oculto al cargar
    if (circleBarContainer) {
        circleBarContainer.style.display = 'none';
        console.log("script.js: Initial circleBarContainer display set to 'none'.");
    } else {
        console.error("script.js: circleBarContainer element not found.");
    }

    // --- Listeners de eventos ---

    // Lógica para el botón de Generar Contraseña
    if (generatePasswordButton && passwordInput) {
        generatePasswordButton.addEventListener('click', function() {
            const randomPassword = Math.random().toString(36).slice(-8); // Genera una cadena alfanumérica aleatoria
            passwordInput.value = randomPassword;
            console.log("script.js: Contraseña generada:", randomPassword);
        });
    } else {
        console.error("script.js: Generate password button or password input not found.");
    }

    // Lógica para el botón de Iniciar Sesión (Validación con Modal y Redirección)
    if (loginButton && usernameInput && passwordInput && alertModal && loginContainer && circleBarContainer) {
        loginButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir el envío del formulario si estuviera dentro de uno

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (username === '' || password === '') {
                // Mostrar el modal de Bootstrap si los campos están vacíos
                alertModal.show();
                console.log('script.js: Alerta: Campos de usuario o contraseña vacíos. Modal mostrado.');
            } else {
                // Si el login es "exitoso" (simulado):
                localStorage.setItem('username', username); // Guardar el nombre de usuario
                logConnection(username); // Registrar la conexión
                console.log('script.js: ¡Inicio de sesión exitoso! (Simulado)');
                console.log('script.js: Usuario:', username);
                console.log('script.js: Contraseña:', password);

                // Ocultar el contenedor de login
                loginContainer.style.display = 'none';
                // Mostrar el circle bar
                circleBarContainer.style.display = 'flex'; // Usar flex para centrar contenido
                console.log('script.js: Login oculto, Circle Bar mostrado.');

                // Simular una carga de 6 segundos antes de redirigir
                setTimeout(() => {
                    console.log('script.js: Redirigiendo a dashboard.html después de 6 segundos.');
                    window.location.href = 'dashboard.html';
                }, 3000); // 6000 milisegundos = 6 segundos
            }
        });
    } else {
        console.error("script.js: Login button, username, password input, alert modal, login container, or circle bar container not found. Cannot set up login validation.");
    }

    // Lógica para mostrar/ocultar el Chat Box al hacer clic en el icono de soporte
    if (supportIcon && chatBox) {
        supportIcon.addEventListener('click', function() {
            const isChatVisible = window.getComputedStyle(chatBox).display === 'flex';

            if (isChatVisible) {
                chatBox.style.display = 'none';
                supportIcon.classList.remove('chat-open');
                console.log('script.js: Chat box oculto.');
            } else {
                // Temporalmente invisible para calcular posición
                chatBox.style.visibility = 'hidden';
                chatBox.style.display = 'flex'; // Usar flex para mantener la estructura

                const iconRect = supportIcon.getBoundingClientRect();
                const iconBottomRelativeToViewport = iconRect.bottom;
                const iconBottom = window.innerHeight - iconBottomRelativeToViewport;

                const gap = 20; // Espacio deseado entre el icono y el chat box
                const chatBoxBottom = iconBottom + supportIcon.offsetHeight + gap;

                chatBox.style.bottom = chatBoxBottom + 'px';
                chatBox.style.right = '20px';

                chatBox.style.visibility = 'visible'; // Hacer visible
                supportIcon.classList.add('chat-open');
                console.log('script.js: Chat box mostrado y posicionado.');

                // Desplazar al final del chat al abrirlo
                if (chatMessages) {
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            }
        });

        // Opcional: Añadir listener al header del chat para ocultarlo/minimizarlo
        if (chatHeader) {
            chatHeader.addEventListener('click', function() {
                if (chatBox && window.getComputedStyle(chatBox).display === 'flex') {
                    chatBox.style.display = 'none';
                    if (supportIcon) {
                        supportIcon.classList.remove('chat-open');
                    }
                    console.log('script.js: Chat box ocultado desde el header.');
                }
            });
        }
    } else {
        console.error("script.js: Support icon or Chat box element not found. Cannot set up chat toggle listener.");
    }

    // Lógica para enviar mensajes del chat
    if (sendButton && userInput && chatMessages) {
        sendButton.addEventListener('click', function() {
            const message = userInput.value.trim();
            if (message !== '') {
                const userMessage = document.createElement('p');
                userMessage.classList.add('user-message');
                userMessage.textContent = message;
                chatMessages.appendChild(userMessage);
                userInput.value = '';

                // Lógica para la respuesta del bot
                let botReply = '';
                const lowerCaseMessage = message.toLowerCase();

                if (lowerCaseMessage.includes('hola') || lowerCaseMessage.includes('buenas')) {
                    botReply = '¡Hola! ¿En qué puedo ayudarte hoy?';
                } else if (lowerCaseMessage.includes('cómo estás') || lowerCaseMessage.includes('como estas')) {
                    botReply = 'Estoy bien, gracias por preguntar. ¿Y tú?';
                } else if (lowerCaseMessage.includes('ayuda')) {
                    botReply = 'Claro, ¿con qué necesitas ayuda?';
                } else if (lowerCaseMessage.includes('gracias')) {
                    botReply = 'De nada. ¡Que tengas un buen día!';
                } else if (lowerCaseMessage.includes('adiós') || lowerCaseMessage.includes('chao')) {
                    botReply = '¡Adiós! Espero verte pronto.';
                } else if (lowerCaseMessage.includes('hora')) {
                    const now = new Date();
                    const time = now.toLocaleTimeString();
                    botReply = `La hora actual es: ${time}`;
                } else if (lowerCaseMessage.includes('fecha')) {
                    const now = new Date();
                    const date = now.toLocaleDateString();
                    botReply = `La fecha actual es: ${date}`;
                } else {
                    botReply = 'Pregunta Otra Cosa';
                }

                setTimeout(() => {
                    const botResponse = document.createElement('p');
                    botResponse.classList.add('bot-message');
                    botResponse.textContent = botReply;
                    chatMessages.appendChild(botResponse);
                    chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar hacia abajo
                }, 500); // Siempre un pequeño retraso para la respuesta del bot

                chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar hacia abajo inmediatamente después del mensaje del usuario
            }
        });

        // Permitir enviar mensaje con Enter
        userInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                sendButton.click();
            }
        });
    } else {
        console.error("script.js: Chat send button, user input, or chat messages container not found. Chat message sending not enabled.");
    }
});