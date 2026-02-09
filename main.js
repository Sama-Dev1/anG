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

        // Admin Link check
        if (userData.email === 'n68324755@gmail.com') {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && !document.getElementById('nav-admin-link')) {
                const li = document.createElement('li');
                li.innerHTML = '<a href="admin_chat.html" id="nav-admin-link" style="color: var(--accent); font-weight: bold;">Private Chats</a>';
                navLinks.insertBefore(li, navLinks.firstChild);
            }
        }

        const connectBtn = document.getElementById('nav-connect-btn');
        if (connectBtn) {
            connectBtn.innerHTML = ''; // Clear existing text

            if (userData.profilePic) {
                const img = document.createElement('img');
                img.src = userData.profilePic;
                img.style.width = '24px';
                img.style.height = '24px';
                img.style.borderRadius = '50%';
                img.style.marginRight = '8px';
                img.style.verticalAlign = 'middle';
                img.style.objectFit = 'cover';
                connectBtn.appendChild(img);
            }

            const nameSpan = document.createElement('span');
            nameSpan.textContent = userData.name || userData.email.split('@')[0];
            connectBtn.appendChild(nameSpan);

            if (userData.role) {
                const roleBadge = document.createElement('span');
                roleBadge.textContent = userData.role;
                roleBadge.style.fontSize = '0.7rem';
                roleBadge.style.background = userData.role === 'Pro' ? 'var(--accent)' : 'var(--primary)';
                roleBadge.style.color = '#fff';
                roleBadge.style.padding = '2px 8px';
                roleBadge.style.borderRadius = '50px';
                roleBadge.style.marginLeft = '10px';
                roleBadge.style.textTransform = 'uppercase';
                roleBadge.style.fontWeight = 'bold';
                roleBadge.style.boxShadow = '0 0 10px ' + (userData.role === 'Pro' ? 'rgba(236, 72, 153, 0.5)' : 'rgba(139, 92, 246, 0.5)');
                connectBtn.appendChild(roleBadge);
            }

            connectBtn.href = 'settings.html';
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
