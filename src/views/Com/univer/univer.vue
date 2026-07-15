<template>
  <UniverSheet :workbookData="workbookData" @ready="onReady" ref="sheetRef" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { UniverSheet } from "vue-univer-local";

const workbookData = ref(null);
const sheetRef = ref(null);
const onReady = (instance) => {
  console.log("实例已准备就绪", instance);

  sheetRef.value.setSheetPermission();
  //   sheetRef.value.hideUniverUI();
  console.log(sheetRef.value.readme);
};
const handleClick = () => {
  sheetRef.value.addPropToNonTitleCells();
  console.log(sheetRef.value.getSheetData());
};
</script>

<style lang="less">
@import "vue-univer-local/style.css";
</style>
