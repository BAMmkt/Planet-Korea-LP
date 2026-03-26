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

    // Defensive reset in case a previous state left page scroll locked.
    document.body.style.overflow = '';
    if (hamburger) hamburger.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');

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

    // Fix slider height: measure all slides so switching never causes layout shift
    function setParceirosSliderHeight() {
        const slider = document.getElementById('parceirosSlider');
        if (!slider || parceiroSlides.length === 0) return;
        parceiroSlides.forEach(slide => {
            slide.style.position = 'relative';
            slide.style.visibility = 'hidden';
            slide.style.opacity = '0';
        });
        let maxH = 0;
        parceiroSlides.forEach(slide => {
            if (slide.offsetHeight > maxH) maxH = slide.offsetHeight;
        });
        parceiroSlides.forEach(slide => {
            slide.style.position = '';
            slide.style.visibility = '';
            slide.style.opacity = '';
        });
        if (maxH > 0) slider.style.minHeight = maxH + 'px';
    }
    setParceirosSliderHeight();
    window.addEventListener('resize', setParceirosSliderHeight);

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
    const viagensSection = document.getElementById('viagens');
    const viagensImgMainInner = document.getElementById('viagensImgMainInner');
    const viagensImgSecInner = document.getElementById('viagensImgSecInner');
    let currentViagens = 0;
    let viagensTimer;

    function showViagenSlide(index, instant = false) {
        const total = viagensSlideItems.length;
        if (total === 0) return;
        index = ((index % total) + total) % total;

        const nextSlide = viagensSlideItems[index];
        const bgImage = nextSlide.dataset.bg;
        const overlayTint = nextSlide.dataset.overlay;
        const imgMain = nextSlide.dataset.imgMain;
        const imgSec = nextSlide.dataset.imgSec;

        viagensSlideItems.forEach(s => s.classList.remove('active'));
        nextSlide.classList.add('active');

        if (viagensSection && bgImage) {
            viagensSection.style.setProperty('--viagens-bg-image', `url('${bgImage}')`);
        }

        if (viagensSection && overlayTint) {
            viagensSection.style.setProperty('--viagens-overlay-tint', overlayTint);
        }

        if (viagensImgMainInner && imgMain) {
            viagensImgMainInner.classList.remove('fading');
            viagensImgMainInner.style.backgroundImage = `url('${imgMain}')`;
        }

        if (viagensImgSecInner && imgSec) {
            viagensImgSecInner.classList.remove('fading');
            viagensImgSecInner.style.backgroundImage = `url('${imgSec}')`;
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
        showViagenSlide(currentViagens, true);
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
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        });
    });

    // ===== PAUSE CAROUSELS WHEN NOT VISIBLE =====
    const destinosCarouselSection = document.getElementById('destinos');
    if (destinosCarouselSection && destinosSlides.length > 0) {
        const destinosVisibilityObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    restartDestinosTimer();
                } else {
                    clearInterval(destinosInterval);
                }
            });
        }, { threshold: 0.1 });
        destinosVisibilityObserver.observe(destinosCarouselSection);
    }

    const viagensCarouselSection = document.getElementById('viagens');
    if (viagensCarouselSection && viagensSlideItems.length > 0) {
        const viagensVisibilityObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startViagensTimer();
                } else {
                    clearInterval(viagensTimer);
                }
            });
        }, { threshold: 0.1 });
        viagensVisibilityObserver.observe(viagensCarouselSection);
    }

    // ===== PARALLAX EFFECT ON BACKGROUNDS =====
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section');

        sections.forEach(section => {
            // Skip destinos carousel — its bg elements have Ken Burns scale()
            // that conflicts with translateY causing flicker
            if (section.id === 'destinos') return;

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

    // Full-page section snap removed: page now scrolls naturally.
});
