// Función para detectar el tema del sistema
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Función para aplicar el tema
function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('theme-toggle').checked = true;
    } else {
        document.documentElement.removeAttribute('data-theme');
        document.getElementById('theme-toggle').checked = false;
    }
    // Guardar preferencia del usuario
    localStorage.setItem('theme', theme);
}

// Inicializar el tema
function initTheme() {
    // Verificar si hay una preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Usar el tema del sistema si no hay preferencia guardada
        setTheme(detectSystemTheme());
    }
    
    // Manejar el cambio en el switch
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', () => {
        setTheme(themeToggle.checked ? 'dark' : 'light');
    });
}

// Escuchar cambios en la preferencia del sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Inicializar el tema cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initTheme);