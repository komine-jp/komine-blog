import { RouteRecordRaw } from 'vue-router'
const user = () => import('@/pages/user/index.vue')
const routes: Array<RouteRecordRaw> = [
    {
        path: 'info',
        meta: {
            title: '信息管理',
        },
        component: user,
    }
]

export default routes
