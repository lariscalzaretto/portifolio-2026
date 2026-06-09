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

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

