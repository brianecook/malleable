<script>
  export default {
    data() {
      return {
        count: 0,
      }
    },
    methods: {
      handleDec() {
        if (this.count > 0) this.count--;
      }
    }
  }
</script>

<template>
  <h1>{{ count }}</h1>
  <button type="button" @click="handleDec">Click to decrement</button>
  &nbsp;&nbsp;
  <button type="button" @click="count++">Click to increment</button>
</template>
