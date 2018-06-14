jest.mock('@/api/api.js')

import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import { fetchListData } from '@/api/api'
import ItemList from '@/views/ItemList.vue'
import Item from '@/components/Item.vue'

describe('ItemList', () => {
  it('renders an Item for each item returned by fetchListData', async () => {
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const items = [{}, {}]
    fetchListData.mockImplementation(() => Promise.resolve(items))
    const wrapper = shallowMount(ItemList, {
      mocks: {$bar}
    })
    await flushPromises()
    expect(wrapper.findAll(Item).length).toBe(items.length)
  })

  it('passes an item object for each Item component', async () => { // broken
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const items = [{id: 1}, {id: 2}, {id: 3}]
    fetchListData.mockImplementation(() => Promise.resolve(items))
    const wrapper = shallowMount(ItemList, {
      mocks: {$bar}
    })
    await flushPromises()
    const itemsArray = wrapper.findAll(Item)
    itemsArray.wrappers.forEach((w, i) => { // this should break?
      expect(w.props().item).toBe(items[i])
    })
  })

  it('calls $bar start on load', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {}
    }
    shallowMount(ItemList, {mocks: {$bar}})
    expect($bar.start).toHaveBeenCalled()
  })

  it('calls $bar.fail when load unsuccessful', async () => {
    const $bar = {
      start: () => {},
      fail: jest.fn()
    }
    fetchListData.mockImplementation(() => Promise.reject())
    const wrapper = shallowMount(ItemList, {mocks: {$bar}})
    await flushPromises()
    expect($bar.fail).toHaveBeenCalled()
  })

  it('calls $bar.finish when load successful', async () => {
    const $bar = {
      start: () => {},
      finish: jest.fn()
    }
    fetchListData.mockImplementation(() => Promise.resolve([]))
    const wrapper = shallowMount(ItemList, {mocks: {$bar}})
    await flushPromises()
    expect($bar.finish).toHaveBeenCalled()    
  })
})
