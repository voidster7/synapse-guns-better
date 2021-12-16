<template>
  <NavBar siteName="Crafting Calculator"></NavBar>
  <ItemSelector></ItemSelector>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import ItemSelector from "./components/ItemSelector.vue";
import axios from "axios";
export default {
  name: "App",
  components: {
    NavBar,
    ItemSelector,
  },
  methods: {
    async fetchItems() {
      let res = await axios.get("/items.json")
      this.$store.commit("setItems", res.data);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Montserrat", sans-serif;
  color: white;
}
body {
  background-color: #111;
}
</style>
