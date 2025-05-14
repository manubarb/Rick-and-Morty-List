document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector('.esse');
  const searchIcon = document.querySelector('.input-group-text a');
  const form = document.querySelector('form');

  async function handleSearch() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      
      if (!searchTerm) {
          loadMainContent(1);
          return;
      }

      const filtered = allCharacters.filter(character => {
          return character.name.toLowerCase().includes(searchTerm);
      });

      const charactersWithEpisodes = await Promise.all(
          filtered.slice(0, 6).map(async character => {
              const lastEpisodeUrl = character.episode[character.episode.length - 1];
              const episodeName = await getEpisodeDataFromURL(lastEpisodeUrl);
              return {
                  ...character,
                  episode: {
                      url: lastEpisodeUrl,
                      name: episodeName
                  }
              };
          })
      );

      renderCharactersList(charactersWithEpisodes);
  }

  searchInput.addEventListener('input', fast(handleSearch, 300));
  searchIcon.addEventListener('click', function(e) {
      e.preventDefault();
      handleSearch();
  });
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      handleSearch();
  });

  function fast(func, wait) {
      let timeout;
      return function() {
          const context = this, args = arguments;
          clearTimeout(timeout);
          timeout = setTimeout(() => {
              func.apply(context, args);
          }, wait);
      };
  }
    loadMainContent(1);
    renderFooterData();
    renderPageCharacters(); 
  });

// Adicione no início do arquivo
let allCharacters = [];

// Modifique a função loadMainContent
async function loadMainContent(page) {
  const result = await listCharactersByPage(page);
  
  // Armazene todos os personagens carregados
  allCharacters = [...result.charactersList];
  
  const characters = allCharacters.slice(0, 6);
  
  for (const character of characters) {
    const lastEpisodeUrl = character.episode[character.episode.length - 1];
    const episodeName = await getEpisodeDataFromURL(lastEpisodeUrl);
    character.episode = {
      url: lastEpisodeUrl,
      name: episodeName,
    };
  }
  
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