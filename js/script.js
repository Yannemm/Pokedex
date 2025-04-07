const pokemonNome = document.querySelector('.pokemon_nome');
const pokemonNumero = document.querySelector('.pokemon_numero');
const pokemonImagem = document.querySelector('.pokemon_imagem');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonAnte = document.querySelector('.btn-prev');
const buttonProx = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonNome.innerHTML = 'Carregando...';
    pokemonNumero.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImagem.style.display = 'block';
        pokemonNome.innerHTML = data.name;
        pokemonNumero.innerHTML = data.id;
        pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImagem.style.display = 'none';
        pokemonNome.innerHTML = 'Não :c';
        pokemonNumero.innerHTML = 'Não existe';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonAnte.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonProx.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);