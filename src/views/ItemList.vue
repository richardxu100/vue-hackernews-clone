<template>
  <div>
    <item :item="item" v-for="item in displayItems" :key="item.id" />
  </div>
</template>

<script>
import Item from '../components/Item.vue'

export default {
  components: {
    Item
  },
  data: () => ({
    displayItems: window.items
  })
}
</script>
