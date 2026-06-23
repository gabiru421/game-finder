function CartaoJogo({ jogo }) {
    return (
      <div className="card">
  
        <img
          src={jogo.thumbnail}
          alt={jogo.title}
        />
  
        <h3>{jogo.title}</h3>
  
        <p>
          <strong>Gênero:</strong> {jogo.genre}
        </p>
  
        <p>
          <strong>Plataforma:</strong> {jogo.platform}
        </p>
  
        <p>
          <strong>Lançamento:</strong> {jogo.release_date}
        </p>
  
      </div>
    );
  }
  
  export default CartaoJogo;