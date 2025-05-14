<template>
  <div class="main" ref="main">
    <div class="year">
      <img src="./img/year.png" alt="" />
    </div>
    <div
      @click="btnClick(item, index)"
      :class="['btn', item.index == 0 ? 'active' : '']"
      v-for="(item, index) in data"
      :key="index"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, defineEmits } from "vue";

let emitFun = defineEmits(["yearChange"]);
const year = ref("");

const main = ref(null);

const centerx = ref(""); //圆心X
const centery = ref(1240); //圆心Y
const r = ref(1200); //半径
const oimages = document.getElementsByClassName("btn"); //图片集合
const da = ref(360 / 60); //图片间隔角度
const a0 = ref(0); //已旋转角度

const posimgs = () => {
  for (var i = 0; i < oimages.length; i++) {
    oimages[i].style.left =
      centerx.value +
      r.value * Math.cos(((da.value * i + a0.value) / 180) * Math.PI) +
      "px";
    oimages[i].style.top =
      centery.value +
      r.value * Math.sin(((da.value * i + a0.value) / 180) * Math.PI) +
      "px";
  }
};
const data = ref([]);
const btnClick = (val, index) => {
  if (val.index == 0 || val.name == "") {
    return;
  }

  let repeat = 10;
  let sd = 0.6;
  if (val.index == 1) {
    sd = -0.6;
  }
  if (val.index == -2) {
    sd = 1.2;
  }
  if (val.index == 2) {
    sd = -1.2;
  }

  let timer = setInterval(function () {
    if (repeat == 0) {
      clearInterval(timer);
    } else {
      repeat--;

      a0.value += sd;
      posimgs();
    }
  }, 100);
  data.value.map((item) => {
    item.index = 999;
  });
  data.value[index].index = 0;
  data.value[index - 1].index = -1;
  data.value[index - 2].index = -2;
  data.value[index + 1].index = 1;
  data.value[index + 2].index = 2;

  year.value = val.name;
  emitFun("yearChange", year.value);
};

onMounted(() => {
  window.addEventListener("resize", () => {
    if (!main.value?.clientWidth) {
      return false;
    }
    centerx.value = (main.value.clientWidth - 50) / 2;
    nextTick(() => {
      posimgs();
    });
  });

  for (let index = 0; index < 31; index++) {
    data.value.push({
      name: "",
      index: "999",
    });
  }
  for (let index = 0; index < 29; index++) {
    let index2 = 999;
    if (index == 12) {
      index2 = -2;
    }
    if (index == 13) {
      index2 = -1;
    }
    if (index == 14) {
      index2 = 0;
    }
    if (index == 15) {
      index2 = 1;
    }
    if (index == 16) {
      index2 = 2;
    }
    data.value.push({
      name: new Date().getFullYear() - 14 + index,
      index: index2,
    });
  }

  console.log(data.value);

  centerx.value = (main.value.clientWidth - 50) / 2;
  nextTick(() => {
    posimgs();
  });
});
</script>

<style lang="less" scoped>
.main {
  height: 90px;
  // background: red;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;

  .btn {
    font-size: 16px;
    font-family: DIN;
    font-weight: 500;
    color: #fff;
    position: absolute;
    cursor: pointer;
  }
  .active {
    font-size: 26px;
    font-family: DIN;
    font-weight: bold;
    color: #ffc702;
    margin-left: -10px;
    margin-top: -5px;
  }
}
</style>
