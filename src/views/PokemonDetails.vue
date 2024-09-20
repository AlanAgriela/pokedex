<template>
    <div v-if="pokemon" class="pokemon-details">
      <div class="pokemon-background">
        <img :src="pokemon.sprites.front_default" alt="Pokemon" />
      </div>
      
      <div class="pokemon-attributes">
           <p><strong>Name:</strong> {{ pokemon.name }}</p>
        <hr>
          <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
        <hr>
          <p><strong>Height:</strong> {{ pokemon.height }}</p>
        <hr>
         <p>
            <strong>Types: </strong> 
            <span v-for="(type, index) in pokemon.types" :key="index">
              {{ type.type.name }}<span v-if="index < pokemon.types.length - 1">, </span>
            </span>
        </p>
        <hr>
      </div>

        <div class="button-row">
          <button @click="shareToClipboard" class="btn btn-default-system">Share to Friends</button>
          <button class="btn btn-favorite" @click="toggleFavorite(pokemon)">
            <span v-if="props.isFavorite(pokemon)">
              <img src="@/img/EstrellaActive.png" alt="Favorite" />
            </span>
            <span v-else>
              <img src="@/img/EstrellaDisabled.png" alt="Not Favorite" />
            </span>
          </button>
        </div>

    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { getPokemonDetails } from '@/services/PokeAPI';
  import { useRoute } from 'vue-router';

  const props = defineProps({
  pokemonName: {
    type: String,
    required: true,
    },
  isFavorite: {
    type: Function,
    required: true,
  },
  toggleFavorite: {
    type: Function,
    required: true,
  },
});
  
  const pokemon = ref(null);
  const route = useRoute();
  
  const loadPokemonDetails = async () => {
    const response = await getPokemonDetails(props.pokemonName);
    pokemon.value = response.data;
    console.log(pokemon);
  };

  const shareToClipboard = () => {
    const text = `Name: ${pokemon.value.name}, Weight: ${pokemon.value.weight}, Height: ${pokemon.value.height}`;
    navigator.clipboard.writeText(text);
    alert(`El detalle del pokemon ${pokemon.value.name} se ha copiado de forma correcta al portapapeles`);
  };
  
  onMounted(() => {
    loadPokemonDetails();
  });

  watch(() => props.pokemonName, () => {
    loadPokemonDetails();
  });
  </script>
  
  <style>
  </style>
  