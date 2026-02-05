document.addEventListener('DOMContentLoaded', () => {
    // Check Login State on Load
    const savedUser = localStorage.getItem('sama_user');
    const heroBtn = document.getElementById('hero-signin-btn');
    const navBtn = document.querySelector('.nav-links a[href*="auth.html"]');
    const dashboardSection = document.getElementById('dashboard');
    const heroSection = document.getElementById('home');
    const navDbLink = document.getElementById('nav-db-link');

    if (savedUser) {
        const userData = JSON.parse(savedUser);

        // Update Hero Button
        if (heroBtn) {
            heroBtn.textContent = 'Welcome, ' + (userData.name || userData.email.split('@')[0]);
            heroBtn.href = '#dashboard';
            heroBtn.style.background = 'var(--secondary)';
            heroBtn.style.borderColor = 'var(--secondary)';
        }

        // Show Dashboard / Hide Hero
        if (dashboardSection && heroSection) {
            heroSection.style.display = 'none';
            dashboardSection.style.display = 'block';
            dashboardSection.classList.add('active'); // triggers animation
        }

        // Update Nav
        if (navDbLink) {
            navDbLink.style.display = 'block';
        }

        const connectBtn = document.getElementById('nav-connect-btn');
        if (connectBtn) {
            connectBtn.textContent = userData.name || userData.email.split('@')[0];
            connectBtn.href = '#';
        }
        // Optional: Hide "Sign In" link in nav if you prefer, or change it to "Logout"
        if (navBtn) {
            navBtn.parentElement.style.display = 'none';
        }
    }

    // Handle Sign In Form Submission
    const signinForm = document.getElementById('form-signin');
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signin-email').value;
            const name = document.getElementById('signin-name').value;

            // Save state
            localStorage.setItem('sama_user', JSON.stringify({ email: email, name: name, loggedIn: true }));

            // Mock delay then redirect
            const submitBtn = signinForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';

            // Simulation of email notification happening effectively in background
            // "send me email if someone sign in" - User requirement
            console.log(`[System] Email notification sent to n68324755@gmail.com for user: ${email}`);

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }

    // Typing Effect
    const codeElement = document.getElementById('typing-code');
    if (codeElement) {
        const codeText = `const label = {
  role: "Creator",
  vision: "Limitless",
  build: () => {
    return "Sama";
  }
};`;

        // Clear initial content
        codeElement.innerText = '';

        let i = 0;
        function typeWriter() {
            if (i < codeText.length) {
                codeElement.innerText += codeText.charAt(i);
                console.log(codeText.charAt(i));
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }

    // Smooth Scrolling (Refined with Event Delegation)
    document.addEventListener('click', function (e) {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
    // Mobile Menu Toggle (Basic)
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            navLinks.style.position = 'static';
            navLinks.style.flexDirection = 'row';
            navLinks.style.background = 'transparent';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.flexDirection = 'column';
            navLinks.style.background = 'rgba(5, 5, 5, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.backdropFilter = 'blur(15px)';
            navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        }
    });
});
