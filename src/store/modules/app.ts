import { store } from "@/store";
export const useAppStore = defineStore("app", () => {
  const language = ref("zh-cn");
  return {
    language,
  };
});
export function useAppStoreHook() {
  return useAppStore(store);
}
