<template>
  <template v-for="item in props.routeMenu" :key="item.path">
    <!-- 当没有子路由的时候 -->
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-if="!item.meta?.hidden">
        <el-icon>
          <component :is="item.meta?.icon"></component>
        </el-icon>
        {{ item.meta?.title }}
      </el-menu-item>
    </template>
    <!-- 当只有一个子路由的时候 -->
    <template v-if="item.children && item.children?.length === 1">
      <el-menu-item
        :index="item.children[0].path"
        v-if="!item.children[0].meta?.hidden"
      >
        <el-icon>
          <component :is="item.children[0].meta?.icon"></component>
        </el-icon>
        {{ item.children[0].meta?.title }}
      </el-menu-item>
    </template>
    <!-- 当有多个子路由的时候 -->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta?.icon"></component>
        </el-icon>
        {{ item.meta?.title }}
      </template>
      <MenuComponent :routeMenu="item.children"></MenuComponent>
    </el-sub-menu>
  </template>
</template>
<script setup lang="ts">
defineOptions({
  name: "MenuComponent",
  inheritAttrs: false,
});
interface Meta {
  title?: string;
  icon?: string;
  hidden?: boolean;
}
interface ArrayData {
  path?: string;
  meta?: Meta;
  children?: Array<ArrayData>;
}
interface Props {
  routeMenu: Array<ArrayData>;
}
const props = defineProps<Props>();
</script>
<style lang="scss" scoped></style>
