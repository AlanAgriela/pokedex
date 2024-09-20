<template>
    <div class="loading-screen">
      <div class="pokeball-spinner"></div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style>
  .loading-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.pokeball-spinner {
  width: 100px;
  height: 100px;
  background: url('@/img/LoaderPokemon.png') no-repeat center;
  background-size: contain;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
  </style>
  