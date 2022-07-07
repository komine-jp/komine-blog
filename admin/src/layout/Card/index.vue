<template>
  <a-card v-bind="$props" class="layout-card">
    <slot />
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.extra" #extra>
      <slot name="extra" />
    </template>
  </a-card>
</template>

<style scoped lang="less">
.layout-card {
  .ant-card-head-title {
    padding: 10px 0;

    &::before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 10px;
      background: @primary-color;
      margin-right: 5px;
    }
  }

  .ant-card-body {
    padding: 20px;
  }
}
</style>