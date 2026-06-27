const API_KEY =
  import.meta.env.VITE_RAWG_API_KEY;

export async function buscarJogos(
  busca = ""
) {
  const url = busca
    ? `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(
        busca
      )}&page_size=20`
    : `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-rating&page_size=20`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Erro ao consultar API"
    );
  }

  const data = await response.json();

  return data.results;
}