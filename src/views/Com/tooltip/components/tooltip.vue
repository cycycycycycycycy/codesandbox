
 <!-- /**
 * @File 文字超出toolTip组件
 * @Type components
 * @Author chen_yu
 * @Date 2023-08-05 16:48:39
 * @Version 1.0
 * 
 * @Params 
 * 
 * @Description
 * 使用页面基础配置
 * 1.页面中引入 
   import Tooltip from "此文件地址";
 * 2.页面中使用  
    <Tooltip
      :width="内容显示的宽度"
      :content="显示的内容"
    ></Tooltip>
 * 
 * 
 * @returns 
 */ -->
<template>
  <div class="text-tooltip">
    <el-tooltip
      class="item"
      effect="dark"
      :disabled="isShowTooltip"
      :content="content"
      placement="top"
      :open-delay="300"
    >
      <p class="over-flow" :class="className" @mouseover="onMouseOver()">
        <span ref="refName">{{ content || "-" }}</span>
      </p>
    </el-tooltip>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  //宽度
  width: {
    type: String,
    default: () => {
      return "200";
    },
  },
  // 显示的文字内容
  content: {
    type: String,
    default: () => {
      return "";
    },
  },
  // 外层框的样式，在传入的这个类名中设置文字显示的宽度
  className: {
    type: String,
    default: () => {
      return "";
    },
  },
  // 为页面文字标识（如在同一页面中调用多次组件，此参数不可重复）
  refName: {
    type: String,
    default: () => {
      return "";
    },
  },
});
const width = props.width + "px";
const isShowTooltip = ref(true);

const refName = ref(null);
const onMouseOver = () => {
  let parentWidth = refName.value.parentNode.offsetWidth;
  let contentWidth = refName.value.offsetWidth;
  // 判断是否开启tooltip功能
  if (contentWidth > parentWidth) {
    isShowTooltip.value = false;
  } else {
    isShowTooltip.value = true;
  }
};
</script>

<style lang="less" scoped>
.over-flow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.text-tooltip {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: v-bind(width);
}
p {
  margin: 0;
}
</style>
<style lang="less">
.el-popper.is-dark {
  max-width: 500px !important;
}
</style>
