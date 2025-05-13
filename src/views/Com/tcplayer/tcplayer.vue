<template>
  <div>
    <video
      id="video_player"
      preload="auto"
      playsinline
      autoplay
      webkit-playsinline
      style="width: 900px; height: 500px"
    ></video>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import TCPlayer from "tcplayer.js";
import "tcplayer.js/dist/tcplayer.min.css";
const player = ref(null);
onMounted(() => {
  play("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
});
const play = (videoURL) => {
  nextTick(() => {
    player.value = TCPlayer(
      "video_player",
      {
        autoplay: true, //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
        mute: true,
        live: true,
        controls: "default",
        videoType: "live",
        width: "1200px", //视频的显示宽度，请尽量使用视频分辨率宽度
        height: "600px", //视频的显示高度，请尽量使用视频分辨率高度
        plugins: {
          ProgressMarker: true,
          ContextMenu: {
            statistic: true,
            levelSwitch: {
              open: true,
              switchingText: "Start switching",
              switchedText: "Switch success",
              switchErrorText: "Switch fail",
            },
          },
        },
      },
      1000
    );
    player.value.src(videoURL);
    player.value.on("canplay", () => {
      // // 做一些处理
      // modalHeight.value = player?.videoHeight() + 130;
      // modalWidth.value = player?.videoWidth();
    });
  });
};
onUnmounted(() => {
  if (player.value) {
    player.value.dispose();
    player.value = null;
  }
});
</script>

<style lang="less" scoped></style>
