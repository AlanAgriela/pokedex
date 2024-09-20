<template>
  <div class="container">
    <div class="search-container">
      <input class="form-control" v-model="search" placeholder="Search" />
    </div>
    <div v-if="filteredPokemons.length === 0 && search.trim() !== ''" class="mt-5">
      <h1>Uh oh!</h1>
      <p>You look lost on your journey</p>
      <button class="btn btn-default-system" @click="$router.push('/')">Go back home</button>
    </div>
    <div class="list-group-item" v-for="pokemon in filteredPokemons" :key="pokemon.name" @click="openModal(pokemon)">
          <p class="title-box ml-3">
            {{ pokemon.name }}
          </p>
            

        <button class="btn btn-stars"  @click="toggleFavorite(pokemon)">
          <span v-if="isFavorite(pokemon)"><img src="@/img/EstrellaActive.png"></span>
          <span v-else><img src="@/img/EstrellaDisabled.png"></span>
        </button>
    </div>



  </div>
  
  <!-- Footer con los botones centrados -->
  <div class="footer">
     <button class="btn btn-wide" :class="selectedButton === 'all' ? 'btn-default-system' : 'btn-gris-system'"      @click="selectButton('all')">
      <img src="@/img/list-solid.svg" class="svg-size mr-2 mb-1">
      All</button>

    <button class="btn btn-wide" :class="selectedButton === 'favorites' ? 'btn-default-system' : 'btn-gris-system'" @click="selectButton('favorites')">
      <img src="@/img/star-solid.svg" class="svg-size mr-2 mb-1">
      Favorites</button>
  </div>

  <!-- Modal para mostrar los detalles del Pokémon -->
  <div v-if="selectedPokemon" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <PokemonDetails :pokemonName="selectedPokemon.name" :isFavorite="isFavorite" :toggleFavorite="toggleFavorite"/>
    </div>
  </div>
  
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';  // Usar el composable de Vuex para acceder al store
import { getPokemonList } from '@/services/PokeAPI.js';  // Función para obtener la lista de Pokémon
import PokemonDetails from './PokemonDetails.vue';  // Importar la vista de detalles


const search = ref('');  // Campo de búsqueda
const store = useStore();  // Acceso al store de Vuex
const selectedButton = ref('all');  // 'all' o 'favorites'
const selectedPokemon = ref(null);



const selectButton = (button) => {
  selectedButton.value = button;
};

// Función para cargar los Pokémon y despachar la acción
const loadPokemons = async () => {
  const response = await getPokemonList();
  store.dispatch('setPokemons', response.data.results);  // Despacha la acción, no mutación directa
};


// Computed para obtener y filtrar los Pokémon según la búsqueda
const filteredPokemons = computed(() => {

  const allPokemons = selectedButton.value === 'all' 
    ? store.getters.allPokemons 
    : store.getters.allFavorites;  // Cambia entre todos o favoritos

  return allPokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

// Función para alternar favoritos
const toggleFavorite = (pokemon) => {
  if (store.getters.isFavorite(pokemon)) {
    store.dispatch('removeFavorite', pokemon.name);  // Remueve de favoritos
  } else {
    store.dispatch('addFavorite', pokemon);  // Agrega a favoritos
  }
};

// Verifica si es favorito
const isFavorite = (pokemon) => store.getters.isFavorite(pokemon);

// Función para abrir el modal y mostrar los detalles del Pokémon seleccionado
const openModal = (pokemon) => {
  selectedPokemon.value = pokemon;
};

// Función para cerrar el modal
const closeModal = () => {
  selectedPokemon.value = null;
};

// Función para obtener el ID del Pokémon desde su URL
const getPokemonId = (pokemon) => {
  const urlParts = pokemon.url.split('/');
  return urlParts[urlParts.length - 2];
};

// Cargar los Pokémon cuando se monta el componente
onMounted(() => {
  loadPokemons();
});
</script>

<style>
  @import "@/css/rootcolors.css";
  @import "@/css/styles.css";


</style>
