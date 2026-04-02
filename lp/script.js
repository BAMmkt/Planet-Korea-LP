// ===== HERO VIDEO — YouTube clip loop (4:20–5:20) =====
(function () {
    const HERO_VIDEO_ID = 'AA-sv3ilNBE';
    const HERO_START = 260; // 4:20
    const HERO_END   = 320; // 5:20
    let heroPlayer;

    window.onYouTubeIframeAPIReady = function () {
        heroPlayer = new YT.Player('heroVideo', {
            width: '100%',
            height: '100%',
            videoId: HERO_VIDEO_ID,
            playerVars: {
                autoplay: 1,
                mute: 1,
                controls: 0,
                showinfo: 0,
                modestbranding: 1,
                rel: 0,
                disablekb: 1,
                iv_load_policy: 3,
                playsinline: 1,
                start: HERO_START,
            },
            events: {
                onReady: function (e) {
                    e.target.mute();
                    e.target.playVideo();
                    setInterval(function () {
                        if (!heroPlayer || typeof heroPlayer.getCurrentTime !== 'function') return;
                        if (heroPlayer.getCurrentTime() >= HERO_END) {
                            heroPlayer.seekTo(HERO_START, true);
                        }
                    }, 500);
                },
                onStateChange: function (e) {
                    if (e.data === YT.PlayerState.ENDED) {
                        heroPlayer.seekTo(HERO_START, true);
                        heroPlayer.playVideo();
                    }
                }
            }
        });
    };

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
}());

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

    // ===== FOOTER TOUR LINKS → GOTO SLIDE =====
    document.querySelectorAll('[data-goto-slide]').forEach(link => {
        link.addEventListener('click', e => {
            const index = parseInt(link.getAttribute('data-goto-slide'), 10);
            // Wait for scroll to reach #destinos, then switch slide
            setTimeout(() => showViagenSlide(index), 400);
        });
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
    const viagensSection = document.getElementById('destinos');
    let currentViagens = 0;
    let viagensTimer;

    // ===== TOURS DATA — fonte central de dados =====
    // Para atualizar conteúdo ou imagens, edite apenas este array.
    const toursData = [
        // 0 — TERRA
        {
            elementKey:      'terra',
            elementLabel:    'TERRA',
            elementTitle:    'Raízes e Tradição',
            tourTitle:       'Palácio Gyeongbokgung',
            tourLocation:    'Seul',
            description:     'O maior e mais majestoso dos cinco grandes palácios da dinastia Joseon. Explore mais de 600 anos de história e arquitetura real coreana.',
            trigramVideo:    'img/gwae/trigramas/terra.webm',
            backgroundImage: 'img/gwae/backgrounds/terra.webp',
            overlayTint:     'rgba(0, 0, 0, 0.08)',
            galleryKey:      'PalacioGyeongbokgung',
            ctaHref:         '#newsletter',
            ctaLabel:        'AGENDE SUA VIAGEM',
        },
        // 1 — ÁGUA
        {
            elementKey:      'agua',
            elementLabel:    'ÁGUA',
            elementTitle:    'Fluxo e Serenidade',
            tourTitle:       'Ilha de Jeju',
            tourLocation:    'Jeju',
            description:     'Patrimônio Natural da UNESCO. Vulcões, praias, cachoeiras e uma cultura única. A ilha paradisíaca da Coreia do Sul que encanta todos os sentidos.',
            trigramVideo:    'img/gwae/trigramas/agua.webm',
            backgroundImage: 'img/gwae/backgrounds/agua.webp',
            overlayTint:     'rgba(0, 0, 0, 0.08)',
            galleryKey:      'IlhaDeJeju',
            ctaHref:         '#newsletter',
            ctaLabel:        'AGENDE SUA VIAGEM',
        },
        // 2 — FOGO
        {
            elementKey:      'fogo',
            elementLabel:    'FOGO',
            elementTitle:    'Energia e Intensidade',
            tourTitle:       'Myeongdong',
            tourLocation:    'Seul',
            description:     'O distrito de compras mais vibrante de Seul. K-beauty, street food irresistível e uma energia contagiante a cada esquina.',
            trigramVideo:    'img/gwae/trigramas/fogo.webm',
            backgroundImage: 'img/gwae/backgrounds/fogo.webp',
            overlayTint:     'rgba(0, 0, 0, 0.08)',
            galleryKey:      'Myeongdong',
            ctaHref:         '#newsletter',
            ctaLabel:        'AGENDE SUA VIAGEM',
        },
        // 3 — CÉU
        {
            elementKey:      'ceu',
            elementLabel:    'CÉU',
            elementTitle:    'Altitude e Contemplação',
            tourTitle:       'Namsan Seoul Tower',
            tourLocation:    'Seul',
            description:     'Suba ao topo da icônica torre de Seul e contemple uma vista panorâmica de 360° da capital sul-coreana. Um ponto imperdível ao pôr do sol.',
            trigramVideo:    'img/gwae/trigramas/ceu.webm',
            backgroundImage: 'img/gwae/backgrounds/ceu.webp',
            overlayTint:     'rgba(0, 0, 0, 0.08)',
            galleryKey:      'NamsanSeoulTower',
            ctaHref:         '#newsletter',
            ctaLabel:        'AGENDE SUA VIAGEM',
        },
        // 4 — TERRA
        {
            elementKey:      'terra',
            elementLabel:    'TERRA',
            elementTitle:    'Raízes e Tradição',
            tourTitle:       'Bukchon Hanok Village',
            tourLocation:    'Seul',
            description:     'Caminhe pelas ruelas centenárias repletas de casas tradicionais coreanas. Um recanto de tranquilidade entre os palácios e a modernidade de Seul.',
            trigramVideo:    'img/gwae/trigramas/terra.webm',
            backgroundImage: 'img/gwae/backgrounds/terra.webp',
            overlayTint:     'rgba(0, 0, 0, 0.08)',
            galleryKey:      'BukchonHanokVillage',
            ctaHref:         '#newsletter',
            ctaLabel:        'AGENDE SUA VIAGEM',
        },
        // 5 — ÁGUA
        {
            elementKey:      'agua',
            elementLabel:    'ÁGUA',
            elementTitle:    'Fluxo e Serenidade',
            tourTitle:       'Parque Nacional de Seoraksan',
            tourLocation:    'Sokcho',
            description:     'Trilhas deslumbrantes entre picos rochosos, templos budistas e paisagens que mudam a cada estação. A natureza coreana em seu estado mais puro.',
            trigramVideo:    'img/gwae/trigramas/agua.webm',
            backgroundImage: 'img/gwae/backgrounds/agua.webp',
            overlayTint:     'rgba(0, 0, 0, 0.08)',
            galleryKey:      'ParqueNacionalDeSeoraksan',
            ctaHref:         '#newsletter',
            ctaLabel:        'AGENDE SUA VIAGEM',
        },
        // 6 — FOGO
        {
            elementKey:      'fogo',
            elementLabel:    'FOGO',
            elementTitle:    'Energia e Intensidade',
            tourTitle:       'Insadong',
            tourLocation:    'Seul',
            description:     'O coração cultural de Seul. Galerias de arte, casas de chá tradicionais, artesanato e uma atmosfera que mistura o antigo e o moderno.',
            trigramVideo:    'img/gwae/trigramas/fogo.webm',
            backgroundImage: 'img/gwae/backgrounds/fogo.webp',
            overlayTint:     'rgba(0, 0, 0, 0.08)',
            galleryKey:      'Insadong',
            ctaHref:         '#newsletter',
            ctaLabel:        'AGENDE SUA VIAGEM',
        },
        // 7 — CÉU
        {
            elementKey:      'ceu',
            elementLabel:    'CÉU',
            elementTitle:    'Altitude e Contemplação',
            tourTitle:       'Dongdaemun Design Plaza',
            tourLocation:    'Seul',
            description:     'Um marco da arquitetura futurista projetado por Zaha Hadid. Design, moda, tecnologia e cultura convergem neste espaço icônico de Seul.',
            trigramVideo:    'img/gwae/trigramas/ceu.webm',
            backgroundImage: 'img/gwae/backgrounds/ceu.webp',
            overlayTint:     'rgba(0, 0, 0, 0.08)',
            galleryKey:      'DongdaemunDesignPlaza',
            ctaHref:         '#newsletter',
            ctaLabel:        'AGENDE SUA VIAGEM',
        },
    ];

    const tourCarouselSlidesEl = document.getElementById('tourCarouselSlides');
    const tourCarouselDotsEl   = document.getElementById('tourCarouselDots');
    let tourCarouselIndex      = 0;
    let tourCarouselTimer;
    let tourCarouselImages     = [];

    // Cache de imagens descobertas por galleryKey para não repetir requests
    const galleryCache = {};

    // Descobre dinamicamente quantas imagens existem para um tour
    // Tenta Key1.webp, Key2.webp, ... até receber 404
    async function discoverGalleryImages(key) {
        if (galleryCache[key]) return galleryCache[key];
        const images = [];
        let i = 1;
        while (true) {
            const url = `img/tours/${key}${i}.webp`;
            try {
                const res = await fetch(url, { method: 'HEAD' });
                if (res.ok) {
                    images.push(url);
                    i++;
                } else {
                    break;
                }
            } catch {
                break;
            }
        }
        galleryCache[key] = images;
        return images;
    }

    function showTourCarouselSlide(i) {
        if (!tourCarouselSlidesEl) return;
        tourCarouselIndex = ((i % tourCarouselImages.length) + tourCarouselImages.length) % tourCarouselImages.length;
        tourCarouselSlidesEl.querySelectorAll('.tour-carousel-slide').forEach((s, idx) =>
            s.classList.toggle('active', idx === tourCarouselIndex));
        tourCarouselDotsEl?.querySelectorAll('.tour-carousel-dot').forEach((d, idx) =>
            d.classList.toggle('active', idx === tourCarouselIndex));
    }

    function startTourCarouselTimer() {
        clearInterval(tourCarouselTimer);
        tourCarouselTimer = setInterval(() => showTourCarouselSlide(tourCarouselIndex + 1), 3500);
    }

    function buildCarouselUI(images) {
        tourCarouselImages = images;
        tourCarouselIndex  = 0;

        // Build image slides
        tourCarouselSlidesEl.innerHTML = '';
        tourCarouselImages.forEach((src, i) => {
            const slide = document.createElement('div');
            slide.className = 'tour-carousel-slide' + (i === 0 ? ' active' : '');
            slide.style.backgroundImage = `url('${src}')`;
            tourCarouselSlidesEl.appendChild(slide);
        });

        // Build dots
        if (tourCarouselDotsEl) {
            tourCarouselDotsEl.innerHTML = '';
            tourCarouselImages.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'tour-carousel-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Imagem ${i + 1}`);
                dot.addEventListener('click', () => {
                    showTourCarouselSlide(i);
                    startTourCarouselTimer();
                });
                tourCarouselDotsEl.appendChild(dot);
            });
        }

        startTourCarouselTimer();
    }

    async function loadTourCarousel(tourIndex) {
        if (!tourCarouselSlidesEl) return;
        clearInterval(tourCarouselTimer);
        const data = toursData[tourIndex];
        if (!data || !data.galleryKey) return;

        const images = await discoverGalleryImages(data.galleryKey);
        buildCarouselUI(images);
    }

    // Prev/next buttons for the internal tour carousel
    const tourCarouselPrevBtn = document.getElementById('tourCarouselPrev');
    const tourCarouselNextBtn = document.getElementById('tourCarouselNext');
    if (tourCarouselPrevBtn) {
        tourCarouselPrevBtn.addEventListener('click', () => {
            showTourCarouselSlide(tourCarouselIndex - 1);
            startTourCarouselTimer();
        });
    }
    if (tourCarouselNextBtn) {
        tourCarouselNextBtn.addEventListener('click', () => {
            showTourCarouselSlide(tourCarouselIndex + 1);
            startTourCarouselTimer();
        });
    }

    function showViagenSlide(index, instant = false) {
        const total = viagensSlideItems.length;
        if (total === 0) return;
        index = ((index % total) + total) % total;

        const nextSlide = viagensSlideItems[index];
        const data = toursData[index];

        // Sync video src and text content from toursData (single source of truth)
        if (data) {
            const vid = nextSlide.querySelector('.trigram-video');
            const src = nextSlide.querySelector('.trigram-video source');
            if (vid && src && src.getAttribute('src') !== data.trigramVideo) {
                src.setAttribute('src', data.trigramVideo);
                vid.load();
            }

            // Update text content
            const heading = nextSlide.querySelector('.viagens-heading');
            if (heading) {
                const eParts = data.elementTitle.split(' e ');
                const titleLine1 = eParts[0] + ' e';
                const titleLine2 = eParts.slice(1).join(' e ');
                heading.innerHTML = `<span class="viagens-element-label">${data.elementLabel}:</span> ${titleLine1}<br><span class="gold-gradient">${titleLine2}</span>`;
            }
            const tourName = nextSlide.querySelector('.viagens-tour-name');
            if (tourName) tourName.textContent = `${data.tourTitle} · ${data.tourLocation}`;
            const desc = nextSlide.querySelector('.viagens-desc');
            if (desc) desc.textContent = data.description;
            const cta = nextSlide.querySelector('.viagens-cta');
            if (cta) {
                cta.href = data.ctaHref;
                cta.innerHTML = `${data.ctaLabel} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
            }
        }

        viagensSlideItems.forEach(s => s.classList.remove('active'));
        nextSlide.classList.add('active');
        resetInactiveTrigramVideos(nextSlide);
        playActiveTrigramVideo(nextSlide);

        if (viagensSection && data) {
            viagensSection.style.setProperty('--viagens-bg-image', `url('${data.backgroundImage}')`);
            viagensSection.style.setProperty('--viagens-overlay-tint', data.overlayTint);
        }

        loadTourCarousel(index);

        if (viagensCounter) {
            const num = String(index + 1).padStart(2, '0');
            const tot = String(total).padStart(2, '0');
            viagensCounter.textContent = `${num} / ${tot}`;
        }

        currentViagens = index;
    }

    function startViagensTimer() {
        clearInterval(viagensTimer);
        viagensTimer = setInterval(() => showViagenSlide(currentViagens + 1), 13500);
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

    // ===== TRIGRAM VIDEO UTILITIES =====

    function setupTrigramVideo(video, index) {
        video.muted        = true;
        video.defaultMuted = true;
        video.playsInline  = true;
        video.loop         = true;
        video.autoplay     = true;
        video.preload      = 'auto';

        // Silent decode failure: video loads but renders no frames (codec issue)
        video.addEventListener('loadedmetadata', () => {
            if (video.videoWidth === 0 || video.videoHeight === 0) {
                console.warn(`[trigram ${index}] aviso: loadedmetadata com dimensões 0×0 — possível problema de codec em: ${video.currentSrc}`);
            }
        }, { once: true });

        // Only log real errors
        video.addEventListener('error', () => {
            const src = video.currentSrc || video.querySelector('source')?.getAttribute('src') || '?';
            console.error(`[trigram ${index}] erro — src: "${src}" | code: ${video.error?.code} | msg: ${video.error?.message}`);
        });

        video.load();
    }

    function playActiveTrigramVideo(slide) {
        const video = slide.querySelector('.trigram-video');
        if (!video) return;

        // Numeric constants: 0=NETWORK_EMPTY, 3=NETWORK_NO_SOURCE
        if (video.networkState === 0 || video.networkState === 3) {
            video.load();
        }

        const doPlay = () => {
            video.play().catch(err => {
                // AbortError is normal when load() interrupts a pending play — ignore
                if (err.name !== 'AbortError') {
                    console.warn('[trigram] play() bloqueado:', err.name, err.message);
                }
            });
        };

        if (video.readyState >= 2) {
            doPlay();
        } else {
            // Guard against missed canplay: poll readyState as fallback
            let fired = false;
            const onReady = () => { if (!fired) { fired = true; doPlay(); } };
            video.addEventListener('canplay', onReady, { once: true });
            // Fallback: if canplay already fired and readyState is now ready, play directly
            setTimeout(() => {
                if (!fired && video.readyState >= 2) { fired = true; doPlay(); }
            }, 200);
        }
    }

    function resetInactiveTrigramVideos(activeSlide) {
        document.querySelectorAll('.viagens-slide').forEach(slide => {
            if (slide === activeSlide) return;
            const video = slide.querySelector('.trigram-video');
            if (!video) return;
            video.pause();
            video.currentTime = 0;
        });
    }

    // Setup all trigram videos at init — MUST run before showViagenSlide
    document.querySelectorAll('.trigram-video').forEach((v, i) => setupTrigramVideo(v, i));

    // Preload: descobre e carrega todas as imagens dos tours em background
    (async function preloadAllTourImages() {
        for (const tour of toursData) {
            if (!tour.galleryKey) continue;
            const imgs = await discoverGalleryImages(tour.galleryKey);
            imgs.forEach(src => { new Image().src = src; });
        }
    })();

    if (viagensSlideItems.length > 0) {
        showViagenSlide(currentViagens, true);
        startViagensTimer();
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
    const viagensCarouselSection = document.getElementById('destinos');
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
