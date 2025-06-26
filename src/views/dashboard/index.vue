<template>
  <div class="">
    <el-card>
      <el-row> 欢迎{{ userStore.username }}用户登录</el-row>
      <br />
      <el-row>
        这是封装了最新的vue3技术栈模板，包括自动化组件导入，自动化api引入，scss集成，unocss集成，axios二次封装
        svg图标组件封装，pinia，vue-router4,vue-i18n等等
      </el-row>
      <br />
      <el-row>
        这里提供了后台管理系统的核心功能即基于RABC的用户权限设计
        其他模块暂不提供
      </el-row>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/store";
const userStore = useUserStore();
</script>
<style lang="scss" scoped></style>
