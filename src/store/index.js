import { createStore } from 'vuex'

export default createStore({
  state: {
    items: {
      "kriss_vector": {
        name: "Kriss Vector",
        image: "img/weapon_cw_vector.png",
        legal: true,
        marketprice: 1000,
        itemType: "assaultrifle",
      },
      "thompson": {
        name: "Thompson",
        image: "img/weapon_cw_thompson.png",
        legal: true,
        marketprice: 750,
        itemType: "assaultrifle",
      },
      "ak47": {
        name: "AK-47",
        image: "img/weapon_cw_ak74.png",
        legal: false,
        marketprice: 5600,
        itemType: "assaultrifle",
      },
      "mr96": {
        name: "MR96",
        image: "img/weapon_cw_357.png",
        legal: true,
        marketprice: 3000,
        itemType: "pistol",
      },
      "ksg12": {
        name: "KSG-12",
        image: "img/weapon_cw_tr09_ksg12.png",
        legal: false,
        marketprice: 3000,
        itemType: "shotgun",
      },
    },
    itemsToCraft: {}
  },
  mutations: {
    changeItemAmount(state, payload) {
      let item = payload.item;
      let amount = payload.amount;
      console.log(item + " " + toString(amount));
      if (!state.itemsToCraft[item]) {
        state.itemsToCraft[item] = amount
      } else {
        state.itemsToCraft[item] += amount;
      }
    },
    setItems(state, payload) {
       let items = payload;
       state.items = items;
    }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})
