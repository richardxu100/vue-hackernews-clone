<template>
  <div>
    <item :item="item" v-for="item in displayItems" :key="item.id" />
    <router-link v-if="page > 1" :to="`/${type}/${page-1}`">
      &lt; prev
    </router-link>
    <a v-else>&lt; prev</a>
    <span>{{ page }}/{{ maxPage }}</span>
    <router-link v-if="page < maxPage" :to="`/${type}/${page+1}`">
      more &gt;
    </router-link>
    <a v-else>more &gt;</a>
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
  props: ['type'],
  beforeMount() {
    this.loadItems()
  },
  computed: {
    displayItems() {
      return this.$store.getters.displayItems
    },
    page() {
      return Number(this.$route.params.page) || 1
    },
    maxPage() {
      return Math.ceil(this.$store.state.items.length / 20)
    }
  },
  methods: {
    ...mapActions(['fetchListData']),
    async loadItems() {
      this.$bar.start()
      try {
        // dispatches fetchListData action
        await this.fetchListData({type: this.type})
        if (this.page < 0 || this.page > this.maxPage) {
          this.$router.replace(`/${this.type}/1`)
        }
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
