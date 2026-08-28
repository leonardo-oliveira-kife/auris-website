# Auris — Design Tokens (extraído do Figma)

Fonte: arquivo Figma `Auris` (fileKey `9VNNrYbs61Oejc2CQIU8ii`), frame `1920w default` (node `62:816`).

## Breakpoints (frames reais do projeto)

| Nome no Figma      | Node ID    | Largura |
|--------------------|------------|---------|
| 1920w default      | 62:816     | 1920px  |
| 1440w default      | 62:1270    | 1440px  |
| 1024w default      | 62:1688    | 1024px  |
| 768w default       | 62:2118    | 768px   |
| 390w default       | 62:2542    | 390px   |

## Estrutura da one-page (ordem das seções, frame 1920w)

1. `header` (62:1250)
2. `section#inicio` (62:1818... hero)
3. `section#problema`
4. `section#solucao`
5. `section#auricoins`
6. `section#servicos`
7. `section#contato`
8. `footer` (62:907)

## Cores

| Nome Figma            | Token sugerido           | Hex / valor       |
|------------------------|--------------------------|-------------------|
| Resolution Blue        | `--color-primary`        | `#002377`         |
| Resolution Blue 72%    | `--color-primary-72`     | `#002377b8`       |
| Resolution Blue 70%    | `--color-primary-70`     | `#002377b2`       |
| Resolution Blue 68%    | `--color-primary-68`     | `#002377ad`       |
| Resolution Blue 66%    | `--color-primary-66`     | `#002377a8`       |
| Resolution Blue 60%    | `--color-primary-60`     | `#00237799`       |
| Resolution Blue 55%    | `--color-primary-55`     | `#0023778c`       |
| Resolution Blue 45%    | `--color-primary-45`     | `#00237773`       |
| Resolution Blue 38%    | `--color-primary-38`     | `#00237761`       |
| Resolution Blue 18%    | `--color-primary-18`     | `#0023772e`       |
| Resolution Blue 8%     | `--color-primary-8`      | `#00237714`       |
| Resolution Blue 7%     | `--color-primary-7`      | `#00237712`       |
| Prussian Blue          | `--color-primary-dark`   | `#001a59`         |
| Outrageous Orange      | `--color-accent` (CTA)   | `#ff5226`         |
| Wild Watermelon        | `--color-danger`         | `#ff6a81`         |
| Jungle Green           | `--color-success`        | `#2bb673`         |
| Eucalyptus             | `--color-success-dark`   | `#1d7a4f`         |
| Narvik                 | `--color-success-bg`     | `#e9f8f0`         |
| Anakiwa                | `--color-info`           | `#8dc7ff`         |
| Anakiwa 80%            | `--color-info-80`        | `#8dc7ffcc`        |
| Anakiwa 18%            | `--color-info-18`        | `#8dc7ff2e`        |
| Anakiwa 14%            | `--color-info-14`        | `#8dc7ff24`        |
| Tropical Blue / Grey 91| `--color-info-bg`        | `#d6e9fa`         |
| Link Water / Grey 95   | `--color-surface-1`      | `#eaf2fb`         |
| Solitude / Grey 94     | `--color-surface-2`      | `#e1efff`         |
| Solitude 85%/80%/78%/75%/70%/68%/55% | `--color-surface-2-XX` | ver hex acima (alpha variants) |
| Zumthor / Grey 96      | `--color-surface-3`      | `#eaf3ff`         |
| White                  | `--color-white`          | `#ffffff`         |
| White 88%              | `--color-white-88`       | `#ffffffe0`       |

## Tipografia

| Estilo Figma                  | Família         | Peso | Tamanho | Line-height | Letter-spacing |
|--------------------------------|-----------------|------|---------|-------------|-----------------|
| DM Serif Display / Regular     | DM Serif Display| 400  | 27px (base; usado em 54/72 para headings) | ~76.32 (72px) / 60.48 (54px) | -0.72 / -0.27 |
| DM Sans / Bold                 | DM Sans         | 700  | 21px    | —           | 0               |
| Figtree / Regular              | Figtree         | 400  | 12px    | —           | 0               |
| Figtree / Medium               | Figtree         | 500  | 15px    | —           | 0               |
| Figtree / Medium upper         | Figtree         | 500  | 11px    | —           | 0.66 (uppercase)|
| Figtree / SemiBold             | Figtree         | 600  | 15px    | —           | 0               |
| Figtree / SemiBold upper       | Figtree         | 600  | 13px    | —           | 1.82 (uppercase)|
| Figtree / SemiBold underline   | Figtree         | 600  | 13px    | —           | 0               |

