document.addEventListener("DOMContentLoaded", () => {
    loadMainContent(1);
    renderFooterData();
    renderPageCharacters(); 

  });

async function loadMainContent(page) {
  const result = await listCharactersByPage(page);

  const characters = [...result.charactersList].slice(0, 6);
  
  for (const character of characters) {
    const lastEpisodeUrl = character.episode[character.episode.length - 1];

    const episodeName = await getEpisodeDataFromURL(lastEpisodeUrl);

    character.episode = {
      url: lastEpisodeUrl,
      name: episodeName,
    };
  }
  console.log(await listCharactersByPage(1));
  renderCharactersList(characters);
  renderPagination(result.prevPage, result.nextPage);
}

async function renderCharactersList(characters) {
    const row = document.getElementById("list-characters");
    row.innerHTML = "";
  
    for (const character of characters) {
      let nameCharacter = character.name;
      if (nameCharacter.length > 18) {
        nameCharacter = nameCharacter.slice(0, 18).concat("...");
      }
  
      const statusInfo = mapStatus(character.status);
      const speciesText = mapSpecie(character.species);
  
      const episodeName = character.episode.name;
  
      const card = `
        <div class="col d-flex justify-content-center mt-5">
            <div class="card default-card fundo-card card-sm clickable-card" data-character-id="${character.id}" style="cursor: pointer;">
            <img src="${character.image}" class="card-img-top bg-light card-img-top" alt="Foto de ${character.name}">
            <div class="card-body centro mb-3">
              <h5 class="card-title white margem-p"><strong>${nameCharacter}</strong></h5>
              <p class="card-text white">
                <i class="bi bi-circle-fill text-${statusInfo.color}"></i>
                ${statusInfo.text} - ${speciesText}
              </p>
              <p class="card-text grey margem-p">Última localização conhecida</p>
              <p class="card-text white">${character.location.name}</p>
              <p class="card-text grey margem-p">Visto a última vez em:</p>
              <p class="card-text white">${episodeName}</p>
            </div>
          </div>
        </div>
      `;
  
      const col = document.createElement("div");
      col.classList.add("col-12", "col-md-6", "col-lg-4");
      col.innerHTML = card;
      row.appendChild(col);
    }
    makeCardsClickable();
  } 

  function renderPagination(prevPage, nextPage) {
    const prevPageNumber = !prevPage ? 0 : prevPage.split("?page=")[1];
    const nextPageNumber = !nextPage ? 0 : nextPage.split("?page=")[1];
  
    const nav = document.getElementById("pagination");
    nav.innerHTML = "";
    const ul = document.createElement("ul");
    ul.classList.add("pagination", "justify-content-center");
  
    // Botão "Anterior"
    const liPrevPage = document.createElement("li");
    liPrevPage.classList.add("page-item", "bg-dark");
  
    if (!prevPage) {
      liPrevPage.classList.add("disabled");
    }
  
    const buttonPrev = document.createElement("button");
    buttonPrev.setAttribute("type", "button");
    buttonPrev.classList.add("page-link", "text-light", "bg-dark", "border-secondary");
    buttonPrev.innerText = "Anterior";
    buttonPrev.addEventListener("click", () => loadMainContent(prevPageNumber));
  
    liPrevPage.appendChild(buttonPrev);
  
    // Botão "Próxima"
    const liNextPage = document.createElement("li");
    liNextPage.classList.add("page-item", "bg-dark");
  
    if (!nextPage) {
      liNextPage.classList.add("disabled");
    }
  
    const buttonNext = document.createElement("button");
    buttonNext.setAttribute("type", "button");
    buttonNext.classList.add("page-link", "text-light", "bg-dark", "border-secondary");
    buttonNext.innerText = "Próxima";
    buttonNext.addEventListener("click", () => loadMainContent(nextPageNumber));
  
    liNextPage.appendChild(buttonNext);
  
    ul.appendChild(liPrevPage);
    ul.appendChild(liNextPage);
    nav.appendChild(ul);
  }

function viewCharacterDetail(characterId) {
  window.location.href = `detail.html?character=${characterId}`;
}

async function renderPageCharacters(page = 1) {
    const result = await listCharactersByPage(page);
  
    if (result?.charactersList) {
      renderCharactersList(result.charactersList);
    }
  }
  
function makeCardsClickable() {
    const cards = document.querySelectorAll('.clickable-card');
    
    cards.forEach(card => {
      card.addEventListener('click', function() {
        const characterId = this.getAttribute('data-character-id');
        viewCharacterDetail(characterId);
      });
    });
  } 