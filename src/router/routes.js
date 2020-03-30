import {basicLayout, menuView, pageView} from '@/layouts'

/**
 路由配置
 */

const Login = () => import('@/views/login/login');
const GoodsList = () => import('@/views/goods/goodsList');
const AddUpdateGoods = () => import('@/views/goods/addUpdateGoods');
const PermissionList = () => import('@/views/permissionsManage/permissionList');
const Duty = () => import('@/views/permissionsManage/duty');
const AddUpdateDuty = () => import('@/views/permissionsManage/addUpdateDuty');
const RoleList = () => import('@/views/permissionsManage/roleList');
const AddUpdateRole = () => import('@/views/permissionsManage/AddUpdateRole');
const UserList = () => import('@/views/user/userList');

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
        component: menuView,
        redirect: '/goodsList',
        meta: {title: '商品', level: 1, icon: 'icon-shangpinliebiao', permission: 'goods'},
        children: [
          {
            path: '/goods/list',
            name: 'goods_list',
            component: pageView,
            redirect: '/goodsList',
            meta: {title: '商品列表', level: 2, icon: 'icon-shangpinliebiao1', permission: 'goods_list'},
            children: [
              {
                path: '/goodsList',
                name: 'goods_list',
                component: GoodsList,
                meta: {title: '商品列表',},
              },
              {
                path: '/goods/addUpdateGoods',
                name: 'goods_addUpdateGoods',
                component: AddUpdateGoods,
                meta: {title: '编辑商品'},
              }
            ]
          },
        ]
      },
      {
        path: '/permissionsManage',
        name: 'permissionsManage',
        component: menuView,
        redirect: '/permissionsManage/permissionList',
        meta: {title: '权限管理', level: 1, icon: 'icon-quanxianguanli', permission: 'permissions_manage'},
        children: [
          {
            path: '/permissionsManage/permission',
            name: 'permissionsManage_permissionList',
            component: pageView,
            redirect: '/permissionsManage/permissionList',
            meta: {title: '权限', level: 2, icon: 'icon-icon--quanxian', permission: 'permission'},
            children: [
              {
                path: '/permissionsManage/permissionList',
                name: 'permissionsManage_permissionList',
                component: PermissionList,
                meta: {title: '权限列表'},
              },
            ]
          },
          {
            path: '/permissionsManage/duty',
            name: 'permissionsManage_duty',
            component: pageView,
            redirect: '/permissionsManage/dutyList',
            meta: {title: '职务', level: 2, icon: 'icon-zhiwu', permission: 'duty'},
            children: [
              {
                path: '/permissionsManage/dutyList',
                name: 'permissionsManage_duty',
                component: Duty,
                meta: {title: '职务列表',},
              },
              {
                path: '/permissionsManage/AddUpdateDuty',
                name: 'permissionsManage_AddUpdateDuty',
                component: AddUpdateDuty,
                meta: {title: '编辑职务'},
              },
            ]
          },
          {
            path: '/permissionsManage/role',
            name: 'permissionsManage_roleList',
            component: pageView,
            redirect: '/permissionsManage/roleList',
            meta: {title: '角色', level: 2, icon: 'icon-jiaose', permission: 'role'},
            children: [
              {
                path: '/permissionsManage/roleList',
                name: 'permissionsManage_roleList',
                component: RoleList,
                meta: {title: '角色列表'},
              },
              {
                path: '/permissionsManage/AddUpdateRole',
                name: 'permissionsManage_AddUpdateRole',
                component: AddUpdateRole,
                meta: {title: '编辑角色'},
              },
            ]
          },
        ]
      },
      {
        path: '/user',
        name: 'user',
        component: menuView,
        redirect: '/userList',
        meta: {title: '用户', level: 1, icon: 'icon-yonghu', permission: 'user'},
        children: [
          {
            path: '/user/list',
            name: 'user_list',
            component: pageView,
            redirect: '/userList',
            meta: {title: '用户列表', level: 2, icon: 'icon-yonghuliebiao', permission: 'user_list'},
            children: [
              {
                path: '/userList',
                name: 'userList',
                component: UserList,
                meta: {title: '用户列表',},
              },
            ]
          },
        ]
      },


    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]