
    (function() {
        // ── PRELOADER ──────────────────────
        const preloader = document.getElementById('preloader');
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 600);
        });

        // ── HEADER SCROLL EFFECT ──────────
        const header = document.getElementById('header');
        let lastScrollY = 0;
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScrollY = scrollY;

            // Back to top button
            const backBtn = document.getElementById('backToTop');
            if (scrollY > 500) {
                backBtn.classList.add('visible');
            } else {
                backBtn.classList.remove('visible');
            }

            // Active nav link
            updateActiveNavLink();
        });

        // ── MOBILE MENU TOGGLE ────────────
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // ── ACTIVE NAV LINK ───────────────
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const navAs = navLinks.querySelectorAll('a');
            let currentId = '';
            sections.forEach(sec => {
                const rect = sec.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    currentId = sec.id;
                }
            });
            navAs.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === '#' + currentId) {
                    a.classList.add('active');
                }
            });
        }

        // ── HERO PARTICLES ────────────────
        const particlesContainer = document.getElementById('heroParticles');
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 7 + 5) + 's';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.width = (Math.random() * 5 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.5;
            particlesContainer.appendChild(particle);
        }

        // ── COUNTER ANIMATION ─────────────
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const startTime = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3); // ease-out
                    const current = Math.floor(eased * target);
                    counter.textContent = current.toLocaleString('en-IN') + '+';
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target.toLocaleString('en-IN') + '+';
                    }
                }
                requestAnimationFrame(update);
            });
        }

        // ── INTERSECTION OBSERVER ─────────
        const observerOptions = { threshold: 0.25, rootMargin: '0px 0px -50px 0px' };
        let countersAnimated = false;
        const aboutSection = document.getElementById('about');
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                    aboutObserver.unobserve(aboutSection);
                }
            });
        }, observerOptions);
        if (aboutSection) aboutObserver.observe(aboutSection);

        // ── MENU FILTER ───────────────────
        const filterBtns = document.querySelectorAll('.filter-btn');
        const menuCards = document.querySelectorAll('.menu-card-enhanced');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                menuCards.forEach(card => {
                    const cat = card.getAttribute('data-category');
                    if (filter === 'all' || cat === filter) {
                        card.style.display = '';
                        card.style.animation = 'fadeInUp 0.4s ease-out both';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // ── GALLERY LIGHTBOX ──────────────
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxClose = document.getElementById('lightboxClose');
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src');
                lightboxImg.src = src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        lightboxClose.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            lightboxImg.src = '';
        }

        // ── TESTIMONIALS AUTO-SCROLL ──────
        const track = document.getElementById('testimonialsTrack');
        let scrollInterval;
        function startAutoScroll() {
            scrollInterval = setInterval(() => {
                if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                    track.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    track.scrollBy({ left: 340, behavior: 'smooth' });
                }
            }, 3500);
        }
        startAutoScroll();
        track.addEventListener('mouseenter', () => clearInterval(scrollInterval));
        track.addEventListener('mouseleave', startAutoScroll);
        // Touch devices pause
        track.addEventListener('touchstart', () => clearInterval(scrollInterval), { passive: true });
        track.addEventListener('touchend', () => {
            clearInterval(scrollInterval);
            startAutoScroll();
        });

        // ── BACK TO TOP ───────────────────
        const backToTopBtn = document.getElementById('backToTop');
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // ── FORM SUBMISSION ───────────────
        const bookingForm = document.getElementById('bookingForm');
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simple feedback
            const submitBtn = bookingForm.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✅ அனுப்பப்பட்டது!';
            submitBtn.style.background = '#4caf50';
            submitBtn.style.color = '#fff';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                bookingForm.reset();
            }, 2500);
            alert(
                '🙏 நன்றி! உங்கள் முன்பதிவு விசாரணை பெறப்பட்டது. விரைவில் நாங்கள் தொடர்பு கொள்கிறோம்.\n\n📞 அவசர தேவைக்கு: +91 98765 43210');
        });

        // ── SMOOTH SCROLL FOR ALL ANCHOR LINKS ──
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY -
                        headerHeight - 10;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            });
        });

        console.log('✅ ஸ்ரீ அழகர் கேட்டரிங் & சர்வீஸ் — முழுமையாக ஏற்றப்பட்டது!');
        console.log('👨‍🍳 C. அழகர் சந்தர் | 📞 +91 9894271043');
    })();
