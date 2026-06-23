import { useState } from "react";
import Buscador from "./components/Buscador";
import GridResultados from "./components/GridResultados";
import "./App.css";

function App() {

  const [busca, setBusca] = useState("");
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function buscarJogos(event) {
    event.preventDefault();
  
    try {
      setErro("");
      setLoading(true);
  
      const response = await fetch(
        "https://www.freetogame.com/api/games"
      );
  
      const data = await response.json();
  
      const jogosFiltrados = data.filter((jogo) =>
        jogo.title
          .toLowerCase()
          .includes(busca.toLowerCase())
      );
  
      if (jogosFiltrados.length === 0) {
        setErro("Nenhum jogo encontrado.");
      }
  
      setJogos(jogosFiltrados);
  
    } catch (error) {
      setErro("Erro ao buscar jogos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
  
      <h1>Game Finder</h1>
  
      <Buscador
        busca={busca}
        setBusca={setBusca}
        onBuscar={buscarJogos}
      />
  
      {erro && <p className="erro">{erro}</p>}
  
      {loading && <p>Carregando jogos...</p>}
  
      <GridResultados jogos={jogos} />
  
    </div>
  );
}

export default App;