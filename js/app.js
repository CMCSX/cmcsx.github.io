document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // THEME TOGGLER
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');

    // Set theme based on storage or default to dark-theme
    if (savedTheme) {
        body.className = savedTheme;
    } else {
        body.className = 'dark-theme';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    });

    // ==========================================================================
    // MOBILE NAVIGATION MENU
    // ==========================================================================
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = mobileNavToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileNavToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // ==========================================================================
    // TYPING ANIMATION
    // ==========================================================================
    const typingTextElement = document.getElementById('typing-text');
    const roles = ['Developer', 'IT Specialist', 'Tech Innovator'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            // Delete characters
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting speed is faster
        } else {
            // Add characters
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentRole.length) {
            // Wait before starting deletion
            isDeleting = true;
            typingSpeed = 1500; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; // Move to next word
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typingTextElement) {
        typeEffect();
    }

    // ==========================================================================
    // ACTIVE NAVIGATION LINKS ON SCROLL (Intersection Observer)
    // ==========================================================================
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is in main viewport area
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Header shadow on scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // PROJECTS MODAL DETAILS DATABASE & LOGIC
    // ==========================================================================
    const projectsData = {
        '1': {
            title: 'PayAnalytics',
            category: 'Web App / Analytics',
            image: 'assets/PA1.png',
            client: 'SP Madrid Law and Associates',
            role: 'Developer & Data Analyst',
            tech: ['Python', 'SQL', 'HTML5', 'CSS3', 'VS Code'],
            demoLink: 'https://github.com/cmcsx',
            codeLink: 'https://github.com/cmcsx',
            desc: `
                <p>PayAnalytics is an interactive telemetry and analysis portal created to help Data Analysts visualize and audit financial collections and process logs.</p>
                <br>
                <p><strong>Key Highlights:</strong></p>
                <ul>
                    <li>Designed clean, user-friendly visualization dashboards for fast reporting and data transparency.</li>
                    <li>Wrote optimized database scripts using SQL to index and query transactional logs efficiently.</li>
                    <li>Crafted high-fidelity frontend layouts using CSS variables to ensure seamless navigation for internal auditors.</li>
                </ul>
            `
        },
        '2': {
            title: 'StatWash',
            category: 'Web App / Data Utility',
            image: 'assets/project2.png',
            client: 'SP Madrid Law and Associates',
            role: 'Developer & Data Analyst',
            tech: ['Python', 'SQL', 'HTML5', 'CSS3', 'VS Code'],
            demoLink: 'https://github.com/cmcsx',
            codeLink: 'https://github.com/cmcsx',
            desc: `
                <p>StatWash is a bespoke data processing utility developed to sanitize raw spreadsheet datasets before report compiles. It simplifies sorting, null values screening, and column restructuring.</p>
                <br>
                <p><strong>Key Highlights:</strong></p>
                <ul>
                    <li>Built automated filtering controls in Python to expedite database formatting pipelines.</li>
                    <li>Designed an elegant, accessible interface following modern Interaction Design patterns for easier operational use.</li>
                    <li>Provided search and group sorting views enabling analysts to locate mismatches quickly.</li>
                </ul>
            `
        },
        '3': {
            title: 'MotoResQue',
            category: 'Mobile App / Capstone Project',
            image: 'assets/project3.png',
            client: 'STI College Malolos',
            role: 'Capstone Project Developer',
            tech: ['Java', 'GPS APIs', 'MongoDB', 'Android Studio', 'Maps API'],
            demoLink: 'https://github.com/cmcsx',
            codeLink: 'https://github.com/cmcsx',
            desc: `
                <p>MotoResQue is a location-based mobile application designed for emergency rescue and dispatch assistance targeting motorcycle riders in the Malolos region.</p>
                <br>
                <p><strong>Key Highlights:</strong></p>
                <ul>
                    <li>Integrated real-time location triggers and Google Maps GPS APIs to broadcast emergency distress signals.</li>
                    <li>Used MongoDB database systems to log emergency reports, user profiles, and shop inventory coordinates.</li>
                    <li>Programmed responsive layout sheets in Java for mobile screens, delivering low-latency button interactions.</li>
                </ul>
            `
        }
    };

    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    function openModal(projectId) {
        const data = projectsData[projectId];
        if (!data) return;

        // Populate Modal Fields
        document.getElementById('modal-project-img').src = data.image;
        document.getElementById('modal-project-img').alt = data.title;
        document.getElementById('modal-project-cat').textContent = data.category;
        document.getElementById('modal-project-title').textContent = data.title;
        document.getElementById('modal-project-desc').innerHTML = data.desc;
        document.getElementById('modal-meta-client').textContent = data.client;
        document.getElementById('modal-meta-role').textContent = data.role;
        document.getElementById('modal-demo-link').href = data.demoLink;
        document.getElementById('modal-code-link').href = data.codeLink;

        // Tech tags list
        const techContainer = document.getElementById('modal-meta-tech');
        techContainer.innerHTML = '';
        data.tech.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            techContainer.appendChild(span);
        });

        // Show Modal
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden'; // Lock main scroll
    }

    function closeModal() {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        body.style.overflow = ''; // Unlock main scroll
    }

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openModal(projectId);
        });
    });

    modalClose.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // ==========================================================================
    // CONTACT FORM SUBMISSION MOCKING
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('form-submit-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

        // Hide previous feedback
        formFeedback.className = 'form-feedback hidden';

        // Get Form Data
        const formData = new FormData(contactForm);
        const name = formData.get('name');

        // Simulate network request (1.5 seconds)
        setTimeout(() => {
            // Success response
            formFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`;
            formFeedback.className = 'form-feedback success';

            // Reset form elements
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 1500);
    });
});
