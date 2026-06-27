import { useEffect, useState } from "react";
import { buscarJogos } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";
import { Link } from "react-router-dom";

export default function Home() {
  const [jogos, setJogos] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const [favoritos, setFavoritos] = useState(
    JSON.parse(localStorage.getItem("favoritos")) || []
  );

  const buscaDebounced = useDebounce(busca, 500);

  useEffect(() => {
    async function carregarJogos() {
      try {
        setLoading(true);
        setErro("");

        const dados = await buscarJogos(buscaDebounced);

        setJogos(dados);

        if (
          dados.length === 0 &&
          buscaDebounced.trim() !== ""
        ) {
          setErro(
            `Nenhum jogo encontrado para "${buscaDebounced}"`
          );
        }
      } catch (error) {
        console.error(error);
        setErro("Erro ao buscar jogos.");
      } finally {
        setLoading(false);
      }
    }

    carregarJogos();
  }, [buscaDebounced]);

  const toggleFavorito = (jogo) => {
    let updated;

    if (favoritos.find((f) => f.id === jogo.id)) {
      updated = favoritos.filter(
        (f) => f.id !== jogo.id
      );
    } else {
      updated = [...favoritos, jogo];
    }

    setFavoritos(updated);

    localStorage.setItem(
      "favoritos",
      JSON.stringify(updated)
    );
  };

  const isFavorito = (id) => {
    return favoritos.some(
      (f) => f.id === id
    );
  };

  const renderCard = (jogo) => (
    <div
      key={jogo.id}
      className="card"
    >
      <button
        className={`favorite-btn ${
          isFavorito(jogo.id)
            ? "active"
            : ""
        }`}
        onClick={() =>
          toggleFavorito(jogo)
        }
      >
        {isFavorito(jogo.id)
          ? "❤️"
          : "🤍"}
      </button>

      <Link
        to={`/game/${jogo.id}`}
        className="card-link"
      >
        <img
          src={jogo.background_image}
          alt={jogo.name}
        />

        <div className="card-content">
          <h3>{jogo.name}</h3>

          <div className="game-info">
            <span>
              ⭐ {jogo.rating}
            </span>

            <span>
              📅 {jogo.released}
            </span>
          </div>

          <div className="genres">
            {jogo.genres
              ?.slice(0, 2)
              .map((genre) => (
                <span
                  key={genre.id}
                  className="genre-tag"
                >
                  {genre.name}
                </span>
              ))}
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <div className="container">
      <header className="header">
        <Link
          to="/"
          className="logo"
        >
          🎮 Game Finder
        </Link>

        <div className="header-actions">
          <div className="favorites-counter">
            ❤️ {favoritos.length}
          </div>
        </div>
      </header>

      <div className="search-container">
        <input
          className="search"
          placeholder="Buscar jogos..."
          value={busca}
          onChange={(e) =>
            setBusca(e.target.value)
          }
        />
      </div>

      {erro && (
        <div className="erro">
          {erro}
        </div>
      )}

      {loading && (
        <div className="grid">
          {[1, 2, 3, 4, 5, 6].map(
            (i) => (
              <div
                key={i}
                className="skeleton"
              ></div>
            )
          )}
        </div>
      )}

      {!loading &&
        jogos.length > 0 && (
          <>
            <div className="results-header">
              <h2>
                {busca
                  ? `Resultados (${jogos.length})`
                  : "Jogos Populares"}
              </h2>
            </div>

            <div className="grid">
              {jogos.map(renderCard)}
            </div>
          </>
        )}
    </div>
  );
}