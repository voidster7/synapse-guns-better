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
      {{ item.legal ? "Legal" : "Illegal" }}
    </p>
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
      if (this.item.marketprice == 0) {
        return "Unknown Value";
      } else {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(this.item.marketprice);
      }
    },
  },
};
</script>
<style scoped>
</style>