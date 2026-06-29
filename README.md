## Buscador de Jogos (React + Vite) ##

Aplicação web desenvolvida com React + Vite para descobrir, pesquisar e favoritar jogos utilizando a API da RAWG.

O projeto oferece uma experiência inspirada em plataformas como Steam e Epic Games, com interface moderna, responsiva e foco na experiência do usuário.


Demonstração: 

online: gamefinderproject.vercel.app

 * Página inicial com jogos populares
 * Busca de jogos em tempo real
 * Sistema de favoritos (localStorage)
 * Página de detalhes dos jogos
 * Interface responsiva (desktop e mobile)

Tecnologias utilizadas
 * React
 * React Router DOM
 * Vite
 * JavaScript (ES6+)
 * CSS 
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
 * Nota, data de lançamento e metacritic
 * Lista de gêneros e plataformas
 * Barra de busca integrada


O projeto foi otimizado para:

 * Desktop (layout completo em grid)
 * Mobile (layout adaptado e otimizado)
   
*=*=*=* Como executar o projeto *=*=*=*

1. Clonar o repositório
git clone https://github.com/gabiru421/game-finder.git

2. Instalar dependências: npm install

3. Rodar o projeto: npm run dev

Caso necessário crie o arquivo .env (coloque sua API KEY do site RAWG)
VITE_RAWG_API_KEY=sua_api_aqui

*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*

Este projeto usa a API pública da RAWG:

https://rawg.io/apidocs

Desenvolvido por Gabriel Wazny como parte da aula de desinvolvimento de sistemas
