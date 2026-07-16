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

// Dashboard
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function(e) {
        e.preventDefault();

        // 1. Create the modal background wrapper on the fly
        const logoutModal = document.createElement('div');
        logoutModal.id = 'logoutModal';
        logoutModal.className = 'modal'; 

        // 2. Inject the modal template
        logoutModal.innerHTML = `
            <div class="modal-content">
                <h3>Log Out?</h3>
                <p>Are you sure you want to end your session?</p>
                <div class="modal-actions">
                    <button id="cancelBtn" class="btn-secondary">Cancel</button>
                    <button id="confirmBtn" class="btn-danger">Log Out</button>
                </div>
            </div>
        `;

        // 3. Mount it to the webpage DOM
        document.body.appendChild(logoutModal);

        // 4. Scope selectors directly inside the freshly built modal
        const cancelBtn = logoutModal.querySelector('#cancelBtn');
        const confirmBtn = logoutModal.querySelector('#confirmBtn');

        // Helper cleanup function to drop it from the DOM completely
        const destroyModal = () => {
            logoutModal.remove();
        };

        // Event: Cancel button click
        cancelBtn.addEventListener('click', destroyModal);

        // Event: Click outside modal box on the dark background overlay
        logoutModal.addEventListener('click', function(event) {
            if (event.target === logoutModal) {
                destroyModal();
            }
        });

        // Event: Confirm button click
        confirmBtn.addEventListener('click', function() {
            localStorage.removeItem("ceGliaBankLoggedIn");
            destroyModal();
            window.location.href = "login.html";
        });
    });
}