import { store } from "@/store";

export const useCounterStore = defineStore("counter", () => {
  // ref变量 --> state属性
  const count = ref(0);
  // computed计算属性 --> getters
  const double = computed(() => {
    return count.value * 2;
  });
  // function函数 --> actions
  function increment() {
    count.value++;
  }
  return { count, double, increment };
});
// 在非setup的地方使用
export function useCounterStoreHook() {
  return useCounterStore(store);
}
