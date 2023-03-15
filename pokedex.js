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

// Display Cards
const displayPokemon = () => {
  const pokemonHTMLString = pokemon
    .filter((pokeman) => {
      if (searchValue.length > 0) {
        return (
          pokeman.name.toLowerCase().includes(searchValue) ||
          pokeman.id.toString().includes(searchValue)
        );
      }
      return pokeman;
    })
    .map(
      (pokeman) =>
        `
    <li class='card' onclick='selectPokemon(${pokeman.id})'>
        <img class='card-image' src="${pokeman.image}"/>
        <h2 class='card-title'>${pokeman.id}. ${pokeman.name}</h2>  
    </li>
  `
    )
    .join('');
  pokedex.innerHTML = pokemonHTMLString;
};

// const displayPokemon = () => {
//   const pokemonHTMLString = pokemon
//     .map(
//       (pokeman) =>
//         `
//     <li class='card' onclick='selectPokemon(${pokeman.id})'>
//         <img class='card-image' src="${pokeman.image}"/>
//         <h2 class='card-title'>${pokeman.id}. ${pokeman.name}</h2>
//     </li>
//   `
//     )
//     .join('');
//   pokedex.innerHTML = pokemonHTMLString;
// };

// Display Popups and cache data
const selectPokemon = async (id) => {
  if (!pokeCache[id]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    pokeCache[id] = pokeman;
    displayPopup(pokeman);
  } else displayPopup(pokeCache[id]);
};

const displayPopup = (pokeman) => {
  const type = pokeman.types.map((type) => type.type.name).join(', ');
  const image = pokeman.sprites['front_shiny'];
  const htmlString = `
    <div class='popup'>
      <button id='closeBtn' onclick='closePopup()'>Close</button>
      <div class='card'>
        <img class='card-image' src='${image}'/>
        <h2 class='card-title'>${pokeman.id}. ${pokeman.name}</h2>
        <p><small>Height: </small>${pokeman.height} | <small>Weight: </small>${pokeman.weight} | <small>Type: </small>${type}</p> 
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

// Add Search Bar Funcionality

searchBar.addEventListener('keyup', (e) => {
  searchValue = e.target.value.toLowerCase();
  console.log(searchValue);
  displayPokemon();
});

// const searchBar = document.getElementById('searchBar');
// searchBar.addEventListener('keyup'), (event) => {
//   const cards = document.querySelectorAll('.card');
//   const val = event.target.value.toLowerCase();
// }
// const createSearchFilter = (pokemonData) => {
//   const cards = document.querySelectorAll('.card');
//   searchBar.addEventListener('keyup', (event) => {
//     console.log(event.target);
//     const val = event.target.value.toLowerCase();
//     cards.forEach((card) => {
//       if (card.id.toLowerCase().includes(val)) {
//         card.style.display = 'block';
//       } else {
//         card.style.display = 'none';
//       }
//     });
//   });
// };

// createSearchFilter();

// Add Back To Top Button
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
