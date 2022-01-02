<template>
  <div id="ItemCalculator">
    <h1 class="sectionHeader">Items to craft</h1>
    <div class="itemContainer">
      <transition-group
        name="staggered-fade"
        tag="div"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div
          v-for="item in getItemsToCraft"
          :key="item.name"
          class="itemDiv"
          @click="removeItemFromCraft(item.identifier)"
          @contextmenu="rightClick($event, item)"
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
              {{ item.amount }} {{ item.name
              }}{{ item.amount > 1 && item.name.slice(-1) != "s" ? "s" : "" }}
            </p>
            <p class="itemPrice">{{ getFormattedMarketprice(item) }}</p>
          </div>
        </div>
      </transition-group>
    </div>
    {{ getTotalMaterials }}
  </div>
  <div id="TotalItems">
    <h1 class="sectionHeader">Total Item Costs</h1>
    <div class="itemContainer">
      <transition-group
        name="staggered-fade"
        tag="div"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
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
            <p
              class="itemAmount"
              v-if="
                item.stacksize > 1 &&
                Math.floor(item.amount / item.stacksize) > 0
              "
            >
              {{ Math.floor(item.amount / item.stacksize) }} Stack{{
                Math.floor(item.amount / item.stacksize) != 1 ? "s" : ""
              }}
              {{
                item.amount % item.stacksize > 0
                  ? `and ${item.amount % item.stacksize}`
                  : ""
              }}
              {{ item.name
              }}{{ item.amount > 1 && item.name.slice(-1) != "s" ? "s" : "" }}
            </p>
            <p class="itemPrice">{{ getFormattedETAPrice(item) }}</p>
            <p class="itemStacksize" v-if="item.stacksize > 1">
              Stack size of {{ item.stacksize }}
            </p>
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
      </transition-group>
    </div>
  </div>
</template>


<script>
// let ogHeight;
// let ogFontSize;
import Swal from "sweetalert2";
import gsap from "gsap";
export default {
  name: "ItemCalculator",
  components: {},
  methods: {
    async rightClick(event, item) {
      event.preventDefault();
      let answer = await Swal.fire({
        title: "How many items would you like to remove?",
        input: "range",
        inputValue: item.amount,
        inputLabel: "Item Amount",
        icon: "question",
        inputAttributes: {
          min: 1,
          max: item.amount,
          step: 1,
        },
      });
      if (answer.isConfirmed) {
        let amount = parseInt(answer.value);
        if (isNaN(amount)) {
          return Swal.fire({
            title: "Invalid Amount",
            text: "Please enter a valid amount next time.",
            icon: "error",
          });
        }
        if (amount > 0) amount = amount * -1;
        this.removeItemFromCraft(item.identifier, amount);
      }
      // this.removeItemFromCraft(item);
    },
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
        if (this.$store.getters.getOption("processedMats")) {
          if (material.type == "orebar" || material.type == "plank") {
            if (complete[material.identifier]) {
              complete[material.identifier].amount += material.amount;
            } else {
              complete[material.identifier] = material;
            }
          } else if (material.materials) {
            shouldRecurse = true;
          }
        } else {
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
    removeItemFromCraft(item, amount) {
      if (!amount) amount = -1;
      this.$store.commit("changeItemAmount", { item: item, amount: amount });
    },

    // ANIMATIONS
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        duration: 0.2,
        onComplete: done,
      });
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        duration: 0.2,
        onComplete: done,
      });
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
.sectionHeader {
  font-size: 2vw;
}
#ItemCalculator {
  margin-left: 1.5vw;
  margin-top: 1.5vw;
  width: 23vw;
}

#TotalItems {
  margin-left: 1.5vw;
  margin-top: 1.5vw;
  width: 23vw;
}
</style>