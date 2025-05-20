<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mantenimiento del Sistema</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

    <style>
        /* Restablecimiento básico y box-sizing */
        *, *::before, *::after {
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Fuente moderna y limpia */
            background-color: #e2e8f0; /* Un gris azulado suave */
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh; /* Asegura que ocupe toda la altura de la ventana */
            margin: 0;
            text-align: center;
            color: #333; /* Color de texto general */
            padding: 20px; /* Padding para evitar que el contenido se pegue a los bordes en móviles */
        }

        .container {
            background-color: #ffffff; /* Fondo blanco para el contenedor principal */
            padding: 50px;
            border-radius: 12px; /* Bordes más suaves */
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* Sombra más pronunciada para un efecto flotante */
            max-width: 600px; /* Ancho máximo para el contenedor */
            width: 100%; /* Ocupa el 100% del ancho disponible */
        }

        h1 {
            color: #d9534f; /* Rojo de advertencia/atención */
            margin-bottom: 25px;
            font-size: 2.5em; /* Tamaño de fuente más grande para el título */
            font-weight: 700; /* Negrita */
        }

        p {
            color: #555;
            margin-bottom: 20px;
            font-size: 1.15em; /* Tamaño de fuente ligeramente más grande para los párrafos */
            line-height: 1.6; /* Espaciado entre líneas para mejor lectura */
        }

        .loader {
            border: 8px solid #f3f3f3; /* Gris claro para el borde del loader */
            border-top: 8px solid #d9534f; /* Rojo del tema para la parte animada */
            border-radius: 50%;
            width: 70px; /* Tamaño un poco más grande */
            height: 70px;
            animation: spin 1.5s linear infinite; /* Animación de giro más rápida */
            margin: 30px auto; /* Centrar y añadir espacio */
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        #progress-message {
            color: #666; /* Un gris ligeramente más oscuro */
            font-size: 1em;
            margin-top: 15px;
            font-style: italic; /* Mensaje en cursiva */
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
            .container {
                padding: 30px;
            }
            h1 {
                font-size: 2em;
            }
            p {
                font-size: 1em;
            }
            .loader {
                width: 50px;
                height: 50px;
                border-width: 6px;
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 20px;
                border-radius: 8px;
            }
            h1 {
                font-size: 1.8em;
                margin-bottom: 15px;
            }
            p {
                font-size: 0.95em;
                margin-bottom: 15px;
            }
            .loader {
                margin: 20px auto;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>¡Estamos trabajando!</h1>
        <p>Nuestro sistema está actualmente en mantenimiento para aplicar mejoras importantes y asegurar un mejor rendimiento. Agradecemos tu paciencia y comprensión.</p>
        
        <div class="loader"></div>
        
        <p id="progress-message">Estimamos que el servicio estará de vuelta en unos minutos. Por favor, vuelve a intentar más tarde.</p>
        
        <p style="font-size: 0.9em; color: #888; margin-top: 40px;">
            Para actualizaciones o soporte, puedes visitarnos en nuestras redes sociales: <br>
            <a href="#" style="color: #d9534f; text-decoration: none;"><i class="fab fa-twitter"></i> Twitter</a> | 
            <a href="#" style="color: #d9534f; text-decoration: none;"><i class="fab fa-facebook"></i> Facebook</a>
        </p>

        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const messages = [
                    "Verificando la estabilidad del sistema...",
                    "Optimizando las bases de datos...",
                    "Aplicando las últimas actualizaciones de seguridad...",
                    "Realizando pruebas finales...",
                    "¡Ya casi estamos listos!"
                ];
                let currentIndex = 0;
                const progressMessageElement = document.getElementById('progress-message');

                // Función para actualizar el mensaje
                function updateProgressMessage() {
                    progressMessageElement.textContent = messages[currentIndex];
                    currentIndex = (currentIndex + 1) % messages.length; // Cicla a través de los mensajes
                }

                // Actualizar el mensaje cada 5 segundos
                setInterval(updateProgressMessage, 5000);

                // Establecer el primer mensaje al cargar la página
                updateProgressMessage(); 
            });
        </script>
    </div>
</body>
</html>
