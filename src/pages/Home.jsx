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

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="logo">🎮 Game Finder</Link>
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

      <div className="grid">
        {filtrados.map((jogo) => (
          <div key={jogo.id} className="card">
            <Link to={`/game/${jogo.id}`}>
              <img src={jogo.thumbnail} />
              <h3>{jogo.title}</h3>
            </Link>

             <button
              className={favoritos.find(f => f.id === jogo.id) ? "favorite" : ""}
              onClick={() => toggleFavorito(jogo)}>
              {favoritos.find(f => f.id === jogo.id) ? "❤️ Favorito" : "🤍 Favoritar"}
             </button>
          </div>
        ))}
      </div>
    </div>
  );
}