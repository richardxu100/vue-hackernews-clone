import getters from '../getters'

describe('getters', () => {
  it('displaysItems returns the first 20 items from state.list', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    const state = {
      items: [...numbers],
      route: {params: {}}
    }
    const result = getters.displayItems(state)
    expect(result.length).toEqual(20)
    const firstTwenty = numbers.slice(0, -1)
    expect(result).toEqual(firstTwenty)
  })

  it('displayItems returns items 20-40 if page is 2', () => {
    const numbers = Array(40).fill().map((v, i) => i)
    const result = getters.displayItems({
      items: numbers,
      route: {
        params: { page: 2 }
      }
    })
    expect(result.length).toEqual(20)
    for (let i = 0; i < 20; i++) {
      expect(result[i]).toBe(numbers[i + 20])
    }
  })

  it('displayItems returns remaining items if there are not enough remaining items', () => {
    const numbers = Array(21).fill().map((v, i) => i)
    const store = {
      items: numbers,
      route: {
        params: { page: 2 }
      }
    }
    const result = getters.displayItems(store)
    expect(result.length).toEqual(1)
    expect(result[0]).toBe(numbers[20])
  })
})