<template>
  <a-card class="no-menu-content">
    <template v-if="showBackBtn" #title>
      <a-button type="link" class="back-btn font-16" @click="router.back()">
        <LeftOutlined />返回首页
      </a-button>
    </template>
    <slot />
  </a-card>
</template>

<script setup lang="ts">
import { LeftOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';

const router = useRouter()

defineProps<{
  showBackBtn?: boolean
}>()

</script>

<style scoped>
.no-menu-content {
  padding: 0;
  height: 90%;
}
.back-btn {
  color: #333;
  padding: 0;
}
</style>