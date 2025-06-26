<template>
  <div class="layout">
    <div class="menu" :class="{ foldClass: foldFlag ? true : false }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          text-color="white"
          active-text-color="yellowgreen"
          :default-active="$route.path"
          router
          :collapse="foldFlag ? true : false"
        >
          <Menu :routeMenu="userStore.routeList"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="tabbar" :class="{ foldClass: foldFlag ? true : false }">
      <Tabbar @icon-fold="handleIconFold" />
    </div>
    <div class="content" :class="{ foldClass: foldFlag ? true : false }">
      <Content />
    </div>
  </div>
</template>
<script setup lang="ts">
import Content from "./content/index.vue";
import Menu from "./menu/index.vue";
import Tabbar from "./tabbar/index.vue";
import Logo from "./logo/index.vue";
import { useUserStore } from "@/store";
const userStore = useUserStore();
const foldFlag = ref(false);
const handleIconFold = (value: boolean) => {
  foldFlag.value = value;
};
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100vh;
  position: relative;
  .menu {
    width: $menu-width;
    height: 100%;
    background-color: $base-menu-background;
    transition: all 0.3s;
    .scrollbar {
      height: calc(100vh - $tabbar-height);
      .el-menu {
        border-right: none;
      }
    }
    &.foldClass {
      width: 40px;
    }
  }
  .tabbar {
    position: fixed;
    left: $menu-width;
    top: 0;
    height: $tabbar_height;
    width: calc(100% - $menu-width);
    transition: all 0.3;
    &.foldClass {
      left: 50px;
      width: calc(100vw - 40px);
    }
  }
  .content {
    position: absolute;
    top: $tabbar-height;
    left: $menu-width;
    width: calc(100% - $menu-width);
    height: calc(100vh - $tabbar-height);
    padding: 20px;
    overflow: auto;
    transition: all 0.3;
    &.foldClass {
      left: 50px;
      width: calc(100vw - 40px);
    }
  }
}
</style>
