// const files = require.context('.', false, /\.js$/)
// const modules = {}
//
// files.keys().forEach((key) => {
//   if (key === './index.js') return
//   modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
// })

import itemType from './itemType';
const modules = {
  itemType
}
export default modules
