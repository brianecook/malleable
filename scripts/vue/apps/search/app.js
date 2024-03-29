import { createApp } from 'vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { HiX } from 'oh-vue-icons/icons/hi';
import Search from './components/Search.vue';

addIcons(HiX);

createApp(Search).mount('#v-search');

const app = createApp(Search);
app.component('v-icon', OhVueIcon);
app.mount('#v-search');
