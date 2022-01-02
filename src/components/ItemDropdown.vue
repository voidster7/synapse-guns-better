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
      let Titem = this.$store.getters.getItem(this.itemKey);
      let item = {};
      for (let k in Titem) {
        item[k] = Titem[k];
      }
      for (let k in item.materials) {
        let Tmaterial = this.$store.getters.getItem(k);
        let material = {};
        for (let k in Tmaterial) {
          material[k] = Tmaterial[k];
        }
        material.amount = item.materials[k];
        materials[k] = material;
      }
      return materials;
    },
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.zIndex = "-1";
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        delay:
          Array.prototype.slice.call(el.parentElement.children).indexOf(el) *
          0.05,
        onComplete: done,
      });
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        delay:
          Array.prototype.slice
            .call(el.parentElement.children)
            .reverse()
            .indexOf(el) * 0.05,
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
  height: 5vw;
}
</style>