import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

let vm = createApp(App).use(store).mount('#app')
vm.fetchItems();