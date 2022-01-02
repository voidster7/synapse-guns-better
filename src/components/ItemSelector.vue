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
        class="item">

        <div class="itemDiv"
          @click="addItemToCraft(itemKey)"
          @contextmenu="rightClick($event, item)"><item :item="item"></item>
        </div>
        <div v-if="shouldShowItemMats(itemKey)" class="itemMats">
          <ItemDropdown :itemKey="itemKey"></ItemDropdown>
        </div>
        <i class="fas fa-caret-square-down itemMatButton"
        :class="['fas', 'itemMatButton', shouldShowItemMats(itemKey) ? 'fa-caret-square-up' : 'fa-caret-square-down']"
          @click="toggleItemMats(itemKey)">
        </i>
      </div>
    </div>
  </div>
</template>


<script>
import Item from "./Item.vue";
import ItemDropdown from "./ItemDropdown.vue";
import Swal from "sweetalert2";

export default {
  name: "ItemSelector",
  components: {
    Item,
    ItemDropdown
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
    shouldShowItemMats(itemKey) {
      return this.itemMatsShown[itemKey] ? true : false;
    },
    toggleItemMats(itemKey) {
      if (this.itemMatsShown[itemKey]) {
        delete this.itemMatsShown[itemKey];
      } else {
        this.itemMatsShown[itemKey] = true;
      }
    }
  },
  props: {},
  data() {
    return {
      searchInput: "",
      itemMatsShown: {},
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

.itemMatButton {
  position: absolute;
  top: 3.5vw;
  right: 0.8vw;
  font-size: 2vw;
  cursor: pointer;
  transition-duration: 200ms;
}
.itemMatButton:hover {
  color: #ffc107;
}
.item {
  position: relative;
}
#ItemSelector {
  margin-left: 1.5vw;
  margin-top: 1.5vw;
  width: 23vw;
}

#search {
  display: block;
  width: 23vw;
  height: 2vw;
  border: 0.3vw solid #333;
  background-color: #222;
  color: white;
  font-size: 1vw;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  transition-duration: 333ms;
}
#search:focus {
  border: 0.3vw solid rgb(83, 83, 83);
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
</style>