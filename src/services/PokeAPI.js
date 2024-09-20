import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPokemonList = () => apiClient.get('/pokemon');
export const getPokemonDetails = (name) => apiClient.get(`/pokemon/${name}`);
