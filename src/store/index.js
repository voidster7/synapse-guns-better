import { createStore } from 'vuex'

export default createStore({
  state: {
    items: {},
    options: {},
    optionsObj: [
      {
        name: "Flatbed",
        id: "flatbed",
        default: true,
      },
      {
        name: "Fartpoo",
        id: "fpoo",
        default: false
      }
    ],
    materials: {},
    itemsToCraft: {},
    steps: [],
    complete: {},
    menuOpen: false
  },
  mutations: {
    changeItemAmount(state, payload) {
      let item = payload.item;
      let amount = payload.amount;
      if (!state.itemsToCraft[item]) {
        state.itemsToCraft[item] = amount
      } else if (state.itemsToCraft[item] + amount < 100) {
        state.itemsToCraft[item] += amount;
      } else if (state.itemsToCraft[item] + amount >= 100) {
        state.itemsToCraft[item] = 99;
      }
      if (state.itemsToCraft[item] <= 0) {
        delete state.itemsToCraft[item]
      }
    },
    setItems(state, payload) {
      let items = payload;
      state.items = items;
    },
    setOption(state, payload) {
      let option = payload.option;
      let value = payload.value;
      let options = JSON.parse(localStorage.getItem("options")) || {}
      options[option] = value;
      state.options = options;
      localStorage.setItem("options", JSON.stringify(options))
    },
    setMaterials(state, payload) {
      let materials = payload;
      state.materials = materials;
    },
    toggleMenu(state) {
      state.menuOpen = !state.menuOpen;
    }
  },
  getters: {
    getItem: (state) => (item) => {
      let rItem = state.items[item];
      if (!rItem) rItem = state.materials[item];
      if (!rItem) return null;
      rItem.identifier = item;
      return rItem;
    },
    getOption: (state) => (identifier) => {
      let val = state.options[identifier];

      if (val == undefined) {
        for (let i in state.optionsObj) {
          if (state.optionsObj[i].default && state.optionsObj[i].id == identifier) {
            val = true;
          }
        }
      }
      return val;
    }
  },
  actions: {
  },
  modules: {
  }
})
