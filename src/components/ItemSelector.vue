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
        @contextmenu="rightClick($event, item)"
      >
        <item :item="item"> </item>
      </div>
    </div>
  </div>
</template>


<script>
import Item from "./Item.vue";
import Swal from "sweetalert2";

export default {
  name: "ItemSelector",
  components: {
    Item,
  },
  methods: {
    async rightClick(event, item) {
      event.preventDefault();
      let answer = await Swal.fire({
        title: "How many items would you like to add?",
        input: "range",
        inputValue: 2,
        inputLabel: "Item Amount",
        icon: "question",
        inputAttributes: {
          min: 2,
          max: 99,
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
        this.addItemToCraft(item.identifier, amount);
      }
      // this.removeItemFromCraft(item);
    },
    addItemToCraft(item, amount) {
      if (!amount) amount = 1;
      this.$store.commit("changeItemAmount", { item: item, amount: amount });
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
        itemList[k].identifier = k;
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
  width: 23vw;
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
  border: 4px solid rgb(83, 83, 83);
  border-radius: 0.3vw;
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
  padding-right: 0.3vw;
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