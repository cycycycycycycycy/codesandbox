<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :span-method="
        (data) => {
          return objectSpanMethod(data, pooledData);
        }
      "
    >
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="age" label="Age" />
      <el-table-column prop="address" label="Address" />
      <el-table-column prop="hobby" label="Hobby" />
      <el-table-column prop="sex" label="Sex" />
      <el-table-column prop="phone" label="Phone" />
    </el-table>
  </div>
</template>

<script setup>
import { getSpanData, objectSpanMethod } from "./js/formMerger.js";
import { ref, onMounted } from "vue";
const tableData = ref([
  {
    name: "John",
    age: 18,
    address: "123 Main St",
    hobby: "Reading",
    sex: "Male",
    phone: "1234567890",
  },
  {
    name: "John",
    age: 18,
    address: "123 Main St",
    hobby: "Reading",
    sex: "Male",
    phone: "1234567890",
  },
  {
    name: "Jane",
    age: 20,
    address: "456 Elm St",
    hobby: "Reading",
    sex: "Female",
    phone: "1234567890",
  },
  {
    name: "Jim",
    age: 22,
    address: "789 Oak St",
    hobby: "Reading",
    sex: "Male",
    phone: "1234567890",
  },
  {
    name: "Jill",
    age: 24,
    address: "101 Pine St",
    hobby: "Reading",
    sex: "Female",
    phone: "1234567890",
  },
]);
const pooledData = ref({});
onMounted(() => {
  pooledData.value = getSpanData(["name"], tableData.value);
});
</script>

<style lang="less" scoped></style>
