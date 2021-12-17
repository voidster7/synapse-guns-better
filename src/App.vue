<template>
  <NavBar siteName="Crafting Calculator"></NavBar>
  <div id="parent">
    <ItemSelector></ItemSelector>
    <ItemCalculator></ItemCalculator>
  </div>
  <footer>
    <p>Website is in early development.</p>
  </footer>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import ItemSelector from "./components/ItemSelector.vue";
import ItemCalculator from "./components/ItemCalculator.vue";
import axios from "axios";
export default {
  name: "App",
  components: {
    NavBar,
    ItemSelector,
    ItemCalculator,
  },
  methods: {
    async fetchItems() {
      let items = await axios.get("/items.json");
      let materials = await axios.get("/materials.json");
      this.$store.commit("setItems", items.data);
      this.$store.commit("setMaterials", materials.data);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#parent {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Montserrat", sans-serif;
  color: white;
}
body {
  background-color: #111;
}
footer {
  position: fixed;
  right: 50%;
  transform: translate(50%, -50%);
  top: 95%;
  font-size: 2vw;
  color: orange;
}
</style>
