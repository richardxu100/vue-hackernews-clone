import ItemList from '../views/ItemList'

export default [
  { path: '/', redirect: '/top' },
  // :page? makes page an optional parameter
  { path: '/top/:page?', component: ItemList, props: {type: 'top'} },
  // that's cool that you can pass props in a route
  { path: '/new/:page?', component: ItemList, props: {type: 'new'} },
  { path: '/show/:page?', component: ItemList, props: {type: 'show'} },
  { path: '/ask/:page?', component: ItemList, props: {type: 'ask'} },
  { path: '/job/:page?', component: ItemList, props: {type: 'job'} },
]
