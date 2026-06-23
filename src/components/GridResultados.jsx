import CartaoJogo from "./CartaoJogo";

function GridResultados({ jogos }) {
  return (
    <div>
      <p>
        Resultados encontrados: {jogos.length}
      </p>

      <div className="grid">
        {jogos.map((jogo) => (
          <CartaoJogo
            key={jogo.id}
            jogo={jogo}
          />
        ))}
      </div>
    </div>
  );
}

export default GridResultados;