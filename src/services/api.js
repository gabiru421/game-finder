export async function getJogos() {
    const res = await fetch("https://www.freetogame.com/api/games");
    return res.json();
  }