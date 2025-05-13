<template>
  <div>
    <div v-if="showVideo">
      <video
        ref="videoPlayer"
        class="video-js vjs-default-skin"
        controls
        preload="auto"
        width="640"
      ></video>
    </div>
    <el-input
      v-model="src"
      style="width: 640px"
      placeholder="请输入视频源"
      @change="changeSrc"
    ></el-input>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, nextTick } from "vue";
import videojs from "video.js";
// import "video.js/dist/video-js.css";

const videoPlayer = ref(null);
const player = ref(null);
const src = ref("");
const showVideo = ref(false);
const changeSrc = () => {
  showVideo.value = false;
  player.value = null;
  setTimeout(() => {
    showVideo.value = true;
    nextTick(() => {
      player.value = videojs(videoPlayer.value, {
        autoplay: true,
        controls: true,
        sources: [
          {
            // 走代理
            src: "/v1/proxy?url=" + src.value,
            src: src.value,
            // src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            type: "application/x-mpegURL",
          },
        ],
      });

      player.value.on("error", () => {
        const error = player.value.error();
        console.error("VideoJS Error:", error);
        alert("视频加载失败，请检查网络连接或视频源。");
      });
    });
  }, 1000);
};
onMounted(() => {});

onBeforeUnmount(() => {
  if (player.value) {
    player.value.dispose();
  }
});
</script>

<style>
/* 你可以在这里添加自定义样式 */
</style>
