<template>
  <input
    type="text"
    id="search"
    v-model="searchInput"
    placeholder="Item Name"
  />
  <br />
  <span>Search Results</span>
  <div class="itemContainer">
    <div v-for="item in filteredItems" :key="item.name" class="itemDiv">
      <img class="itemImg" v-bind:src="item.img" alt="Not Found" onerror='this.src = "img/undefined.png"'>
      <p class="itemName">{{ item.name }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "ItemSelector",
  props: {
    itemList: {
      type: Array,
      default: () => {
        return [
          { name: "Kriss Vector" },
          { name: "Thompson" },
          { name: "AK-47" },
        ];
      },
    },
  },
  data() {
    return {
      searchInput: "",
    };
  },
  computed: {
    filteredItems() {
      var search = this.searchInput.toLowerCase();
      var itemList = this.itemList;
      for(var k in itemList) {
        if (!itemList[k].img) {
          itemList[k].img = "img/undefined.png";
        }
      }
      if (search) {
        return itemList.filter(function (item) {
          return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
      } else {
        return itemList;
      }
    },
  },
};
</script>

<style scoped>
#search {
  margin-top: 5vw;
  width: 15vw;
  height: 2vw;
  border-radius: 0.5vw;
  border: 0.1vw solid rgb(30, 255, 0);
  background-color: rgb(71, 71, 71);
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
  display: inline-block;
  margin-top: 0.5vw;
  width: 25vw;
  height: 6vw;
  border: 0.1vw solid black;
}
.itemName {
  position: relative;
  left: 0.3vw;
  top: 3.5vw;
  font-size: 1vw;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.itemImg {
  width: 5vw;
  height: 5vw;
  border: 0.1vw solid black;
}
</style>