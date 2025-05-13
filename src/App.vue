
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script setup>
import JSZipUtils from "jszip-utils";
import JSZip from "jszip";
import userInfo from "@/store/userInfo/userInfo.js";

const UserInfo = userInfo();
const myZip = new JSZip();
// JSZipUtils.getBinaryContent("/mapjson/json.zip", function (err, data) {
JSZipUtils.getBinaryContent("/vite/newJson", function (err, data) {
  if (err) {
    console.log("错了", err);
  } else {
    myZip.loadAsync(data).then((zip) => {
      const fileName = Object.keys(Object.values(zip)[0])[0]; // 获取文件名
      return zip
        .file(fileName)
        .async("string")
        .then(function (data) {
          const datas = JSON.parse(data); // 与后端约定压缩包内只有一个文件且为JSON格式，更多格式可参考JSZip官网
          console.log("我看看", datas);
          UserInfo.changeMap(datas.features);
        });
    });
  }
});
</script>

<style lang="less">
#app {
  height: 100%;
  width: 100%;
}
</style>
