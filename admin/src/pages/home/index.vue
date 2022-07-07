<template>
  <div
    style="min-height: 100%; width: 100%;color: #fff;font-size: 40px; text-align: center;"
    :style="{
      background: `url(${homeBg}) 0% 0% no-repeat `,
      'background-size': '100% 100%',
    }"
  >
  Welcome To Komine's Blog
  </div>
</template>
<script setup lang="ts">
import homeBg from '@/assets/homeBg.jpeg'
</script>
