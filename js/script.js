import { fetchCharacters } from './api.js';

const cards = document.getElementById('cards');
const loading = document.getElementById('loading');
const erro = document.getElementById('erro');
const searchInput = document.getElementById('search');
const prevBtn = document.getElementById('prev-btn').querySelector('button');
const nextBtn = document.getElementById('next-btn').querySelector('button');
const pageInfo = document.getElementById('page-info').querySelector('span');

let paginaAtual = 1;
let proximaPagina = null;
let paginaAnterior = null;

async function carregarPersonagens(pagina = 1, nome = '') {
  loading.style.display = 'block';
  cards.innerHTML = '';
  erro.innerHTML = '';

  try {
    const dados = await fetchCharacters(pagina, nome);

    paginaAtual = pagina;
    proximaPagina = dados.info.next;
    paginaAnterior = dados.info.prev;

    mostrarPersonagens(dados.results);
    atualizarBotoesPaginacao();
  } catch (error) {
    if (nome) {
      erro.innerHTML = `
        <div class="alert alert-warning">
          Nenhum personagem encontrado com o nome "${nome}".
        </div>
      `;
    } else {
      erro.innerHTML = `
        <div class="alert alert-danger">
          Erro ao carregar personagens. Tente novamente em alguns instantes.
        </div>
      `;
    }
  } finally {
    loading.style.display = 'none';
  }
}

function mostrarPersonagens(personagens) {
  const resultado = personagens
    .map(personagem => `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow position-relative">
          <img src="${personagem.image}" class="card-img-top" alt="${personagem.name}">
          <div class="card-body">
            <h5 class="card-title">${personagem.name}</h5>
            <p class="card-text"><strong>Status:</strong> ${personagem.status}</p>
            <p class="card-text"><strong>Espécie:</strong> ${personagem.species}</p>
            <a href="detalhes.html?id=${personagem.id}" class="btn btn-primary w-100 mt-3">Ver detalhes</a>
          </div>
        </div>
      </div>
    `)
    .join('');

  cards.innerHTML = resultado;
}

function atualizarBotoesPaginacao() {
  prevBtn.disabled = !paginaAnterior;
  nextBtn.disabled = !proximaPagina;
  pageInfo.textContent = `Página ${paginaAtual}`;
}

prevBtn.addEventListener('click', () => {
  if (paginaAnterior) {
    carregarPersonagens(paginaAtual - 1, searchInput.value);
  }
});

nextBtn.addEventListener('click', () => {
  if (proximaPagina) {
    carregarPersonagens(paginaAtual + 1, searchInput.value);
  }
});

searchInput.addEventListener('input', () => {
  carregarPersonagens(1, searchInput.value);
});

carregarPersonagens();
