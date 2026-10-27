# Spec: Portfólio Donecas (editor de vídeo)

## Objetivo
Site de uma página que mostra o trabalho do Donecas como editor de vídeo e leva o visitante a entrar em contato.

Quem visita: clientes em potencial (criadores de conteúdo, marcas), na maioria pelo celular, vindos de links nas redes sociais.

## v2 — Overhaul glass (proposta, aguardando aprovação)
Base: mockup v2 (header → hero Antes/Depois + texto → "Videos i made" → bloco final com foto, about e contato) e a referência de translucidez (cards de vidro fosco sobre um fundo de cores borradas).

Seções, de cima para baixo:
1. **Sem nav**, como no mockup (decidido). O botão "Work with me" e os ícones do header levam ao contato.
2. **Header**: logo "Donecas" + ícones X, e-mail, Discord, num card de vidro.
3. **Hero**: card de vidro com o par Antes/Depois à esquerda e, à direita, um título, um parágrafo curto e o botão preto em pílula **"Work with me →"**, que rola até o contato. No celular (< 640 px), o texto vai para baixo dos vídeos.
4. **"Videos i made"**: o mesmo carrossel de hoje, agora com título visível e sombra nos vídeos.
5. **Bloco final ("About + Contact")**: faixa de cor sólida e mais escura (tom cáqui do mockup) com:
   - foto redonda + texto about;
   - card de vidro claro "Wanna try? Contact me" com os 3 ícones e um brilho em volta;
   - **chips de ferramentas** (ideia C): Premiere Pro, After Effects, DaVinci Resolve, CapCut. A lista é provisória; troque pelas que você usa.

Espaçamento: entre seções sobe de 1 rem para `clamp(2.5rem, 8vw, 4.5rem)`. O padding interno dos cards também cresce, de 1.25 para `clamp(1.25rem, 4vw, 2rem)`.

### Material de vidro (estilo da referência)
O vidro só aparece quando tem algo colorido atrás dele. Num fundo liso ele vira um card cinza. Por isso:
- **Fundo:** "blobs" de cor borrados e fixos (gradientes radiais), na paleta do site: azul-acinzentado `#C9D1DB` como base, dourado `#D4A43A` (Antes/Depois), cáqui `#857C6C` e um rosé discreto como na referência. São estáticos: nada se move no fundo.
- **Card de vidro:** branco a ~35–45% de opacidade, `backdrop-filter: blur(24px) saturate(160%)`, borda de 1 px branca a ~40% (a luz batendo na borda), cantos de 1.75–2 rem e sombra suave. Superfícies maiores ganham mais blur e sombra mais funda que as pequenas (pílulas, chips).
- **Nunca vidro claro em cima de vidro claro.** No mockup, o hero fica por cima do header. Aqui eles viram cards separados, porque um sobre o outro deixa o texto ilegível.
- **Texto sobre vidro:** cor quase preta (`#14161a`) e peso um pouco maior (500), sem cinza claro. Os metadados pequenos ficam em maiúsculas com letter-spacing positivo, como na referência ("INDUSTRY PROJECT · 2025").
- **Tipografia:** títulos grandes com `letter-spacing: -0.02em` e `line-height: 1.1`; corpo com `letter-spacing: 0` e `line-height: 1.5`.
- **Acessibilidade:**
  - `prefers-reduced-transparency: reduce` → cards quase sólidos e sem blur;
  - `prefers-contrast: more` → fundo sólido e borda escura;
  - texto branco sobre o cáqui pede um tom mais escuro (`#6F6758`) para passar no contraste AA (4.5:1).
- **Desempenho:** no máximo ~6 superfícies com `backdrop-filter` (blur é caro em celular fraco). O fundo é um elemento `position: fixed` desenhado uma vez só, sem imagem.

