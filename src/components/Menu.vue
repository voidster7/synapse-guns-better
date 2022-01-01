<template>
  <div id="menu">
    <link rel="stylesheet" href="css/toggle-switchy.css" />
    <h1>Settings</h1>
    <h3>
      In this settings menu, you're able to toggle certain options of the
      website on / off. There may be more settings added in the future.
    </h3>
    <div id="optionStore">
      <div class="option" v-for="option in options" :key="option.id">
        <label
          class="toggle-switchy"
          :for="'opt_' + option.id"
          data-size="lg"
          data-label="left"
        >
          <input
            type="checkbox"
            :id="'opt_' + option.id"
            :checked="isChecked(option.id)"
            @change="handleChange"
          />
          <span class="toggle">
            <span class="switch"></span>
          </span>
          <span class="label">{{ option.name }}</span>
        </label>
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
.label {
  color: white !important;
}
.option {
  margin-top: 0.7vw;
}
#optionStore {
  margin-top: 1.5vw;
  display: flex;
  margin-left: 1vw;
  flex-wrap: wrap;
  flex-direction: column;
}
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
  box-shadow: black 0.3vw 0.3vw 0.3vw;
}

#menu > h1 {
  text-align: center;
  margin-bottom: 2vw;
}

#menu > h3 {
  text-align: center;
}
</style>