jest.mock('@/api/api.js')

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import merge from 'lodash.merge'
import flushPromises from 'flush-promises'
import ItemList from '@/views/ItemList.vue'
import Item from '@/components/Item.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ItemList', () => {
  function createWrapper(overrides) {
    const defaultMountingOptions = {
      mocks: {
        $bar: {
          start: jest.fn(),
          finish: jest.fn(),
          fail: jest.fn()
        }
      },
      localVue,
      store: createStore()
    }
    return shallowMount(ItemList, merge(defaultMountingOptions, overrides))
  }
  
  function createStore(overrides) {
    const defaultStoreConfig = {
      state: {
        items: []
      },
      getters: {
        displayItems: jest.fn()
      },
      actions: {
        fetchListData: jest.fn(() => Promise.resolve())
      }
    }
    return new Vuex.Store(
      merge(defaultStoreConfig, overrides)
    )
  }
  
  it('renders an Item for each item in displayItems getter', () => {
    const items = [{}, {}, {}]
    const store = createStore({
      getters: {
        displayItems: () => items
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.findAll(Item).length).toBe(items.length)
  })

  it('passes an item object to each Item component', () => {
    const items = [{id: 1}, {id: 2}]
    const store = createStore({
      getters: {
        displayItems: () => items
      }
    })
    const wrapper = createWrapper({ store })
    const Items = wrapper.findAll(Item)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i])
    })
  })
  
  it('calls $bar.start on load', () => {
    const $bar = {
      start: jest.fn()
    }
    createWrapper({mocks: { $bar }})
    expect($bar.start).toHaveBeenCalled()
  })
  
  it('calls $bar.finish when load successful', async () => {
    const $bar = {
      finish: jest.fn()
    }
    createWrapper({mocks: { $bar }})
    await flushPromises() // need to wait for the dispatch
    expect($bar.finish).toHaveBeenCalled()
  })
  
  it('dispatches fetchListData with top', () => {
    const store = createStore()
    store.dispatch = jest.fn(() => Promise.resolve())
    createWrapper({ store })
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {type: 'top'})
  })

  it('calls $bar.fail when fetchListData throws an error', async () => {
    const mocks = {
      $bar: { fail: jest.fn() }
    }
    const actions = {
      fetchListData: jest.fn(() => Promise.reject())
    }
    const store = createStore({ actions })
    createWrapper({ store, mocks })
    await flushPromises()
    expect(mocks.$bar.fail).toHaveBeenCalled()
  })
})
