<template>
  <div class="">
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配角色（职位）</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input v-model="userForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="checkedRoles"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="role in rolesList"
                :key="role"
                :label="role"
                :value="role"
              >
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import type { CheckboxValueType } from "element-plus";
import { reqAllRole, reqSetUserRole } from "@/api/acl/user/index";
import type {
  AllRoleResponseData,
  AllRole,
  SetRoleData,
} from "@/api/acl/user/type";
const drawer = ref<boolean>(false);
const userForm = reactive({
  id: "",
  username: "",
});
const checkAll = ref(false);
const isIndeterminate = ref(true);
const checkedRoles = ref<AllRole>([]);
const rolesList = ref<AllRole>([]);

const handleCheckAllChange = (val: CheckboxValueType) => {
  checkedRoles.value = val ? rolesList.value : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === rolesList.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < rolesList.value.length;
};
const openAllowRole = async (row: any) => {
  drawer.value = true;
  if (!row) return;
  if (row) {
    userForm.id = row.id;
    userForm.username = row.username;
    const result: AllRoleResponseData = await reqAllRole(
      userForm.id as unknown as number
    );
    rolesList.value = result.data.allRolesList;
    checkedRoles.value = result.data.assignRoles;
  }
};
const cancelClick = () => {
  drawer.value = false;
};
const confirmClick = async () => {
  const data: SetRoleData = {
    userId: userForm.id as unknown as number,
    roleIdList: checkedRoles.value.map((item) => item.id as unknown as number),
  };
  const result = await reqSetUserRole(data);
  if (result.code == 200) {
    drawer.value = false;
    ElMessage({
      type: "success",
      message: "分配成功",
    });
    props.getList();
  } else {
    drawer.value = false;
    ElMessage({
      type: "error",
      message: "分配失败",
    });
  }
  drawer.value = false;
  props.getList();
};
defineExpose({ openAllowRole });
const props = defineProps(["getList"]);
</script>
<style lang="scss" scoped></style>
