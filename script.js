// Login

const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

const demoUser = {
    username: "gliaTest",
    password: "testGlia"
};

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === demoUser.username && password === demoUser.password) {
        localStorage.setItem("ceGliaBankLoggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        errorMessage.textContent = "Invalid username or password.";
    }
    });
}

// Dashbpard
const logoutBtn = document.getElementById("logoutBtn");
const logoutModal = document.getElementById('logoutModal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');

if (logoutBtn) {
    logoutBtn.addEventListener("click", function(e) {
        e.preventDefault(); // Prevents any default button behavior
        logoutModal.classList.add('active');
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener("click", function() {
        logoutModal.classList.remove('active');
    });
}

window.addEventListener("click", function(event) {
    if (event.target === logoutModal) {
        logoutModal.classList.remove('active');
    }
});

if (confirmBtn) {
    confirmBtn.addEventListener("click", function() {
        localStorage.removeItem("ceGliaBankLoggedIn");
        window.location.href = "login.html";
    });
}