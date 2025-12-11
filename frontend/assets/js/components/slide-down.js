document.addEventListener('DOMContentLoaded', function () {
    const loginCard = document.querySelector('.login-card');
    const registerCard = document.querySelector('.register-card');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.querySelector('.register-card .link');

    // Show register form
    showRegister.addEventListener('click', function (e) {
        e.preventDefault();
        loginCard.classList.add('hidden');
        registerCard.classList.add('visible');
    });

    // Show login form (if there's a back link in register form)
    if (showLogin) {
        showLogin.addEventListener('click', function (e) {
            e.preventDefault();
            loginCard.classList.remove('hidden');
            registerCard.classList.remove('visible');
        });
    }

    // Initialize password toggles
    if (typeof initPasswordToggle === 'function') {
        initPasswordToggle('togglePasswordLogin', 'passwordLogin');
        initPasswordToggle('togglePasswordRegister', 'passwordRegister');
    }
});