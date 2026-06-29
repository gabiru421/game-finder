import { useEffect, useState } from "react";
import { buscarJogos } from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [jogos, setJogos] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  const [favoritos, setFavoritos] = useState(
    JSON.parse(localStorage.getItem("favoritos")) || []
  );

  useEffect(() => {
    carregarJogos();
  }, []);

  async function carregarJogos() {
    try {
      setLoading(true);
      setErro("");

      const dados = await buscarJogos();
      setJogos(dados);

    } catch (err) {
      setErro("Erro ao carregar jogos.");
    } finally {
      setLoading(false);
    }
  }

  async function handleBuscar(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setErro("");

      const dados = await buscarJogos(busca);
      setJogos(dados);

    } catch (err) {
      setErro("Erro ao buscar jogos.");
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorito(jogo) {
    const existe = favoritos.some(f => f.id === jogo.id);

    const novos = existe
      ? favoritos.filter(f => f.id !== jogo.id)
      : [...favoritos, jogo];

    setFavoritos(novos);
    localStorage.setItem("favoritos", JSON.stringify(novos));
  }

  function isFavorito(id) {
    return favoritos.some(f => f.id === id);
  }

  const categorias = [
    "Todos",
    "Action",
    "RPG",
    "Shooter",
    "Indie",
    "Adventure",
    "Strategy",
    "Racing"
  ];

  const jogosFiltrados = jogos.filter(jogo => {
    const matchCategoria =
      categoria === "Todos"
        ? true
        : jogo.genres?.some(g => g.name === categoria);

    return matchCategoria;
  });

  return (
    <div className="container">

      
      <header className="header">
        <Link to="/" className="logo">
           Game Finder
        </Link>

        <Link to="/Favoritos" className="favorites-counter">
            ❤️ Favoritos 
        </Link>
      </header>

      
      <section className="hero">
        <img src="/hero.png" alt="banner" className="hero-img" />

        <div className="hero-overlay">
         <form className="search-container" onSubmit={handleBuscar}>
            <input
              className="search"
              placeholder="Buscar jogos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />

              <button className="search-btn">🔍 Buscar</button>
          </form>
        </div>
      </section>

      
      <div className="categories">
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={categoria === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      
      {erro && <div className="erro">{erro}</div>}

      
      {loading && (
        <div className="grid">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="skeleton"></div>
          ))}
        </div>
      )}

      
      {!loading && (
        <>
          <div className="section-title">
            <h2>🔥 Jogos</h2>
            <span>{jogosFiltrados.length} encontrados</span>
          </div>

          <div className="grid">
            {jogosFiltrados.map(jogo => (
              <div key={jogo.id} className="card">

                <button
                  className={`favorite-btn ${isFavorito(jogo.id) ? "active" : ""}`}
                  onClick={() => toggleFavorito(jogo)}
                >
                  {isFavorito(jogo.id) ? "❤️" : "🤍"}
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