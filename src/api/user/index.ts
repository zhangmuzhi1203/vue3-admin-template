import request from "@/utils/request";
import type { LoginData, ResLoginData } from "./type";

// 登录接口
export const reqLogin = (data: LoginData): Promise<ResLoginData> => {
  return request.post("/admin/acl/index/login", data);
};

// 获取用户信息
export const reqUserInfo = () => {
  return request.get("/admin/acl/index/info");
};

// 退出登录
export const reqLogout = () => {
  return request.post("/admin/acl/index/logout");
};