### Ideias para o bloco final
| # | Ideia | O que precisa de você |
|---|---|---|
| A | **Selo de disponibilidade**: "● Available for work · replies within 24h" (bolinha verde) | Confirmar o prazo de resposta |
| B | **Números**: 3 chips de vidro, ex.: "120+ videos · 15M views · 30 clients" | Os números reais |
| C | **Ferramentas**: chips com Premiere Pro, After Effects, DaVinci Resolve, CapCut… | Quais você usa |
| D | **"Worked with"**: fileira de avatares/@ dos clientes que já aparecem no carrossel | Fotos (ou só os @) |
| E | **Depoimento**: uma frase curta de um cliente, com o @ dele | O texto e a autorização |
| F | **Como funciona**: 3 passos — "Send footage → I edit → 2 revisions" | Seu processo e quantas revisões |
| G | **Serviços/preço base**: "Shorts · Reels · TikTok — from $X" | Se quer mostrar preço |

Escolhida: **C**. As outras ficam anotadas para depois.

### Versão atual (v1, publicada)
Seções da v1, para referência:
1. **Nav em pílula** fixa no topo: `Contact` · `Work` · `About` (âncoras para as seções).
2. **Header**: logo "Donecas" (Montserrat Bold, ver Perguntas em aberto) + ícones X, e-mail, Discord.
3. **Antes/Depois**: frase de efeito + **um par fixo** de vídeos lado a lado com legenda "Before" e "After".
4. **Carrossel de trabalhos** ("os quadrados do meio"): item central maior, vizinhos menores nas laterais. Cada item tem vídeo ou imagem, **título do vídeo** (ex.: "Ajthaughtyou") e, em letra pequena, o **@ do cliente**.
5. **Rodapé de contato**: pílula "Wanna try? Contact me" + ícones X, e-mail, Discord.
6. **About**: texto placeholder por enquanto (o mockup não mostra, mas a nav aponta para ele).

### Redes sociais
| Rede | Comportamento do botão |
|---|---|
| X | abre `https://x.com/Donecass` em nova aba |
| E-mail | `mailto:certifieddonecas@gmail.com` |
| Discord | copia `donecass` para a área de transferência e mostra "Copied!" por ~2 s (o Discord não tem link de perfil por nome de usuário) |

Visual: fundo cinza-azulado claro (`#C9D1DB`), cards brancos translúcidos com cantos arredondados e sombra suave (glass), fonte sans geométrica (Poppins), coluna central estreita.

## Pressupostos (corrija se algum estiver errado)
1. Site **estático**: HTML + CSS + JS puro, sem framework e sem build. Para um portfólio de uma página isso basta e é o mais fácil de manter.
2. Hospedagem no **GitHub Pages** com o domínio `donecass.com` (já existe o `CNAME`). O Pages publica a partir da raiz do repositório, então o site fica na raiz e as pastas `frontend/` e `bakend/` saem.
3. **Sem backend**: contato é por links (`mailto:`, perfil do X) e pelo botão de copiar do Discord. Sem formulário.
4. Os vídeos são **curtos e verticais (9:16)** (confirmado).
5. Vídeos ficam no repositório como MP4 H.264, < ~15 MB cada. O GitHub recusa arquivos acima de 100 MB.
6. Textos do site em **inglês**, como no mockup.
7. Navegadores modernos (Chrome, Safari, Firefox, Edge; últimas 2 versões, incluindo iOS Safari).

## Tech Stack
- HTML5, CSS3 (variáveis, flexbox/grid, `clamp()`, `scroll-snap`), JavaScript ES2020 sem bibliotecas.
- Fontes via Google Fonts: Poppins (texto) e Montserrat 700 (só o logo).
- Ícones em SVG inline (X, e-mail, Discord), sem biblioteca de ícones.

## Comandos
```
Rodar local:   python -m http.server 8000    → abrir http://localhost:8000
               (ou: npx --yes serve .)
Publicar:      git push origin main          → GitHub Pages publica sozinho
```
Não há build, lint nem testes automatizados.

## Estrutura do projeto
```
/
├── index.html          → página única, todas as seções
├── CNAME               → domínio (já existe)
├── SPEC.md             → este documento
└── assets/
    ├── css/style.css   → todo o estilo, mobile-first
    ├── js/main.js      → carrossel + botão de copiar do Discord (único JS do site)
    ├── img/            → imagens, posters dos vídeos, favicon
    └── video/          → vídeos curtos MP4
```
Adicionar um trabalho novo = copiar um bloco `<li>` no `index.html` e colocar os arquivos em `assets/`.

