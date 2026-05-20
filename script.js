document.addEventListener('DOMContentLoaded', () => {
    // ===== Mobile Menu Toggle =====
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    
    navToggle?.addEventListener('click', () => {
        navMenu?.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    navClose?.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        document.body.style.overflow = '';
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // ===== Scroll Animations (Intersection Observer) =====
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // ===== Active Nav Link on Scroll =====
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav__link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href')?.slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ===== Auto Year in Footer =====
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== Project Card Hover Effect =====
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
        });
    });

    // ===== Dark/Light Mode Toggle =====
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeIcon) themeIcon.textContent = '☀️';
    }

    themeToggle?.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            if (themeIcon) themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            if (themeIcon) themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light'); 
        }
    });

    // ===== Lightbox for Gallery =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const bentoItems = document.querySelectorAll('.bento-item');

    bentoItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.bento-img');
            const caption = item.querySelector('.bento-overlay span');
            
            if (img && lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                if (caption) {
                    const captionText = document.getElementById('lightbox-caption');
                    if (captionText) captionText.textContent = caption.textContent;
                }
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeLightbox = () => {
        lightbox?.classList.remove('show');
        document.body.style.overflow = '';
    };

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

    // ==========================================
    // 🔥 FITUR BARU (UI/UX UPGRADES)
    // ==========================================

    // 1. Loading Screen
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('fade-out');
                document.body.style.overflow = '';
                setTimeout(() => loader.remove(), 600);
            }, 800);
        }
    });

    // 2. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) progressBar.style.width = scrolled + "%";
    });

    // 3. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTopBtn?.classList.toggle('visible', window.scrollY > 300);
    });
    backToTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // 4. Staggered Animations (Otomatis ke Cards & Grid)
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    // Terapkan class stagger-item secara otomatis tanpa ubah HTML
    document.querySelectorAll('.skill-card, .project-card, .bento-item').forEach((el, i) => {
        el.classList.add('stagger-item');
        el.style.transitionDelay = `${(i % 4) * 0.1}s`;
        staggerObserver.observe(el);
    });
});