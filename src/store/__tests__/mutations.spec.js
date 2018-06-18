import mutations from '../mutations'

describe('mutations', () => {
  it('setItems sets state.items to items', () => {
    const items = [{id: 1}, {id: 2}]
    const state = {}
    mutations.setItems(state, { items })
    expect(state.items).toBe(items)
  })
})