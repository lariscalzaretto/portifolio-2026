const html = document.documentElement;
const btn = document.getElementById('themeToggle');
const icon = document.getElementById('toggleIcon');

const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);
icon.textContent = saved === 'dark' ? '☀️' : '🌙';

btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    icon.textContent = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', next);
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
        }
    });
});

const hamburger = document.getElementById('navHamburger');
const navLinks = document.getElementById('navLinks');

// Carousel
(function () {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    if (!track) return;

    const slides = track.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let current = 0;

    function getSlidesPerView() {
        if (window.innerWidth >= 900) return 3;
        if (window.innerWidth >= 600) return 2;
        return 1;
    }

    function maxIndex() {
        return Math.max(0, slides.length - getSlidesPerView());
    }

    function update() {
        const perView = getSlidesPerView();
        const pct = (100 / perView) * current;
        track.style.transform = `translateX(-${pct}%)`;

        document.querySelectorAll('.carousel-dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });

        prevBtn.disabled = current === 0;
        nextBtn.disabled = current >= maxIndex();
    }

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => {
            current = Math.min(i, maxIndex());
            update();
        });
        dotsContainer.appendChild(dot);
    });

    prevBtn.addEventListener('click', () => { if (current > 0) { current--; update(); } });
    nextBtn.addEventListener('click', () => { if (current < maxIndex()) { current++; update(); } });

    window.addEventListener('resize', () => {
        current = Math.min(current, maxIndex());
        update();
    });

    update();
})();

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

