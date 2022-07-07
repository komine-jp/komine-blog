<template>
  <a-layout class="no-menu-layout">
    <Header />
    <a-layout-content class="layout-content">
      <router-view />
    </a-layout-content>
    <Footer />
  </a-layout>
</template>

<script setup lang="ts">
import Header from '@/layout/Header/index.vue'
import Footer from '@/layout/Footer/index.vue'
</script>

<style scoped lang="less">
.no-menu-layout {
  height: 100%;
}

:deep(.no-menu-content) {
  width: 70%;
  height: 100%;
  margin: 60px auto 0;
  background: #fff;
  border-radius: 2px;
  padding: 60px 54px;
  color: #333;
  overflow: hidden;
  overflow-y: auto;
}
</style>
