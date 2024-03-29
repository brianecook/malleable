import { createApp } from 'vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { HiX, HiTrash } from 'oh-vue-icons/icons/hi';
import Cart from './components/Cart.vue';

addIcons(HiX, HiTrash);

const app = createApp(Cart);
app.component('v-icon', OhVueIcon);
app.mount('#v-cart');
