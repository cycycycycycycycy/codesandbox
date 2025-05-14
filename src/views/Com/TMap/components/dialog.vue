<template>
  <div>{{ content }}</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
});
</script>

<style lang="less" scoped></style>
