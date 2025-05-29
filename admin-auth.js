// Admin credentials (in a real application, these would be stored securely on a server)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    // In a real application, this would be a hashed password
    password: 'f1admin2024'
};

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('admin-login-form');
    
    // Check if already logged in
    if (localStorage.getItem('adminAuthenticated')) {
        window.location.href = 'admin-dashboard.html';
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === ADMIN_CREDENTIALS.username && 
            password === ADMIN_CREDENTIALS.password) {
            // Set authentication token
            localStorage.setItem('adminAuthenticated', 'true');
            // Redirect to dashboard
            window.location.href = 'admin-dashboard.html';
        } else {
            alert('Invalid credentials');
        }
    });
}); 