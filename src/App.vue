<template>
  <div id="app">
    <img src="./assets/images/logo.jpg" class="logoImage">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
}

.logoImage{
  width: 150px;
  height: 150px;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
