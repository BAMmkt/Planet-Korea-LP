# Planet Korea Travel — Landing Page

Landing page institucional da **Planet Korea Travel**, agência de turismo especializada em conectar o Brasil à Coreia do Sul com roteiros autênticos, personalizados e suporte em português.

---

## Sobre o Projeto

Esta é uma landing page de apresentação da Planet Korea Travel, desenvolvida com HTML, CSS e JavaScript puros (sem frameworks). O objetivo é apresentar os serviços da agência, exibir os principais destinos e estimular o contato de viajantes e agências parceiras.

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, animações, layout responsivo)
- JavaScript vanilla (ES6+)
- Google Fonts — Montserrat
- YouTube Embed API (vídeo hero em autoplay)

## Estrutura

```
Planet-Korea-LP/
├── README.md
└── lp/
    ├── index.html       # Página principal
    ├── style.css        # Estilos globais e componentes
    ├── script.js        # Interações e sliders
    └── img/
        ├── logo.png
        ├── namsan-tower.png
        ├── gyeongbokgung.png
        ├── bukchon-hanok.png
        ├── gwae/        # Imagens da seção de experiências
        └── tours/       # Imagens dos tours
```

## Seções da Página

| Seção | Descrição |
|---|---|
| **Hero** | Vídeo de fundo em loop com chamada principal e botão CTA |
| **Experiências** | Slider de 4 experiências temáticas inspiradas nos trigramas do I Ching (Céu, Terra, Fogo, Água) |
| **Nossos Tours** | Carrossel com 8 destinos principais (Namsan Tower, Gyeongbokgung, Jeju, Myeongdong etc.) |
| **Sobre Nós** | Seção institucional com links para tours, sobre e catálogo |
| **Nossos Serviços** | Slider com os serviços oferecidos: consultoria, roteiros, suporte no destino, guia em português e traslados |

## Como Rodar

Basta abrir o arquivo `lp/index.html` diretamente no navegador. Não há dependências de build ou instalação.

```bash
# Opcionalmente, com um servidor local (ex: VS Code Live Server)
# Abra lp/index.html com a extensão Live Server
```

## Recursos de UX/UI

- Design escuro (dark theme) com paleta rosé-gold
- Totalmente responsivo com menu hambúrguer para mobile
- Header com efeito de scroll (transparente → sólido)
- Sliders com navegação por setas e indicadores
- Botão flutuante de WhatsApp
- Fonte Montserrat para toda a tipografia
