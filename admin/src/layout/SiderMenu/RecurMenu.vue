
<template>
  <template v-for="m in menus">
    <a-sub-menu
      v-if="m.children && m.children.length"
      :key="'' + [parKey, m.name].join('/')"
      class="font-16"
      :title="m.meta.title"
    >
      <template #expandIcon>
        <IconFont type="icon-shiping-xia" style="font-size: 22px" />
      </template>
      <template v-if="m.meta.iconClass" #icon>
        <IconFont :type="m.meta.iconClass" style="font-size: 32px" />
      </template>
      <RecurMenu :menus="m.children" :par-key="[parKey, m.name].join('/')" />
    </a-sub-menu>
    <a-menu-item v-else :key="[parKey, m.name].join('/')" :class="{ 'first-level': parKey === '' }">
      <span class="font-14">{{ m.meta.title }}</span>
      <template v-if="m.meta.iconClass" #icon>
        <IconFont :type="m.meta.iconClass" style="font-size: 32px" />
      </template>
    </a-menu-item>
  </template>
</template>


<script setup lang="ts">
import { menuArrayType } from '@/utils/menu-config'

defineProps<{
  menus: Array<menuArrayType>
  parKey: string
}>()
</script>