## Estilo de código
```html
<li class="carousel__item">
  <video src="assets/video/ajthaughtyou.mp4" poster="assets/img/ajthaughtyou.jpg"
         muted loop playsinline preload="none"></video>
  <h3 class="carousel__title">Ajthaughtyou</h3>
  <p class="carousel__subtitle">@cliente</p>
</li>
```
```css
:root {
  --bg: #c9d1db;
  --card: rgb(255 255 255 / 0.7);
  --radius: 1.25rem;
}
.carousel__item { scroll-snap-align: center; }
```
- Classes em BEM simples (`bloco__elemento--modificador`), kebab-case.
- CSS mobile-first: estilo base para celular, `@media (min-width: …)` para telas maiores.
- Nomes de arquivo de mídia em kebab-case, sem espaço nem acento.
- Indentação de 2 espaços.

## Responsividade
Larguras que precisam funcionar sem rolagem horizontal: **320, 375, 414, 768, 1024, 1440, 1920 px**.
- Celular (< 768): coluna ocupa a tela com margem de 16 px; carrossel desliza com o dedo; Antes/Depois continua lado a lado (vídeos menores).
- Tablet/desktop: coluna central com largura máxima (~480–560 px, como no mockup) centralizada sobre o fundo cinza-azulado.
- Tipografia com `clamp()` para escalar entre tamanhos.

## Carrossel (comportamento)
- Base em CSS `scroll-snap` (desliza no toque, trackpad e roda do mouse sem JS).
- JS só para: marcar o item central (fica maior, vizinhos menores e mais apagados), setas anterior/próximo, teclas ← →.
- Só o vídeo do item central toca (mudo, em loop); os outros pausam.
- Tocar no item central abre/ativa o som (vídeo com controles).
- Funciona com qualquer quantidade de itens (mínimo 1).

## Estratégia de testes
Sem framework de testes (site estático pequeno). Verificação manual antes de cada push:
- Abrir no DevTools em cada largura da lista acima: nada vaza na horizontal, nada se sobrepõe.
- Carrossel: arrastar, setas, teclado; item central muda e o vídeo certo toca.
- Todos os links de redes abrem o destino certo (X, e-mail, Discord).
- Lighthouse (mobile): Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95.
- Testar uma vez em um celular de verdade (iOS Safari, se possível — é o mais chato com vídeo).

## Limites
- **Sempre:** `alt` em imagens e `aria-label` em botões só com ícone; `muted playsinline` em vídeo com autoplay; `preload="none"` + `poster` em vídeos fora da tela; links externos com `rel="noopener"`.
- **Perguntar antes:** adicionar qualquer biblioteca ou framework; mudar a hospedagem; colocar vídeo > 15 MB no repositório.
- **Liberado:** apagar `frontend/` e `bakend/` (aprovado).
- **Nunca:** commitar arquivos > 50 MB; colocar dados pessoais além do que já é público nas redes; usar autoplay com som.

## Critérios de pronto
1. `index.html` na raiz abre com as 6 seções na ordem do mockup.
2. Sem rolagem horizontal em 320–1920 px.
3. Carrossel com ≥ 3 itens: desliza no toque, setas e teclado funcionam, item central destacado e só ele toca.
4. Antes/Depois mostra os dois vídeos com legenda.
5. Os 3 ícones de redes, no header e no rodapé, fazem o que diz a tabela "Redes sociais" (o do Discord copia `donecass` e mostra "Copied!").
6. Links da nav rolam até as seções.
7. Lighthouse mobile dentro das metas acima.
8. Publicado em `donecass.com` via GitHub Pages.

