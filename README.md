# 🛸 Sistema de Monitoramento Extraterrestre E Diário de Avistamentos em React e Vite

* Nosso Deploy do Trabalho Final em React + Vite: https://grupo1trabalho.netlify.app/

🧑‍🚀 Membros da Equipe (Grupo 1)
Nossa equipe de desenvolvedores operacionais que contribuíram para este projeto:

| Foto | Usuário | Função (Exemplo) |
| :---: | :--- | :--- |
| <img src="https://github.com/leandrotcdev.png" width="60px;"/> | [**Leandro Coutinho**](https://github.com/leandrotcdev) | Fullstack Developer |
| <img src="https://github.com/elisakappaun-netizen.png" width="60px;"/> | [**Elisa Kappaun**](https://github.com/elisakappaun-netizen) | Fullstack Developerr |
| <img src="https://github.com/gabrielamontescoelho.png" width="60px;"/> | [**Gabriela Coelho**](https://github.com/gabrielamontescoelho) | Fullstack Developer |
| <img src="https://github.com/filipebrollo.png" width="60px;"/> | [**Filipe Brollo**](https://github.com/filipebrollo) | Fullstack Developer |
| <img src="https://github.com/nathaliaa-qa.png" width="60px;"/> | [**Nathália Antunes**](https://github.com/nathaliaa-qa) | Fullstack Developer |

---

* ===========================================================================================================================================
[![React](https://img.shields.io/badge/React-v19-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-v6-646CFF?logo=vite)](https://vite.dev)
[![CSS3](https://img.shields.io/badge/CSS3-Pure--Vanilla-1572B6?logo=css3)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios)](https://axios-http.com/)
[![Status](https://img.shields.io/badge/Status-Operacional-success)](#)

* Autor: [Leandro Coutinho, Elisa Kappaun, Gabriela Coelho, Filipe Brollo e Nathália Antunes]
* Data: 15/06/206
* ===========================================================================================================================================

> **Trabalho de Conclusão de Curso (TCC) em React ** desenvolvido para a Residência em TIC Software do Serratec.
> Uma aplicação web SPA completa, projetada para o gerenciamento, catalogação e monitoramento de informações relacionadas a avistamentos, aliens e planetas através do consumo real da API do Swagger.

---

📝 Descrição da Aplicação Web
A aplicação é um terminal tático que permite o gerenciamento de informações confidenciais relacionadas a Avistamentos, Aliens e Planetas. O usuário (operador) deve realizar a autenticação segura no sistema (Login) para acessar a página inicial e navegar pelo menu integrado para as telas principais de monitoramento.

🎯 Objetivo do Projeto
Desenvolver uma aplicação web interativa utilizando React com Vite para consumir dados de forma dinâmica. O projeto exige a entrega de uma aplicação 100% funcional, contemplando:
Interface de Login e Autenticação.
Roteamento e navegação fluida entre páginas protegidas.
Consumo real e requisições completas (GET, POST, PUT, DELETE) às rotas da API.

🔗 API Utilizada
A base de dados extraterrestres consumida por este projeto foi disponibilizada via Swagger. Você pode consultar as rotas e regras de negócio no link abaixo:
Documentação da API - Serratec MWM Software

---

## 🛠️ Stack Tecnológica

O motor do sistema foi isolado e otimizado para respostas em milissegundos:
* **Core:** React.js (Componentização e reatividade de interface)
* **Mecanismo de Build:** Vite (Fast Refresh e empacotamento leve)
* **Roteamento:** React Router DOM (Navegação SPA e proteção de rotas)
* **Estilização:** CSS3 Puro (Vanilla CSS + CSS Dinâmico Inline)
* **Consumo de API:** Axios (Requisições HTTP estruturadas)

---

## 🌌 Visão Geral do Ecossistema

Para estruturar e centralizar esses registos com máxima resiliência, este ecossistema consolida duas soluções integradas em uma Single Page Application (SPA):
1. **O Diário de Avistamentos:** Interface tática de catalogação rápida, permitindo que agentes em campo registem detalhes de encontros, dados biológicos de espécimes e coordenadas geográficas de eventos.
2. **O Sistema de Monitoramento (S.M.E.):** Painel de controlo e radar em tempo real focado no consumo de dados brutos e exibição analítica de ameaças extraterrestres e planetas mapeados.

---

## features ⚡ Funcionalidades Principais

* **🔒 Escudo de Autenticação (Login Tático):** Fluxo de acesso restrito consumindo a rota de autenticação. Rotas privadas bloqueadas no ecossistema React garantem que apenas operadores com tokens válidos acedam ao painel do radar.
* **📡 Central de Inteligência (Home/Radar):** Consumo assíncrono e dinâmico de múltiplos endpoints em paralelo para listagem de ocorrências, utilizando tratamento de dados defensivo (*Null Guards*) para mitigar falhas.
* **📝 Diário de Avistamentos (CRUD Completo):** Controlo operacional total para Cadastrar (POST), Ler (GET), Atualizar (PUT) e Deletar (DELETE) logs de contatos extraterrestres, espécies de aliens e planetas.
* **🌓 Tema Noturno:**Modo Escuro (Operação de Radar Noturno)**, otimizando o conforto visual do utilizador.

---

## css 💎 Engenharia de Estilização Intermediária (CSS Puro e Inline)

O grande diferencial técnico deste projeto é a ausência de frameworks utilitários de estilização. Toda a interface foi desenhada através de **CSS Puro** e **estilos inline estruturais baseados no estado do React**, demonstrando domínio sobre a renderização nativa da Web:

* **Display Flex & CSS Grid:** Layouts totalmente responsivos, grids estruturados e alinhamentos complexos para o fluxo de formulários, garantindo adaptabilidade para qualquer resolução de tela (Mobile, Tablet e Desktop).
* **Física de Vidro Fosco (Glassmorphism):** Aplicação manual de filtros de desfoque de fundo (`backdrop-filter: blur`), bordas translúcidas tridimensionais, sombreamentos reflexivos para criar (cards) cartões flutuantes com profundidade espacial realista e sensação de gravidade zero. 
* **Estática de Sinal (Noise Background Texture):** Injeção de uma camada texturizada no `body::before` via máscara de vetor SVG. O efeito simula a interferência eletromagnética real de um monitor de radar de base militar.
* **Cinemática Nativa (@keyframes):** Animações fluidas escritas do zero. Os painéis de dados flutuam suavemente no eixo Y (`float`), e as orbes de calor do background movem-se de forma assíncrona.

---

## api 🛠️ Especificações Técnicas e Rotas Consumidas (Swagger)

A aplicação consome diretamente a API oficial disponibilizada no Swagger:
`https://api.serratec.mwmsoftware.com/docs#`

### 1. Autenticação
* **POST** `/login`
* *Campos esperados no payload:*
    ```json
    {
      "email": "usuario@email.com",
      "senha": "senha"
    }
    ```

### 2. Gerenciamento de Avistamentos
* **GET** `/avistamentos` | **POST** `/avistamentos`
* **PUT** `/avistamentos/{id}` | **DELETE** `/avistamentos/{id}`
* *Estrutura base do modelo:*
    ```json
    {
      "titulo": "string",
      "local": "string",
      "descricao": "string",
      "data": "YYYY-MM-DD",
      "nivelMedo": 1
    }
    ```

### 3. Catalogação de Aliens
* **GET** `/aliens` | **POST** `/aliens`
* **PUT** `/aliens/{id}` | **DELETE** `/aliens/{id}`
* *Estrutura base do modelo:*
    ```json
    {
      "nome": "string",
      "especie": "string",
      "planeta": "string",
      "periculosidade": 1,
      "descricao": "string"
    }
    ```

### 4. Mapeamento de Planetas
* **GET** `/planetas` | **POST** `/planetas`
* **PUT** `/planetas/{id}` | **DELETE** `/planetas/{id}`
* *Estrutura base do modelo:*
    ```json
    {
      "nome": "string",
      "galaxia": "string",
      "clima": "string",
      "habitavel": true,
      "descricao": "string"
    }
    ```

*Observação: As rotas de evidências e comentários foram intencionalmente omitidas do escopo.*

---

## requirements 🎯 Critérios de Avaliação Atendidos

* [x] **Funcionamento do Login:** Fluxo de autenticação funcional com redirecionamento seguro para a Home.
* [x] **Consumo Correto da API:** Integração assíncrona completa via Axios conectada ao Swagger.
* [x] **CRUDS Completos:** Telas dedicadas e operacionais com formulários de criação, edição, listagem e remoção para os três módulos pedidos.
* [x] **Tratamento de Feedbacks:** Indicadores explicitamente estilizados para os estados de **Carregamento (Loading)**, mensagens de **Erro** e alertas de **Sucesso**.
* [x] **Qualidade Visual & Responsividade:** Interface rica em design, com menus consistentes e adaptada para dispositivos móveis.

---
