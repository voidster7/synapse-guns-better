<template>
  <transition-group
    name="staggered-fade"
    tag="div"
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div
      class="itemDiv dropdownDiv"
      v-for="material in materials"
      v-show="shouldDisplay"
      :key="material.name"
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
  </transition-group>
</template>

<script>
import gsap from "gsap";
export default {
  name: "ItemDropdown",
  props: {
    itemKey: String,
    shouldDisplay: Boolean,
  },
  computed: {
    materials() {
      let materials = {};
      let item = this.$store.getters.getItem(this.itemKey);
      for (let k in item.materials) {
        let material = this.$store.getters.getItem(k);
        material.amount = item.materials[k];
        materials[k] = material;
      }
      return materials;
    },
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.height = 0;
      el.style.position = "relative";
      el.style.top = "-5vw";
      el.style.zIndex = "-1";
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: "5vw",
        top: "0vw",
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        top: "-5vw",
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    },
  },
};
</script>
<style scoped>
.dropdownDiv {
  margin-left: 1.7vw;
  width: 20vw;
}
</style>