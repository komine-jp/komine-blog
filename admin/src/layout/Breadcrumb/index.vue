<template>
  <a-breadcrumb v-if="breadcrumList?.length" class="breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadcrumList" :key="item.path">
      <router-link
        v-if="index !== (breadcrumList.length - 1) && item.path && !item.leafRoot"
        :to="{ path: item.path, query }"
      >{{ item.label }}</router-link>
      <span v-else>{{ item.label }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
  <span v-else>{{ companyInfo.farmName }}</span>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { RouteRecordNormalized, LocationQuery, useRoute } from 'vue-router'
import { useStore } from 'vuex';

interface breadcrumbItemITF {
  label: string | unknown
  path: string
  leafRoot: boolean
}

const store = useStore()
const route = useRoute()

const breadcrumList = ref<breadcrumbItemITF[]>([])
const query = ref<LocationQuery>(route.query)

const companyInfo = computed(() => store.state.user.companyInfo)

function resolveItems(matched: RouteRecordNormalized[]) {
  breadcrumList.value = matched.filter(m => m.meta.title).map(m => ({ path: m.path, label: m.meta.title, leafRoot: Boolean(m.meta.leafRoot) }))
  const firstItem = { label: companyInfo.value.farmName, path: '/home', leafRoot: false }
  const isHome = breadcrumList.value[breadcrumList.value.length - 1].path === '/home'
  isHome && breadcrumList.value.pop()
  breadcrumList.value.unshift(firstItem)
  breadcrumList.value = breadcrumList.value
}

watch(() => route.matched, matched => {
  matched && matched.length && resolveItems(matched)
})

onMounted(() => {
  resolveItems(route.matched)
})
</script>

<style scoped>
.breadcrumb {
  background: #fff;
  padding: 12px 24px;
}
</style>