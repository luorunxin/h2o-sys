import Storage from '@/utils/storage.js'

/**
 *  导航守卫
 */

import Router from '@/router'

Router.beforeEach((to, from, next) => {
  if(to.path == '/login'){
    if(from.path != '/login') {
      Storage.setLocal('current_path', from.fullPath)
    }
    Storage.removeLocal('user_info')
  }
  next()
})

Router.beforeResolve((to, from, next) => {
  next()
})

Router.afterEach(() => {

})