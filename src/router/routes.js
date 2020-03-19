import {basicLayout, pageView} from '@/layouts'

/**
    路由配置
 */

const GoodsList = () => import('@/views/goods/goods-list/goods-list')

export default [
  {
    path: '/',
    redirect: '/goods',
    component: basicLayout,
    children: [


      {
        path: '/goods',
        name: 'goods',
        component: pageView,
        redirect: '/goods/list',
        meta: {title: '商品', level: 1,icon: 'icon-home'},
        children: [
          {
            path: '/goods/list',
            name: 'goods_list',
            component: GoodsList,
            meta: {title: '商品列表', level: 2, icon: 'icon-mine'},
          },
        ]
      },


    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]