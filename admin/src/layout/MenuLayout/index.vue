<template>
  <a-layout class="menu-layout">
    <a-layout-header class="layout-header" style="background-color: rgba(32, 160, 255)">
      <a-row align="middle">
        <div>
          <img style="height: 54px; width: 54px;border-radius: 50%;" src="~@/assets/blogLogo.jpg" class="margin-r-10" />
        </div>
        <div style="font-size: 20px; color: #fff; font-weight: bold">博客信息后端管理</div>
      </a-row>
    </a-layout-header>
    <a-layout class="layout-content-wrapper">
      <SiderMenu />
      <a-layout>
        <a-layout-content ref="layoutContent" class="layout-content">
          <router-view v-if="state.isRouterAlive" />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
// import Header from "@/layout/Header/index.vue";
import SiderMenu from '@/layout/SiderMenu/index.vue'
import { provide, nextTick, reactive } from 'vue'

const state = reactive({
  isRouterAlive: true,
})

provide('reload', reload)

function reload() {
  state.isRouterAlive = false
  nextTick(() => {
    state.isRouterAlive = true
  })
}
</script>

<style scoped lang="less">
.menu-layout {
  height: 100%;
  display: flex;
  flex-direction: column;

  .layout-content-wrapper {
    flex: 1;
  }

  .layout-content {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    background: transparent;
  }
}
</style>

<style>
.breadcrumb-container .ant-affix {
  transition: box-shadow 0.3s;
  box-shadow: 2px 2px 10px 0 #eee;
}
</style>
