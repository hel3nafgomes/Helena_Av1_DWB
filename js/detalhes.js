import { fetchCharacterById } from './api.js';

const loading = document.getElementById('loading');
const erro = document.getElementById('erro');
const detalheContainer = document.getElementById('detalhe-container');

async function carregarDetalhes() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  loading.style.display = 'block';
  erro.innerHTML = '';
  detalheContainer.innerHTML = '';

  if (!id) {
    erro.innerHTML = `
      <div class="alert alert-warning">
        ID do personagem não informado na URL.
      </div>
    `;
    loading.style.display = 'none';
    return;
  }

  try {
    const personagem = await fetchCharacterById(id);
    detalheContainer.innerHTML = `
      <div class="col-md-8 offset-md-2">
        <div class="card shadow-lg">
          <img src="${personagem.image}" class="card-img-top" alt="${personagem.name}">
          <div class="card-body">
            <h2 class="card-title">${personagem.name}</h2>
            <p class="card-text"><strong>Status:</strong> ${personagem.status}</p>
            <p class="card-text"><strong>Espécie:</strong> ${personagem.species}</p>
            <p class="card-text"><strong>Gênero:</strong> ${personagem.gender}</p>
            <p class="card-text"><strong>Origem:</strong> ${personagem.origin.name}</p>
            <p class="card-text"><strong>Localização:</strong> ${personagem.location.name}</p>
            <p class="card-text"><strong>Quantidade de episódios:</strong> ${personagem.episode.length}</p>
            <p class="card-text"><strong>Criação:</strong> ${new Date(personagem.created).toLocaleDateString('pt-BR')}</p>
            <a href="index.html" class="btn btn-primary mt-3">Voltar para lista</a>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    erro.innerHTML = `
      <div class="alert alert-danger">
        Não foi possível carregar os detalhes do personagem.
      </div>
    `;
  } finally {
    loading.style.display = 'none';
  }
}

carregarDetalhes();
