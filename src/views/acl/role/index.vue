<template>
  <div class="">
    <el-card style="margin-bottom: 20px">
      <el-form inline>
        <el-form-item label="职位搜索">
          <el-input placeholder="请输入角色名称" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="search"
            :disabled="keyword == '' ? true : false"
            >搜索</el-button
          >
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div style="margin-bottom: 10px">
        <el-button type="primary" @click="addOrEditRole('')"
          >添加角色</el-button
        >
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
      >
        <el-table-column type="index" label="#" width="50" align="center" />
        <el-table-column prop="id" label="ID" width="110" align="center" />
        <el-table-column
          prop="roleName"
          label="角色名称"
          width=""
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width=""
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width=""
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <template #default="scope">
            <el-button
              size="small"
              type="success"
              @click="allowPermission(scope.row)"
              icon="Lock"
              >分配权限</el-button
            >
            <el-button
              size="small"
              type="primary"
              @click="addOrEditRole(scope.row)"
              icon="Edit"
              >编辑</el-button
            >
            <el-popconfirm
              :title="`是否要删除${scope.row.roleName}吗？`"
              confirm-button-text="是"
              cancel-button-text="否"
              @confirm="handleDelete(scope.row.id)"
              width="300px"
              icon="Delete"
            >
              <template #reference>
                <el-button size="small" type="warning">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        background
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog v-model="dialogVisible" width="500">
      <template #header> {{ roleForm.id ? "编辑角色" : "添加角色" }} </template>
      <template #default>
        <el-form :model="roleForm" ref="roleFormRef" :rules="roleFormRules">
          <el-form-item label="添加角色" prop="roleName">
            <el-input
              placeholder="请输入角色名称"
              v-model="roleForm.roleName"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogCancel()">取消</el-button>
          <el-button type="primary" @click="dialogConfirm(roleFormRef)">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <AllowRolePermission
      ref="allowRolePermissionRef"
      :getList="handleCurrentChange"
    ></AllowRolePermission>
  </div>
</template>
<script setup lang="ts">
import AllowRolePermission from "./components/allowRolePermission.vue";
import {
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqRemoveRole,
} from "@/api/acl/role/index";
import type { RoleResponseData } from "@/api/acl/role/type";
import type { FormInstance, FormRules } from "element-plus";
onMounted(() => {
  handleCurrentChange();
});
interface RoleForm {
  id: number;
  page: number;
  limit: number;
  roleName: string;
}
const resetRoleForm = reactive<RoleForm>({
  id: 0,
  page: 1,
  limit: 10,
  roleName: "",
});
const roleForm = resetRoleForm;
const roleFormRef = ref<FormInstance>();
const roleFormRules = reactive<FormRules<RoleForm>>({
  roleName: [
    { required: true, message: "按要求输入职位名称", trigger: "blur" },
  ],
});
const keyword = ref<string>("");
const search = () => {
  handleCurrentChange();
  keyword.value = "";
};
const reset = () => {
  handleCurrentChange();
};
const tableData = ref();
const addOrEditRole = (row: any) => {
  Object.assign(roleForm, { roleName: "" });
  dialogVisible.value = true;
  if (!row) return;
  if (row) {
    Object.assign(roleForm, row);
  }
};
const allowPermission = (row: any) => {
  allowRolePermissionRef.value.openDrawer(row);
};
const handleDelete = async (id: number) => {
  const result: any = await reqRemoveRole(id);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    handleCurrentChange();
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>();
const handleCurrentChange = async () => {
  const params = { ...roleForm };
  let result: RoleResponseData = await reqAllRoleList(
    params.page,
    params.limit,
    keyword.value
  );
  tableData.value = result.data.records;
  total.value = result.data.total;
};
const handleSizeChange = () => {
  handleCurrentChange();
};
const dialogVisible = ref<boolean>(false);
const dialogCancel = () => {
  dialogVisible.value = false;
};
const dialogConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    const params = { ...roleForm };
    if (valid) {
      const result: any = await reqAddOrUpdateRole(params);
      if (result.code == 200) {
        ElMessage({
          type: "success",
          message: "添加角色成功",
        });
        dialogVisible.value = false;
        handleCurrentChange();
      } else {
        dialogVisible.value = false;
        ElMessage({
          type: "error",
          message: "添加角色失败",
        });
      }
    }
  });
  dialogVisible.value = false;
};
const allowRolePermissionRef = ref();
</script>
<style lang="scss" scoped></style>
