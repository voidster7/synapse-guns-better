<template>
  <img
    v-bind:class="[item.itemType, 'itemImg']"
    v-bind:src="item.image"
    alt="Not Found"
    onerror='this.src = "img/undefined.png"'
    style="transform: scaleX(1)"
  />
  <div class="itemInfo">
    <p class="itemName">{{ item.name }}</p>
    <p class="itemMarketprice">{{ getFormattedMarketprice }}</p>
    <p
      v-bind:class="[
        'itemLegality',
        { itemLegal: item.legal, itemIllegal: !item.legal },
      ]"
    >
      {{ item.legal ? "Not Contraband" : "Contraband" }}
    </p>
    <p v-if="item.itemType == 'blueprint'" class="blueprintRequired">Blueprint required</p>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: Object,
  },

  computed: {
    getFormattedMarketprice() {
      let Titem = this.item;
      let item = {}
      for(let i in Titem){
        item[i] = Titem[i]
      }
      if (!item.marketprice && item.price) {
        item.marketprice = item.price;
      }
      if (item.marketprice == 0 || isNaN(item.marketprice)) {
        return "Unknown Value";
      } else {
        return new Intl.NumberFormat("", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(item.marketprice);
      }
    },
  },
};
</script>
<style scoped>
.blueprintRequired {
  color: red;
  font-size: 1vw;
  top: 0.2vw;
  position: absolute;
  right: 0.4vw;
}
#openItemMats {
  font-size: 3vw;
  position: absolute;
  right: 0.5vw;
  bottom: 0.5vw;
}
</style>
