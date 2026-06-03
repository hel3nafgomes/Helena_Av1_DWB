const BASE_URL = 'https://rickandmortyapi.com/api/character';

async function safeFetch(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Erro na requisição');
  }
  return response.json();
}

export async function fetchCharacters(page = 1, name = '') {
  let url = `${BASE_URL}?page=${page}`;
  if (name) {
    url += `&name=${encodeURIComponent(name)}`;
  }
  return safeFetch(url);
}

export async function fetchCharacterById(id) {
  if (!id) {
    throw new Error('ID de personagem inválido');
  }
  return safeFetch(`${BASE_URL}/${encodeURIComponent(id)}`);
}
