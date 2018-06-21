export default {
  displayItems(state) {
    const page = Number(state.route.params.page) || 1 // if they don't pass a page, it will default to 1
    const items = state.items
    let start = 20 * (page - 1)
    let end = start + 20
    return items.slice(start, end)
  }
}