import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './home'
import Login from './login'


Vue.use(VueRouter)

const routes = [
  Home,
  Login,
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {path : '*',component : () => import(/* webpackChunkName: "about" */ '../views/About.vue')}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  
  if (to.name != 'Login') {
    let token = localStorage.getItem('User-Token')
    if (!token) {
      next({name: 'Login'});
    } 
  }
  next()
})

export default router
