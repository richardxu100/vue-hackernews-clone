jest.mock('@/api/api.js')

import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
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
        },
        $route: {
          params: {}
        },
        $router: {
          replace: () => {} // jest.fn() could work too
        },
      },
      stubs: {
        RouterLink: RouterLinkStub
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
  
  it('dispatches fetchListData with prop "type"', () => {
    const store = createStore()
    store.dispatch = jest.fn(() => Promise.resolve())
    const type = 'a type'
    const propsData = { type }
    createWrapper({ store, propsData })
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', { type })
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

  // routes

  it('renders 1/5 when on page 1 of 5', () => {
    const store = createStore({
      state: {
        items: new Array(100).fill({})
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.text()).toContain('1/5')
  })

  it('renders 2/5 when on page 2 of 5', () => {
    const store = createStore({
      state: {
        items: new Array(99).fill({})
      }
    })
    // it looks like you can just mock an object with mocks (not just a function)
    const mocks = {
      $route: {
        params: {
          page: 2
        }
      }
    }
    const wrapper = createWrapper({ store, mocks })
    expect(wrapper.text()).toContain('2/5')
  })

  it('calls $router.replace when the page parameter is less than 0', async () => {
    const mocks = {
      $route: {
        params: { page: -1 }
      },
      $router: {
        replace: jest.fn()
      }
    }
    const propsData = {
      type: 'a type'
    }
    createWrapper({ mocks, propsData })
    await flushPromises()
    expect(mocks.$router.replace).toHaveBeenCalledWith(`/${propsData.type}/1`)
  })
  
  it('calls $router.replace when the page parameter is greater than the max page number', async () => {
    const mocks = {
      $route: {
        params: { page: 1000 }
      },
      $router: {
        replace: jest.fn()
      }
    }
    const propsData = {
      type: 'a type'
    }
    createWrapper({ mocks, propsData })
    await flushPromises()
    expect(mocks.$router.replace).toHaveBeenCalledWith(`/${propsData.type}/1`)
  })

  it('renders a <router-link> with the previous page if one exists', () => {
    const mocks = {
      $route: {
        params: { page: 2 }
      }
    }
    const propsData = {
      type: 'a type'
    }
    const wrapper = createWrapper({ mocks, propsData })
    expect(wrapper.find(RouterLinkStub).props().to).toBe(`/${propsData.type}/1`)
    expect(wrapper.find(RouterLinkStub).text()).toBe('< prev')
  })

  it('renders a <router-link> with the next page if one exists', () => {
    const store = createStore({
      state: { items: new Array(40).fill({}) }
    })
    const propsData = {
      type: 'a type'
    }
    const wrapper = createWrapper({ store, propsData })
    expect(wrapper.find(RouterLinkStub).props().to).toBe(`/${propsData.type}/2`)
    expect(wrapper.find(RouterLinkStub).text()).toBe('more >')
  })

  it('renders an <a> element without an href if there are no previous pages', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('a').attributes().href).toBe(undefined)
    expect(wrapper.find('a').text()).toBe('< prev')
  })

  it('renders an <a> element without an href if there are no next pages', () => {
    const store = createStore({ // can maybe get rid of this
      state: { items: [Array(10).fill({})] }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.findAll('a').at(1).attributes().href).toBe(undefined)
    expect(wrapper.findAll('a').at(1).text()).toBe('more >')
  })
})