Fontes a carregar: **Figtree** (400/500/600) e **DM Sans** (700) e **DM Serif Display** (400) via Google Fonts.

## Espaçamentos e tamanhos (design tokens brutos)

- `item spacing`: 1, 4 (xxs), 6, 8, 10, 12, 14, 16 (s), 18, 32 (m), 36, 72, + valores decimais específicos de layout (11.3, 22.9, 92.94 etc. — usar apenas onde o layout realmente exigir, não generalizar).
- `corner radius`: 3, 3.5, 4, 10, 18, 20, 24, 28, 999 (pill/botões).
- `stroke weight`: 1px.
- `width helpers` (containers de conteúdo): 140, 180, 260, 280, 300, 380, 500, 520, 560, 620, 640, 760, 1228 (max-width do conteúdo dentro do container 1920).

## Estados de componente (levantados na página oculta "Components" do Figma, node 62:718)

O arquivo Figma tem uma seção de documentação com todas as variantes default/hover
lado a lado. Estados confirmados:

| Componente | Default | Hover |
|---|---|---|
| **Botão CTA primário** (pill laranja, ex: "Agendar conversa", "Agendar demonstração") | bg `--color-accent` `#ff5226` | bg `--color-accent-hover` `#e23f14` (Pomegranate) — mesmo padding/shadow |
| **Botão secundário** (pill outline, ex: "Conhecer o modelo") | bg white, border `rgba(0,35,119,0.22)`, texto `--color-primary` | **sem estado de hover definido no Figma** — manter estilo default ou aplicar apenas leve realce de borda por bom senso (ex: border-color mais escura) |
| **Nav link do header** (Início/Solução/AuriCoins/Serviços/Contato) | cor `--color-primary` `#002377`, Figtree Medium 15px | cor `--color-accent` `#ff5226`, mesmo peso/tamanho |
| **Nav link do footer** (coluna "Navegação") | cor `rgba(225,239,255,0.8)` | cor branco sólido |
| **Link legal do footer** (Política de Privacidade / LGPD) | cor `rgba(225,239,255,0.7)` | cor branco sólido |
| **Botão de submit do formulário** (full width, "Agendar demonstração") | bg `#ff5226` | bg `#e23f14` |
| **Card "problema" / cards translúcidos sobre fundo azul** (5 cards da seção problema) | bg `rgba(255,255,255,0.05)`, border `rgba(141,199,255,0.22)` | bg `rgba(255,255,255,0.1)` (dobra a opacidade), border igual |
| **Card de serviço** (7 cards brancos da seção serviços) | border `rgba(0,35,119,0.12)`, shadow `0 12px 16px rgba(0,35,119,0.08)` | border sólida `#8dc7ff` (Anakiwa), shadow `0 14px 17px rgba(0,35,119,0.1)` |

Regra geral a aplicar via CSS: `transition: background-color .2s ease, border-color .2s ease, color .2s ease, box-shadow .2s ease;` em todos os elementos interativos, usando os pares default→hover acima. Onde o Figma não definiu hover (botão secundário), não inventar um estado chamativo — aplicar apenas um realce sutil de borda consistente com o resto do design.

## Assets de imagem

Baixados para `assets/img/` (nomes descritivos, para não depender das URLs
temporárias do Figma, que expiram em ~7 dias):

- `logo-icon.png` / `logo-icon-small.png` / `badge-icon.png` / `plus-icon.png` — mesmo símbolo "+" da marca Auris, usado em contextos diferentes (logo do header, ícone do badge do hero, ícone "+" dos cards de serviço).
- `logo-wordmark-header.png` — logotipo "AURIS" (texto) do header.
- `logo-wordmark-footer.png` — logotipo "AURIS" (texto) do footer, versão maior.
- `check-icon.png` — ícone de check usado na lista de benefícios da seção solução.
- `hero-medica-consulta.png` — foto da seção Início (hero).
- `solucao-consultorio.png` — foto da seção Solução.
- `auricoins-ilustracao.png` — ilustração de moedas da seção AuriCoins.
- `servicos-rede-ilustracao.png` — ilustração da rede de especialistas (card da seção Serviços).
