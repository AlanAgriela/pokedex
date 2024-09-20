<template>
  <div id="app">
    <!-- Header o barra de navegación -->
    <header>
    </header>

    <!-- Contenido dinámico según la ruta activa -->
    <router-view />
  </div>
</template>

<script setup>
// No necesitas nada aquí a menos que necesites lógica global
</script>

<style>
/* Estilos globales o generales de la aplicación */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  margin: 0;
}
</style>
