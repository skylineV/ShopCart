import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'index',
  component: () => import('../views/index.vue')
}, {
  path: '/main',
  name: 'main',
  component: () => import('../views/main.vue')
}]

const router = new VueRouter({
  routes
})

export default router