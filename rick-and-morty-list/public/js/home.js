import { getCharacters, getCharacter } from 'rickmortyapi';
//exibir dinamicamente os cards
async function loadCards() {
    try {
        const response = await getCharacters();
        const results = response.data.results;

        showCards(results); 
    } catch (error) {
        console.error('erro:', error);
    }
}

function showCards(res){
    const containerTop = document.getElementById('cima');
    const containerBottom = document.getElementById('baixo');

    containerTop.innerHTML = ''; 
    containerBottom.innerHTML = ''; 

    const topCards = res.slice(0, 3); 
    const bottomCards = res.slice(3, 6); 

    topCards.forEach(async character => {
        const epName = await getEpName(character.episode[0]);
        const contentTop = `
        <div class="col-md-3 d-flex justify-content-center mt-5">
            <div class="card default-card fundo-card borda card-sm">
                <img src="${character.image}" class="card-img-top bg-light card-img-top" alt="${character.name}">
                <div class="card-body centro mb-3">
                    <h5 class="card-title white margem-p"><strong>${character.name}</strong></h5>
                    <p class="card-text white">${character.status} - ${character.species}</p>
                    <p class="card-text grey margem-p">Última localização conhecida: ${character.location.name}</p>
                    <p class="card-text white">${character.origin.name}</p>
                    <p class="card-text grey margem-p">Visto a última vez em:</p>
                    <p class="card-text white">${epName}</p>
                </div>
            </div>
        </div>
        `;
        containerTop.innerHTML += contentTop; 
    });

    bottomCards.forEach(async character => {
        const epName = await getEpName(character.episode[0]);
        const contentBottom = `
        <div class="col-md-3 d-flex justify-content-center mt-4">
            <div class="card default-card fundo-card borda card-sm">
                <img src="${character.image}" class="card-img-top bg-light card-img-top" alt="${character.name}">
                <div class="card-body centro mb-3">
                    <h5 class="card-title white margem-p"><strong>${character.name}</strong></h5>
                    <p class="card-text white">${character.status} - ${character.species}</p>
                    <p class="card-text grey margem-p">Última localização conhecida: ${character.location.name}</p>
                    <p class="card-text white">${character.origin.name}</p>
                    <p class="card-text grey margem-p">Visto a última vez em:</p>
                    <p class="card-text white">${epName}</p>
                </div>
            </div>
        </div>
        `;
        containerBottom.innerHTML += contentBottom; 
    });
}

async function getEpName(url) {
    try {
        const resposta = await fetch(url);
        const data = await resposta.json();
        return data.name;
    } catch (error) {
        console.error('erro:', error);
    }
}
loadCards();

//searchbar
const form = document.getElementById("form")

function searchCard(res) {
    const containerTop = document.getElementById('cima');
    const containerBottom = document.getElementById('baixo');

    containerTop.innerHTML = ''; 
    containerBottom.innerHTML = ''; 

    const topCards = res.slice(0, 3); 
    const bottomCards = res.slice(3, 6); 

    topCards.forEach(character => {
        const contentTop = `
        <div class="col-md-3 d-flex justify-content-center mt-5">
            <div class="card default-card fundo-card borda card-sm">
                <img src="${character.image}" class="card-img-top bg-light card-img-top" alt="${character.name}">
                <div class="card-body centro mb-3">
                    <h5 class="card-title white margem-p"><strong>${character.name}</strong></h5>
                    <p class="card-text white">${character.status} - ${character.species}</p>
                    <p class="card-text grey margem-p">Última localização conhecida: ${character.location.name}</p>
                    <p class="card-text white">${character.origin.name}</p>
                    <p class="card-text grey margem-p">Visto a última vez em:</p>
                    <p class="card-text white">${character.episode[0]}</p>
                </div>
            </div>
        </div>
        `;
        containerTop.innerHTML += contentTop; 
    });

    bottomCards.forEach(character => {
        const contentBottom = `
        <div class="col-md-3 d-flex justify-content-center mt-4">
            <div class="card default-card fundo-card borda card-sm">
                <img src="${character.image}" class="card-img-top bg-light card-img-top" alt="${character.name}">
                <div class="card-body centro mb-3">
                    <h5 class="card-title white margem-p"><strong>${character.name}</strong></h5>
                    <p class="card-text white">${character.status} - ${character.species}</p>
                    <p class="card-text grey margem-p">Última localização conhecida: ${character.location.name}</p>
                    <p class="card-text white">${character.origin.name}</p>
                    <p class="card-text grey margem-p">Visto a última vez em:</p>
                    <p class="card-text white">${character.episode[0]}</p>
                </div>
            </div>
        </div>
        `;
        containerBottom.innerHTML += contentBottom; 
    });
}

form.addEventListener('click', function (event) {
    event.preventDefault();
    
    let searchBar = document.getElementById("search").value.trim();
    if(searchBar){
        getCharacter({ name: searchBar })
        .then(response => {
            const resposta = response.data.results;
            searchCard(resposta);
        })
        .catch(error => {
            console.error('erro', error);
        });
    }

})
// paginaçao dos cards
// script do footer