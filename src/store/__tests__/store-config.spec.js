jest.mock('../../api/api')

import Vuex from 'vuex'
import Vue from 'vue'
import deepClone from 'lodash.clonedeep'
import flushPromises from 'flush-promises'
import storeConfig from '../store-config'
import { fetchListData } from '../../api/api'

Vue.use(Vuex)

function createItems() {
  const arr = new Array(22)
  return arr.fill().map((item, i) => ({
    id: `a${i}`,
    name: 'item'
  }))
}

describe('store-config', () => {
  test('calling fetchListData with the type returns top 20 active Items from activeItems getter', async () => {
    const items = createItems()
    const clonedStoreConfig = deepClone(storeConfig)
    const store = new Vuex.Store(clonedStoreConfig)
    const type = 'top'
    
    fetchListData.mockImplementation((calledType) => {
      return calledType === type
        ? Promise.resolve(items)
        : Promise.resolve()
    })

    store.dispatch('fetchListData', { type })
    await flushPromises() // always include this after async tests
    
    expect(store.getters.displayItems).toHaveLength(20)
    expect(store.getters.displayItems.every((item, i) => item === items[i])).toBe(true)
  })
})


