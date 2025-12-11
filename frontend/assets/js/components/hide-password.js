// Toggle password visibility 
document.querySelectorAll(".password-group").forEach(group => {
    const toggleBtn = group.querySelector(".password-toggle");
    const passwordInput = group.querySelector("input[type='password'], input[type='text']");

    toggleBtn.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";
        toggleBtn.classList.toggle("show-password", !isPassword);
    });
});