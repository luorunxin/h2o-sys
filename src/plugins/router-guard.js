/**
 *  导航守卫
 */

import Router from '@/router'

Router.beforeEach((to, from, next) => {
  console.log('router before each')
  next()
})

Router.beforeResolve((to, from, next) => {
  console.log('router before resolve')
  next()
})

Router.afterEach((to, from) => {
  console.log('router after each')
  console.log(to, from)
})