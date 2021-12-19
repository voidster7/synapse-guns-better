<template>
  <div id="ItemCalculator">
    <h1>Items to craft</h1>
    <div
      v-for="item in getItemsToCraft"
      :key="item.name"
      class="itemDiv"
      @click="removeItemFromCraft(item.identifier)"
    >
      <img
        v-bind:class="[item.itemType, 'itemImg']"
        v-bind:src="item.image"
        alt="Not Found"
        onerror='this.src = "img/undefined.png"'
        style="transform: scaleX(1)"
      />
      <div class="itemInfo">
        <p class="itemName">
          {{ item.amount }} {{ item.name }}{{ item.amount > 1 ? "s" : "" }}
        </p>
        <p class="itemPrice">{{ getFormattedMarketprice(item) }}</p>
      </div>
    </div>
    {{ getTotalMaterials }}
  </div>
  <div id="TotalItems">
    <h1>Total Item Costs</h1>
    <div v-for="item in completed" :key="item.name" class="itemDiv">
      <img
        v-bind:class="[item.itemType, 'itemImg']"
        v-bind:src="item.image"
        alt="Not Found"
        onerror='this.src = "img/undefined.png"'
        style="transform: scaleX(1)"
      />
      <div class="itemInfo">
        <p class="itemName">
          {{ item.amount }} {{ item.name }}{{ item.amount > 1 ? "s" : "" }}
        </p>
        <p class="itemAmount" v-if="item.stacksize > 1">
          Around {{ Math.round(item.amount / item.stacksize) }} Stack(s) with a
          stacksize of {{ item.stacksize }}
        </p>
        <p class="itemPrice">{{ getFormattedETAPrice(item) }}</p>
      </div>
    </div>
    <div class="itemDiv" v-if="getRawTotalETAPrice > 0">
      <img
        v-bind:class="['itemImg', 'greenItem']"
        src="img/dollar.png"
        alt="Not Found"
        onerror='this.src = "img/undefined.png"'
        style="transform: scaleX(1)"
      />
      <div class="itemInfo">
        <p class="itemName">
          Estimated price based on materials is {{ getTotalETAPrice }}
        </p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ItemCalculator",
  components: {},
  methods: {
    calculateMaterials(inMaterials, insteps, incomplete) {
      let steps = insteps;
      if (!steps) steps = [];
      if (!inMaterials) inMaterials = this.getItemsToCraft;
      let stepMaterials = {};
      let complete = incomplete || {};
      for (let rItem in inMaterials) {
        let item = inMaterials[rItem];
        let TitemMaterials = item.materials;
        let itemMaterials = {};
        for (let test in TitemMaterials) {
          itemMaterials[test] = TitemMaterials[test];
        }
        if (!itemMaterials) break; // check if the item has materials
        for (let mat in itemMaterials) {
          // loop through all the materials of the item
          let materialName = mat;
          let materialAmount = itemMaterials[mat] * item.amount;
          let Tmaterial = new this.$store.getters.getItem(materialName); // fetch the full material item object
          let material = {};
          for (let test in Tmaterial) {
            material[test] = Tmaterial[test];
          }
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
      for (let mat in stepMaterials) {
        // loop through all the materials of the step
        let material = stepMaterials[mat];
        if (material.materials) {
          shouldRecurse = true;
        } else {
          if (complete[material.identifier]) {
            complete[material.identifier].amount += material.amount;
          } else {
            complete[material.identifier] = material;
          }
        }
      }
      steps.push({ materials: stepMaterials, id: steps.length });
      if (shouldRecurse) {
        this.calculateMaterials(stepMaterials, steps, complete);
      } else {
        this.$store.state.steps = steps;
        this.$store.state.complete = complete;
        return steps, complete;
      }
    },
    getFormattedMarketprice(item) {
      if (item.marketprice == 0) {
        return "Unknown Value";
      } else {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(item.marketprice * item.amount);
      }
    },
    getFormattedETAPrice(item) {
      if (!item.price) item.price = 0;
      if (item.price == 0) {
        return "Unknown Value";
      } else {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(item.price * item.amount);
      }
    },
    removeItemFromCraft(item) {
      this.$store.commit("changeItemAmount", { item: item, amount: -1 });
    },
  },
  props: {},
  data() {},
  computed: {
    getTotalETAPrice() {
      let price = 0;
      for (let i in this.completed) {
        price += this.completed[i].price * this.completed[i].amount;
      }
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(price);
    },
    getRawTotalETAPrice() {
      let price = 0;
      for (let i in this.completed) {
        price += this.completed[i].price * this.completed[i].amount;
      }
      return price;
    },
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
      let a = this.calculateMaterials();
      let b;
      b = a;
      a = b;
      return "";
    },
    steps() {
      return this.$store.state.steps;
    },
    completed() {
      let completed = {};
      for (let i in this.$store.state.complete) {
        let item = this.$store.state.complete[i];
        if (!item.itemType) item.itemType = "craftingItem";
        if (!item.stacksize) item.stacksize = 32;
        completed[item.identifier] = item;
      }
      return completed;
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

#TotalItems {
  margin-left: 30px;
  margin-top: 30px;
  width: 23vw;
}

.flexCenter {
  display: flex;
  justify-content: center;
}
.itemPrice {
  margin-left: 0.3vw;
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
  margin-bottom: 0.2vw;
  margin-top: 0.5vw;
  margin-left: 0.3vw;
}
.itemContainer {
  display: flex;
  flex-direction: column;
}
.itemAmount {
  display: inline;
  font-size: 0.8vw;
  text-align: center;
}
.itemDiv {
  display: flex;
  align-items: center;
  margin-top: 5px;
  width: 100%;
  height: 6vw;
  background: #333;
  cursor: pointer;
}
.stepDiv {
  display: flex;
  align-items: center;
  margin-top: 5px;
  width: 100%;
  min-height: 6vw;
  background: #333;
}

.itemImg {
  display: inline;
  margin: 5px 5px 5px 5px;
  height: calc(100% - 10px);
  border-radius: 3px;
}
</style>