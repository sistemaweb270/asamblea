
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema en Mantenimiento</title>
    <link rel="icon" href="icon/man.ico" type="image/x-icon">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #161c23;
            color: #333;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            text-align: center;
            overflow: hidden; /* Para las animaciones de fondo */
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            width: 90%;
            position: relative;
            z-index: 10;
        }
        h1 {
            color: #0056b3;
            font-size: 2.5em;
            margin-bottom: 20px;
        }
        p {
            font-size: 1.2em;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .spinner {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Animación de fondo: partículas de trabajo */
        .working-particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
        }
        .particle {
            position: absolute;
            background-color: rgba(0, 123, 255, 0.1);
            border-radius: 50%;
            animation: floatUp 15s infinite ease-in-out;
            opacity: 0;
        }
        /* Variaciones para las partículas */
        .particle:nth-child(1) { width: 20px; height: 20px; left: 10%; animation-duration: 12s; animation-delay: 0s; }
        .particle:nth-child(2) { width: 30px; height: 30px; left: 30%; animation-duration: 15s; animation-delay: 2s; }
        .particle:nth-child(3) { width: 25px; height: 25px; left: 50%; animation-duration: 10s; animation-delay: 4s; }
        .particle:nth-child(4) { width: 35px; height: 35px; left: 70%; animation-duration: 18s; animation-delay: 6s; }
        .particle:nth-child(5) { width: 22px; height: 22px; left: 90%; animation-duration: 13s; animation-delay: 8s; }

        @keyframes floatUp {
            0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-50vh) scale(1.2); opacity: 0; }
        }
    </style>
</head>
<body>
    <div class="working-particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
    </div>
    <div class="container">
        <h1>🛠️ Error de sistema, Servidores Con problemas 🛠️</h1>
        <div class="spinner"></div>
        <p>Estamos trabajando Para Resolver el problema en poco Tiempo. ¡Agradecemos tu paciencia!</p>
        <p>Por favor, espere un momento o inténtelo de nuevo más tarde.</p>
    </div>
</body>
</html>
