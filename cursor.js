const customCursor = document.getElementById('custom-cursor');
const canvas = document.getElementById('trail-canvas');
const ctx = canvas.getContext('2d');
 
const TRAIL_LIFETIME = 300;
 
let points = [];
let mouseX = 0;
let mouseY = 0;
let hasNewSample = false;
 
function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
 
// Barato: só guarda a posição e move o cursor via transform (GPU, sem layout).
// Roda a cada mousemove, mas não mexe no array de pontos nem no canvas.
let loopRunning = false;
 
const hasHover = window.matchMedia('(hover: none)').matches === false;
 
function onMouseMove(e){
    if (!hasHover) return; // em touch, não faz sentido animar o rastro
 
    mouseX = e.clientX;
    mouseY = e.clientY;
    hasNewSample = true;
    customCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
 
    // Se o loop tinha parado (mouse parado / sem rastro), acorda ele.
    if (!loopRunning) {
        loopRunning = true;
        requestAnimationFrame(drawTrail);
    }
}
document.addEventListener('mousemove', onMouseMove, { passive: true });
 
let cachedGradient = null;
let lastGradientKey = '';
 
function getGradient(first, last) {
    const key = `${(first.x / 20) | 0}-${(first.y / 20) | 0}-${(last.x / 20) | 0}-${(last.y / 20) | 0}`;
    if (key !== lastGradientKey) {
        cachedGradient = ctx.createLinearGradient(first.x, first.y, last.x, last.y);
        cachedGradient.addColorStop(0, 'rgba(214, 199, 201, 0)');
        cachedGradient.addColorStop(1, 'rgba(255, 255, 255, 0.9)');
        lastGradientKey = key;
    }
    return cachedGradient;
}
 
function drawTrail(now){
    // Só 1 ponto novo por frame, não 1 por mousemove.
    if (hasNewSample) {
        points.push({ x: mouseX, y: mouseY, time: now });
        hasNewSample = false;
    }
 
    // Remove pontos expirados do início sem recriar o array (menos GC).
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
 
        ctx.lineWidth = 55;
        ctx.globalAlpha = 0.15;
        ctx.stroke();
 
        ctx.lineWidth = 40;
        ctx.globalAlpha = 1;
        ctx.stroke();
    }
 
    // Se não sobrou nenhum ponto e não chegou amostra nova neste frame,
    // não há mais nada pra desenhar: para o loop até o próximo mousemove.
    if (points.length === 0 && !hasNewSample) {
        loopRunning = false;
        return;
    }
 
    requestAnimationFrame(drawTrail);
}
 
document.addEventListener('mouseleave', () => {
    customCursor.style.opacity = '0';
    canvas.style.opacity = '0';
});
 
document.addEventListener('mouseenter', () => {
    customCursor.style.opacity = '1';
    canvas.style.opacity = '0.07';
});