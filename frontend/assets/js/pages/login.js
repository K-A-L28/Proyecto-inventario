/**********************************************
 * VALIDACIÓN SEGURA PARA FORMULARIO DE LOGIN
 **********************************************/

document.addEventListener("DOMContentLoaded", function () {
    /* -------------------------------------------------------------
       VARIABLES Y CONFIGURACIÓN
    --------------------------------------------------------------*/
    const form = document.getElementById("loginForm");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("passwordLogin");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const togglePasswordBtn = document.getElementById("togglePasswordLogin");

    // Control de intentos
    let loginAttempts = 0;
    const MAX_ATTEMPTS = 5;
    const LOCKOUT_TIME = 5 * 60 * 1000; // 5 minutos
    let lockoutUntil = 0;

    /* -------------------------------------------------------------
       FUNCIÓN PARA SANITIZAR CADENAS (ANTI-XSS)
    --------------------------------------------------------------*/
    function sanitizeInput(input) {
        const div = document.createElement("div");
        div.textContent = input;
        return div.innerHTML
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    /* -------------------------------------------------------------
       BLOQUEAR CARACTERES PELIGROSOS
    --------------------------------------------------------------*/
    function blockSpecialChars(e) {
        const key = e.key;
        
        // Permitir teclas de control
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        
        const safeKeys = [
            "Backspace", "Tab", "Enter", "Shift", "Control", 
            "Alt", "Escape", "ArrowLeft", "ArrowRight", 
            "ArrowUp", "ArrowDown", "Delete", "Home", "End"
        ];
        if (safeKeys.includes(key)) return;

        // Solo permitir caracteres seguros
        const allowed = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]$/;
        if (!allowed.test(key)) {
            e.preventDefault();
            return false;
        }
    }

    // Aplicar bloqueo de caracteres especiales
    [emailField, passwordField].forEach(field => {
        field.addEventListener("keydown", blockSpecialChars);
    });

    // Prevenir pegado en contraseña
    passwordField.addEventListener("paste", (e) => {
        e.preventDefault();
    });

    /* -------------------------------------------------------------
       VALIDACIÓN DEL FORMULARIO
    --------------------------------------------------------------*/
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Limpiar errores previos
        clearErrors();
        
        const email = emailField.value.trim();
        const password = passwordField.value.trim();
        let isValid = true;

        // Verificar si la cuenta está bloqueada
        const now = Date.now();
        if (now < lockoutUntil) {
            const remaining = Math.ceil((lockoutUntil - now) / 60000);
            showError(`Demasiados intentos. Intente nuevamente en ${remaining} minutos.`);
            return;
        }

        /* ---------------------------
           VALIDACIÓN EMAIL
        ----------------------------*/
        if (!email) {
            showError(emailField, "El correo electrónico es obligatorio", emailError);
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError(emailField, "Ingrese un correo electrónico válido", emailError);
            isValid = false;
        }

        /* ---------------------------
           VALIDACIÓN CONTRASEÑA
        ----------------------------*/
        if (!password) {
            showError(passwordField, "La contraseña es obligatoria", passwordError);
            isValid = false;
        } else if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {
            showError(
                passwordField,
                "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números",
                passwordError
            );
            isValid = false;
        }

        // Si hay errores, incrementar contador
        if (!isValid) {
            loginAttempts++;
            
            if (loginAttempts >= MAX_ATTEMPTS) {
                lockoutUntil = Date.now() + LOCKOUT_TIME;
                showError("Demasiados intentos fallidos. Su cuenta ha sido bloqueada temporalmente.");
            }
            
            return;
        }

        // Si todo es válido, proceder con el inicio de sesión
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedPassword = sanitizeInput(password);

        // Aquí iría la lógica de autenticación con el servidor
        console.log("Iniciando sesión con:", { email: sanitizedEmail });
        
        // Limpiar formulario
        form.reset();
        loginAttempts = 0;
        
        // Redirigir después de un inicio de sesión exitoso
        window.location.href = "./frontend/public/views/home.html";
    });

    /* -------------------------------------------------------------
       FUNCIONES AUXILIARES
    --------------------------------------------------------------*/
    function showError(field, message, errorElement) {
        if (field) field.classList.add("error");
        if (errorElement) errorElement.textContent = message;
        else alert(message); // Para mensajes generales
    }

    function clearErrors() {
        [emailField, passwordField].forEach(field => field?.classList.remove("error"));
        [emailError, passwordError].forEach(error => error && (error.textContent = ""));
    }
});
