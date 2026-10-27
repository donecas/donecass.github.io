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
