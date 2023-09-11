const loadMoreButton = document.getElementById('loadmorebutton');
const pokemonList = document.getElementById('pokemonList');
const maxLimit = 151;
const limit = 20;
let offset = 0;

function createPokemonButton(pokemon) {
    const buttonStats = document.createElement('button');
    buttonStats.classList.add('pokemonStats');
    buttonStats.setAttribute('type', 'button');
    buttonStats.innerHTML = `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;

    buttonStats.addEventListener('click', () => {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modalContent');

        modalContent.innerHTML = `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <ol class="abilities">
                        <span class="tittle-abilities">Habilidades:</span>
                        ${pokemon.abilities.map((ability) => `<li class="abilities${ability}">${ability}</li>`).join('')}
                    </ol>
                    <ol class="statsName">
                        <span class="tittle-stats">Status:</span>
                        ${pokemon.stat.map((nameStats) => `<li class="statsName${nameStats}">${nameStats}</li>`).join('')}
                    </ol>
                    <ol class="stats">
                        <div style="width: 10px; height: 10px;"></div>
                        ${pokemon.stats.map((baseStat) => `<li class="numberBar">${baseStat}</li>`).join('')}
                    </ol>
                </div>
            </li>
        `;

        modal.style.display = 'block';
    });

    return buttonStats;
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const fragment = document.createDocumentFragment();

        pokemons.forEach((pokemon) => {
            const buttonStats = createPokemonButton(pokemon);
            fragment.appendChild(buttonStats);
        });

        pokemonList.appendChild(fragment);
    });
}

loadPokemonItems(offset, limit);

// Encontre o elemento do botão "X" no modal
const closeModalButton = document.querySelector('.closeModal');

// Encontre o elemento do modal
const modal = document.getElementById('modal');

// Adicione um evento de clique ao botão "X" para fechar o modal
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Atualize a variável closeModalButton para o botão no modal
const closeModalButtonInModal = document.getElementById('closeModal');

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdLimit = offset + limit;

    if (qtdLimit >= maxLimit) {
        const newLimit = maxLimit - offset;
        loadPokemonItems(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit);
    }
});

closeModalButtonInModal.addEventListener('click', () => {
    modal.style.display = 'none';
});
