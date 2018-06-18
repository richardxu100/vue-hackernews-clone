import { fetchListData } from '../api/api'

export default {
  fetchListData: (context, { type }) => {
    return fetchListData(type).then(items => {
      context.commit('setItems', { items })
    })    
  }
}