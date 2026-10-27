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

- [ ] **8. Acabamento e publicação**
  - Acceptance: `meta description`, tags Open Graph (preview ao mandar o link), favicon; Lighthouse mobile com Performance ≥ 85, Accessibility ≥ 95 e Best Practices ≥ 95; GitHub Pages configurado (`main`, `/ (root)`) com HTTPS em `donecass.com`.
  - Verify: Lighthouse; abrir https://donecass.com num celular de verdade.
  - Files: `index.html`, `assets/img/favicon.svg`
