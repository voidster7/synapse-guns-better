import { createStore } from 'vuex'

export default createStore({
  state: {
    items: {},
    materials: {},
    itemsToCraft: {},
    steps: []
  },
  mutations: {
    changeItemAmount(state, payload) {
      let item = payload.item;
      let amount = payload.amount;
      if (!state.itemsToCraft[item]) {
        state.itemsToCraft[item] = amount
      } else if (state.itemsToCraft[item] + amount < 100) {
        state.itemsToCraft[item] += amount;
      }
    },
    setItems(state, payload) {
      let items = payload;
      state.items = items;
    },
    setMaterials(state, payload) {
      let materials = payload;
      state.materials = materials;
    }
  },
  getters: {
    getItem: (state) => (item) => {
      let rItem = state.items[item];
      if (!rItem) rItem = state.materials[item];
      if (!rItem) return null;
      rItem.identifier = item;
      return rItem;
    }
  },
  actions: {
  },
  modules: {
  }
})
