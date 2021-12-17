<template>
  <div id="ItemCalculator">
    <h1>Items to craft</h1>
    <div v-for="item in getItemsToCraft" :key="item.name" class="itemDiv">
      <img
        v-bind:class="[item.itemType, 'itemImg']"
        v-bind:src="item.image"
        alt="Not Found"
        onerror='this.src = "img/undefined.png"'
        style="transform: scaleX(1)"
      />
      <div class="itemInfo">
        <p class="itemName">{{ item.name }}</p>
        <p class="itemAmount">{{ item.amount }}</p>
      </div>
    </div>
    <p v-for="material in getTotalMaterials" :key="material.name">
      {{ material.name }}: {{ material.amount }}
    </p>
  </div>
</template>


<script>
export default {
  name: "ItemCalculator",
  components: {},
  methods: {
    getMaterials(inMaterials, insteps) {
      let steps = insteps;
      if (!steps) steps = [];
      if (!inMaterials) inMaterials = this.getItemsToCraft;
      let stepMaterials = {};
      //let materials = {}
      for (let rItem in inMaterials) {
        let item = inMaterials[rItem];
        let itemMaterials = item.materials;
        if (!itemMaterials) return; // check if the item has materials
        for (let mat in itemMaterials) {
          // loop through all the materials of the item
          let materialName = mat;
          let materialAmount = itemMaterials[mat] * item.amount;
          let material = this.$store.getters.getItem(materialName); // fetch the full material item object
          if (!stepMaterials[materialName]) {
            // check if the material has already been added to the total, and if not add it
            material.amount = materialAmount;
            stepMaterials[materialName] = material;
          } else {
            stepMaterials[materialName].amount += materialAmount; // increase the amount of the material if it is already in the list
          }
        }
      }
      let shouldRecurse = false;
      console.log(shouldRecurse)
      for (let mat in stepMaterials) {
        // loop through all the materials of the step
        let material = stepMaterials[mat];
        if (material.materials) {
          shouldRecurse = true;
          console.log("Do recurse");
        }
      }
      console.log(shouldRecurse)
      steps.push(stepMaterials);
      console.log(stepMaterials);
      if (shouldRecurse) {
        this.getMaterials(stepMaterials, steps);
        console.log("has recursed");
      } else {
        console.log("has finished");
        console.log(steps);
        return steps;
      }
    },
  },
  props: {},
  data() {},
  computed: {
    getItemsToCraft() {
      let items = [];
      for (let k in this.$store.state.itemsToCraft) {
        let amount = this.$store.state.itemsToCraft[k];
        let item = this.$store.getters.getItem(k);
        item.amount = amount;
        items.push(item);
      }
      return items;
    },
    getOldTotalMaterials() {
      let materials = {};
      // for each item that has been added to the crafting list
      for (let rItem in this.getItemsToCraft) {
        let item = this.getItemsToCraft[rItem];
        let itemMaterials = item.materials;
        if (!itemMaterials) return; // check if the item has materials
        for (let mat in itemMaterials) {
          // loop through all the materials of the item
          let materialName = mat;
          let materialAmount = itemMaterials[mat] * item.amount;
          let material = this.$store.getters.getItem(materialName); // fetch the full material item object
          console.log(material);
          if (!materials[materialName]) {
            // check if the material has already been added to the total, and if not add it
            material.amount = materialAmount;
            materials[materialName] = material;
          } else {
            materials[materialName].amount += materialAmount; // increase the amount of the material if it is already in the list
          }
        }
      }
      return materials;
    },
    getTotalMaterials() {
      let materials = this.getMaterials();
      return materials;
    },
  },
};
</script>

<style scoped>
#ItemCalculator {
  margin-left: 30px;
  margin-top: 30px;
  width: 23vw;
}

.flexCenter {
  display: flex;
  justify-content: center;
}
.itemInfo {
  display: flex;
  flex-direction: column;
  margin: 5px 5px 5px 0;
  width: calc(100% - 5px);
  height: calc(100% - 10px);
  background: #222;
  border-radius: 3px;
}

.itemName {
  display: inline;
  font-size: 1vw;
  margin-bottom: 0.3vh;
  margin-top: 1vh;
  margin-left: 0.3vw;
}
.itemContainer {
  display: flex;
  flex-direction: column;
}
.itemAmount {
  display: inline;
  background-color: blue;
  width: 1vw;
  text-align: center;
  border-radius: 0.5vw;
  height: 1vw;
  padding: 0.5vw;
}
.itemDiv {
  display: flex;
  align-items: center;
  margin-top: 5px;
  width: 100%;
  height: 6vw;
  background: #333;
}

.itemImg {
  display: inline;
  margin: 5px 5px 5px 5px;
  height: calc(100% - 10px);
  border-radius: 3px;
}
</style>