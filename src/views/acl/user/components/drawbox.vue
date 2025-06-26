<template>
  <div class="">
    <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ drawerID !== true ? "添加用户" : "编辑用户" }}</h4>
      </template>
      <template #default>
        <el-form ref="userFormRef" :model="userForm" :rules="userFormRules">
          <el-form-item label="用户姓名" prop="username">
            <el-input
              placeholder="请输入用户姓名"
              v-model="userForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input
              placeholder="请输入用户昵称"
              v-model="userForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="!drawerID">
            <el-input
              placeholder="请输入用户密码"
              v-model="userForm.password"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick(userFormRef)"
            >确定</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { reqAddOrUpdateUser } from "@/api/acl/user";
const drawer = ref<boolean>(false);
const drawerID = ref<boolean>(false);
const userFormRef = ref<FormInstance>();
interface UserForm {
  id: number;
  username: string;
  name: string;
  password: string;
}
const userForm = reactive<UserForm>({
  id: 0,
  username: "",
  name: "",
  password: "",
});
const userFormRules = reactive<FormRules<UserForm>>({
  username: [
    { required: true, message: "用户姓名至少五位", trigger: "blur", min: 5 },
  ],
  name: [
    { required: true, message: "用户昵称至少五位", trigger: "blur", min: 5 },
  ],
  password: [
    { required: true, message: "用户密码至少六位", trigger: "blur", min: 6 },
  ],
});
const openDrawer = (row: any) => {
  drawerID.value = false;
  Object.assign(userForm, { username: "", name: "", password: "" });
  drawer.value = true;
  if (!row) return;
  if (row) {
    drawerID.value = true;
    Object.assign(userForm, row);
  }
};
const cancelClick = () => {
  drawer.value = false;
  drawerID.value = false;
};
const confirmClick = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      const params = { ...userForm };
      console.log(params, "参数");
      const result: any = await reqAddOrUpdateUser(params);
      if (result.code == 200) {
        drawer.value = false;
        ElMessage({
          message: drawerID.value !== true ? "添加成功" : "编辑成功",
          type: "success",
        });
        props.getList();
      } else {
        drawer.value = false;
        ElMessage({
          message: drawerID.value !== true ? "添加失败" : "编辑失败",
          type: "error",
        });
      }
    }
  });
};
defineExpose({ drawer, drawerID, userForm, openDrawer });
const props = defineProps(["getList"]);
</script>
<style lang="scss" scoped></style>
