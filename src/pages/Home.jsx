import { useEffect, useState } from "react";
import { getJogos } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";
import { Link } from "react-router-dom";

export default function Home() {
  const [jogos, setJogos] = useState([]);
  const [busca, setBusca] = useState("");
  const [favoritos, setFavoritos] = useState(
    JSON.parse(localStorage.getItem("favoritos")) || []
  );
  const [loading, setLoading] = useState(true);

  const buscaDebounced = useDebounce(busca, 300);

  useEffect(() => {
    async function load() {
      const data = await getJogos();
      setJogos(data);
      setLoading(false);
    }
    load();
  }, []);

  const toggleFavorito = (jogo) => {
    let updated;

    if (favoritos.find((f) => f.id === jogo.id)) {
      updated = favoritos.filter((f) => f.id !== jogo.id);
    } else {
      updated = [...favoritos, jogo];
    }

    setFavoritos(updated);
    localStorage.setItem("favoritos", JSON.stringify(updated));
  };

  const filtrados = jogos.filter((j) =>
    j.title.toLowerCase().includes(buscaDebounced.toLowerCase())
  );

  const shooters = filtrados.filter(
   (jogo) => jogo.genre === "Shooter"
  );

  const mmorpg = filtrados.filter(
   (jogo) => jogo.genre === "MMORPG"
  );

  const strategy = filtrados.filter(
   (jogo) => jogo.genre === "Strategy"
  );

  const racing = filtrados.filter(
   (jogo) => jogo.genre === "Racing"
  );

  const renderCard = (jogo) => (
    <div key={jogo.id} className="card">
      <Link to={`/game/${jogo.id}`}>
        <img src={jogo.thumbnail} alt={jogo.title} />
         <h3>{jogo.title}</h3>
         {/*<p>{jogo.genre}</p>*/}
      </Link>

      <button
        className={
          favoritos.find((f) => f.id === jogo.id)
            ? "favorite"
            : ""
        }
        onClick={() => toggleFavorito(jogo)}>
        {favoritos.find((f) => f.id === jogo.id)
          ? "❤️ Favorito"
          : "🤍 Favoritar"
        }
      </button>
    </div>
  );

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="logo">
         🎮 Game Finder
        </Link>

       <div className="header-actions">
          <span className="favorites-counter">
           ❤️ {favoritos.length}
          </span>
        </div>
      </header>

      <input
        className="search"
        placeholder="Buscar jogos..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {loading && <div className="grid">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="skeleton"></div>
        ))}
      </div>}
      
      <section className="category">
        <h2>🔥 Shooters</h2>

        <div className="grid">
          {shooters.slice(0, 8).map(renderCard)}
        </div>
      </section>

      <section className="category">
       <h2>⚔️ MMORPG</h2>

        <div className="grid">
          {mmorpg.slice(0, 8).map(renderCard)}
        </div>
      </section>

      <section className="category">
        <h2>🧠 Strategy</h2>

        <div className="grid">
          {strategy.slice(0, 8).map(renderCard)}
        </div>
      </section>

      <section className="category">
        <h2>🏎️ Racing</h2>

        <div className="grid">
          {racing.slice(0, 8).map(renderCard)}
        </div>
      </section>
      
    </div>
  );
}