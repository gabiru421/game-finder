import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export default function Detalhes() {
  const { id } = useParams();

  const [jogo, setJogo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarJogo() {
      try {
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

  if (loading) {
    return (
      <div className="skeleton-detail">
        Carregando...
      </div>
    );
  }

  if (!jogo) {
    return (
      <div className="details">
        Erro ao carregar jogo.
      </div>
    );
  }

  return (
    <div className="details">

      <Link to="/">
        ⬅ Voltar
      </Link>

      <h1>{jogo.name}</h1>

      <img
        src={jogo.background_image}
        alt={jogo.name}
      />

      <p>
        ⭐ Nota: {jogo.rating}
      </p>

      <p>
        📅 Lançamento: {jogo.released}
      </p>

      <p>
        🎮 Metacritic: {jogo.metacritic}
      </p>

      <p>
        <strong>Descrição:</strong>
      </p>

      <div
        dangerouslySetInnerHTML={{
          __html:
            jogo.description || ""
        }}
      />

      <p>
        <strong>Plataformas:</strong>{" "}
        {jogo.platforms
          ?.map(
            (p) =>
              p.platform.name
          )
          .join(", ")}
      </p>

      <p>
        <strong>Gêneros:</strong>{" "}
        {jogo.genres
          ?.map((g) => g.name)
          .join(", ")}
      </p>

    </div>
  );
}