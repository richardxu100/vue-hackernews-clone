<template>
  <div>
    <item :item="item" v-for="item in displayItems" :key="item.id" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { fetchListData } from '../api/api'
import Item from '../components/Item.vue'

export default {
  components: {
    Item
  },
  beforeMount() {
    this.loadItems()
  },
  computed: {
    displayItems() {
      return this.$store.getters.displayItems
    }
  },
  methods: {
    ...mapActions(['fetchListData']),
    async loadItems() {
      this.$bar.start()
      try {
        // dispatches fetchListData action
        await this.fetchListData({type: 'top'})
        this.$bar.finish()
      } catch {
        this.$bar.fail()
      }
    }
  }
}
</script>
