import { shallowMount } from '@vue/test-utils'
import Item from '@/components/Item.vue'

describe('Item.vue', () => {

  it('should render a URL', () => {
    const wrapper = shallowMount(Item, {
      propsData: {
        item: { url: 'http://some-url.com' }
      }
    })
    expect(wrapper.text()).toContain(item.url)
  })
})
