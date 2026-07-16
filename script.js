// ==========================================
// 1. LOGIN FORM LOGIC (Unchanged)
// ==========================================
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

// ==========================================
// 2. DASHBOARD LOGOUT MODAL (Dynamic Creation with Body Class)
// ==========================================
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function(e) {
        e.preventDefault();

        // 1. Replicate the ticket: Add "popup-configuration" class to the <body>
        document.body.className = "popup-configuration";

        // 2. Create the modal background wrapper on the fly
        const logoutModal = document.createElement('div');
        logoutModal.id = 'logoutModal';
        logoutModal.className = 'modal'; 

        // 3. Inject the modal template
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

        // 4. Mount it to the webpage DOM
        document.body.appendChild(logoutModal);

        // 5. Scope selectors directly inside the freshly built modal
        const cancelBtn = logoutModal.querySelector('#cancelBtn');
        const confirmBtn = logoutModal.querySelector('#confirmBtn');

        // Helper cleanup function
        const destroyModal = () => {
            // Replicate the ticket: Reset the body class back to empty
            document.body.className = "";
            
            // Drop modal from the DOM completely
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