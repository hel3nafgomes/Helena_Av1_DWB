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
let todosPessoagens = [];

async function buscarPersonagens(pagina = 1, nome = '') {

  loading.style.display = 'block';
  cards.innerHTML = '';
  erro.innerHTML = '';

  try {

    let url = `https://rickandmortyapi.com/api/character?page=${pagina}`;
    if (nome) {
      url += `&name=${encodeURIComponent(nome)}`;
    }

    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error('Erro ao buscar dados');
    }

    const dados = await resposta.json();

    paginaAtual = pagina;
    proximaPagina = dados.info.next;
    paginaAnterior = dados.info.prev;
    todosPessoagens = dados.results;

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
          Erro ao carregar personagens.
        </div>
      `;
    }

  } finally {

    loading.style.display = 'none';

  }

}

function mostrarPersonagens(personagens) {

  let resultado = '';

  personagens.forEach(personagem => {

    resultado += `
    
      <div class="col-md-4 mb-4">

        <div class="card h-100 shadow">

          <img
            src="${personagem.image}"
            class="card-img-top"
            alt="${personagem.name}"
          >

          <div class="card-body">

            <h5 class="card-title">
              ${personagem.name}
            </h5>

            <p class="card-text">
              <strong>Status:</strong> ${personagem.status}
            </p>

            <p class="card-text">
              <strong>Espécie:</strong> ${personagem.species}
            </p>

          </div>

        </div>

      </div>

    `;

  });

  cards.innerHTML = resultado;

}

function atualizarBotoesPaginacao() {
  prevBtn.disabled = !paginaAnterior;
  nextBtn.disabled = !proximaPagina;
  pageInfo.textContent = `Página ${paginaAtual}`;
}

prevBtn.addEventListener('click', () => {
  if (paginaAnterior) {
    buscarPersonagens(paginaAtual - 1, searchInput.value);
  }
});

nextBtn.addEventListener('click', () => {
  if (proximaPagina) {
    buscarPersonagens(paginaAtual + 1, searchInput.value);
  }
});

searchInput.addEventListener('input', () => {
  buscarPersonagens(1, searchInput.value);
});

buscarPersonagens();