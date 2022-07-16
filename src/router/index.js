import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/table',
    name: 'table',
    component: () => import(/* webpackChunkName: "about" */ '../views/TableView.vue')
  },
  {
    path: '/broadcast',
    name: 'broadcast',
    component: () => import(/* webpackChunkName: "about" */ '../views/BroadcastView')
  },
  {
    path: '/logs',
    name: 'logs',
    component: () => import(/* webpackChunkName: "about" */ '../views/LogsView')
  },
]

const router = new VueRouter({
  routes
})

export default router
