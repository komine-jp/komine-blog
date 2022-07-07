<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>
<script lang="ts" setup>
// 时间组件汉化
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>