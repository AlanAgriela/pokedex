import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import store from './store'

import { store } from './store/PokemonStore';  // Cambia la importación

createApp(App).use(store).use(router).mount('#app')
