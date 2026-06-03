# AV1 - Desenvolvimento Web Básico - 2º Bimestre

## Descrição
Página inicial que consome dados da API pública do Rick and Morty, utilizando fetch com async/await, manipulando JSON e exibindo dados dinamicamente no DOM com Bootstrap para layout responsivo. Inclui feedback de carregamento e tratamento de erros.

## Estrutura do Projeto
- `index.html`: Página inicial com lista de personagens, busca e paginação
- `detalhes.html`: Página de detalhes do personagem selecionado
- `css/style.css`: Estilos personalizados e responsivos
- `js/api.js`: Funções de acesso à API Rick and Morty
- `js/script.js`: Lógica de listagem, busca e navegação
- `js/detalhes.js`: Lógica de exibição de detalhes com parâmetros de URL

## Como Executar
1. Abra o arquivo `index.html` em um navegador web.
2. Clique em um personagem para acessar `detalhes.html?id={ID}`.

## Funcionalidades
- Consumo da API Rick and Morty com `fetch` e `async/await`
- Busca de personagens por nome
- Paginação com botões "Anterior" e "Próxima"
- Navegação para página de detalhes via `URLSearchParams`
- Exibição de feedback de carregamento e mensagens de erro
- Código organizado em módulos JavaScript

## Tecnologias Utilizadas
- HTML5
- CSS3
- Bootstrap 5
- JavaScript puro (ES Modules)
- Fetch API
- Async/Await
- JSON
- Git e GitHub
