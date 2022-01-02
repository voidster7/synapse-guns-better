<template>
  <div
    class="itemDiv dropdownDiv"
    v-for="(material, materialKey) in materials"
    :key="materialKey"
  >
    <img
      v-bind:class="[material.itemType, 'itemImg']"
      v-bind:src="material.image"
      alt="Not Found"
      onerror='this.src = "img/undefined.png"'
      style="transform: scaleX(1)"
    />
    <div class="itemInfo">
      <p class="itemName">
        {{ material.amount }} {{ material.name
        }}{{ material.amount > 1 ? "s" : "" }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemDropdown",
  props: {
    itemKey: String,
  },

  computed: {
    materials() {
      let materials = {};
      let item = this.$store.getters.getItem(this.itemKey)
      for (let k in item.materials) {
        let material = this.$store.getters.getItem(k)
        material.amount = item.materials[k]
        materials[k] = material
      }
      return materials;
    }
  },
};
</script>
<style scoped>
.dropdownDiv {
  margin-left: 1.7vw;
  width: 20vw;
}
</style>