<template>
  <div id="menu">
    <h1>Settings</h1>
    <h3>
      Hey yeah, sorry to disappoint you, but there's nothing here so far. Go
      suggest something we could add :)
    </h3>
    <div id="optionStore">
      <div class="option" v-for="option in options" :key="option.id">
        <!-- checkbox -->
        <input
          type="checkbox"
          :id="'opt_' + option.id"
          :checked="isChecked(option.id)"
          @change="handleChange"
        />
        <label for="option.id">{{ option.name }}</label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Menu",
  props: {},
  data() {
    return {};
  },
  computed: {
    options() {
      return this.$store.state.optionsObj;
    },
  },
  methods: {
    handleChange(e) {
      var checked = e.target.checked;
      var id = e.target.id.replace("opt_", "");
      this.$store.commit("setOption", {
        option: id,
        value: checked,
      });
    },
    isChecked(id) {
      let val = this.$store.getters.getOption(id);
      return val;
    },
  },
};
</script>
<style scoped>
#menu {
  position: fixed;
  display: block;
  width: 75%;
  height: 75%;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
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