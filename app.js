let offset = 0; 
let pageNumber = 1;

function fetchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
        .then(response => response.json())
        .then(data => {
            const pokemonArray = data.results;
            const pokemonList = document.getElementById('pokemon-list');
            pokemonList.innerHTML = '';

            // Create an array of promises
            const arrayOfPromises = pokemonArray.map(pokemon => fetch(pokemon.url).then(response => response.json()));

            // Wait for all promises to complete
            Promise.all(arrayOfPromises)
                .then(allPokemonData => {
                    // Sort the data by ID
                    const sortedPokeData = allPokemonData.sort((a, b) => a.id - b.id);

                    // Create and append the cards
                    sortedPokeData.forEach(pokeData => {
                        const pokemonCard = document.createElement('div');
                        pokemonCard.className = 'pokemon-card';
                        pokemonCard.innerHTML = `
                            <h3>${pokeData.id}</h3>
                            <h3>${pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}</h3>
                            <img src="${pokeData.sprites.other.dream_world.front_default}" alt="${pokeData.name}">
                            <p>HP: ${pokeData.stats[0].base_stat}</p>
                            <p>Attack: ${pokeData.stats[1].base_stat}</p>
                            <p>Defense: ${pokeData.stats[2].base_stat}</p>
                            <p>Special Attack: ${pokeData.stats[3].base_stat}</p>
                            ${pokeData.types[0].type.name}
                        `;
                        pokemonList.appendChild(pokemonCard);
                    });
                });
        });
}



document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("page-number").innerText = `Page ${pageNumber}`;
    fetchPokemon();
});


document.getElementById("next").addEventListener("click", function(){
    console.log("next");
    offset = offset + 20;
    pageNumber++; // Increment the page number 
    document.getElementById("page-number").innerText = `Page ${pageNumber}`
    fetchPokemon()

})

document.getElementById("previous").addEventListener("click", function(){
    console.log("previous");
    if (offset >= 20) {
        offset = offset-20;
        pageNumber--; // Decrease page number
        document.getElementById("page-number").innerText = `Page ${pageNumber}`
        fetchPokemon();
    }
})
