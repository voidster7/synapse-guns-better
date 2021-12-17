<template>
  <div id="ItemCalculator">
    <div v-for="item in getItemsToCraft" :key="item.name" class="itemDiv">
      <img
    v-bind:class="[item.itemType, 'itemImg']"
    v-bind:src="item.image"
    alt="Not Found"
    onerror='this.src = "img/undefined.png"'
    style="transform: scaleX(1)"
  />
  
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
      console.log(items);
      return items;
    },
    // filteredItems() {
    //   var search = this.searchInput.toLowerCase();
    //   var itemList = this.$store.state.items;
    //   for (var k in itemList) {
    //     if (!itemList[k].image) {
    //       itemList[k].image = "img/undefined.png";
    //     }
    //   }
    //   if (search) {
    //     let itemsFound = {};
    //     for (var i in itemList) {
    //       let item = itemList[i];
    //       if (item.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
    //         itemsFound[i] = item;
    //       }
    //     }
    //     return itemsFound;
    //   } else {
    //     return itemList;
    //   }
    // },
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

.itemContainer {
  display: flex;
  flex-direction: column;
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