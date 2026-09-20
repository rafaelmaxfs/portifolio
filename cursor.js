const customCursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
    points.push({ x: e.clientX, y: e.clientY, time: Date.now() });
});

const canvas = document.getElementById('trail-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const TRAIL_LIFETIME = 300;
let points = [];

let cachedGradient = null;
let lastGradientKey = '';

function getGradient(first, last) {
    // só recria se a posição mudou MUITO (evita recriar todo frame)
    const key = `${Math.round(first.x/20)}-${Math.round(first.y/20)}-${Math.round(last.x/20)}-${Math.round(last.y/20)}`;
    if (key !== lastGradientKey) {
        cachedGradient = ctx.createLinearGradient(first.x, first.y, last.x, last.y);
        cachedGradient.addColorStop(0, 'rgba(214, 199, 201, 0)');
        cachedGradient.addColorStop(1, 'rgba(255, 255, 255, 0.9)');
        lastGradientKey = key;
    }
    return cachedGradient;
}

function drawTrail(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = Date.now();
    points = points.filter(p => now - p.time < TRAIL_LIFETIME);

    if (points.length > 2){
        const first = points[0];
        const last = points[points.length - 1];

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++){
            const midX = (points[i].x + points[i + 1].x) / 2;
            const midY = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }

        const gradient = getGradient(first, last);

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 40;

        ctx.lineWidth = 55;
        ctx.globalAlpha = 0.15;
        ctx.stroke();

        ctx.lineWidth = 40;
        ctx.globalAlpha = 1;
        ctx.stroke();
    }

    requestAnimationFrame(drawTrail);
}

if (!window.matchMedia('(hover: none)').matches) {
    drawTrail();
}

document.addEventListener('mouseleave', () => {
    customCursor.style.opacity = '0';
    canvas.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    customCursor.style.opacity = '1';
    canvas.style.opacity = '0.07';
});