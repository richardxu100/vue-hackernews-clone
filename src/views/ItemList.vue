<template>
  <div>
    <item :item="item" v-for="item in displayItems" :key="item.id" />
  </div>
</template>

<script>
import { fetchListData } from '../api/api'
import Item from '../components/Item.vue'

export default {
  components: {
    Item
  },
  beforeMount() {
    this.loadItems()
  },
  methods: {
    async loadItems() {
      this.$bar.start()
      try {
        const items = await fetchListData('top')
        this.displayItems = items
        this.$bar.finish()
      } catch {
        this.$bar.fail()
      }
    }
  },
  data: () => ({
    displayItems: []
  })
}
</script>
