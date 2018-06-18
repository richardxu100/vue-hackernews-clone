import { shallowMount } from '@vue/test-utils'
import Item from '@/components/Item.vue'

describe('Item.vue', () => {
  
  it('renders item.score', () => {
    const item = {
      score: 10
    }
    const wrapper = shallowMount(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).toContain(item.score)
  })
  
  it('renders item.by', () => {
    const item = {
      by: 'some author'
    }
    const wrapper = shallowMount(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).toContain(item.by)
  })

  it('renders an a tag with item.title', () => {
    const item = {
      title: 'some author'
    }
    const wrapper = shallowMount(Item, { 
      propsData: { item } 
    })
    expect(wrapper.find('a').text()).toContain(item.title)
  })

  it('renders an a tag with href item.url', () => {
    const item = {
      url: 'http://some-url.com'
    }
    const wrapper = shallowMount(Item, {
      propsData: { item }
    })
    expect(wrapper.find('a').attributes().href).toEqual(item.url)
  })

})
