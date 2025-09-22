<template>
  <div style="width: 50%; height: 40%; padding: 50px; background-color: #fff">
    <last_next_month v-model="selectedMonth" />
    <div style="margin-top: 20px">已选择月份：{{ selectedMonth }}</div>
  </div>
</template>

<script setup>
import last_next_month from "./components/index.vue";
import { ref, onMounted } from "vue";

const selectedMonth = ref("");
</script>

<style lang="less" scoped></style>
