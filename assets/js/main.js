const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

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

/* Carrossel */
document.querySelectorAll('.carousel').forEach((carousel) => {
  const track = carousel.querySelector('.carousel__track');
  const items = [...track.children];
  const prev = carousel.querySelector('.carousel__arrow--prev');
  const next = carousel.querySelector('.carousel__arrow--next');
  let active = -1;

  function scrollToItem(i, behavior = reduceMotion ? 'auto' : 'smooth') {
    const item = items[Math.max(0, Math.min(i, items.length - 1))];
    track.scrollTo({ left: item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2, behavior });
  }

  function setActive(i) {
    if (i === active) return;
    active = i;
    items.forEach((item, j) => {
      const isActive = j === i;
      const video = item.querySelector('video');
      item.classList.toggle('is-active', isActive);
      item.toggleAttribute('aria-current', isActive);
      if (!video) return;
      if (isActive) {
        video.play().catch(() => {}); // sem src ainda, ou o navegador bloqueou: fica no poster
      } else {
        video.pause();
        video.muted = true;
        video.controls = false;
      }
    });
    prev.disabled = i === 0;
    next.disabled = i === items.length - 1;
  }

  // O item ativo é o mais próximo do centro do trilho
  function updateActive() {
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    items.forEach((item, j) => {
      const dist = Math.abs(item.offsetLeft + item.offsetWidth / 2 - center);
      const bestDist = Math.abs(items[best].offsetLeft + items[best].offsetWidth / 2 - center);
      if (dist < bestDist) best = j;
    });
    setActive(best);
  }

  track.addEventListener('scroll', updateActive, { passive: true });

  prev.addEventListener('click', () => scrollToItem(active - 1));
  next.addEventListener('click', () => scrollToItem(active + 1));

  // Teclado é repetitivo: troca instantânea, sem animação
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') scrollToItem(active - 1, 'auto');
    else if (e.key === 'ArrowRight') scrollToItem(active + 1, 'auto');
    else return;
    e.preventDefault();
  });

  // Clique num vizinho traz ao centro; clique no ativo liga o som
  items.forEach((item, j) => {
    item.addEventListener('click', () => {
      if (j !== active) return scrollToItem(j);
      const video = item.querySelector('video');
      if (video && video.muted) {
        video.muted = false;
        video.controls = true;
        video.play().catch(() => {});
      }
    });
  });

  prev.hidden = next.hidden = items.length < 2;
  carousel.classList.add('is-ready');
  const start = Math.floor(items.length / 2);
  scrollToItem(start, 'auto');
  setActive(start);
});
