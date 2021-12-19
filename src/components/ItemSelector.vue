<template>
  <div id="ItemSelector">
    <div class="flexCenter">
      <input
        type="text"
        id="search"
        v-model="searchInput"
        placeholder="Search"
      />
    </div>
    <div class="itemContainer">
      <div
        v-for="(item, itemKey) in filteredItems"
        :key="item.name"
        class="itemDiv"
        @click="addItemToCraft(itemKey)"
      >
        <item :item="item"> </item>
      </div>
    </div>
  </div>
</template>


<script>
import Item from "./Item.vue";

export default {
  name: "ItemSelector",
  components: {
    Item,
  },
  methods: {
    addItemToCraft(item) {
      this.$store.commit("changeItemAmount", { item: item, amount: 1 });
    },
  },
  props: {},
  data() {
    return {
      searchInput: "",
    };
  },
  computed: {
    getItemsToCraft() {
      return this.$store.state.itemsToCraft;
    },
    filteredItems() {
      var search = this.searchInput.toLowerCase();
      var itemList = this.$store.state.items;
      for (var k in itemList) {
        if (!itemList[k].image) {
          itemList[k].image = "img/undefined.png";
        }
      }
      if (search) {
        let itemsFound = {};
        for (var i in itemList) {
          let item = itemList[i];
          if (item.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
            itemsFound[i] = item;
          }
        }
        return itemsFound;
      } else {
        return itemList;
      }
    },
  },
};
</script>

<style scoped>
#ItemSelector {
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
  overflow-y: scroll;
  height: 80vh;
  /* height: 10vw; */
  display: flex;
  flex-direction: column;
  padding-right: 0.5vw;
  margin-top: 0.2vw;
}

::-webkit-scrollbar {
  width: 1vw;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(102, 102, 102);
  border-radius: 0.15vw;
}
::-webkit-scrollbar-track {
  background-color: rgb(51, 51, 51);
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
</style>