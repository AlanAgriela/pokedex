<template>
    <div v-if="!isLoading" class="welcome-screen">
      <img src="@/img/PikachuWelcome.png" alt="Pikachu" />
      <h1>Welcome to Pokédex</h1>
      <p>The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
      <button class="btn btn-default-system" @click="goToList">Get started!</button>
    </div>
   <Loading v-if="isLoading" />
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Loading from '@/components/Loading.vue'; 

  const isLoading = ref(false);
  const router = useRouter();

  const goToList = () => {
  isLoading.value = true; 
    setTimeout(() => {
      isLoading.value = false;
      router.push('/pokemon-list'); 
  }, 2000); 
};
  </script>
  
  <style scoped>
  @import "@/css/rootcolors.css";
  @import "@/css/styles.css";


  </style>
  