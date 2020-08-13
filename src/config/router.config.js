// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout,RouteView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

/**
 * 不需要缓存 情况下用下面这个 需要缓存页面则用 layouts的RouteView
 * @type {*[]}
 */
// const RouteView = {
//   name: 'RouteView',
//   render: (h) => h('router-view')
// }

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页', keepAlive: true},
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '首页', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true, permission: [ 'dashboard' ] }
          }
        ]
      },
      // list
      {
        path: '/list',
        name: 'list',
        component: RouteView,
        redirect: '/list/table-list',
        meta: { title: '基础组件', icon: 'table',keepAlive: true, permission: [ 'table' ] },
        children: [
          {
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: '基础表格', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      },

      {
        path: '/setting',
        component: RouteView,
        meta: { title: '设置中心', keepAlive: true, icon: 'form', permission: [ 'form' ] },
        children: [
          {
            path: 'MenuTree',
            name: 'MenuTree',
            component: () => import('@/views/settings/MenuTree'),
            meta: { title: '菜单设置', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: 'tables',
            name: 'Tables',
            component: () => import('@/views/settings/Tables'),
            meta: { title: '基础表单', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/test',
            name: 'Test',
            component: () => import('@/views/Test'),
            meta: { title: '测试', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/test1',
            name: 'Test1',
            component: () => import('@/views/Test1'),
            meta: { title: '测试1', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/test2',
            name: 'Test2',
            component: () => import('@/views/Test2'),
            meta: { title: '测试2', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/RoleList',
            name: 'RoleList',
            component: () => import('@/views/role/RoleList'),
            meta: { title: '权限', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
