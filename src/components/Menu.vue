<template>
  <div id="menu">
    <h1>Settings</h1>
    <h3>Hey yeah, sorry to disappoint you, but there's nothing here so far. Go suggest something we could add :)</h3>
  </div>
</template>
<script>
export default {
  name: "Menu",
  props: {},
};
</script>
<style scoped>
#menu {
  position: fixed;
  display: block;
  width: 75%;
  height: 75%;
  top: 50%; right: 50%;
  transform: translate(50%,-50%);
  background-color: rgb(71, 71, 71);
  z-index: 10;
  border-radius: 0.2vw;
  box-shadow: black 5px 5px 10px;
}

#menu > h1 {
    text-align: center;
    margin-bottom: 2vw;
}

#menu > h3 {
    text-align: center;
}
</style>