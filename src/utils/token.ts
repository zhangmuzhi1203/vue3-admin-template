// 设置token
export const SET_TOKEN = (token: string) => {
  return localStorage.setItem("TOKEN", token);
};
// 获取token
export const GET_TOKEN = (): string => {
  //?? "" 保证当为 null 时返回空字符串，避免 TS 报错。
  return localStorage.getItem("TOKEN") ?? "";
};
// 清除token
export const REMOVE_TOKEN = () => {
  return localStorage.removeItem("TOKEN");
};
