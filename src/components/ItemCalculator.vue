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
  </div>
</template>


<script>
export default {
  name: "ItemCalculator",
  components: {},
  methods: {},
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