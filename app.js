document.addEventListener('DOMContentLoaded', function() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
        .then(response => response.json())
        .then(data => {
            const pokemonArray = data.results;
            const pokemonList = document.getElementById('pokemon-list');

            pokemonArray.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokeData => {
                        const pokemonCard = document.createElement('div');
                        pokemonCard.className = 'pokemon-card';
                        pokemonCard.innerHTML = `
                            <h3>${pokeData.name}</h3>
                            <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
                            <p>HP: ${pokeData.stats[0].base_stat}</p>
                            <p>Attack: ${pokeData.stats[1].base_stat}</p>
                            <p>Defense: ${pokeData.stats[2].base_stat}</p>
                        `;
                        pokemonList.appendChild(pokemonCard);
                    });
            });
        });
});
