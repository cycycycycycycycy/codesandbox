<template>
  <div style="width: 80%; height: 80%">
    <TMap ref="comTMapRef" :mapOptions="mapOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
//初始化地图
const comTMapRef = ref(null); //地图REF
const mapOptions = ref({
  id: "TMap", //地图 id
  zoom: 4, //地图缩放比例
  style: { width: "100%", height: "100%", borderRadius: "20px" }, //地图样式
  center: [116.385438, 42.9294], //地图中心点
  autoPan: true, //弹窗自适应打开
  closeButton: true, //弹窗自适应打开
  closeOnClick: true, //弹窗关闭按钮
  tk: "a125dd9aef36e4cf381a34add119bb01", //天地图token
});
//区域遮罩
onMounted(() => {
  //多边形遮罩方法
  comTMapRef.value.mapPolygonShadow({
    json: "", //json格式，自定义为data，区域编码传空（json格式）
    code: "110000", //区域编码
    data: [
      //自定义
      [126.411794, 44.9068],
      [126.32969, 42.9294],
      [116.385438, 49.9061],
      [116.385438, 49.9561],
    ],
    color: "blue", //线颜色
    weight: 3, //线宽
    opacity: 1, //透明度
    fillColor: "blue", //填充颜色
    fillOpacity: 0.2, //填充透明度
    outerShadow: false, //外边阴影
  });
});

//标记点
import infowinDoc from "./components/dialog.vue"; //弹窗显示组件
import icon from "./img/icon.png"; //打点图标
onMounted(() => {
  //地图打点方法
  comTMapRef.value.mapPoint({
    iconUrl: icon, //打点图标
    point: [116.385438, 39.9294], //打点坐标
    click: (val, openWindow) => {
      //（返回值、返回打开弹窗方法）
      console.log("click", val);
      openWindow(infowinDoc, { content: "点击的内容" }); //（弹窗组件、传入参数）
    },
    mouseover: (val, openWindow) => {
      console.log("mouseover", val);
      openWindow(infowinDoc, { content: "移入的内容" }); //（弹窗组件、传入参数）
    },
  });
});
//标签
onMounted(() => {
  //文字标签方法
  comTMapRef.value.mapLabel({
    latlng: [116.420837, 39.952395], //	标签位置
    text: `我是天地图组件`, //显示文字
    offset: [0, 50], //偏移量
  });
});

//多边形区域
onMounted(() => {
  //多边形方法
  comTMapRef.value.mapPolygon({
    color: "red", //线颜色
    weight: 3, //线宽
    opacity: 0.5, //透明度
    fillColor: "#FFFFFF", //填充颜色
    fillOpacity: 0.5, //填充透明度
    data: [
      //多边形点数据
      [126.411794, 39.9068],
      [126.32969, 42.9294],
      [116.385438, 39.9061],
      [116.385438, 39.9561],
    ],
    click: (val, openWindow) => {
      console.log("click", val);
      openWindow(infowinDoc, { content: "点击的内容" });
    },
    // mouseover: (val, openWindow) => {
    //   console.log("mouseover", val);
    //   openWindow(infowinDoc, { content: "移入的内容" });
    // },
  });
});
</script>

<style lang="less" scoped></style>
