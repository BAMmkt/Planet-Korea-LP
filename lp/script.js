/* ===== TERESA PEREZ — INTERACTIONS ===== */

document.addEventListener('DOMContentLoaded', () => {
    // ===== HERO SLIDER =====
    const heroSlides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentHeroSlide = 0;
    let heroInterval;

    function showHeroSlide(index) {
        heroSlides.forEach(s => s.classList.remove('active'));
        indicators.forEach(i => i.classList.remove('active'));
        heroSlides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentHeroSlide = index;
    }

    function nextHeroSlide() {
        const next = (currentHeroSlide + 1) % heroSlides.length;
        showHeroSlide(next);
    }

    function startHeroSlider() {
        heroInterval = setInterval(nextHeroSlide, 6000);
    }

    indicators.forEach((ind, i) => {
        ind.addEventListener('click', () => {
            clearInterval(heroInterval);
            showHeroSlide(i);
            startHeroSlider();
        });
    });

    if (heroSlides.length > 0) {
        startHeroSlider();
    }

    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    const topBar = document.querySelector('.top-bar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
            if (topBar) topBar.style.transform = 'translateY(-100%)';
        } else {
            header.classList.remove('scrolled');
            if (topBar) topBar.style.transform = 'translateY(0)';
        }
    });

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===== PARCEIROS CAROUSEL =====
    const parceiroSlides = document.querySelectorAll('.parceiro-slide');
    const parceiroPrev = document.getElementById('parceiroPrev');
    const parceiroNext = document.getElementById('parceiroNext');
    const parceiroDots = document.getElementById('parceiroDots');
    let currentParceiro = 0;

    // Create dots
    if (parceiroSlides.length > 0 && parceiroDots) {
        parceiroSlides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = `parceiros-dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => showParceiro(i));
            parceiroDots.appendChild(dot);
        });
    }

    function showParceiro(index) {
        parceiroSlides.forEach(s => s.classList.remove('active'));
        parceiroSlides[index].classList.add('active');
        currentParceiro = index;

        document.querySelectorAll('.parceiros-dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
    }

    if (parceiroPrev) {
        parceiroPrev.addEventListener('click', () => {
            const prev = (currentParceiro - 1 + parceiroSlides.length) % parceiroSlides.length;
            showParceiro(prev);
        });
    }

    if (parceiroNext) {
        parceiroNext.addEventListener('click', () => {
            const next = (currentParceiro + 1) % parceiroSlides.length;
            showParceiro(next);
        });
    }

    // Auto-advance parceiros
    let parceiroInterval = setInterval(() => {
        const next = (currentParceiro + 1) % parceiroSlides.length;
        showParceiro(next);
    }, 5000);

    // Pause on hover
    const parceirosSection = document.getElementById('parceiros');
    if (parceirosSection) {
        parceirosSection.addEventListener('mouseenter', () => clearInterval(parceiroInterval));
        parceirosSection.addEventListener('mouseleave', () => {
            parceiroInterval = setInterval(() => {
                const next = (currentParceiro + 1) % parceiroSlides.length;
                showParceiro(next);
            }, 5000);
        });
    }

    // ===== SCROLL ANIMATIONS (Intersection Observer) =====
    const animatedElements = document.querySelectorAll(
        '.hero-content, .viagens-text-col, .destinos-content, .trajetoria-content, ' +
        '.parceiros-content, .newsletter-content, .footer-top, .footer-links'
    );

    animatedElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // ===== VIAGENS SLIDER =====
    const viagensSlideItems = document.querySelectorAll('.viagens-slide');
    const viagensCounter = document.getElementById('viagensCounter');
    const viagensPrevBtn = document.getElementById('viagensPrev');
    const viagensNextBtn = document.getElementById('viagensNext');
    const viagensImgMainInner = document.getElementById('viagensImgMainInner');
    const viagensImgSecInner = document.getElementById('viagensImgSecInner');
    let currentViagens = 0;
    let viagensTimer;

    function showViagenSlide(index) {
        const total = viagensSlideItems.length;
        if (total === 0) return;
        index = ((index % total) + total) % total;

        const nextSlide = viagensSlideItems[index];
        const imgMain = nextSlide.dataset.imgMain;
        const imgSec = nextSlide.dataset.imgSec;

        viagensSlideItems.forEach(s => s.classList.remove('active'));
        nextSlide.classList.add('active');

        if (viagensImgMainInner && imgMain) {
            viagensImgMainInner.classList.add('fading');
            setTimeout(() => {
                viagensImgMainInner.style.backgroundImage = `url('${imgMain}')`;
                viagensImgMainInner.classList.remove('fading');
            }, 500);
        }

        if (viagensImgSecInner && imgSec) {
            viagensImgSecInner.classList.add('fading');
            setTimeout(() => {
                viagensImgSecInner.style.backgroundImage = `url('${imgSec}')`;
                viagensImgSecInner.classList.remove('fading');
            }, 500);
        }

        if (viagensCounter) {
            const num = String(index + 1).padStart(2, '0');
            const tot = String(total).padStart(2, '0');
            viagensCounter.textContent = `${num} / ${tot}`;
        }

        currentViagens = index;
    }

    function startViagensTimer() {
        clearInterval(viagensTimer);
        viagensTimer = setInterval(() => showViagenSlide(currentViagens + 1), 6000);
    }

    if (viagensPrevBtn) {
        viagensPrevBtn.addEventListener('click', () => {
            showViagenSlide(currentViagens - 1);
            startViagensTimer();
        });
    }

    if (viagensNextBtn) {
        viagensNextBtn.addEventListener('click', () => {
            showViagenSlide(currentViagens + 1);
            startViagensTimer();
        });
    }

    if (viagensSlideItems.length > 0) {
        startViagensTimer();
    }

    // ===== DESTINOS FULLSCREEN CAROUSEL =====
    const destinosSlides = document.querySelectorAll('.destinos-carousel-slide');
    const destinosPrevBtn = document.getElementById('destinosPrev');
    const destinosNextBtn = document.getElementById('destinosNext');
    const destinosDots = document.getElementById('destinosDots');
    let currentDestino = 0;
    let destinosInterval;

    // Create dots
    if (destinosSlides.length > 0 && destinosDots) {
        destinosSlides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = `destinos-carousel-dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                showDestino(i);
                restartDestinosTimer();
            });
            destinosDots.appendChild(dot);
        });
    }

    function showDestino(index) {
        const total = destinosSlides.length;
        if (total === 0) return;
        index = ((index % total) + total) % total;

        destinosSlides.forEach(s => s.classList.remove('active'));
        destinosSlides[index].classList.add('active');
        currentDestino = index;

        document.querySelectorAll('.destinos-carousel-dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
    }

    function restartDestinosTimer() {
        clearInterval(destinosInterval);
        destinosInterval = setInterval(() => {
            showDestino(currentDestino + 1);
        }, 7500);
    }

    if (destinosPrevBtn) {
        destinosPrevBtn.addEventListener('click', () => {
            showDestino(currentDestino - 1);
            restartDestinosTimer();
        });
    }

    if (destinosNextBtn) {
        destinosNextBtn.addEventListener('click', () => {
            showDestino(currentDestino + 1);
            restartDestinosTimer();
        });
    }

    if (destinosSlides.length > 0) {
        restartDestinosTimer();
    }

    // Touch swipe for destinos carousel
    const destinosSection = document.getElementById('destinos');
    if (destinosSection) {
        let dTouchStartX = 0;
        destinosSection.addEventListener('touchstart', (e) => {
            dTouchStartX = e.touches[0].clientX;
        }, { passive: true });

        destinosSection.addEventListener('touchend', (e) => {
            const delta = dTouchStartX - e.changedTouches[0].clientX;
            if (Math.abs(delta) < 50) return;
            if (delta > 0) showDestino(currentDestino + 1);
            else showDestino(currentDestino - 1);
            restartDestinosTimer();
        }, { passive: true });
    }

    // ===== FAB ANIMATION =====
    const fab = document.getElementById('fab');
    if (fab) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const current = window.scrollY;
            if (current > lastScroll && current > 300) {
                fab.style.transform = 'translateY(100px)';
                fab.style.opacity = '0';
            } else {
                fab.style.transform = 'translateY(0)';
                fab.style.opacity = '1';
            }
            lastScroll = current;
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== PARALLAX EFFECT ON BACKGROUNDS =====
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const sections = document.querySelectorAll('.section');

        sections.forEach(section => {
            const bg = section.querySelector('[class$="-bg"]');
            if (bg) {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const offset = (rect.top / window.innerHeight) * 30;
                    bg.style.transform = `translateY(${offset}px)`;
                }
            }
        });
    });

    // ===== NEWSLETTER FORM =====
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Obrigado! Você receberá nossas novidades em breve.');
            newsletterForm.reset();
        });
    }

    // ===== FULL-PAGE SCROLL SNAPPING =====
    (function () {
        const snapTargets = [
            ...document.querySelectorAll('main > .section'),
            document.querySelector('.footer')
        ].filter(Boolean);

        if (snapTargets.length === 0) return;

        let cooldown = false;
        const COOLDOWN_MS = 950;

        function getActiveIndex() {
            let nearest = 0;
            let minDist = Infinity;
            snapTargets.forEach((el, i) => {
                const dist = Math.abs(el.getBoundingClientRect().top);
                if (dist < minDist) { minDist = dist; nearest = i; }
            });
            return nearest;
        }

        function goTo(index) {
            if (index < 0 || index >= snapTargets.length) return;
            cooldown = true;
            snapTargets[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => { cooldown = false; }, COOLDOWN_MS);
        }

        // Wheel
        window.addEventListener('wheel', function (e) {
            // Let horizontal card-slider work normally
            if (e.target.closest('.destinos-cards-wrapper')) return;
            if (cooldown) { e.preventDefault(); return; }
            e.preventDefault();
            const idx = getActiveIndex();
            if (e.deltaY > 0) goTo(idx + 1);
            else if (e.deltaY < 0) goTo(idx - 1);
        }, { passive: false });

        // Touch swipe
        let touchStartY = 0;
        window.addEventListener('touchstart', function (e) {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        window.addEventListener('touchend', function (e) {
            if (cooldown) return;
            const delta = touchStartY - e.changedTouches[0].clientY;
            if (Math.abs(delta) < 60) return; // ignore accidental taps
            const idx = getActiveIndex();
            if (delta > 0) goTo(idx + 1);
            else goTo(idx - 1);
        }, { passive: true });
    })();
});
