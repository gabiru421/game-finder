function Buscador({
    busca,
    setBusca,
    onBuscar
  }) {
    return (
      <form onSubmit={onBuscar}>
        <input
          type="text"
          placeholder="Digite o nome de um jogo"
          value={busca}
          onChange={(event) =>
            setBusca(event.target.value)
          }
        />
  
        <button type="submit">
          Buscar
        </button>
      </form>
    );
  }
  
  export default Buscador;