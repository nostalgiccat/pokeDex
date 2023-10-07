let offset = 0; 
let pageNumber = 1;

function fetchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
        
        .then(response => response.json())
        .then(data => {
            const pokemonArray = data.results;
            const pokemonList = document.getElementById('pokemon-list');
            pokemonList.innerHTML = '';

            pokemonArray.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokeData => {
                        const pokemonCard = document.createElement('div');
                        
                        pokemonCard.className = 'pokemon-card';
                        pokemonCard.innerHTML = `
                            <h3>${pokeData.name}</h3>
                            <img src="${pokeData.sprites.other.dream_world.front_default}" alt="${pokeData.name}">
                            <p>HP: ${pokeData.stats[0].base_stat}</p>
                            <p>Attack: ${pokeData.stats[1].base_stat}</p>
                            <p>Defense: ${pokeData.stats[2].base_stat}</p>
                            <p>Special Attack: ${pokeData.stats[3].base_stat}</p>
                        `;
                        
                        pokemonList.appendChild(pokemonCard);
                    });
            });
        });
}


document.addEventListener('DOMContentLoaded', fetchPokemon());


document.getElementById("next").addEventListener("click", function(){
    console.log("next");
    offset = offset + 20;

    fetchPokemon()

})

document.getElementById("previous").addEventListener("click", function(){
    console.log("previous");
    if (offset >= 20) {
        offset = offset-20;

        fetchPokemon();
    }
})