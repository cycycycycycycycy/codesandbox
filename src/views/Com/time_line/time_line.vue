<template>
  <div
    style="
      width: 70%;
      height: 70%;
      background-color: #fff;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    "
  >
    <h1>nowDate: {{ nowDate }}</h1>
    <timeLine v-model="nowDate" :number="7" :backToday="true" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import timeLine from "./components/timeLine.vue";
const nowDate = ref("");
</script>

<style lang="less" scoped></style>
