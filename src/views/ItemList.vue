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

<style>
.item-list-view {
	padding-top: 45px;
}
.item-list {
	background-color: #fff;
	border-radius: 2px;
	position: absolute;
	margin: 30px 0;
	width: 100%;
	transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
@media (max-width: 600px) {
	.item-list {
		margin: 10px 0;
	}
}
</style>
