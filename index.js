// Script para la validación de usuario y contraseña
var username = "usuario"; // Cambia esto con tu nombre de usuario
var password = "contrasena"; // Cambia esto con tu contraseña
var maxAttempts = 3;
var lockoutTime = 1 * 60 * 1000; // 15 minutos en milisegundos
var attempts = 0;

document.getElementById("loginButton").addEventListener("click", function () {
    var enteredUsername = document.getElementById("username").value;
    var enteredPassword = document.getElementById("password").value;
    var rememberMe = document.getElementById("remember").checked;

    if (enteredUsername === username && enteredPassword === password) {
        alert("Inicio de sesión exitoso");
        // Aquí deberías redirigir a la página principal
    } else {
        attempts++;

        if (attempts >= maxAttempts) {
            alert("Has excedido el número máximo de intentos. Cuenta bloqueada por 1 minuto.");
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("remember").disabled = true;
            document.getElementById("loginButton").disabled = true;

            setTimeout(function () {
                document.getElementById("username").disabled = false;
                document.getElementById("password").disabled = false;
                document.getElementById("remember").disabled = false;
                document.getElementById("loginButton").disabled = false;
                attempts = 0;
            }, lockoutTime);
        } else {
            alert("Usuario o contraseña incorrectos. Intento #" + attempts);
        }
    }
});