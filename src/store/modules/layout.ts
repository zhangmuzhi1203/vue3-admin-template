import { store } from "@/store";
export const useLayoutStore = defineStore("layout", () => {
  const refresh = ref<Boolean>(false);
  return {
    refresh,
  };
});
export function useLayoutStoreHook() {
  return useLayoutStore(store);
}
