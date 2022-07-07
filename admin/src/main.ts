import { createApp } from 'vue'
import App from './App.vue'
import antd from '@/plugins/antd'
import router from '@/router'
import './styles/index.less'
createApp(App).use(antd).use(router).mount('#app')
