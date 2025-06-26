<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useLayoutStore } from "@/store";
const layoutStore = useLayoutStore();
const flag = ref<Boolean>(true);
watch(
  () => layoutStore.refresh,
  () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  }
);
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
