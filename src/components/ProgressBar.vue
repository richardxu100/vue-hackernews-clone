<template>
  <div :style="{'width': `${percent}%`}" />
</template>

<script>
  export default {
    data() {
      return {
        percent: 0
      }
    }
  }
</script>