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
    path: '/bot',
    name: 'bot',
    component: () => import(/* webpackChunkName: "about" */ '../views/OnOffView')
  },
  {
    path: '/tickets',
    name: 'tickets',
    component: () => import(/* webpackChunkName: "about" */ '../views/TicketsView')
  },
]

const router = new VueRouter({
  routes
})

export default router
