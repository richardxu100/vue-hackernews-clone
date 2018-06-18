jest.mock('@/api/api.js')

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import ItemList from '@/views/ItemList.vue'
import Item from '@/components/Item.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ItemList', () => {
  let storeOptions, store
  
  beforeEach(() => {
    storeOptions = {
      getters: {
        displayItems: jest.fn()
      },
      actions: {
        fetchListData: jest.fn(() => Promise.resolve())
      }
    }
    // do I need to deepClone options?
    store = new Vuex.Store(storeOptions)
  })
  
  it('renders an Item for each item in displayItems getter', async () => {
    const items = [{}, {}, {}]
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    storeOptions.getters.displayItems.mockReturnValue(items)
    const wrapper = shallowMount(ItemList, {mocks: {$bar}, localVue, store})
    await flushPromises()
    expect(wrapper.findAll(Item).length).toBe(items.length)
  })

  it('passes an item object to each Item component', () => {
    const items = [{id: 1}, {id: 2}]
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    storeOptions.getters.displayItems.mockReturnValue(items)
    const wrapper = shallowMount(ItemList, {mocks: {$bar}, localVue, store})
    const Items = wrapper.findAll(Item)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i])
    })
  })
  
  it('calls $bar start on load', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {}
    }
    shallowMount(ItemList, {mocks: {$bar}, localVue, store})
    expect($bar.start).toHaveBeenCalled()
  })
  
  it('calls $bar finish when load successful', async () => {
    const $bar = {
      start: () => {},
      finish: jest.fn()
    }
    shallowMount(ItemList, {mocks: {$bar}, localVue, store})
    await flushPromises() // need to wait for the dispatch
    expect($bar.finish).toHaveBeenCalled()
  })
  
  it('dispatches fetchListData with top', () => {
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    store.dispatch = jest.fn(() => Promise.resolve())
    shallowMount(ItemList, {mocks: {$bar}, localVue, store})
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {type: 'top'})
  })

  it('calls $bar.fail when fetchListData throws an error', async () => {
    const $bar = {
      start: () => {},
      fail: jest.fn()
    }
    storeOptions.actions.fetchListData.mockRejectedValue()
    shallowMount(ItemList, {mocks: {$bar}, localVue, store})
    await flushPromises()
    expect($bar.fail).toHaveBeenCalled()
  })
})