### Critérios de pronto da v2
1. A ordem das seções segue a lista da v2. Entre elas há pelo menos 2.5 rem de espaço no celular e 4 rem no desktop.
2. Os cards de vidro mostram o fundo colorido borrado através deles, como na referência, e nenhum vidro claro fica sobre outro vidro claro.
3. O hero mostra os vídeos e o texto lado a lado a partir de 640 px e empilhados abaixo disso. "Work with me" rola até o contato.
4. O bloco final tem foto, about, card de contato e os extras aprovados. O texto branco tem contraste ≥ 4.5:1.
5. Com transparência reduzida ou contraste alto ligados no sistema, o texto continua legível.
6. Tudo da v1 continua funcionando: carrossel, Discord, sem rolagem horizontal em 320–1920 px, Lighthouse mobile ≥ 85 / 95 / 95.

## Decisões da v2
1. **Foto:** a enviada (2556×3408, de perfil no espelho dourado). Ela é recortada num quadrado centrado no rosto e reduzida para 480×480 (JPEG ~60 KB) em `assets/img/donecas.jpg`. A moldura dourada combina com o dourado do Antes/Depois.
2. **Bloco final:** ideia C (chips de ferramentas), com uma lista provisória.
3. **Texto do hero:** título "Edits that keep people watching" + "I edit short-form videos for creators — hooks, pacing, captions and sound, ready to post."
4. **Nav:** removida.

## Decisões da v1
- **Domínio:** `donecass.com` (confirmado).
- **Logo:** o `Donecas.svg` enviado tem o texto "Donecas" em Montserrat Bold como *texto vivo* (não convertido em curvas), num fundo branco de 1440×810. Usado como `<img>`, ele perderia a fonte e viria com uma caixa branca enorme. Então o logo é feito em HTML: `<h1 class="logo">Donecas</h1>` com Montserrat 700 via Google Fonts, que dá o mesmo visual e fica nítido em qualquer tela. Se quiser usar o arquivo, exporte de novo com o texto convertido em curvas (Inkscape: *Caminho → Objeto para caminho*), sem o fundo e recortado ao conteúdo.
- **Mídias:** até você mandar os vídeos e os posters, o site usa placeholders coloridos como no mockup.

## v2.1 — Ajustes pedidos depois da v2
- **Tamanhos:** coluna de 54 rem; Antes/Depois até 22 rem de largura; vídeo central do carrossel com `clamp(9rem, 40vw, 14rem)`.
- **Carrossel infinito:** 3 itens visíveis, o ativo no meio e os 2 vizinhos menores e borrados. Depois do último vem o primeiro (e vice-versa). Começa no item 1. Navega com setas, teclado (← →), deslize (> 40 px) ou clique num vizinho. Com exatamente 3 itens, o item que troca de lado pula sem animação.
- **Números de teste:** cada item mostra seu número (contador CSS em `.carousel__item::before`). Remover quando entrarem os vídeos reais.
- **Ferramentas:** ícones dos apps no lugar dos nomes: Premiere Pro, After Effects, CapCut (DaVinci removido). O ícone do CapCut é desenhado à mão (não existe no simple-icons).
- **About:** em vidro como as outras seções (sem faixa cáqui sólida); texto escuro.
- **Fundo por seção:** cada seção tem a própria faixa de cor borrada atrás (topo: rosé + dourado; vídeos: azul + oliva; about: dourado-cáqui + rosé).
- **Cor base por seção (v2.2):** gradiente vertical na página: branco `#F3F2F0` (topo) → cinza `#B9B8B6` (vídeos) → marrom `#4A3F38` (about, tom da referência). As manchas de cor de cada seção continuam por cima. O vidro do about é mais branco (45%) para o texto escuro manter contraste sobre o marrom (medido: 7.2:1).
- **Animações (v2.3):** (1) seções de vidro sobem 16px e aparecem uma vez ao entrar na tela (600ms `--ease-out`, 80ms entre as que entram juntas; sem JS fica tudo visível); (2) carrossel segue o dedo/mouse 1:1 e troca ao soltar com > 40px ou flick > 0.11 px/ms; (3) "Work with me" rola até o contato e o card pulsa uma vez (scale 1.035 + brilho). Movimento reduzido: só opacidade/brilho, sem deslocamento.
