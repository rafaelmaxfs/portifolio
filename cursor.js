const customCursor = document.getElementById('custom-cursor');
const canvas = document.getElementById('trail-canvas');
const ctx = canvas.getContext('2d');

const TRAIL_LIFETIME = 300;
const CANVAS_OPACITY = '0.07';   
const LIMITE_CLARO = 200;        

let points = [];
let loopRunning = false;

const hasHover = window.matchMedia('(hover: none)').matches === false;

customCursor.style.opacity = '0';


function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);


let ultimoX = 0;
let ultimoY = 0;
let ultimoElemento = null;
let verificando = false;

function corDeFundo(el){
    while (el) {
        const m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
        if (m && (m.length < 4 || parseFloat(m[3]) >= 0.9)) return m.map(Number);
        el = el.parentElement;
    }
    return null;
}

function atualizarCorDoCursor(){
    verificando = false;
    const el = document.elementFromPoint(ultimoX, ultimoY);
    if (!el || el === ultimoElemento) return;
    ultimoElemento = el;

    const cor = corDeFundo(el);
    const luminosidade = cor ? 0.299 * cor[0] + 0.587 * cor[1] + 0.114 * cor[2] : 0;
    customCursor.classList.toggle('sobre-claro', luminosidade > LIMITE_CLARO);
}

function agendarVerificacao(){
    if (verificando) return;
    verificando = true;
    requestAnimationFrame(atualizarCorDoCursor);
}

window.addEventListener('scroll', () => {
    ultimoElemento = null;
    agendarVerificacao();
}, { passive: true });

document.addEventListener('change', e => {
    if (e.target.id === 'inp-cor') {
        setTimeout(() => {
            ultimoElemento = null;
            agendarVerificacao();
        }, 250);
    }
});


function onMouseMove(e){
    if (!hasHover) return;

    customCursor.style.opacity = '1';
    canvas.style.opacity = CANVAS_OPACITY;

    const x = e.clientX;
    const y = e.clientY;
    customCursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    ultimoX = x;
    ultimoY = y;
    agendarVerificacao();

    const ultimo = points[points.length - 1];
    if (!ultimo || Math.hypot(x - ultimo.x, y - ultimo.y) > 2) {
        points.push({ x, y, time: e.timeStamp });
    }

    if (!loopRunning) {
        loopRunning = true;
        requestAnimationFrame(drawTrail);
    }
}
document.addEventListener('mousemove', onMouseMove, { passive: true });


function drawTrail(now){
    let expired = 0;
    while (expired < points.length && now - points[expired].time >= TRAIL_LIFETIME) {
        expired++;
    }
    if (expired > 0) points.splice(0, expired);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (points.length > 2){
        const first = points[0];
        const last = points[points.length - 1];

        ctx.beginPath();
        ctx.moveTo(first.x, first.y);
        for (let i = 1; i < points.length - 1; i++){
            const midX = (points[i].x + points[i + 1].x) / 2;
            const midY = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }
        ctx.lineTo(last.x, last.y);

        const gradient = ctx.createLinearGradient(first.x, first.y, last.x, last.y);
        gradient.addColorStop(0, 'rgba(214, 199, 201, 0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.9)');

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = gradient;

        ctx.lineWidth = 55;
        ctx.globalAlpha = 0.15;
        ctx.stroke();

        ctx.lineWidth = 40;
        ctx.globalAlpha = 1;
        ctx.stroke();
    }

    if (points.length === 0) {
        loopRunning = false;
        return;
    }

    requestAnimationFrame(drawTrail);
}


document.documentElement.addEventListener('mouseleave', () => {
    customCursor.style.opacity = '0';
    canvas.style.opacity = '0';
});