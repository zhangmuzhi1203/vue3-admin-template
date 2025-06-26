<template>
  <div class="login">
    <el-row>
      <el-col :span="12" :xs="24">
        <div>
          <SvgIcon
            icon-class="tb"
            color="red"
            top="20px"
            left="10px"
            size="24"
          />
          <span style="margin: 20px, 0, 0, 5px; font-size: 24px">
            基于vue3最新技术栈的快速开发模板系统
          </span>
        </div>
        <el-form
          class="login_form"
          size="large"
          :model="loginForm"
          ref="loginFormRef"
          :rules="loginFormRules"
        >
          <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 20px">
            欢迎来到基于vue3的快速开发模板系统
          </h1>
          <el-form-item prop="username">
            <el-input
              prefix-icon="User"
              placeholder="请输入账户"
              v-model="loginForm.username"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              type="password"
              :show-password="true"
              v-model="loginForm.password"
              prefix-icon="Lock"
            >
            </el-input>
          </el-form-item>
          <!-- 登录/注册按钮 -->
          <el-form-item>
            <div style="width: 100%" class="flex-center">
              <el-button
                type="primary"
                class="login_button"
                @click="login"
                :loading="buttonLoading"
                >登录</el-button
              >
              <el-button class="register_button">注册</el-button>
            </div>
          </el-form-item>
          <!-- 服务热线 -->
          <div style="margin-top: 80px">
            <span>服务热线：xxxxxx</span>
          </div>
        </el-form>
      </el-col>
      <!-- 右侧图片 -->
      <el-col :span="12" :xs="0">
        <div class="login_bg"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { reqLogin } from "@/api/user/index";
import type { FormInstance, FormRules } from "element-plus";
import { useUserStore } from "@/store";
import { SET_TOKEN } from "@/utils/token";
import { formatDate } from "@/utils/time";
const loginFormRef = ref<FormInstance>();
const resetLoginForm = {
  username: "admin",
  password: "111111",
};
interface LoginFormType {
  username?: string;
  password?: string;
}
const loginForm = reactive<LoginFormType>({ ...resetLoginForm });
const loginFormRules = reactive<FormRules<LoginFormType>>({
  username: [{ required: true, message: "请输入账户", trigger: "change" }],
  password: [{ required: true, message: "请输入密码", trigger: "change" }],
});
const buttonLoading = ref(false);
const userStore = useUserStore();
const router = useRouter();
const login = async () => {
  await loginFormRef.value?.validate();
  buttonLoading.value = true;
  try {
    const result = await reqLogin(loginForm);
    if (result.code == 200) {
      userStore.token = result.data;
      SET_TOKEN(userStore.token);
      router.push({ path: "/" });
      ElNotification({
        type: "success",
        message: "欢迎回来",
        title: `当前北京时间：${formatDate(new Date())}`,
      });
    }
  } finally {
    buttonLoading.value = false;
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  .login_form {
    width: 70%;
    position: relative;
    top: 30%;
    margin: 0 auto; // 水平居中
  }
  .login_bg {
    width: 100%;
    height: 748px;
    background: url("@/assets/image/login_bg.jpg") no-repeat;
    background-size: cover;
  }
  .login_button {
    width: 48%;
  }
  .register_button {
    width: 48%;
  }
}
</style>
