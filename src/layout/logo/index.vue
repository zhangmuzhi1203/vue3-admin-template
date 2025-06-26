<template>
  <div class="logo">
    <div style="width: 40px; height: 40px">
      <SvgIcon iconClass="tb" size="35" style="margin-left: 5px" />
    </div>
    <p class="title">基于vue3的快速开发模板</p>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $tabbar-height;
  display: flex;
  align-items: center;
  .title {
    font-size: 20px;
    color: #fff;
    margin-left: 10px;
  }
}
</style>
