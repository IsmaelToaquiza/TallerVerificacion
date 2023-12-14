// Módulo de inicio de sesión

// FALLO 2: Exposición de información sensible
/*
las credenciales de acceso, es decir, el nombre de usuario y la contraseña, 
están directamente incluidas en el código JavaScript. Esto puede considerarse 
una mala práctica de seguridad, dado que exponer credenciales en el código fuente 
puede aumentar el riesgo de comprometer la seguridad de las cuentas si alguien accede al código.
*/

// Variables de usuario y contraseña
var username = "usuario"; // Nombre de usuario
var password = "contrasena"; // Contraseña

// Parámetros para el bloqueo de cuenta
var maxAttempts = 3; // Máximo de intentos permitidos
var lockoutTime = 1 * 60 * 1000; // Tiempo de bloqueo en milisegundos (1 minuto)
var attempts = 0; // Intentos de inicio de sesión realizados
var isLockedOut = false; // Estado de bloqueo de cuenta
var lockoutTimer;

// Evento al hacer clic en el botón de inicio de sesión
document.getElementById("loginButton").addEventListener("click", function () {
  var enteredUsername = document.getElementById("username").value;
  var enteredPassword = document.getElementById("password").value;

  //ERROR SIMULADO
  /*
  Error simulado: Se intenta acceder a una propiedad 'trim' de un valor que no es una cadena.
  Aquí, se simula un error al intentar utilizar el método 'trim()' en una variable que no es de tipo string.
  Esto podría ocurrir si, por ejemplo, se espera que los valores ingresados sean siempre cadenas, pero por algún motivo se recibe un valor de otro tipo.
  */
  //var nonStringUsername = 123; // Simulación de un valor que no es una cadena
  //var trimmedUsername = nonStringUsername.trim(); // Generaría un error de tipo 'nonStringUsername.trim is not a function'
  //console.log(nonStringUsername.trim());  


  // FALLO 1: No se maneja el caso en el que los campos de usuario y contraseña estén vacíos.
  /*
  Falta de manejo de campos vacíos en el formulario de inicio de sesión. 
  Cuando el usuario intenta iniciar sesión con campos de usuario y contraseña vacíos, 
  no se ha implementado un mensaje de error o una validación para alertar al usuario 
  sobre esta situación. Esto podría conducir a intentos de inicio de sesión fallidos 
  sin claridad sobre el motivo, lo que podría afectar la experiencia del usuario.
  */

  if (isLockedOut) {
    showAlert("Cuenta bloqueada. Intenta de nuevo más tarde.", "alert-danger");
    return;
  }

  if (enteredUsername === username && enteredPassword === password) {
    showAlert("Inicio de sesión exitoso", "alert-success");
  } else {
    attempts++;

    if (attempts >= maxAttempts) {
      showAlert(
        "Has excedido el número máximo de intentos. Cuenta bloqueada por 1 minuto.",
        "alert-danger"
      );
      disableForm();
      isLockedOut = true;
      lockoutTimer = setTimeout(enableForm, lockoutTime);
    } else {
      showAlert(
        "Usuario o contraseña incorrectos. Intento #" + attempts,
        "alert-warning"
      );
    }
  }
});

// Función para mostrar alertas
function showAlert(message, alertType) {
  var alertDiv = document.createElement("div");
  alertDiv.classList.add(
    "alert",
    "alert-dismissible",
    "fade",
    "show",
    alertType
  );
  alertDiv.setAttribute("role", "alert");
  alertDiv.innerHTML = `<strong>${message}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;

  var existingAlerts = document.querySelectorAll(".alert");
  existingAlerts.forEach(function (alert) {
    alert.parentNode.removeChild(alert);
  });

  document.querySelector(".bg-white").appendChild(alertDiv);

  // Cerrar automáticamente la alerta después de 1 segundo
  setTimeout(function () {
    alertDiv.classList.remove("show");
    alertDiv.classList.add("hide");
    setTimeout(function () {
      alertDiv.remove();
    }, 1000);
  }, 2000);
  
  // DEFECTO 1: 
  /*
  El tiempo de cierre de la alerta está establecido en 2 segundos (2000 milisegundos) 
  mientras se comenta como 1 segundo (1000 milisegundos).
  */
}

// Función para deshabilitar formulario durante el bloqueo
function disableForm() {
  document.getElementById("username").disabled = true;
  document.getElementById("password").disabled = true;
  document.getElementById("remember").disabled = true;
  document.getElementById("loginButton").disabled = true;
}

// Función para habilitar formulario después del bloqueo
function enableForm() {
  document.getElementById("username").disabled = false;
  document.getElementById("password").disabled = false;
  document.getElementById("remember").disabled = false;
  document.getElementById("loginButton").disabled = false;
  attempts = 0; // Restablecer los intentos después del tiempo de bloqueo
  isLockedOut = false; // Reiniciar la bandera de bloqueo
}
