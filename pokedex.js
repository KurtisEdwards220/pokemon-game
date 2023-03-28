// Call PokeAPI
const pokedex = document.getElementById('pokedex');
const pokeCache = {};
let searchValue = '';
let pokemon;
const fetchPokemon = async () => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=905`;
    const res = await fetch(url);
    const data = await res.json();
    pokemon = data.results.map((result, index) => ({
      ...result,
      id: index + 1,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${
        index + 1
      }.png`,
    }));
    displayPokemon();
  } catch (err) {
    console.error(err);
  }
};

// Display and Filter Cards + array length counter
const displayPokemon = () => {
  let arrayLengthElement = document.getElementById('arrayLength');
  const filteredPokemon = pokemon.filter((pokemon) => {
    if (searchValue.length > 0) {
      return (
        pokemon.name.toLowerCase().includes(searchValue) ||
        pokemon.id.toString().includes(searchValue)
      );
    }
    return pokemon;
  });
  const pokemonHTMLString = filteredPokemon
    .map(
      (pokemon) =>
        `
      <li class='card' onclick='selectPokemon(${pokemon.id})'>
      <img class='card-image' src="${pokemon.image}"/>
      <h2 class='card-title'>${pokemon.id}. ${pokemon.name}</h2>  
      </li>
      `
    )
    .join('');
  pokedex.innerHTML = pokemonHTMLString;
  arrayLengthElement.innerHTML = 'Displayed Pokemon: ' + filteredPokemon.length;
};

// Display Popups and cache data
const selectPokemon = async (id) => {
  if (!pokeCache[id]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    pokeCache[id] = pokemon;
    displayPopup(pokemon);
  } else displayPopup(pokeCache[id]);
};

const displayPopup = (pokemon) => {
  const type = pokemon.types.map((type) => type.type.name).join(', ');
  const image = pokemon.sprites['front_shiny'];
  const htmlString = `
    <div class='popup'>
      <button id='closeBtn' onclick='closePopup()'>Close</button>
      <div class='card'>
        <img class='card-image' src='${image}'/>
        <h2 class='card-title'>${pokemon.id}. ${pokemon.name}</h2>
        <p><small>Height: </small>${pokemon.height} | <small>Weight: </small>${pokemon.weight} | <small>Type: </small>${type}</p> 
      </div>
    </div>
  `;
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

// Close Popup
const closePopup = () => {
  const popup = document.querySelector('.popup');
  popup.parentElement.removeChild(popup);
};

// Search Bar Funcionality
searchBar.addEventListener('keyup', (e) => {
  searchValue = e.target.value.toLowerCase();
  displayPokemon();
});

// Character Counter
function countChars(obj) {
  document.getElementById('charNum').innerHTML =
    'Characters: ' + obj.value.length;
}

// Back To Top Button
let mybutton = document.getElementById('topBtn');

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 700 ||
    document.documentElement.scrollTop > 700
  ) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

fetchPokemon();
