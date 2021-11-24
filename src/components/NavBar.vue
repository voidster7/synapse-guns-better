<template>
  <div id="navbar">
    <h2 id="navbartext">{{ siteName }}</h2>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  props: {
    siteName: String,
  },
};
</script>
<style scoped>
#navbar {
  background-color: #333;
  color: #fff;
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
}
#navbartext {
  margin-left: 1vw;
  font-size: 1.5em;
}
</style>