import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import PokemonList from '@/views/PokemonList.vue';
import PokemonDetails from '@/views/PokemonDetails.vue';

const routes = [
  { path: '/', component: Welcome },
  { path: '/pokemon-list', component: PokemonList },
  { path: '/pokemon/:name', name:'PokemonDetails', component: PokemonDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

