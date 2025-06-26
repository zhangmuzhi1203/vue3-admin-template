<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  // 图标的前缀，默认为 "icon"。这个前缀会和 iconClass 组合成完整的 symbolId。
  prefix: {
    type: String,
    default: "icon",
  },
  // 图标的具体类名，比如 "user"，最终会变成 #icon-user。
  iconClass: {
    type: String,
    required: false,
  },
  // 图标颜色，可选项。
  color: {
    type: String,
  },
  // 图标尺寸，默认为 "1em"，表示继承父元素的字体大小。
  size: {
    type: String,
    default: "1em",
  },
  top: {
    type: String,
  },
  left: {
    type: String,
  },
});
// 定义计算属性 symbolId，返回 SVG <use> 标签需要用到的 xlink:href 值，
// 例如 #icon-user，用于引用 SVG 图标的 <symbol> ID。
const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`);
</script>

<template>
  <!-- 
      aria-hidden="true"：表示该图标对屏幕阅读器不可见（纯装饰用途）。 
      class="svg-icon"：应用 scoped 样式。
      :style="'width:' + size + ';height:' + size"：绑定 SVG 的宽高，默认是 1em，也可以自定义
  -->
  <svg
    aria-hidden="true"
    class="svg-icon"
    :style="
      'width:' +
      size +
      ';height:' +
      size +
      ';margin-top:' +
      top +
      ';margin-left:' +
      left
    "
  >
    <!-- 
      xlink:href: 绑定为 symbolId（如 #icon-user），引用 SVG 图标。
      :fill="color": 使用传入的颜色填充 SVG 图形。
    -->
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<style scoped>
.svg-icon {
  /* 让图标像文本一样显示。 */
  display: inline-block;
  /* 去掉外边框（可能是点击聚焦时）。 */
  outline: none;
  /* 默认设为 1em，继承父元素字体大小。 */
  width: 1em;
  height: 1em;
  /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，
  故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
  vertical-align: -0.15em;
  fill: currentColor;
  /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，
  如果当前元素未设置color值，则从父元素继承 */
  /* 防止内容溢出。 */
  overflow: hidden;
}
</style>
