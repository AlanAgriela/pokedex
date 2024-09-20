import { createStore } from 'vuex';

export const store = createStore({
  state: {
    pokemons: [],  // Lista de Pokémon
    favorites: [],  // Lista de favoritos
  },
  mutations: {
    setPokemons(state, pokemons) {
      state.pokemons = pokemons;
    },
    addFavorite(state, pokemon) {
      if (!state.favorites.find(fav => fav.name === pokemon.name)) {
        state.favorites.push(pokemon);
      }
    },
    removeFavorite(state, name) {
      state.favorites = state.favorites.filter(p => p.name !== name);
    },
  },
  actions: {
    setPokemons({ commit }, pokemons) {
      commit('setPokemons', pokemons);
    },
    addFavorite({ commit }, pokemon) {
      commit('addFavorite', pokemon);
    },
    removeFavorite({ commit }, name) {
      commit('removeFavorite', name);
    },
  },
  getters: {
    allPokemons: (state) => state.pokemons,
    allFavorites: (state) => state.favorites,
    isFavorite: (state) => (pokemon) => state.favorites.some(f => f.name === pokemon.name),
  },
});
