const merge = require('lodash.merge')

const obj = {
  mocks: {
    $bar: {}
  },
  $route: {
    params: {}
  }
}

const mocks = {
  $route: {
    params: {
      page: 2
    }
  }
}

console.log(merge(obj, { mocks }))

// const me = {
//   name: 'rich',
//   age: 29
// }

// const moreProps = {
//   age: 19,
//   name: 'overman'
// }

// const totalBeing = merge(me, moreProps)
// console.log(totalBeing) // {name: 'overman', age: 19}