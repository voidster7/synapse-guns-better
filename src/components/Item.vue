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

.itemMarketprice,
.itemIllegal,
.itemLegal {
  margin-left: 0.3vw;
}

.itemImg {
  display: inline;
  margin: 5px 5px 5px 5px;
  height: calc(100% - 10px);
  border-radius: 3px;
}

.itemIllegal {
  color: red;
}

.itemLegal {
  color: green;
}

</style>