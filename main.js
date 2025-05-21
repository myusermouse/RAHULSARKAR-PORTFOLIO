document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const body = document.getElementById('body');
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const yearSpan = document.getElementById('year');
    const hireBtn = document.querySelector('.hire-me-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Set current year
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Mobile Menu Toggle
    if (menuToggle && mainNav && mobileOverlay) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
            body.style.overflow = isExpanded ? 'hidden' : '';
        });
        
        mobileOverlay.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            body.style.overflow = '';
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        });
    }
    
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, arguments), wait);
        };
    }
    
    // Header shadow and active section
    const scrollHandler = debounce(function() {
        const scrollY = window.scrollY;
        const headerHeight = header.offsetHeight;
        
        // Header shadow
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active section and nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
            section.classList.remove('active');
        });
        
        const activeSection = document.getElementById(current);
        if (activeSection) {
            activeSection.classList.add('active');
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100);
    
    window.addEventListener('scroll', scrollHandler);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hire button hover effect
    if (hireBtn) {
        hireBtn.addEventListener('mouseenter', function() {
            this.querySelector('span').style.color = '#fff';
        });
        hireBtn.addEventListener('mouseleave', function() {
            this.querySelector('span').style.color = '';
        });
    }
    
    // Project card hover effect
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-overlay').style.opacity = '0.8';
        });
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-overlay').style.opacity = '0';
        });
    });
    
    // Initialize scroll
    window.dispatchEvent(new Event('scroll'));
});