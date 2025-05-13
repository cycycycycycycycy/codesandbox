<template>
  <div class="smallDiv">
    <div class="header"></div>
    <div style="height: 100%; width: 100%">
      <slot></slot>
    </div>
    <!-- <div class="footer"></div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  title: String,
});
</script>

<style lang="less" scoped>
.smallDiv {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: url("../img/headerCom.png") no-repeat;
    background-size: 100% 100%;
    width: 300px;
    .title {
      display: flex;
      align-items: center;
      padding-left: 30px;
      font-size: 20px;
      color: #fff;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
    }
  }
  .footer {
    background: url("../img/commonFooterBg.png") no-repeat;
    background-size: 100% 100%;
    margin-left: 16px;
    height: 7px;
  }
}
</style>
