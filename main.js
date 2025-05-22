document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const yearSpan = document.getElementById('year');
    const hireBtn = document.querySelector('.hire-me-btn');
    const resumeBtn = document.querySelector('.resume-btn');
    
    // Prevent text selection and dragging
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
    
    // Lazy load images and videos
    const mediaElements = document.querySelectorAll('img, video');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    if (element.tagName === 'IMG') {
                        element.src = element.dataset.src || element.src;
                    } else if (element.tagName === 'VIDEO') {
                        element.querySelectorAll('source').forEach(source => {
                            source.src = source.dataset.src || source.src;
                        });
                        element.load();
                    }
                    observer.unobserve(element);
                }
            });
        }, { rootMargin: '0px 0px 100px 0px' });
        mediaElements.forEach(element => {
            if (element.tagName === 'IMG' && (!element.src || element.src.includes('data:image'))) {
                element.dataset.src = element.getAttribute('src') || element.dataset.src;
                element.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
                observer.observe(element);
            } else if (element.tagName === 'VIDEO') {
                element.querySelectorAll('source').forEach(source => {
                    source.dataset.src = source.getAttribute('src') || source.dataset.src;
                    source.removeAttribute('src');
                });
                observer.observe(element);
            }
        });
    }
    
    // Typing effect
    const typingElement = document.getElementById('typing');
    const typingTexts = ["Web Developer", "Designer", "Freelancer", "Graphic Designer", "Social Media Management", "Expert"];
    let textIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (!typingElement) return;
        
        if (charIndex < typingTexts[textIndex].length) {
            typingElement.textContent += typingTexts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 1500);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            typingElement.textContent = typingTexts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex = (textIndex + 1) % typingTexts.length;
            setTimeout(type, 500);
        }
    }
    
    if (typingElement) {
        type();
    }
    
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
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });
        
        mobileOverlay.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    document.body.style.overflow = '';
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
        if (!header) return;
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
            if (scrollY >= sectionTop - headerHeight - 50) {
                current = section.getAttribute('id');
            }
            section.classList.remove('active');
        });
        
        if (current) {
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
        }
    }, 100);
    
    window.addEventListener('scroll', scrollHandler);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement && header) {
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hire and Resume button hover effects
    [hireBtn, resumeBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('mouseenter', function() {
                const span = this.querySelector('span');
                if (span) span.style.color = '#000';
            });
            btn.addEventListener('mouseleave', function() {
                const span = this.querySelector('span');
                if (span) span.style.color = '';
            });
        }
    });
    
    // Initialize scroll
    window.dispatchEvent(new Event('scroll'));
});