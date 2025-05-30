<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mantenimiento en Curso</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    
    <style>
        /* Estilos generales del body y contenedor */
        *, *::before, *::after {
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #e2e8f0, #c3d9eb);
            background-size: 200% 200%;
            animation: gradientAnimation 15s ease infinite;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            text-align: center;
            color: #333;
            padding: 20px;
            overflow: hidden;
        }

        @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .container {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            max-width: 750px; /* Un poco más de ancho para el juego */
            width: 100%;
            position: relative;
            overflow: hidden;
        }

        h1 {
            color: #d9534f;
            margin-bottom: 25px;
            font-size: 2.5em;
            font-weight: 700;
            animation: pulseText 2s infinite alternate;
        }

        @keyframes pulseText {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.02); opacity: 0.9; }
        }

        p {
            color: #555;
            margin-bottom: 20px;
            font-size: 1.15em;
            line-height: 1.6;
        }

        .working-image {
            max-width: 90%;
            height: auto;
            margin: 25px auto;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease-in-out;
        }

        .working-image:hover {
            transform: translateY(-5px);
        }

        .loader {
            width: 80px;
            height: 80px;
            border: 8px solid #f0f0f0;
            border-top: 8px solid #d9534f;
            border-radius: 50%;
            position: relative;
            animation: spin 1.2s linear infinite;
            margin: 30px auto;
        }

        .loader::before {
            content: '';
            position: absolute;
            top: 5px;
            left: 5px;
            right: 5px;
            bottom: 5px;
            border: 6px solid #e0e0e0;
            border-top: 6px solid #ffcc00;
            border-radius: 50%;
            animation: spinReverse 1.5s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes spinReverse {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
        }

        #progress-message {
            color: #666;
            font-size: 1em;
            margin-top: 25px;
            font-style: italic;
            min-height: 2em;
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
        }
        #progress-message.fading-out {
            opacity: 0;
        }

        .social-links {
            margin-top: 40px;
            font-size: 0.9em;
            color: #888;
        }
        .social-links a {
            color: #d9534f;
            text-decoration: none;
            margin: 0 10px;
            transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        .social-links a:hover {
            color: #b03d3a;
            transform: translateY(-2px);
        }
        .social-links a i {
            margin-right: 5px;
        }

        /* Ocultar el indicador de "Casi Listo" si el juego es la "finalización" principal */
        .completion-indicator { 
            display: none; 
        }
        
        /* Estilos para el juego */
        #game-section {
            display: none; /* Se mostrará con JavaScript */
            margin-top: 30px;
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 8px;
            background-color: #f9f9f9;
        }

        #game-section.visible {
            display: block; /* Para mostrar el juego */
        }

        #game-message {
            font-size: 1.2em;
            margin-bottom: 20px;
            color: #007bff; /* Color azul para el mensaje del juego */
            font-weight: bold;
        }

        #game-board {
            display: grid;
            grid-template-columns: repeat(4, 1fr); /* 4 columnas para 8 cartas (4 pares) */
            gap: 10px; /* Espacio entre las tarjetas */
            max-width: 400px; /* Ancho máximo del tablero para centrarlo */
            margin: 0 auto; /* Centrar el tablero */
        }

        .card {
            background-color: #f0f0f0;
            border: 2px solid #ccc;
            border-radius: 8px;
            width: 90px; /* Tamaño fijo para las tarjetas */
            height: 90px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2.5em; /* Tamaño del icono */
            cursor: pointer;
            perspective: 1000px; /* Para efecto de giro 3D */
            transition: transform 0.3s ease-in-out; /* Transición para el giro */
        }

        .card.flipped {
            transform: rotateY(180deg); /* Animación de giro */
        }

        .card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.6s; /* Transición más lenta para la vuelta de la tarjeta */
            transform-style: preserve-3d; /* Permite el giro 3D */
        }

        .card-front, .card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden; /* Oculta la parte trasera cuando no está girada */
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
        }

        .card-front {
            background-color: #007bff; /* Color de la parte frontal (azul, oculta el icono) */
            color: white; /* Color del icono de incógnita */
            transform: rotateY(0deg);
            font-size: 1.5em; /* Tamaño del icono de incógnita */
        }

        .card-back {
            background-color: #e9ecef; /* Color de la parte trasera (gris claro, muestra el icono) */
            color: #333; /* Color del icono del juego */
            transform: rotateY(180deg);
        }

        .card.matched .card-front,
        .card.matched .card-back {
            opacity: 0.5; /* Tarjetas emparejadas más tenues */
            pointer-events: none; /* No se pueden clickear de nuevo */
        }
        .card.matched .card-front {
            background-color: #28a745; /* Fondo verde para emparejadas */
        }
        .card.matched .card-back {
            background-color: #d4edda; /* Fondo verde claro para emparejadas */
        }

        /* Mensaje de victoria */
        #victory-message {
            display: none; /* Oculto por defecto, se mostrará con JS */
            font-size: 1.5em;
            color: #28a745; /* Verde de éxito */
            font-weight: bold;
            margin-top: 30px;
            animation: bounceIn 1s; /* Animación de entrada */
        }

        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); opacity: 1; }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); }
        }

        /* Responsive para el juego */
        @media (max-width: 576px) {
            #game-board {
                grid-template-columns: repeat(3, 1fr); /* 3 columnas en móviles */
                max-width: 300px;
            }
            .card {
                width: 80px;
                height: 80px;
                font-size: 2em;
            }
            .card-front {
                font-size: 1.2em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>¡lo Sentimos Hay un Problema en los Servidores contacte Soporte!</h1>
        <p>Nuestro sistema Sufrio un Error de Calculo, lo estan resolviendo!</p>
        
        <div class="loader"></div>
        
        <p id="progress-message">Estimamos que el servicio estará de vuelta en unos minutos. Por favor, vuelve a intentar más tarde.</p>
        
        <div class="social-links">
            Para actualizaciones o soporte, puedes visitarnos en nuestras redes sociales: <br>
            <a href="#" target="_blank"><i class="fab fa-twitter"></i> Twitter</a> | 
            <a href="#" target="_blank"><i class="fab fa-facebook"></i> Facebook</a> |
            <a href="https://wa.link/ktne4u" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a>
        </div>

        <script>
        
                function resetBoard() {
                    [flippedCards, lockBoard] = [[], false]; // Reiniciar variables
                }

                function showVictoryMessage() {
                    victoryMessage.style.display = 'block';
                    // Aquí podrías añadir una redirección o un mensaje final al usuario
                    // Por ejemplo, simular que el mantenimiento ha terminado y redirigir:
                    // setTimeout(() => {
                    //     alert("¡Mantenimiento completado! El sistema está de vuelta. Redireccionando...");
                    //     window.location.href = "index.html"; // Cambia esto a la URL de tu sitio
                    // }, 3000);
                }

                // --- Lógica de mensajes de progreso (anterior) ---
                const messages = [
                    "Verificando la estabilidad del sistema...",
                    "Optimizando las bases de datos...",
                    "Verificando Usuarios...",
                    "Validando Exportaciones de PDF...",
                    "Descargando pruebas de sistema...",
                    "Aplicando las últimas actualizaciones de seguridad...",
                    "Realizando pruebas finales...",
                    "Prueba Final Errado...",
                    "Intentando validar Descarga y registro...",
                    "Prueba Realizado con Exito...",
                    "¡Casi listo! Ajustando los últimos detalles...",
                    "El servicio estará disponible muy pronto. ¡Gracias por tu paciencia!",
                    "El servicio Esta Apunto de Ser Publicado. ¡Gracias por tu paciencia!",
                    "Te Recomendamos Actualizar la Pagina. ¡Gracias por tu paciencia!",
                    "Pagina Actualizado y modificado con exito",
                    "Disfruta del Lanzamiento Final",
                    "sistema En Funcionamiento",
                ];
                let currentMessageIndex = 0; // Renombrado para evitar conflicto con currentIndex del juego

                function updateProgressMessage() {
                    progressMessageElement.classList.add('fading-out');

                    setTimeout(() => {
                        progressMessageElement.textContent = messages[currentMessageIndex];
                        
                        // Añadir un mensaje final más fuerte (si no se usa la victoria del juego como final)
                        if (currentMessageIndex === messages.length - 1) { 
                            progressMessageElement.style.fontWeight = 'bold';
                            progressMessageElement.style.color = '#28a745'; 
                        } else {
                            progressMessageElement.style.fontWeight = 'normal';
                            progressMessageElement.style.color = '#666';
                        }

                        currentMessageIndex = (currentMessageIndex + 1) % messages.length;
                        progressMessageElement.classList.remove('fading-out');
                    }, 500);
                }

                // Actualizar el mensaje cada 5 segundos
                setInterval(updateProgressMessage, 5000);

                // Establecer el primer mensaje de progreso al cargar la página
                updateProgressMessage(); 
                
                // --- FIN Lógica de mensajes de progreso ---

                initializeGame(); // Iniciar el juego al cargar la página
            });
        </script>
    </div>
</body>
</html>
