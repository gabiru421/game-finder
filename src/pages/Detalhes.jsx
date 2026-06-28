import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export default function Detalhes() {
  const { id } = useParams();

  const [jogo, setJogo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [favoritos, setFavoritos] = useState(
    JSON.parse(localStorage.getItem("favoritos")) || []
  );

  useEffect(() => {
    async function carregarJogo() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );

        const data = await response.json();

        setJogo(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregarJogo();
  }, [id]);

  function isFavorito() {
    return favoritos.some(
      (f) => f.id === jogo?.id
    );
  }

  function toggleFavorito() {
    let atualizados;

    if (isFavorito()) {
      atualizados = favoritos.filter(
        (f) => f.id !== jogo.id
      );
    } else {
      atualizados = [...favoritos, jogo];
    }

    setFavoritos(atualizados);

    localStorage.setItem(
      "favoritos",
      JSON.stringify(atualizados)
    );
  }

  if (loading) {
    return (
      <div className="details-loading">
        Carregando jogo...
      </div>
    );
  }

  if (!jogo) {
    return (
      <div className="details-loading">
        Erro ao carregar jogo.
      </div>
    );
  }

  return (
    <div className="container">

      <header className="header">
        <Link
          to="/"
          className="logo"
        >
           Game Finder
        </Link>

        <Link to="/Favoritos" className="favorites-counter">
          ❤️ Favoritos 
        </Link>
      </header>

      <div className="details">

        <Link
          to="/"
          className="back-btn"
        >
          ⬅ Voltar
        </Link>

        <div className="details-header">

          <h1>{jogo.name}</h1>

          <button
            className={`favorite-detail-btn ${
              isFavorito() ? "active" : ""
            }`}
            onClick={toggleFavorito}
          >
            {isFavorito()
              ? "❤️ Remover Favorito"
              : "🤍 Favoritar"}
          </button>

        </div>

        <img
          src={jogo.background_image}
          alt={jogo.name}
          className="details-image"
        />

        <div className="details-stats">

          <div className="stat-card">
            ⭐ Nota
            <strong>{jogo.rating}</strong>
          </div>

          <div className="stat-card">
            🎮 Metacritic
            <strong>{jogo.metacritic || "-"}</strong>
          </div>

          <div className="stat-card">
            📅 Lançamento
            <strong>{jogo.released}</strong>
          </div>

        </div>

        <h2>Descrição</h2>

        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: jogo.description || ""
          }}
        />

        <h2>Gêneros</h2>

        <div className="genres">
          {jogo.genres?.map((genre) => (
            <span
              key={genre.id}
              className="genre-tag"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <h2>Plataformas</h2>

        <div className="genres">
          {jogo.platforms?.map((platform) => (
            <span
              key={platform.platform.id}
              className="genre-tag"
            >
              {platform.platform.name}
            </span>
          ))}
        </div>

      </div>
      <footer className="footer">
        <p>© 2026 Game Finder — Desenvolvido por Gabriel Wazny</p>
        <p>Projeto criado para fins de estudo utilizando React + RAWG API.</p>
      </footer>

    </div>
  );
}