import { shallowMount } from '@vue/test-utils'
import ItemList from '@/views/ItemList.vue'
import Item from '@/components/Item.vue'

describe('ItemList', () => {
  it('renders an Item for each item in window.items', () => {
    window.items = [{}, {}, {}]
    const wrapper = shallowMount(ItemList)
    expect(wrapper.findAll(Item).length).toBe(window.items.length)
  })

  it('passes an item object for each Item component', () => {
    window.items = [{}, {}, {}]
    const wrapper = shallowMount(ItemList)
    const itemsArray = wrapper.findAll(Item)
    itemsArray.wrappers.forEach((w, i) => {
      expect(w.props().item).toBe(window.items[i])
    })
  })
})
