<template>
  <div class="">
    <el-drawer v-model="drawer">
      <template #header>
        <h4>给角色分配菜单权限和按钮权限</h4>
      </template>
      <template #default>
        <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :data="treeData"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="selectedTreeNode"
          :props="defaultProps"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { reqAllMenuList, reqSetPermisstion } from "@/api/acl/role/index";
import type { MenuList } from "@/api/acl/role/type";
const drawer = ref<boolean>(false);
const openDrawer = async (row: any) => {
  drawer.value = true;
  if (!row) return;
  if (row) {
    roleNameId.value = row.id;
    const result: any = await reqAllMenuList(row.id);
    console.log(result.data, "结果");
    //获取树节点所有数据
    treeData.value = result.data;
    selectedTreeNode.value = filterSelectArr(treeData.value, []);
  }
};
const cancelClick = () => {
  drawer.value = false;
};
const roleNameId = ref<number>();
const treeRef = ref();
const confirmClick = async () => {
  console.log(treeRef.value.getCheckedKeys(), "选中的节点集合");
  console.log(treeRef.value.getHalfCheckedKeys(), "选中节点的半节点");
  const nodeIdArr = treeRef.value
    .getCheckedKeys()
    .concat(treeRef.value.getHalfCheckedKeys());
  console.log(nodeIdArr, "整合");
  const result: any = await reqSetPermisstion(
    roleNameId.value as unknown as number,
    nodeIdArr
  );
  console.log(result, "结果1");
  if ((result.code = 200)) {
    ElMessage({
      type: "success",
      message: "分配成功",
    });
    drawer.value = false;
    props.getList();
  } else {
    ElMessage({
      type: "error",
      message: "分配失败",
    });
    drawer.value = false;
  }
};
defineExpose({ openDrawer });
const props = defineProps(["getList"]);
const defaultProps = {
  children: "children",
  label: "name",
};
const treeData = ref<MenuList>([]);
const selectedTreeNode = ref<number[]>([]);
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id);
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr);
    }
  });

  return initArr;
};
</script>
<style lang="scss" scoped></style>
