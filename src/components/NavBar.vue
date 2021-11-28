<template>
  <div id="navbar">
    <h2 id="navbartext">
      {{ siteName }}
    </h2>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  props: {
    siteName: String
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

</style>