<template>
  <div class="c-qty">
    <button class="c-qty__btn" :disabled="quantity === miniumum" @click="$emit('decrement')">
      <v-icon name="hi-minus-sm" />
    </button>
    <span class="c-qty__qty">{{ quantity }}</span>
    <button class="c-qty__btn" @click="$emit('increment')">
      <v-icon name="hi-plus-sm" />
    </button>
  </div>
</template>

<script>
  import { OhVueIcon, addIcons } from "oh-vue-icons";
  import { HiPlusSm, HiMinusSm } from 'oh-vue-icons/icons/hi';

  addIcons(HiPlusSm, HiMinusSm);

  export default {
    props: {
      quantity: {
        type: Number
      },
      miniumum: {
        type: Number,
        default: 1
      }
    },
    components: {
      "v-icon": OhVueIcon
    }
  }
</script>