<template>
  <div class="box">
    <Tooltip
      :width="200"
      :content="'我是超长的文字你一眼看不到我的尾巴哈哈哈后边还有呢继续看吧我是超长的文字你一眼看不到我的尾巴哈哈哈后边还有呢继续看吧我是超长的文字你一眼看不到我的尾巴哈哈哈后边还有呢继续看吧我是超长的文字你一眼看不到我的尾巴哈哈哈后边还有呢继续看吧'"
    ></Tooltip>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Tooltip from "./components/tooltip.vue";
</script>

<style lang="less" scoped>
.box {
  background-color: #fff;
  width: 600px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
