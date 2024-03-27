<template>
  <button :class="['c-btn', {
    'c-btn--adding': adding
  }]" @click="() => $emit('clicked')">
    <slot></slot>
    <div class="c-btn__overlay">
      <v-icon name="pr-spinner" animation="spin" scale="1.4" />
    </div>
  </button>
</template>

<script>
  import { OhVueIcon, addIcons } from 'oh-vue-icons';
  import { PrSpinner } from 'oh-vue-icons/icons/pr';

  addIcons(PrSpinner);

  export default {
    props: {
      adding: {
        type: Boolean,
        default: false
      },
    },
    components: {
      "v-icon": OhVueIcon
    }
  }
</script>