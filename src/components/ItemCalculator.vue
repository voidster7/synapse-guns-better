<template>
  <div id="ItemCalculator">
    <div v-for="(item, itemKey) in getItemsToCraft" :key="item.name" class="itemDiv">
          <p>{{item + " " + itemKey}}</p>
      </div>
  </div>
</template>


<script>
export default {
  name: "ItemCalculator",
  components: {
  },
  methods: {

  },
  props: {},
  data() {
  },
  computed: {
    getItemsToCraft() {
      return this.$store.state.itemsToCraft;

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

#search {
  display: block;
  width: 15vw;
  height: 2vw;
  border: 4px solid #333;
  background-color: #222;
  color: white;
  font-size: 1vw;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  transition-duration: 333ms;
}
#search:focus {
  width: 16vw;
}
#search::placeholder {
  color: rgb(218, 218, 218);
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
</style>