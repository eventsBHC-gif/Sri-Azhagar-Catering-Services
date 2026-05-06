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
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                header.classList.toggle('scrolled', scrollY > 60);

                // Back to top button
                const backBtn = document.getElementById('backToTop');
                backBtn.classList.toggle('visible', scrollY > 500);

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

            // ── BACK TO TOP ───────────────────
            const backToTopBtn = document.getElementById('backToTop');
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // ── FORM SUBMISSION → WHATSAPP ────
            const bookingForm = document.getElementById('bookingForm');
            const WHATSAPP_NUMBER = '919894271043';

            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Collect form data
                const name = document.getElementById('formName').value.trim();
                const phone = document.getElementById('formPhone').value.trim();
                const eventType = document.getElementById('formEventType').value;
                const serviceType = document.getElementById('formServiceType').value;
                const guests = document.getElementById('formGuests').value.trim();
                const date = document.getElementById('formDate').value;
                const message = document.getElementById('formMessage').value.trim();

                // Build WhatsApp message
                let whatsappText = '🟠 *ஸ்ரீ அழகர் கேட்டரிங் - முன்பதிவு விசாரணை* 🟠\n\n';
                whatsappText += '👤 *பெயர்:* ' + name + '\n';
                whatsappText += '📞 *தொலைபேசி:* ' + phone + '\n';
                whatsappText += '🎉 *நிகழ்வு:* ' + eventType + '\n';
                whatsappText += '🛠 *சேவை வகை:* ' + serviceType + '\n';
                whatsappText += '👥 *நபர்கள்:* ' + guests + '\n';
                whatsappText += '📅 *தேதி:* ' + date + '\n';
                if (message) {
                    whatsappText += '📝 *குறிப்பு:* ' + message + '\n';
                }
                whatsappText += '\n🙏 தயவுசெய்து தொடர்பு கொள்ளுங்கள்.';

                // Open WhatsApp
                const whatsappURL = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(
                whatsappText);
                window.open(whatsappURL, '_blank');

                // Show brief feedback and reset
                const submitBtn = bookingForm.querySelector('.form-submit');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = '✅ வாட்ஸ்அப் திறக்கப்பட்டது!';
                submitBtn.style.background = '#25d366';
                submitBtn.style.color = '#fff';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }, 2000);
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
