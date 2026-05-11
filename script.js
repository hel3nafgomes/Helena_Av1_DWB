const cards = document.getElementById('cards');
const loading = document.getElementById('loading');
const erro = document.getElementById('erro');

async function buscarPersonagens() {

  try {

    const resposta = await fetch(
      'https://rickandmortyapi.com/api/character'
    );

    if (!resposta.ok) {
      throw new Error('Erro ao buscar dados');
    }

    const dados = await resposta.json();

    mostrarPersonagens(dados.results);

  } catch (error) {

    erro.innerHTML = `
      <div class="alert alert-danger">
        Erro ao carregar personagens.
      </div>
    `;

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

buscarPersonagens();