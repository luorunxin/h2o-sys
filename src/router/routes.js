import {basicLayout, pageView} from '@/layouts'

/**
 路由配置
 */

const GoodsList = () => import('@/views/goods/goodsList');
const AddUpdateGoods = () => import('@/views/goods/addUpdateGoods');

export default [
  {
    path: '/',
    redirect: '/goods',
    component: basicLayout,
    meta: {title: '首页'},
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
            path: '/goods/addUpdateGoods',
            name: 'goods_addUpdateGoods',
            component: AddUpdateGoods,
            meta: {title: '添加商品'},
          }
        ]
      },






    ],
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]