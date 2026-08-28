# Auris — Site One Page

Site institucional one-page da Auris, traduzido do layout Figma para
HTML/CSS/JS/PHP puro (sem frameworks ou dependências de build).

## Estrutura

```
Website/
├── index.html
├── assets/
│   ├── css/
│   │   ├── reset.css
│   │   ├── variables.css   → design tokens (cores, tipografia, espaçamentos)
│   │   └── style.css       → estilos de todas as seções + responsividade
│   ├── js/
│   │   ├── nav.js          → menu mobile
│   │   ├── animations.js   → reveals de scroll com GSAP/ScrollTrigger (via CDN)
│   │   └── form.js         → validação e envio do formulário via fetch
│   └── img/                → imagens exportadas do Figma
├── php/
│   ├── config.php          → e-mail de destino e textos do e-mail
│   └── send-mail.php       → endpoint que recebe o formulário e envia via mail()
└── docs/
    └── design-tokens.md    → cores, tipografia, breakpoints e estados de hover extraídos do Figma
```

## Como testar localmente

O formulário depende de PHP. Para testar o fluxo completo (não apenas o
visual), rode um servidor local dentro da pasta do projeto:

```
php -S localhost:8000
```

Depois acesse `http://localhost:8000` no navegador.

**Importante:** a função `mail()` do PHP só envia e-mails de verdade se o
ambiente tiver um servidor SMTP configurado. Isso normalmente não funciona em
`localhost` puro. Para testar o envio real:
- Use XAMPP/WAMP com um servidor SMTP local (ex: Mercury Mail, ou configurar
  `sendmail_path` no `php.ini` para um serviço como Mailtrap/Papercut para
  testes), **ou**
- Suba os arquivos num servidor de hospedagem real (o do cliente, ou um
  ambiente de staging) e teste lá diretamente.

Se, no servidor de produção do cliente, o `mail()` nativo não entregar os
e-mails de forma confiável (comum em alguns provedores de hospedagem), o
próximo passo é trocar `php/send-mail.php` por uma implementação com
PHPMailer + SMTP — a função `send_notification_email()` nesse arquivo foi
isolada exatamente para facilitar essa troca sem mexer no resto do fluxo.

## Configuração para o cliente

Antes de publicar, edite `php/config.php`:
- `AURIS_MAIL_TO` — e-mail que deve receber as solicitações do formulário.

Requisitos do servidor de hospedagem: PHP 7.4+ com `mail()` habilitado.

## Breakpoints

Os breakpoints usados no CSS seguem os frames reais definidos no arquivo
Figma do projeto: 390px (mobile), 768px (tablet), 1024px (desktop pequeno),
1440px/1920px (desktop). Detalhes em `docs/design-tokens.md`.

## Pendências / próximos passos

- [ ] Conferir pixel a pixel os breakpoints 768px/1024px/1440px contra os
      frames correspondentes no Figma (a primeira passada usou os frames
      1920px e 390px como referência principal; frames intermediários podem
      precisar de ajuste fino de espaçamento).
- [ ] Revisar/ajustar timings e easings do GSAP com o time de design.
- [ ] Testar envio real de e-mail no servidor de produção do cliente.
- [ ] Testar responsividade em dispositivos reais (não apenas emulação do
      navegador).
- [ ] Checklist de acessibilidade (contraste, navegação por teclado, leitor
      de tela) numa passada final.
