import {basicLayout, pageView} from '@/layouts'

/**
    路由配置
 */

const Father = () => import('@/views/father/father')
const Child = () => import('@/views/child/child')
const One = () => import('@/views/one/one')
const Two = () => import('@/views/two/two')
const Three = () => import('@/views/three/three')

export default [
  {
    path: '/',
    redirect: '/num',
    component: basicLayout,
    children: [
      {
        path: '/num',
        name: 'num',
        component: pageView,
        redirect: '/num/one',
        meta: {title: 'Num', level: 1,icon: 'icon-home'},
        children: [
          {
            path: '/num/one',
            name: 'father_one',
            component: One,
            meta: {title: 'one', level: 2, icon: 'icon-mine'},
          },
          {
            path: '/num/two',
            name: 'father_two',
            component: Two,
            meta: {title: 'two', level: 2, icon: 'icon-mine'},
          },
          {
            path: '/num/three',
            name: 'father_three',
            component: Three,
            meta: {title: 'three', level: 2, icon: 'icon-mine'},
          },
        ]
      },
      {
        path: '/father',
        name: 'father',
        component: Father,
        meta: { title: 'Father', level: 1, icon: 'icon-home' }
      },
      {
        path: '/child',
        name: 'child',
        component: Child,
        meta: { title: 'Child', level: 1, icon: 'icon-home' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]