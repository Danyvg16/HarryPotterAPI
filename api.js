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
        console.log('characters');
    }).catch(error =>{
        console.log('Hay un problema', error);
    });

    function allCharacters(charactersToShow){
        console.log(allCharacters, "allCharacters")
        characterCards.innerHTML = '';
        charactersToShow.forEach(showCharacters => {
            console.log("Create cards by search")
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
        <p class="card-text">Varita: ${character.wand.wood || 'No se tiene esa información'}, ${character.wand.core || 'No se tiene esa información'}</p>
        <p class="card-text">Patronus:${character.patronus || 'No se tiene esa información'} </p>
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
