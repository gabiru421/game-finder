import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Detalhes() {
  const { id } = useParams();
  const [jogo, setJogo] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `https://www.freetogame.com/api/game?id=${id}`
      );
      const data = await res.json();
      setJogo(data);
    }

    load();
  }, [id]);

  if (!jogo) return <div className="skeleton-detail"></div>;

  return (
    <div className="details">
      <Link to="/">⬅ Voltar</Link>

      <h1>{jogo.title}</h1>
      <img src={jogo.thumbnail} />

      <p>{jogo.description}</p>

      <p><b>Gênero:</b> {jogo.genre}</p>
      <p><b>Plataforma:</b> {jogo.platform}</p>
    </div>
  );
}