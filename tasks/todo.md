# Tarefas: Portfólio Donecas

Verificação local de todas: `python -m http.server 8000` → http://localhost:8000, DevTools no modo responsivo.

- [x] **1. Base e limpeza**
  - Acceptance: `frontend/` e `bakend/` apagadas; `index.html` na raiz com `lang="en"`, título "Donecas — Video Editor", fontes Poppins + Montserrat 700, as 6 seções vazias com `id` (`work`, `about`, `contact`); fundo `#C9D1DB` e coluna central com largura máxima; `main.js` carregado com `defer`.
  - Verify: página abre sem erro no console; sem rolagem horizontal em 320 px.
  - Files: `index.html`, `assets/css/style.css`, `assets/js/main.js`, (apaga) `frontend/`, `bakend/`

- [x] **2. Nav, header e rodapé de contato**
  - Acceptance: nav em pílula fixa no topo (Contact, Work, About → âncoras); header com o logo "Donecas" em Montserrat Bold + 3 ícones SVG inline; rodapé "Wanna try? Contact me" com os mesmos 3 ícones; X abre `https://x.com/Donecass` em nova aba (`rel="noopener"`); e-mail é `mailto:certifieddonecas@gmail.com`; todo ícone tem `aria-label`; cards no estilo glass do mockup.
  - Verify: clicar em cada link; checkpoint visual em 320 e 1440 px.
  - Files: `index.html`, `assets/css/style.css`

- [x] **3. Botão do Discord copia o usuário**
  - Acceptance: os 2 botões do Discord copiam `donecass` e mostram "Copied!" por ~2 s (anunciado via `aria-live`); se a cópia falhar, mostram o nome para copiar à mão.
  - Verify: clicar e colar em outro lugar; testar o caminho de erro forçando falha no console.
  - Files: `assets/js/main.js`, `index.html`, `assets/css/style.css`

- [x] **4. Antes/Depois**
  - Acceptance: frase de efeito + 2 vídeos 9:16 lado a lado com legendas "Before"/"After", também lado a lado em 320 px; placeholders coloridos até chegarem os vídeos; vídeos `muted loop playsinline` com `poster`.
  - Verify: visual em 320, 768 e 1440 px.
  - Files: `index.html`, `assets/css/style.css`, `assets/img/` (placeholders)

- [x] **5. Carrossel: layout em CSS**
  - Acceptance: lista com 5 itens placeholder (vídeo/imagem 9:16, título, `@cliente`); `scroll-snap` centralizado; os itens das pontas também conseguem ficar no centro; desliza no toque/trackpad sem JS.
  - Verify: com o JS desligado, arrastar no modo touch do DevTools.
  - Files: `index.html`, `assets/css/style.css`

- [x] **6. Carrossel: comportamento em JS**
  - Acceptance: o item central ganha a classe `is-active` (maior, os vizinhos menores/apagados); setas anterior/próximo e as teclas ← → navegam; só o vídeo ativo toca (mudo), os outros pausam; tocar no item ativo liga o som e mostra os controles; funciona com 1, 2 e 5 itens.
  - Verify: checkpoint (toque, setas, teclado, troca de vídeo) + testar com 1 e 2 itens.
  - Files: `assets/js/main.js`, `assets/css/style.css`, `index.html`

- [x] **7. About e passada de responsividade**
  - Acceptance: seção About com texto placeholder; rolagem suave para as âncoras (desligada com `prefers-reduced-motion`); a nav fixa não cobre o título da seção (`scroll-margin-top`); nada vaza nem se sobrepõe em 320, 375, 414, 768, 1024, 1440 e 1920 px.
  - Verify: percorrer as 7 larguras no DevTools.
  - Files: `index.html`, `assets/css/style.css`

- [x] **8. Acabamento e publicação**
  - Acceptance: `meta description`, tags Open Graph (preview ao mandar o link), favicon; Lighthouse mobile com Performance ≥ 85, Accessibility ≥ 95 e Best Practices ≥ 95; GitHub Pages configurado (`main`, `/ (root)`) com HTTPS em `donecass.com`.
  - Verify: Lighthouse; abrir https://donecass.com num celular de verdade.
  - Files: `index.html`, `assets/img/favicon.svg`

---

# Tarefas v2: Overhaul glass

- [x] **9. Fundação: fundo, vidro e espaçamento**
  - Acceptance: nav removida (HTML, CSS e `scroll-margin`); fundo fixo com blobs de cor (azul-acinzentado, dourado, cáqui, rosé); classe de vidro (branco ~40%, `blur(24px) saturate(160%)`, borda branca 1 px a ~40%, raio 1.75–2 rem); espaço entre seções `clamp(2.5rem, 8vw, 4.5rem)`; fallbacks para `prefers-reduced-transparency` e `prefers-contrast: more`.
  - Verify: prints em 375 e 1440 px; o fundo aparece borrado através dos cards.
  - Files: `index.html`, `assets/css/style.css`

- [x] **10. Header + Hero**
  - Acceptance: header em vidro (logo + ícones); hero em card separado (sem vidro sobre vidro) com Antes/Depois e, ao lado, título "Edits that keep people watching", texto e botão preto "Work with me →" que rola até `#contact`; lado a lado a partir de 640 px e empilhado abaixo; o botão encolhe ao toque.
  - Verify: prints em 320, 640 e 1440 px; clicar no botão.
  - Files: `index.html`, `assets/css/style.css`

- [x] **11. "Videos i made"**
  - Acceptance: título visível "Videos i made" (substitui o `h2` escondido); sombra suave nos vídeos; o carrossel funciona igual (setas, teclado, só o central toca).
  - Verify: o teste do carrossel da v1 de novo.
  - Files: `index.html`, `assets/css/style.css`

- [x] **12. Bloco final: About + ferramentas + contato**
  - Acceptance: faixa cáqui escura `#6F6758`; foto redonda (recortada em 480×480, `assets/img/donecas.jpg`, com `alt`); texto about; chips de ferramentas (Premiere Pro, After Effects, DaVinci Resolve, CapCut); card de vidro claro "Wanna try? Contact me" com os 3 ícones e brilho em volta; foto + about ao lado do contato a partir de 640 px; texto branco com contraste ≥ 4.5:1 medido.
  - Verify: prints; cálculo de contraste; Discord ainda copia.
  - Files: `index.html`, `assets/css/style.css`, `assets/img/donecas.jpg`

- [ ] **13. Verificação e publicação**
  - Acceptance: sem rolagem horizontal nas 7 larguras; Lighthouse mobile ≥ 85 / 95 / 95; legível com transparência reduzida (emulado); commit + push só com o seu ok.
  - Verify: teste de larguras + Lighthouse + abrir donecass.com.
  - Files: —
