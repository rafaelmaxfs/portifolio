function easeInOutCubic(t) {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(y, ms){
    const inicio = window.scrollY, diff = y - inicio, t0 = performance.now();
    requestAnimationFrame(function passo(t){
        const p = Math.min((t - t0) / ms, 1);
        const eased = easeInOutCubic(p);
        window.scrollTo(0, inicio + diff * eased);
        if (p < 1) requestAnimationFrame(passo);
    });
}

document.querySelectorAll('#head-maior a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(link.getAttribute('href').substring(1));
        const offset = parseInt(link.dataset.offset) || 10;
        smoothScrollTo(target.getBoundingClientRect().top + window.scrollY - offset, 500);
    });
});