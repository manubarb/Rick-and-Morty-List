//script do card selecionado
document.addEventListener("DOMContentLoaded", main);
document.getElementById("btn-return").addEventListener("click", returnToMainPage);

async function main() {
  const params = new URLSearchParams(window.location.search);

  const characterId = params.get("character");

  if (!characterId) {
    window.location.href = "home.html";
  }

  loadMainContent(characterId);
  renderFooterData();
}

async function loadMainContent(characterId) {
  const character = await getCharacterById(characterId);

  const lastEpisodeUrl = character.episode[character.episode.length - 1];

  const episodeName = await getEpisodeDataFromURL(lastEpisodeUrl);

  character.episode = {
    url: lastEpisodeUrl,
    name: episodeName,
  };

  renderCardCharacter(character);
}

function renderCardCharacter(character) {
    const row = document.getElementById("character-detail");
    row.innerHTML = "";
  
    const statusInfo = mapStatus(character.status); 
    const speciesText = mapSpecie(character.species); 
  
    const card = `
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <div class="col d-flex justify-content-center">
          <div class="card default-card fundo-card card-sm">
            <img src="${character.image}" class="card-img-top bg-light card-img-top" alt="Foto de ${character.name}">
            <div class="card-body centro mb-3">
              <h5 class="card-title white margem-p"><strong>${character.name}</strong></h5>
              <p class="card-text white">
                <i class="bi bi-circle-fill text-${statusInfo.color}"></i>
                ${statusInfo.text} - ${speciesText}
              </p>
              
              <p class="card-text grey margem-p">Última localização conhecida</p>
              <p class="card-text white">${character.location.name}</p>
              
              <p class="card-text grey margem-p">Visto a última vez em:</p>
              <p class="card-text white">${character.episode.name}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  
  row.innerHTML = card;


  row.appendChild(col);
}

function returnToMainPage() {
  window.location.href = "home.html";
}