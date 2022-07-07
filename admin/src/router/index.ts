import { createRouter, createWebHashHistory } from 'vue-router'
// import beforeEach from './before-each'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// // 路由守卫回调
// router.beforeEach(beforeEach)

export default router
