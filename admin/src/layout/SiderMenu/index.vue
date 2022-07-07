<template>
  <a-layout-sider width="240px" class="layout-sider">
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      class="layout-sider-menu"
      mode="inline"
      @click="handleClick"
    >
      <RecurMenu :menus="menuConfig" :par-key="''" />
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import menuConfig from "@/utils/menu-config";
import RecurMenu from "./RecurMenu.vue";

const selectedKeys: any = ref([]);
const openKeys = ref([]);
const route = useRoute();
const router = useRouter();

function calcRoute() {
  const pathname = route.path;

  const paths = pathname.split("/");
  // 去掉头尾 为打开的路径
  paths.shift();
  paths.pop();
  const selectedKeys: any = [pathname];
  const openKeys: any = [];
  // 生成面包屑路径
  paths.reduce((prev, cur) => {
    const path = prev + "/" + cur;
    openKeys.push(path);
    return path;
  }, "");
  return { selectedKeys, openKeys };
}

// 路由点击跳转
function handleClick({ key }: any) {
  const query = route.query;
  selectedKeys.value = [key];
  router.push({ path: key, query });
}

function toggleMenuByRoute() {
  const calcRouteKeys = calcRoute();
  selectedKeys.value = calcRouteKeys.selectedKeys;
  openKeys.value = calcRouteKeys.openKeys;
}

onMounted(() => {
  toggleMenuByRoute();
});

watch(
  () => route.path,
  () => {
    toggleMenuByRoute();
  }
);
</script>

<style scoped lang="less">
.layout-sider {
  width: 240px;
  overflow: hidden;
  overflow-y: auto;
  background: #fff;
}

.layout-sider-menu {
  height: 100%;

  :deep(.ant-menu-item) {
    &::after {
      left: 0;
      right: unset;
      border-right-width: 4px;
    }
  }
}
:deep(.ant-menu-item) {
  &:not(.first-level) {
    padding-left: 66px !important;
    height: 50px !important;
  }
}

:deep(.ant-menu-submenu-open) {
  .eco-iconfont {
    transform: rotate(180deg);
  }
}

:deep(.ant-menu:not(.ant-menu-horizontal)) {
  .ant-menu-item-selected {
    background-color: rgba(32, 160, 255, 0.3);
    color: rgba(32, 160, 255, 0.8);
  }
}

:deep(.ant-menu-sub.ant-menu-inline) {
  background: #fff;
  color: #777;

  .ant-menu-item-active {
    color: unset;
    background: #fafafa;
  }

  .ant-menu-item-active.ant-menu-item-selected {
    background-color: rgba(32, 160, 255, 0.3);
    color: rgba(32, 160, 255);
  }
}

:deep(.ant-menu-inline) {
  .ant-menu-submenu > .ant-menu-submenu-title {
    color: #333;
    font-weight: bold;
    height: 56px;
  }
}

:deep(.first-level) {
  height: 56px !important;
  .font-14 {
    color: #333;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
