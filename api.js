let characters = [];
const characterCards = document.getElementById('characterCards');

fetch('https://hp-api.onrender.com/api/characters').then(
    response => {
        if(!response.ok){
            throw new Error ('El servicio no esta respondiendo correctamente');
        }
        return response.json();
    }).then(data =>{
        characters = data;
        allCharacters(characters);
    }).catch(error =>{
    });

    function allCharacters(charactersToShow){
        characterCards.innerHTML = '';
        charactersToShow.forEach(showCharacters => {
            const card = createCard(showCharacters);
            characterCards.innerHTML += card
        })

    }

    function createCard (character){
        return `
        <div class="card" style="width: 18rem; height">
        <img src="${character.image || './img/profile.jpg'}" class="card-img-top" alt="${character.name}">
        <div class="card-body">
        <h5 class="card-title">${character.name}</h5>
        <p class="card-text">Casa:${character.house || 'No se tiene esa información'} </p>
        <p class="card-text">Ansestros:${character.ancestry || 'No se tiene esa información'} </p>
        <p class="card-text">Patronus:${character.patronus || 'No se tiene esa información'} </p>
        <button class="more-info" data-character-id="${character.name}">Más Info</button>
        </div>
        </div>
        </div>
        `;
    }

  document.getElementById('SearchCharacter').addEventListener('click', () => {
    const searchSomeCharacters = document.getElementById('searchInput').value.toLowerCase();
    const filteredCharacters = characters.filter(character => {
        const characterInfo = `${character.name} ${character.house} ${character.ancestry}`;
      return characterInfo.toLowerCase().includes(searchSomeCharacters);
    });
    allCharacters(filteredCharacters);
  });

  
  houseFilter.addEventListener('change', () => {
    const selectedHouse = houseFilter.value;
    let filteredCharacters = characters;
    if (selectedHouse) {
        filteredCharacters = characters.filter(character => {
            return character.house === selectedHouse;
        });
    }
    allCharacters(filteredCharacters);
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('more-info')) {
        const characterName = event.target.dataset.characterId;
        const character = characters.find(c => c.name === characterName);
        if (character) {
            showCharacterDetails(character);
        }
    }
});

function showCharacterDetails(character) {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade', 'show');
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${character.name}</h5>
                    <button type="button" class="btn-close close-modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img src="${character.image || './img/profile.jpg'}" class="img-fluid mb-3" alt="${character.name}">
                    <p>Casa: ${character.house || 'No se tiene esa información'}</p>
                    <p>Estudiante: ${character.hogwartsStudent || 'No se tiene esa información'}</p>
                    <p>Ansestros: ${character.ancestry || 'No se tiene esa información'}</p>
                    <p>Varita: ${character.wand.wood || 'No se tiene esa información'}, ${character.wand.core || 'No se tiene esa información'}</p>
                    <p>Patronus: ${character.patronus || 'No se tiene esa información'}</p>
                    <p>Actor: ${character.actor || 'No se tiene esa información'}</p>
                    <p>Especie: ${character.species || 'No se tiene esa información'}</p>
                    <p>Genero: ${character.gender || 'No se tiene esa información'}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger close-modal">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            modal.remove();
        });
    });
}