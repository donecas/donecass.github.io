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

  // Deslizar o dedo (ou arrastar o mouse) troca de vídeo
  let startX = null;
  let swiped = false;
  track.addEventListener('pointerdown', (e) => { startX = e.clientX; swiped = false; });
  track.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40 && n > 1) {
      swiped = true;
      go(dx < 0 ? 1 : -1);
    }
  });
  track.addEventListener('pointercancel', () => { startX = null; });

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
