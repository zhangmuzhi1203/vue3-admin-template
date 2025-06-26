export interface LoginData {
  username?: string;
  password?: string;
}
export interface ResLoginData {
  code: number;
  data: string;
  message: string;
  ok: boolean;
}
