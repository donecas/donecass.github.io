/* Discord: copia o usuário e avisa */
const toast = document.querySelector('.toast');
let toastTimer;

function showToast(text, ms) {
  toast.textContent = text;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), ms);
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const name = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(name);
      showToast(`Copied! Discord: ${name}`, 2000);
    } catch {
      // Sem acesso à área de transferência: mostra o nome para copiar à mão
      showToast(`Discord: ${name}`, 6000);
    }
  });
});

/* Carrossel infinito: 3 visíveis, o ativo no meio; depois do último vem o primeiro */
document.querySelectorAll('.carousel').forEach((carousel) => {
  const track = carousel.querySelector('.carousel__track');
  const items = [...track.children];
  const n = items.length;
  const prev = carousel.querySelector('.carousel__arrow--prev');
  const next = carousel.querySelector('.carousel__arrow--next');
  let active = 0;

  // Posição de cada item em relação ao ativo: -1 esquerda, 0 meio, 1 direita, ±2 escondido daquele lado
  function render() {
    items.forEach((item, j) => {
      let rel = (j - active + n) % n;
      if (rel > n / 2) rel -= n;
      const pos = Math.max(-2, Math.min(2, rel));
      const isActive = pos === 0;
      const video = item.querySelector('video');
      // Troca de lado (ex.: esquerda → direita): pula sem animar, senão cruza por trás do item do meio
      if (item.dataset.pos !== undefined && Math.abs(pos - item.dataset.pos) > 1) item.classList.add('no-anim');
      item.dataset.pos = pos;
      item.classList.toggle('is-active', isActive);
      item.toggleAttribute('aria-current', isActive);
      item.setAttribute('aria-hidden', String(Math.abs(pos) > 1));
      if (!video) return;
      if (isActive) {
        video.play().catch(() => {}); // sem src ainda, ou o navegador bloqueou: fica no poster
      } else {
        video.pause();
        video.muted = true;
        video.controls = false;
      }
    });
    track.offsetWidth; // aplica as posições sem animação antes de religar as transições
    items.forEach((item) => item.classList.remove('no-anim'));
  }

  function go(step) {
    active = (active + step + n) % n;
    render();
  }

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));

  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
    else return;
    e.preventDefault();
  });

  // Arrastar: o trilho segue o dedo 1:1; ao soltar, troca se arrastou > 40px ou se foi um "flick" rápido
  let startX = null;
  let lastX = 0;
  let lastT = 0;
  let velocity = 0; // px/ms
  let dragging = false;
  let swiped = false;

  function release(e) {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    track.classList.remove('is-dragging');
    track.style.transform = ''; // volta ao lugar com transição enquanto os itens trocam de posição
    if (dragging && n > 1 && (Math.abs(dx) > 40 || Math.abs(velocity) > 0.11)) {
      swiped = true;
      go((Math.abs(velocity) > 0.11 ? velocity : dx) < 0 ? 1 : -1);
    }
    dragging = false;
  }

  track.addEventListener('pointerdown', (e) => {
    startX = lastX = e.clientX;
    lastT = e.timeStamp;
    velocity = 0;
    swiped = false;
  });
  track.addEventListener('pointermove', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (!dragging && Math.abs(dx) > 6) {
      dragging = true; // só captura depois de mover, senão o clique num vizinho deixa de funcionar
      try { track.setPointerCapture(e.pointerId); } catch {} // ponteiro sintético/inválido: segue sem captura
      track.classList.add('is-dragging');
    }
    if (!dragging) return;
    if (e.timeStamp > lastT) velocity = (e.clientX - lastX) / (e.timeStamp - lastT);
    lastX = e.clientX;
    lastT = e.timeStamp;
    track.style.transform = `translateX(${dx}px)`;
  });
  track.addEventListener('pointerup', release);
  track.addEventListener('pointercancel', release);

  // Clique num vizinho traz ao centro; clique no ativo liga o som
  items.forEach((item, j) => {
    item.addEventListener('click', () => {
      if (swiped) return;
      if (j !== active) {
        active = j;
        return render();
      }
      const video = item.querySelector('video');
      if (video && video.muted) {
        video.muted = false;
        video.controls = true;
        video.play().catch(() => {});
      }
    });
  });

  prev.hidden = next.hidden = n < 2;
  carousel.classList.add('is-loop'); // classe nova: um main.js antigo em cache não ativa este layout
  render();
});

/* Entrada das seções: sobem e aparecem uma vez, quando entram na tela */
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('reveal-ready'); // sem JS (ou JS antigo em cache) tudo fica visível
  const io = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((e, i) => {
      e.target.style.transitionDelay = `${i * 80}ms`; // o que entra junto aparece em sequência
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.glass').forEach((el) => io.observe(el));
}

/* "Work with me": depois de rolar até o contato, o card pulsa uma vez para mostrar onde clicar */
const contact = document.getElementById('contact');
document.querySelectorAll('a[href="#contact"]').forEach((link) => {
  link.addEventListener('click', () => {
    contact.classList.remove('is-highlighted');
    contact.offsetWidth; // reinicia a animação se clicar de novo
    contact.classList.add('is-highlighted');
  });
});
contact.addEventListener('animationend', (e) => {
  if (e.animationName === 'contact-glow') contact.classList.remove('is-highlighted'); // o brilho é a mais longa das duas
});
