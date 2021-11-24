<template>
  <input
    type="text"
    id="search"
    v-model="searchInput"
    placeholder="Item Name"
  />
  <br />
  <span>Search Results</span>
  <div v-for="item in filteredItems" :key="item.name">
    <span>{{ item.name }}</span>
  </div>
</template>
<script>
export default {
  name: "ItemSelector",
  props: {
    itemList: {
      type: Array,
      default: () => {
        return [{ name: "test1" }, { name: "test2" }, { name: "test3" }];
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
      if (search) {
        return this.itemList.filter(function (item) {
          return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
      } else {
        return this.itemList;
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
</style>