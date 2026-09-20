const contato = document.getElementById('div-contato');
const gatilho = document.getElementById('head-menor');

function alternarContato(abrir = !contato.classList.contains('aberto')) {
    contato.classList.toggle('aberto', abrir);
    gatilho.setAttribute('aria-expanded', abrir);
}

gatilho.addEventListener('click', () => alternarContato());

gatilho.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        alternarContato();
    }
});

document.addEventListener('click', e => {
    if (!contato.contains(e.target)) alternarContato(false);
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') alternarContato(false);
});