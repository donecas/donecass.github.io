# Spec: Portfólio Donecas (editor de vídeo)

## Objetivo
Site de uma página que mostra o trabalho do Donecas como editor de vídeo e leva o visitante a entrar em contato.

Quem visita: clientes em potencial (criadores de conteúdo, marcas), na maioria pelo celular, vindos de links nas redes sociais.

Seções, de cima para baixo (conforme o mockup):
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

## Perguntas em aberto
Nenhuma bloqueando. Decisões já tomadas:
- **Domínio:** `donecass.com` (confirmado).
- **Logo:** o `Donecas.svg` enviado tem o texto "Donecas" em Montserrat Bold como *texto vivo* (não convertido em curvas), num fundo branco de 1440×810. Usado como `<img>`, ele perderia a fonte e viria com uma caixa branca enorme. Então o logo é feito em HTML: `<h1 class="logo">Donecas</h1>` com Montserrat 700 via Google Fonts, que dá o mesmo visual e fica nítido em qualquer tela. Se quiser usar o arquivo, exporte de novo com o texto convertido em curvas (Inkscape: *Caminho → Objeto para caminho*), sem o fundo e recortado ao conteúdo.
- **Mídias:** até você mandar os vídeos e os posters, o site usa placeholders coloridos como no mockup.
