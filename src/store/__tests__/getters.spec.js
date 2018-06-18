import getters from '../getters'

describe('getters', () => {
  it('displaysItems returns the first 20 items from state.list', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    const state = {
      items: [...numbers]
    }
    const result = getters.displayItems(state)
    expect(result.length).toEqual(20)
    const firstTwenty = numbers.slice(0, -1)
    expect(result).toEqual(firstTwenty)
  })
})