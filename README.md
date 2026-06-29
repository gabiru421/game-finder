## Buscador de Jogos (React + Vite) ##

Aplicativo web desenvolvido em React para descobrir, buscar e favoritar jogos usando a API da RAWG.
O projeto simula uma experiência estilo Steam, com interface moderna, responsiva e foco em UX.


Demonstração
 * Página inicial com jogos populares
 * Busca de jogos em tempo real
 * Sistema de favoritos (localStorage)
 * Página de detalhes dos jogos
 * Hero banner estilo plataforma de jogos
 * Interface responsiva (desktop e mobile)

Tecnologias utilizadas
 * React.js
 * React Router DOM
 * JavaScript (ES6+)
 * CSS puro (customizado)
 * LocalStorage 
 * RAWG API (dados dos jogos)

Funcionalidades
 * Busca de jogos
 * Pesquisa por nome
 * Exibição de resultados dinâmicos
 * Mensagem de erro quando não encontrado
 * Favoritos
 * Adicionar/remover jogos favoritos
 * Persistência com localStorage
 * Página exclusiva de favoritos
 * Página exclusiva de detalhes do jogo
 * Informações completas do jogo
 * Nota, data de lançamento e metacritic
 * Lista de gêneros e plataformas
 * Barra de busca integrada no banner
 * Layout responsivo com adaptação mobile


O projeto foi otimizado para:

 * Desktop (layout completo em grid)
 * Mobile (layout adaptado e otimizado)
 * Cards ajustados para telas pequenas

*=*=*=* Como executar o projeto *=*=*=*

1. Clonar o repositório
git clone https://github.com/gabiru421/game-finder.git

2. Instalar dependências: npm install


3. Criar arquivo .env (coloque sua API KEY do site RAWG)
VITE_RAWG_API_KEY=

4. Rodar o projeto: npm run dev

*=*=*=*=*=*=*=*=*=*

Este projeto usa a API pública da RAWG:

https://rawg.io/apidocs