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
    loadItems() {
      this.$bar.start()
      fetchListData('top')
        .then(items => {
          this.displayItems = items
          this.$bar.finish()
        })
        .catch(err => {
          this.$bar.fail()
        })
    }
  },
  data: () => ({
    displayItems: []
  })
}
</script>
