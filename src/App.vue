<template>
  <NavBar siteName="Gun Calculator"></NavBar>
  <ItemSelector></ItemSelector>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import ItemSelector from "./components/ItemSelector.vue";
export default {
  name: "App",
  components: {
    NavBar,
    ItemSelector
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: white;
}
body{
  background-color: #616161;
}
</style>
