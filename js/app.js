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
            type: 'web',
            images: ['assets/PA1.png', 'assets/PA2.png', 'assets/PA3.png'],
            client: 'SP Madrid Law and Associates',
            role: 'Developer & Data Analyst',
            tech: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'FastAPI', 'SQLAlchemy', 'Vercel', 'Render'],
            demoLink: 'https://pay-analytics-updated.vercel.app/login',
            codeLink: 'https://github.com/cmcsx/PayAnalytics_CLOUD',
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
            type: 'web',
            images: ['assets/SW1.png', 'assets/SW2.png', 'assets/SW3.png'],
            client: 'SP Madrid Law and Associates',
            role: 'Developer & Data Analyst',
            tech: ['Next.js', 'React', 'Typescript', 'Tailwind CSS', 'Radix UI'],
            codeLink: 'https://github.com/CMCSX/StatWash',
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
            type: 'mobile',
            images: ['assets/MR1.png', 'assets/MR2.png', 'assets/MR3.png'],
            client: 'STI College Malolos',
            role: 'Capstone Project Developer',
            tech: ['React Native', 'Neon Database', 'Socket.io', 'Render', 'Maps API'],
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

    // Slider State & Elements
    let currentProjectImages = [];
    let currentImageIndex = 0;

    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');
    const dotsContainer = document.getElementById('modal-slider-dots');
    const modalImg = document.getElementById('modal-project-img');

    // Setup transition listener on image load
    modalImg.addEventListener('load', () => {
        modalImg.classList.remove('fade-out');
    });

    function updateSliderImage(index) {
        if (!currentProjectImages || currentProjectImages.length === 0) return;
        currentImageIndex = index;

        // Start fade out transition
        modalImg.classList.add('fade-out');

        // Swap source and update pagination indicators after short delay
        setTimeout(() => {
            modalImg.src = currentProjectImages[currentImageIndex];

            // Update dots active class
            const dots = dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentImageIndex);
            });
        }, 150);
    }

    function setupSlider(images) {
        currentProjectImages = images || [];
        currentImageIndex = 0;

        // Clear existing pagination dots
        dotsContainer.innerHTML = '';

        if (currentProjectImages.length <= 1) {
            // Hide navigation arrows and dots container
            prevBtn.classList.add('hidden');
            nextBtn.classList.add('hidden');
            dotsContainer.classList.add('hidden');

            if (currentProjectImages.length === 1) {
                modalImg.src = currentProjectImages[0];
            } else {
                modalImg.src = '';
            }
        } else {
            // Show navigation arrows and dots container
            prevBtn.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
            dotsContainer.classList.remove('hidden');

            // Generate pagination dots dynamically
            currentProjectImages.forEach((_, idx) => {
                const dot = document.createElement('div');
                dot.className = 'slider-dot' + (idx === 0 ? ' active' : '');
                dot.addEventListener('click', () => {
                    updateSliderImage(idx);
                });
                dotsContainer.appendChild(dot);
            });

            // Set initial image
            modalImg.src = currentProjectImages[0];
        }
    }

    function openModal(projectId) {
        const data = projectsData[projectId];
        if (!data) return;

        // Reset and set layout class based on project type
        modal.classList.remove('project-type-web', 'project-type-mobile');
        if (data.type === 'mobile') {
            modal.classList.add('project-type-mobile');
        } else {
            modal.classList.add('project-type-web');
        }

        // Populate Modal Fields
        modalImg.alt = data.title;
        document.getElementById('modal-project-cat').textContent = data.category;
        document.getElementById('modal-project-title').textContent = data.title;
        document.getElementById('modal-project-desc').innerHTML = data.desc;
        document.getElementById('modal-meta-client').textContent = data.client;
        document.getElementById('modal-meta-role').textContent = data.role;

        // Handle buttons/links visibility dynamically
        const demoLink = document.getElementById('modal-demo-link');
        const codeLink = document.getElementById('modal-code-link');

        if (data.demoLink) {
            demoLink.href = data.demoLink;
            demoLink.classList.remove('hidden');
        } else {
            demoLink.classList.add('hidden');
        }

        if (data.codeLink) {
            codeLink.href = data.codeLink;
            codeLink.classList.remove('hidden');
        } else {
            codeLink.classList.add('hidden');
        }

        // Initialize slideshow
        setupSlider(data.images);

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

    // Bind slider arrows
    prevBtn.addEventListener('click', () => {
        if (currentProjectImages.length > 1) {
            const nextIdx = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
            updateSliderImage(nextIdx);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentProjectImages.length > 1) {
            const nextIdx = (currentImageIndex + 1) % currentProjectImages.length;
            updateSliderImage(nextIdx);
        }
    });

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
        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const message = document.getElementById('form-message').value;

        // AJAX POST request to FormSubmit endpoint
        fetch('https://formsubmit.co/ajax/christophersantoyo7@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
                _subject: "New Portfolio Message from " + name
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success === "true" || data.success === true) {
                // Success response
                formFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`;
                formFeedback.className = 'form-feedback success';
                contactForm.reset();
            } else {
                // Endpoint level failure
                const msg = data.message || 'Something went wrong. Please try again.';
                formFeedback.textContent = `Oops! ${msg} If this is your first submission, check your inbox (christophersantoyo7@gmail.com) for FormSubmit's activation email.`;
                formFeedback.className = 'form-feedback error';
            }
        })
        .catch(error => {
            // Connection/network error
            formFeedback.textContent = 'Oops! A connection error occurred. Please check your network or email me directly at christophersantoyo7@gmail.com.';
            formFeedback.className = 'form-feedback error';
        })
        .finally(() => {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    });

    // ==========================================================================
    // HERO CANVAS CONSTELLATION ANIMATION (Interactive Node Network)
    // ==========================================================================
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        let particles = [];
        let animationFrameId;
        let isAnimating = false;

        // Tracks Mouse over Hero Section
        const mouse = { x: null, y: null };
        const heroSection = document.getElementById('hero');

        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroCanvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });

            heroSection.addEventListener('mouseleave', () => {
                mouse.x = null;
                mouse.y = null;
            });
        }

        // Adjust Canvas Size to match Section Parent Bounds
        function resizeCanvas() {
            const rect = heroCanvas.parentElement.getBoundingClientRect();
            heroCanvas.width = rect.width;
            heroCanvas.height = rect.height;
        }

        // Particle class definition
        class Particle {
            constructor(width, height) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4; // Subtle, gentle movement
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2 + 1; // 1px - 3px dot size
            }

            update(width, height) {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off borders
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles based on screen size density
        function initParticles() {
            particles = [];
            const densityRatio = Math.min(65, Math.floor((heroCanvas.width * heroCanvas.height) / 14000));
            for (let i = 0; i < densityRatio; i++) {
                particles.push(new Particle(heroCanvas.width, heroCanvas.height));
            }
        }

        // Main Draw Loop
        function animate() {
            ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

            const isDark = document.body.classList.contains('dark-theme');
            // Theme-appropriate colors (indigo base matched to accent gradient)
            const dotColor = isDark ? 'rgba(99, 102, 241, 0.35)' : 'rgba(79, 70, 229, 0.2)';
            const jointColor = isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.06)';

            ctx.fillStyle = dotColor;
            ctx.strokeStyle = jointColor;
            ctx.lineWidth = 1;

            const len = particles.length;
            for (let i = 0; i < len; i++) {
                const p1 = particles[i];
                p1.update(heroCanvas.width, heroCanvas.height);
                p1.draw();

                // Draw links between nearby particles
                for (let j = i + 1; j < len; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 115) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Interactive: Draw links to mouse cursor if within hover range
            if (mouse.x !== null && mouse.y !== null) {
                for (let i = 0; i < len; i++) {
                    const p = particles[i];
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 160) {
                        const opacity = (1 - dist / 160) * 0.22;
                        // Use gradient accents (indigo in dark, purple in light)
                        ctx.strokeStyle = isDark ? `rgba(168, 85, 247, ${opacity})` : `rgba(124, 58, 237, ${opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        }

        function startAnimation() {
            if (!isAnimating) {
                isAnimating = true;
                animate();
            }
        }

        function stopAnimation() {
            if (isAnimating) {
                cancelAnimationFrame(animationFrameId);
                isAnimating = false;
            }
        }

        // Optimization: Intersection observer to sleep loop when section is hidden
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAnimation();
                } else {
                    stopAnimation();
                }
            });
        }, { threshold: 0.05 });
        sectionObserver.observe(heroSection);

        // Resize behavior
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });

        // Initialize state
        resizeCanvas();
        initParticles();
    }
});
