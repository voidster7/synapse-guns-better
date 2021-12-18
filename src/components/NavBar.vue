<template>
  <div id="navbar">
    <h2 id="navbartext">
      {{ siteName }}
    </h2>
    <i class="fas fa-cogs" id="openSettings" @click="toggleSettings()"></i>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  props: {
    siteName: String,
  },
  methods: {
    toggleSettings() {
      this.$store.commit("toggleMenu");
    },
  },
};
</script>
<style scoped>
#navbar {
  background-color: #333;
  color: #fff;
  width: calc(100% - 1vw);
  padding-left: 1vw;
  height: 5vh;
  display: flex;
  align-items: center;
}

#navbartext {
  font-size: 1.5vw;
}
#openSettings {
  font-size: 1.5vw;
  cursor: pointer;
  text-align: center;
  position: absolute;
  right: 1vw;
}
</style>