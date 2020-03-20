import {basicLayout, pageView} from '@/layouts'

/**
 路由配置
 */

const GoodsList = () => import('@/views/goods/goods-list/goods-list');
const ProductModification = () => import('@/views/goods/ProductModification');

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
        meta: {title: '商品', level: 1, icon: 'icon-shangpinliebiao'},
        children: [
          {
            path: '/goods/list',
            name: 'goods_list',
            component: GoodsList,
            meta: {title: '商品列表', level: 2, icon: 'icon-shangpinliebiao1'},
          },
          {
            path: '/goods/ProductModification',
            name: 'ProductModification',
            component: ProductModification,
            meta: {title: '编辑商品', level: 3, icon: 'icon-iconyonghu'},
          },
        ]
      },
    ],
    meta: {title: '首页'}

  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]