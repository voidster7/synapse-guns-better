<template>
  <NavBar siteName="Crafting Calculator"></NavBar>
  <ItemSelector></ItemSelector>
</template>

<script>

import NavBar from "./components/NavBar.vue";
import ItemSelector from "./components/ItemSelector.vue";

export default {
  name: "App",
  components: {
    NavBar,
    ItemSelector,
  },
};

</script>

<style>
* {margin: 0; padding: 0;}
#app {
  font-family: 'Montserrat', sans-serif;
  color: white;
}
body {
  background-color: #111;
}


</style>
