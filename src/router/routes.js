import {basicLayout, pageView} from '@/layouts'

/**
 路由配置
 */

const GoodsList = () => import('@/views/goods/goodsList');
const AddUpdateGoods = () => import('@/views/goods/addUpdateGoods');
const PermissionList = () => import('@/views/permissionsManage/permissionList');
const Duty = () => import('@/views/permissionsManage/duty');
const AddUpdateDuty = () => import('@/views/permissionsManage/addUpdateDuty');
const RoleList = () => import('@/views/permissionsManage/roleList');
const AddUpdateRole = () => import('@/views/permissionsManage/AddUpdateRole');

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
            meta: {title: '编辑商品'},
          }
        ]
      },
      {
        path: '/permissionsManage',
        name: 'permissionsManage',
        component: pageView,
        redirect: '/permissionsManage/permissionList',
        meta: {title: '权限管理', level: 1, icon: 'icon-quanxianguanli'},
        children: [
          {
            path: '/permissionsManage/permissionList',
            name: 'permissionsManage_permissionList',
            component: PermissionList,
            meta: {title: '权限', level: 2, icon: 'icon-icon--quanxian'},
          },
          {
            path: '/permissionsManage/duty',
            name: 'permissionsManage_duty',
            component: Duty,
            meta: {title: '职务', level: 2, icon: 'icon-zhiwu'},
          },
          {
            path: '/permissionsManage/AddUpdateDuty',
            name: 'permissionsManage_AddUpdateDuty',
            component: AddUpdateDuty,
            meta: {title: '编辑职务'},
          },
          {
            path: '/permissionsManage/roleList',
            name: 'permissionsManage_roleList',
            component: RoleList,
            meta: {title: '角色', level: 2, icon: 'icon-jiaose'},
          },
          {
            path: '/permissionsManage/AddUpdateRole',
            name: 'permissionsManage_AddUpdateRole',
            component: AddUpdateRole,
            meta: {title: '编辑角色'},
          },
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