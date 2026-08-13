# ResolvePrev - Formulário Interativo de Aposentadoria

Este projeto é uma reprodução idêntica e responsiva do formulário multi-etapas da **ResolvePrev** para simulação e teste de aposentadoria.

---

## 📱 Recursos e Destaques

- **Design Fiel & Identidade Visual:** Réplica exata das cores, tipografia (Inter), espaçamentos, ícones e navegação do ResolvePrev original.
- **Navegação Fluida Multi-etapas:** Progresso passo a passo com barra de progresso no topo e botão de navegação para voltar (`←`).
- **Formulário Responsivo:** Layout adaptável otimizado para versão **Web (Desktop)** e versão **Mobile (Smartphones e Tablets)**, preenchendo a tela com usabilidade de toque otimizada.
- **Placeholders de Imagem:** Estrutura preparada para fotos (equipe, seleções de gênero), permitindo fácil substituição por imagens reais.
- **Validações e Máscaras:** Máscara de formatação automática para número de telefone/WhatsApp `(00) 90000-0000` e validações de campo obrigatório.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura semântica para acessibilidade e SEO.
- **CSS3 Vanilla:** Estilização pura com variáveis CSS, CSS Grid, Flexbox e animações fluidas.
- **JavaScript (ES6+):** Manipulação leve e nativa do DOM, controle de estado do formulário e transição de etapas.

---

## 📂 Estrutura do Projeto

```text
Formulário (RP)/
├── index.html        # Estrutura principal das telas do formulário
├── styles.css        # Estilos, tema e responsividade mobile/desktop
├── script.js        # Lógica de navegação entre etapas e validação
├── .gitignore        # Arquivos ignorados pelo Git
└── README.md         # Documentação do projeto
```

---

## 🚀 Como Executar Localmente

Como o projeto é construído em web standards puros (HTML, CSS e JavaScript), não requer nenhum compilador ou build step:

1. Clone este repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/formulario-resolveprev.git
   ```
2. Abra a pasta do projeto:
   ```bash
   cd formulario-resolveprev
   ```
3. Abra o arquivo `index.html` diretamente no seu navegador ou rode um servidor local simples:
   ```bash
   # Utilizando npx serve
   npx serve .
   ```
   Acesse `http://localhost:3000` no seu navegador.

---

## 🌐 Publicação no GitHub Pages

Para publicar este projeto gratuitamente no **GitHub Pages**:

1. Acesse o seu repositório no GitHub.
2. Vá em **Settings** > **Pages**.
3. Na seção **Source**, selecione a branch `main` e a pasta `/ (root)`.
4. Clique em **Save**. Em instantes seu site estará online no link fornecido pelo GitHub.

---

## 📄 Licença

Este projeto é disponibilizado para fins educacionais e de demonstração.
