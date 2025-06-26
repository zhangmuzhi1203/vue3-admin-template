<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <el-form inline>
        <el-form-item label="用户名：">
          <el-input
            placeholder="请输入搜索用户名"
            v-model="resetQueryForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="search"
            :disabled="resetQueryForm.username == '' ? true : false"
            >搜索</el-button
          >
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div style="margin-bottom: 10px">
        <el-button type="primary" @click="addOrEditDrawer('')"
          >添加用户</el-button
        >
        <el-button
          type="primary"
          @click="deleteBat"
          :disabled="selectionIds.length > 0 ? false : true"
          >批量删除</el-button
        >
      </div>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        border
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="#" width="50" align="center" />
        <el-table-column prop="id" label="ID" width="110" align="center" />
        <el-table-column
          prop="username"
          label="用户名字"
          show-overflow-tooltip
          width="110"
          align="center"
        />
        <el-table-column
          prop="name"
          label="用户名称"
          show-overflow-tooltip
          width="110"
          align="center"
        />
        <el-table-column
          prop="roleName"
          label="用户角色"
          show-overflow-tooltip
          width="110"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
          width="110"
          align="center"
        />
        <el-table-column
          prop="updateTime"
          label="更新时间"
          show-overflow-tooltip
          width="110"
          align="center"
        />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type="success"
              size="small"
              @click="handleRole(scope.row)"
              icon="User"
            >
              分配角色
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="addOrEditDrawer(scope.row)"
              icon="Edit"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${scope.row.username}用户吗？`"
              confirm-button-text="是"
              cancel-button-text="否"
              width="300px"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9, 11]"
        background
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 添加或编辑抽屉弹窗 -->
    <DrawBox ref="drawerBox" :getList="handleCurrentChange"></DrawBox>
    <!-- 分配角色抽屉弹窗 -->
    <AllowRole ref="allowRole" :getList="handleCurrentChange"></AllowRole>
  </div>
</template>
<script setup lang="ts">
import {
  reqUserInfo,
  reqRemoveUser,
  reqSelectUser,
} from "@/api/acl/user/index";
import AllowRole from "./components/allowrole.vue";
import DrawBox from "./components/drawbox.vue";
import type { UserResponseData, Records, User } from "@/api/acl/user/type";
type QueryForm = {
  page: number;
  limit: number;
  username: string;
};
const resetQueryForm = reactive<QueryForm>({
  page: 1,
  limit: 5,
  username: "",
});
const queryForm = resetQueryForm;
const search = async () => {
  handleCurrentChange();
  queryForm.username = "";
};
const reset = () => {
  Object.assign(queryForm, resetQueryForm);
  handleCurrentChange();
};
const drawerBox = ref();
const addOrEditDrawer = (row: any) => {
  drawerBox.value.openDrawer(row);
};
const deleteBat = async () => {
  const result = await reqSelectUser(selectionIds.value);
  if (result.data.code == 200) {
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
const selectionIds = ref<number[]>([]);
const selectionChange = (newSelection: any[]) => {
  selectionIds.value = newSelection.map((item) => item.id);
};
const allowRole = ref();
const handleRole = (row: User) => {
  allowRole.value.openAllowRole(row);
};
const handleDelete = async (row: any) => {
  const result = await reqRemoveUser(row);
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
const tableData = ref<Records>([]);
const currentPage = ref<number>(1);
const pageSize = ref<number>(5);
const total = ref<number>();
onMounted(() => {
  handleCurrentChange();
});
const handleCurrentChange = async () => {
  let params = { ...queryForm };
  const result: UserResponseData = await reqUserInfo(
    params.page,
    params.limit,
    params.username
  );
  tableData.value = result.data.records;
  currentPage.value = result.data.pages;
  pageSize.value = result.data.size;
  total.value = result.data.total;
};
const handleSizeChange = () => {
  handleCurrentChange();
};
</script>
<style lang="scss" scoped></style>
