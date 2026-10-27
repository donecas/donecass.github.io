# Plano: Portfólio Donecas

Base: [SPEC.md](../SPEC.md). Lista de tarefas: [todo.md](todo.md).

## Componentes
| Componente | Arquivos | Depende de |
|---|---|---|
| Base (tokens, fontes, fundo, coluna central) | `index.html`, `assets/css/style.css` | — |
| Nav em pílula | `index.html`, `style.css` | Base |
| Header (logo + ícones) | `index.html`, `style.css` | Base |
| Rodapé de contato | `index.html`, `style.css` | Base |
| Copiar Discord | `assets/js/main.js` | Header, Rodapé |
| Antes/Depois | `index.html`, `style.css` | Base |
| Carrossel (layout) | `index.html`, `style.css` | Base |
| Carrossel (comportamento) | `main.js` | Carrossel (layout) |
| About + âncoras | `index.html`, `style.css` | Nav |

## Ordem
1. Base + limpeza das pastas antigas → página vazia já publicável.
2. Nav, header e rodapé → todo o "esqueleto" do mockup + links funcionando.
3. Copiar Discord.
4. Antes/Depois.
5. Carrossel: primeiro só CSS (já desliza no toque), depois o JS.
6. About + passada de responsividade em todas as larguras.
7. Metas do Lighthouse, metadados, publicação.

Tudo mexe nos mesmos 3 arquivos, então a ordem é sequencial; não vale paralelizar.

## Checkpoints
- **Depois da tarefa 2:** abrir em 320 px e 1440 px; o visual já deve lembrar o mockup.
- **Depois da tarefa 6:** testar o carrossel com o dedo (DevTools touch), setas e teclado.
- **Depois da tarefa 8:** Lighthouse mobile + teste num celular de verdade, antes do push final.

## Riscos
| Risco | Como evitar |
|---|---|
| iOS não dá autoplay em vídeo | Sempre `muted playsinline`; o poster aparece se o autoplay falhar |
| Copiar para a área de transferência falha (navegador antigo, http) | Se `navigator.clipboard` falhar, mostrar o nome `donecass` selecionável num tooltip |
| Vídeos pesados deixam o site lento | `preload="none"` + `poster`; só o item central carrega/toca; limite de 15 MB por vídeo |
| GitHub Pages servindo a pasta errada | Conferir em Settings → Pages: branch `main`, pasta `/ (root)` |
| Carrossel com 1 ou 2 itens quebra o layout | Testar com 1, 2 e 5 itens na tarefa 6 |

---

# Plano v2: Overhaul glass

Base: seção "v2" do [SPEC.md](../SPEC.md). Mesmos 3 arquivos (`index.html`, `style.css`, `main.js`), mais a foto. Sem dependências novas.

## Ordem
1. **Fundação:** fundo de cores borradas + material de vidro (tokens) + espaçamento novo + remoção da nav. Tudo depende disso.
2. **Header + Hero:** o hero é a primeira impressão e tem o layout novo (vídeos | texto + CTA).
3. **"Videos i made":** só título e sombras; o JS do carrossel não muda.
4. **Bloco final:** foto, about, chips de ferramentas e card de contato com brilho.
5. **Verificação + publicação.**

## Checkpoints
- **Depois da 1–2:** prints em 375 e 1440 px. O vidro precisa mostrar o fundo através dele. Se não mostrar, ajustar cores/opacidade antes de seguir.
- **Depois da 4:** contraste do texto branco no cáqui medido, e não estimado.

## Riscos
| Risco | Como evitar |
|---|---|
| `backdrop-filter` pesado em celular fraco | ≤ 6 superfícies com blur; fundo fixo sem animação |
| Vidro "some" sobre fundo liso | Os blobs de cor ficam atrás de todos os cards; confirmar no print |
| Texto ilegível sobre vidro | Texto quase preto, peso 500, fallback com `prefers-reduced-transparency` |
| Foto pesada (2556×3408) | Recorte quadrado 480×480, JPEG ~60 KB, `loading="lazy"` |
