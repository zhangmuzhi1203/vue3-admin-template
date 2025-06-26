<template>
  <div class="tabbar_box">
    <div class="flex" style="margin-left: 20px">
      <el-icon @click="changeFlage" style="cursor: pointer">
        <component :is="foldFlag ? 'Fold' : 'Expand'"></component>
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="item in $route.matched"
          :key="item.path"
          :to="item.path"
          v-show="item.meta.title"
        >
          <el-icon class="breadcrumb">
            <component :is="item.meta.icon"></component>
          </el-icon>
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="flex" style="margin-right: 20px">
      <el-button size="small" icon="Refresh" circle @click="updateRefsh">
      </el-button>
      <el-button
        class="setting_btn"
        size="small"
        icon="Setting"
        circle
        @click="settingBtn"
      >
      </el-button>
      <img
        :src="userStore.avatar"
        style="width: 24px; height: 24px; border-radius: 50%"
      />
      <el-dropdown class="drop_down">
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useLayoutStore, useUserStore } from "@/store";
import { reqLogout } from "@/api/user";
import { REMOVE_TOKEN } from "@/utils/token";
const layoutStore = useLayoutStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const foldFlag = ref(false);
const emit = defineEmits(["icon-fold"]);
const changeFlage = () => {
  foldFlag.value = !foldFlag.value;
  emit("icon-fold", foldFlag.value);
};
const updateRefsh = () => {
  layoutStore.refresh = !layoutStore.refresh;
};
const settingBtn = () => {};
const logout = async () => {
  await reqLogout();
  userStore.avatar = "";
  userStore.username = "";
  REMOVE_TOKEN();
  router.push({ path: "/login" });
};
</script>
<style lang="scss" scoped>
.tabbar_box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .setting_btn {
    margin-right: 10px;
  }
  .drop_down {
    margin-left: 10px;
    cursor: pointer;
  }
  .breadcrumb {
    vertical-align: bottom;
  }
}
</style>
