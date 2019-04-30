import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Users from '@/components/users/Users'
import Nextpage from '@/components/users/nextPage/Nextpage'
import SDKpage from '@/components/users/sdkPage/sdkpage'
import History from '@/components/history/History'
import CollectHistory from '@/components/history/CollectHistory'
import Shouye from '@/components/shouye/Shouye'
import AddShebei from '@/components/users/shebei/addShebei'
import GroupShebei from '@/components/users/shebei/groupShebei'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/home',
      component: Home,
      children: [
        {name:'users',path: 'users',component: Users},
        {name:'nextpage',path: 'nextpage',component: Nextpage},
        {name:'sdkpage',path: 'SDKpage',component: SDKpage},
        {name:'history',path: 'history',component: History},
        {name:'collectHistory',path: 'collectHistory',component: CollectHistory},
        {name:'shouye',path: 'shouye',component: Shouye},
        {name:'addshebei',path: 'addshebei',component: AddShebei},
        {name:'groupshebei',path: 'groupshebei',component: GroupShebei}
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

// 全局导航守卫
// 所有的路由都会先走导航守卫
// 导航守卫添加后，不管访问哪个界面都会执行导航守卫
router.beforeEach((to, from, next) => {
  console.log('导航守卫',to)
  if(to.path === '/login'){
    next()
  }else {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      
      next('/login')
    }
  }
  // next('/login')
})

export default router