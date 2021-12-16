import { createStore } from 'vuex'

export default createStore({
  state: {
    items: {},
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
