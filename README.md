# PiscineiroPro - Landing Page de Pesquisa

Esta é a landing page para a pesquisa com piscineiros, com o objetivo de coletar informações para o desenvolvimento de um aplicativo dedicado a otimizar a rotina desses profissionais.

## Stack Utilizada

- **Framework:** React 18 + Vite
- **Estilização:** Tailwind CSS
- **Formulários:** React Hook Form
- **Deploy:** GitHub Pages
- **Analytics:** Google Analytics 4
- **Coleta de Dados do Formulário:** Formspree

## Como Configurar e Rodar o Projeto

### Pré-requisitos

- Node.js e npm instalados
- Uma conta no [GitHub](https://github.com/)
- Uma conta no [Formspree](https://formspree.io/)
- Uma conta no [Google Analytics](https://analytics.google.com/)

### Passos para Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/piscineiro-landing.git
   cd piscineiro-landing
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o Formspree:**
   - Acesse sua conta no [Formspree](https://formspree.io).
   - Crie um novo formulário com o nome "PiscineiroPro".
   - Copie o endpoint gerado, algo como `https://formspree.io/f/XXXX`.
   - Crie um arquivo `.env.local` na raiz do projeto e adicione seu endpoint:
     ```
     VITE_FORMSPREE_ID=XXXX
     ```
   - O `XXXX` é o ID do seu formulário.

4. **Configure o Google Analytics 4 (GA4):**
   - Acesse sua conta no [Google Analytics](https://analytics.google.com/).
   - Crie uma nova propriedade para o seu site (ex: "PiscineiroPro").
   - Copie o seu "ID de métricas" (Measurement ID), algo como `G-XXXX`.
   - Abra o arquivo `index.html` e substitua `GA_MEASUREMENT_ID` pelo seu ID em ambos os locais onde ele aparece.
   - Para testar, abra o site no navegador com o DevTools (F12) aberto, vá para a aba "Network" e procure por `gtag` ou coletas de analytics.

### Rodando Localmente

Para testar a aplicação em ambiente de desenvolvimento:
```bash
npm run dev
```
Acesse `http://localhost:5173` no seu navegador.

## Deploy no GitHub Pages

O deploy é automatizado usando `gh-pages`.

1. **Faça o build do projeto:**
   ```bash
   npm run build
   ```
   Este comando também é executado automaticamente antes do deploy pelo script `predeploy`.

2. **Execute o deploy:**
   ```bash
   npm run deploy
   ```
   Este comando enviará os arquivos da pasta `dist` para uma branch `gh-pages` no seu repositório, e o site estará disponível em `https://seu-usuario.github.io/piscineiro-landing/`.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run deploy`: Faz o build e o deploy para o GitHub Pages.
- `npm run predeploy`: Script auxiliar que garante que o `build` seja executado antes do `deploy`.
