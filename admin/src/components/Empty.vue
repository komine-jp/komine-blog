<template>
  <div class="empty" :style="{ height }">
    <img v-if="image" :src="image" alt="暂无数据" class="img margin-b-10" />
    <img v-else src="~@/assets/logo.png" class="img margin-b-10" />
    <span v-if="title" class="title">{{ title }}</span>
    <span>{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  image: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '暂无数据',
  },
  height: {
    type: String,
    default: '300px',
  },
})
</script>

<style scoped lang="less">
.empty {
  display: flex;
  height: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 20px;
    font-weight: 500;
    color: @heading-color;
  }

  @imgSize: 182px;
  .img {
    width: @imgSize;
    height: @imgSize;
  }
}
</style>
