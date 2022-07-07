
import user from './user'
const home = () => import('@/pages/home/index.vue')
import MenuLayout from '@/layout/MenuLayout/index.vue'
export default [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: MenuLayout,
        children: [
            {
                path: '',
                meta: {
                    title: '首页',
                },
                component: home,
            },
        ],
    },
    {
        path: '/user',
        component: MenuLayout,
        meta: {
            title: '个人信息管理'
        },
        children: [...user]
    },
]
