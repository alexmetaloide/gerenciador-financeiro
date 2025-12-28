# 💰 Gerenciador Financeiro Pessoal

Um aplicativo web moderno e responsivo para controle de finanças pessoais, desenvolvido com **React**, **TypeScript** e **Supabase**.

![Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Funcionalidades

-   **💳 Gestão de Contas:** Adicione e gerencie múltiplas carteiras/contas bancárias.
-   **💸 Transações:** Registre receitas e despesas com categorização automática.
-   **🔐 Autenticação Segura:** Login social via **Google** integrado ao Supabase Auth.
-   **📱 PWA (Progressive Web App):** Instalável no computador e celular como um aplicativo nativo.
-   **🗑️ Gestão Facilitada:** Exclua transações diretamente da tela inicial.
-   **🌙 Dark Mode:** Interface adaptável (claro/escuro).
-   **📊 Dashboard:** Visualização resumida do saldo e últimas movimentações.

## 🛠️ Tecnologias Utilizadas

-   **Frontend:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Estilização:** [TailwindCSS](https://tailwindcss.com/)
-   **Backend / Database:** [Supabase](https://supabase.com/) (PostgreSQL + Auth)
-   **PWA:** [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
-   **Ícones:** Material Symbols

## 🚀 Como Rodar o Projeto

### Pré-requisitos
-   Node.js instalado
-   Conta no Supabase

### Passo a Passo

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/SEU_USUARIO/gerenciador-financeiro.git
    cd gerenciador-financeiro
    ```

2.  **Instale as dependências**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente**
    Crie um arquivo `.env` na raiz do projeto com suas credenciais do Supabase:
    ```env
    VITE_SUPABASE_URL=sua_url_supabase
    VITE_SUPABASE_ANON_KEY=sua_chave_anonima
    ```

4.  **Rode o projeto**
    ```bash
    npm run dev
    ```
    Acesse `http://localhost:3000` no seu navegador.

## 📱 Instalação (PWA)

-   **Desktop (Chrome/Edge):** Clique no ícone de instalação na barra de endereços.
-   **Mobile (Android/iOS):** Acesse o site pelo navegador e selecione "Adicionar à Tela Inicial".

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Desenvolvido com 💙 por [Seu Nome]
