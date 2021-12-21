<template>
  <iframe
    v-if="shouldFlatbedBeVisible"
    width="560"
    height="315"
    id="flatbed"
    src="https://www.youtube.com/embed/aYYWW7V25Ok?rel=0&controls=0&showinfo=0&autoplay=1&mute=1"
    allow="autoplay; encrypted-media"
  ></iframe>
  <NavBar siteName="MonoGuns Revamped"></NavBar>
  <Menu v-if="isMenuOpen"></Menu>
  <div id="parent">
    <ItemSelector></ItemSelector>
    <ItemCalculator></ItemCalculator>
  </div>
  <footer v-if="shouldFooterBeVisible">
    <p>Website is in early development.</p>
    <p style="text-align: center">#addtheflatbed</p>
    <p class="smallText" style="text-align: center">
      Don't wanna see this? Turn it off in the settings
    </p>
  </footer>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import ItemSelector from "./components/ItemSelector.vue";
import ItemCalculator from "./components/ItemCalculator.vue";
import axios from "axios";
import Menu from "./components/Menu.vue";
export default {
  name: "App",
  components: {
    NavBar,
    ItemSelector,
    ItemCalculator,
    Menu,
  },
  methods: {
    async fetchItems() {
      let options = JSON.parse(localStorage.getItem("options")) || {};
      for (let i in options) {
        this.$store.commit("setOption", {
          option: i,
          value: options[i],
        });
      }
      let items = await axios.get("./items.json");
      let materials = await axios.get("./materials.json");
      this.$store.commit("setItems", items.data);
      this.$store.commit("setMaterials", materials.data);
    },
  },
  computed: {
    isMenuOpen() {
      return this.$store.state.menuOpen;
    },
    shouldFlatbedBeVisible() {
      return this.$store.getters.getOption("flatbed");
    },
    shouldFooterBeVisible() {
      return this.$store.getters.getOption("footer");
    },
  },
};
</script>

<style>
#flatbed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.assaultrifle {
  background: rgb(255, 154, 0);
  background: linear-gradient(
    135deg,
    rgba(255, 154, 0, 0.4) 0%,
    rgba(255, 154, 0, 1) 100%
  );
}

.pistol {
  background: rgb(0, 99, 255);
  background: linear-gradient(
    135deg,
    rgba(0, 99, 255, 0.4) 0%,
    rgba(0, 99, 255, 1) 100%
  );
}

.shotgun {
  background: rgb(214, 0, 255);
  background: linear-gradient(
    135deg,
    rgba(214, 0, 255, 0.4) 0%,
    rgba(214, 0, 255, 1) 100%
  );
}

.melee {
  background: rgb(255, 0, 0);
  background: linear-gradient(
    135deg,
    rgba(255, 0, 0, 0.4) 0%,
    rgba(255, 0, 0, 1) 100%
  );
}

.exotic {
  background: rgb(238, 255, 0);
  background: linear-gradient(
    135deg,
    rgba(238, 255, 0, 0.4) 0%,
    rgba(238, 255, 0, 1) 100%
  );
}

.greenItem {
  background: rgb(0, 255, 0);
  background: linear-gradient(
    135deg,
    rgba(0, 255, 0, 0.4) 0%,
    rgba(0, 255, 0, 1) 100%
  );
}

.itemMarketprice,
.itemPrice,
.itemLegality {
  font-size: 1vw;
}

.craftingItem {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 1) 100%
  );
}
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
* {
  font-family: "Montserrat", sans-serif;
}
#app {
  color: white;
}
body {
  background-color: #111;
}
footer {
  padding: 1vw;
  border-radius: 0.3vw;
  position: fixed;
  right: 50%;
  transform: translate(50%, -50%);
  top: 90%;
  font-size: 2vw;
  color: orange;
  background-color: black;
  opacity: 0.5;
}
footer > .smallText {
  font-size: 0.6vw;
}
</style>
