import { Link } from "react-router-dom";
import { useState } from "react";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState(
    JSON.parse(localStorage.getItem("favoritos")) || []
  );

  function removerFavorito(id) {
    const atualizados = favoritos.filter(jogo => jogo.id !== id);

    setFavoritos(atualizados);
    localStorage.setItem("favoritos", JSON.stringify(atualizados));
  }

  return (
    <div className="container">

      
      <header className="header">
        <Link to="/" className="logo">
           Game Finder
        </Link>
      </header>

      
        <section className="favorites-hero">

          <div className="favorites-overlay">

            <span className="favorites-badge">
              ❤️ Biblioteca Pessoal
            </span>

            <h1>
              Seus Jogos Favoritos
            </h1>

            <p>
              Todos os jogos que você marcou como favoritos ficam
              salvos aqui para acesso rápido.
            </p>

            <div className="favorites-stats">
              <div className="stat-box">
                <strong>{favoritos.length}</strong>
                <span>Jogos Salvos</span>
              </div>
            </div>

          </div>  

        </section>

      
      {favoritos.length === 0 ? (
        <div className="empty-state">

          <div className="empty-icon">💔</div>

          <h2>Sua biblioteca está vazia</h2>

          <p>
            Adicione jogos aos favoritos para criar sua coleção pessoal.
          </p>

          <Link to="/" className="back-home-btn">
            🎮 Explorar Jogos
          </Link>

        </div>
      ) : (
        <>
          
          <div className="section-title">
            <h2>⭐ Meus Jogos Favoritos </h2>
            
          </div>

          
          <div className="grid">
            {favoritos.map(jogo => (
              <div key={jogo.id} className="card">

                
                <button
                  className="favorite-btn active"
                  onClick={() => removerFavorito(jogo.id)}
                >
                  ❌
                </button>

                <Link to={`/game/${jogo.id}`} className="card-link">

                  <img src={jogo.background_image} alt={jogo.name} />

                  <div className="card-content">
                    <h3>{jogo.name}</h3>

                    <div className="game-info">
                      <span>⭐ {jogo.rating}</span>
                      <span>📅 {jogo.released}</span>
                    </div>

                    <div className="genres">
                      {jogo.genres?.slice(0,2).map(g => (
                        <span key={g.id} className="genre-tag">
                          {g.name}
                        </span>
                      ))}
                    </div>

                  </div>

                </Link>

              </div>
            ))}
          </div>
        </>
      )}

      
      <footer className="footer">
        <p>© 2026 Game Finder — Desenvolvido por Gabriel Wazny</p>
         <p>Projeto criado para fins de estudo utilizando React + RAWG API.</p>
      </footer>

    </div>
  );
}