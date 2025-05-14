<template>
  <div class="home-container">
    <!-- 侧边菜单，带有玻璃拟态和动态高光效果 -->
    <aside class="menu glassmorphism">
      <!-- 搜索框 - 固定在头部 -->
      <div
        class="search-container fixed-header"
        @mouseenter="onSearchFocus"
        @mouseleave="onSearchBlur"
      >
        <!-- 默认状态显示搜索图标 -->
        <div
          v-if="!isSearchFocused"
          class="search-icon-default"
          @click="onSearchFocus"
          style="
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <img
            src="@/assets/img/query.png"
            style="width: 45px; height: 45px"
            alt=""
          />
        </div>

        <!-- 鼠标移入后显示完整输入框 -->

        <transition name="el-zoom-in-top" v-if="isSearchFocused">
          <el-input
            v-model="searchQuery"
            placeholder="搜索组件..."
            class="search-input"
            @focus="onSearchFocus"
            @blur="onSearchBlur"
            @input="handleSearchInput"
            clearable
            size="large"
          >
            <template #prefix>
              <el-icon class="search-icon search-icon-active">
                <Search />
              </el-icon>
            </template>
          </el-input>
        </transition>

        <div
          class="search-glow"
          :class="{ 'search-glow-active': isSearchFocused }"
        ></div>
      </div>

      <!-- 菜单项容器 - 可滚动部分 -->
      <div class="menu-items-container">
        <div
          v-for="(item, idx) in filteredMenuItems"
          :key="item.name"
          class="menu-item"
          :class="{ active: currentComponent === item.name }"
          @click="selectComponent(item.name)"
          tabindex="0"
          @keydown.enter="selectComponent(item.name)"
          :aria-label="item.label"
        >
          <div class="menu-icon-wrapper">
            <img :src="item.icon" :alt="item.alt" class="rect-icon" />
            <span
              v-if="currentComponent === item.name"
              class="menu-glow-rect"
            ></span>
            <svg
              v-if="currentComponent === item.name"
              class="menu-active-rect"
              width="90"
              height="70"
            >
              <rect
                x="7"
                y="7"
                rx="18"
                ry="18"
                width="76"
                height="56"
                stroke="#3a7bd5"
                stroke-width="4"
                fill="none"
                stroke-dasharray="260"
                stroke-dashoffset="0"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="260;0;260"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>
          </div>
          <span class="menu-label">{{ item.label }}</span>
        </div>
      </div>
    </aside>
    <main class="content">
      <div class="content-card glassmorphism-card" v-if="showComponent">
        <transition name="fade-slide" mode="out-in">
          <component
            :is="ComList[currentComponent]"
            :key="currentComponent"
          ></component>
        </transition>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, nextTick, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import tcplayerImg from "@/assets/img/tcplayer.png";
import tcplayer from "@/views/Com/tcplayer/tcplayer.vue";
import echart_map_line from "@/views/Com/echart_map_line/echart_map_line.vue";
import echart_map_lineImg from "@/assets/img/echart_map_line.png";
import videojs from "@/views/Com/videojs/videojs.vue";
import videojsImg from "@/assets/img/videojs.png";
import tooltip from "@/views/Com/tooltip/tooltip.vue";
import tooltipImg from "@/assets/img/tooltip.png";
import year_transverse from "@/views/Com/year_transverse/year_transverse.vue";
import year_transverseImg from "@/assets/img/year_transverse.png";
import year_round from "@/views/Com/year_round/year_round.vue";
import year_roundImg from "@/assets/img/year_round.png";
import TMap from "@/views/Com/TMap/TMap.vue";
import TMapImg from "@/assets/img/TMap.png";

const showComponent = ref(true);
const queryParams = ref("");
const searchQuery = ref("");
const isSearchFocused = ref(false);
const ComList = {
  tcplayer,
  echart_map_line,
  videojs,
  tooltip,
  year_transverse,
  year_round,
  TMap,
};

const menuItems = [
  {
    name: "TMap",
    icon: TMapImg,
    alt: "TMap",
    label: "TMap",
  },
  {
    name: "tcplayer",
    icon: tcplayerImg,
    alt: "tcplayer",
    label: "tcplayer",
  },
  {
    name: "videojs",
    icon: videojsImg,
    alt: "videojs",
    label: "videojs",
  },
  {
    name: "echart_map_line",
    icon: echart_map_lineImg,
    alt: "echart_map_line",
    label: "echart_map_line",
  },
  {
    name: "tooltip",
    icon: tooltipImg,
    alt: "tooltip",
    label: "tooltip",
  },
  {
    name: "year_transverse",
    icon: year_transverseImg,
    alt: "year_transverse",
    label: "year_transverse",
  },
  {
    name: "year_round",
    icon: year_roundImg,
    alt: "year_round",
    label: "year_round",
  },
];

const currentComponent = ref("TMap");

const filteredMenuItems = computed(() => {
  if (!searchQuery.value) return menuItems;
  return menuItems.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectComponent = (component) => {
  if (component === currentComponent.value) return;
  showComponent.value = false;
  nextTick(() => {
    if (currentComponent.value !== component) {
      currentComponent.value = component;
      showComponent.value = true;
    }
  });
};

const onSearchFocus = () => {
  isSearchFocused.value = true;
};

const onSearchBlur = () => {
  isSearchFocused.value = false;
};

const handleSearchInput = () => {
  const menuContainer = document.querySelector(".menu-items-container");
  if (menuContainer) {
    menuContainer.scrollTop = 0;
  }
};
</script>

<style scoped>
/* 高级玻璃拟态风格 */
.glassmorphism {
  background: rgba(28, 32, 40, 0.82);
  box-shadow: 0 8px 32px 0 rgba(44, 130, 201, 0.18), 0 1.5px 0 0 #232a36 inset;
  backdrop-filter: blur(18px) saturate(1.2);
  border: 1.5px solid rgba(58, 123, 213, 0.18);
}

.glassmorphism-card {
  background: rgba(34, 38, 48, 0.92);
  box-shadow: 0 16px 64px 0 rgba(44, 130, 201, 0.22), 0 1.5px 0 0 #232a36 inset;
  border-radius: 48px;
  width: calc(100% - 80px);
  height: calc(100% - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.7s cubic-bezier(0.4, 2, 0.6, 1);
  border: 1.5px solid #232a36;
  position: relative;
  overflow: hidden;
}

.home-container {
  display: flex;
  height: 100vh;
  background: linear-gradient(120deg, #181c24 0%, #232a36 100%);
  font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
  overflow: hidden;
}

.menu {
  width: 280px;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 48px;
  border-bottom-right-radius: 48px;
  position: relative;
  z-index: 2;
  border-right: 2px solid #232a36;
  transition: box-shadow 0.3s;
  overflow: hidden;
}

.search-container {
  position: relative;
  margin: 0 20px;
  padding: 20px 0 10px;
  background: inherit;
  z-index: 3;
}

.search-container.fixed-header {
  position: sticky;
  top: 0;
  padding-top: 20px;
  padding-bottom: 10px;
  background: rgba(28, 32, 40, 0.82);
  backdrop-filter: blur(18px) saturate(1.2);
}

.menu-items-container {
  overflow-y: auto;
  flex: 1;
  padding-bottom: 20px;
}

.search-input {
  position: relative;
  z-index: 2;
  transition: all 0.3s cubic-bezier(0.4, 2, 0.6, 1);
}

.search-input :deep(.el-input__wrapper) {
  background: rgba(34, 38, 48, 0.6);
  border: 2px solid rgba(58, 123, 213, 0.2);
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(44, 130, 201, 0.15), 0 0 0 1px #232a36 inset;
  transition: all 0.3s cubic-bezier(0.4, 2, 0.6, 1);
  padding: 0 20px;
}

.menu-item {
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 20px;
  padding: 28px 0 18px 0;
  border-radius: 28px;
  cursor: pointer;
  transition: background 0.25s cubic-bezier(0.4, 2, 0.6, 1),
    box-shadow 0.25s cubic-bezier(0.4, 2, 0.6, 1),
    transform 0.18s cubic-bezier(0.4, 2, 0.6, 1), border 0.22s;
  position: relative;
  overflow: visible;
  border: 2px solid transparent;
  outline: none;
}
.menu-item:focus {
  border: 2px solid #3a7bd5;
  box-shadow: 0 0 0 4px #3a7bd555;
}

.menu-item.active,
.menu-item:hover {
  background: linear-gradient(120deg, #232a36 0%, #2d3543 100%);
  box-shadow: 0 12px 48px 0 rgba(44, 130, 201, 0.22), 0 2px 0 0 #232a36 inset;
  transform: translateY(-4px) scale(1.08);
  border: 2px solid #3a7bd5;
}

.menu-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 让图标和高光更好地居中 */
  width: 90px;
  height: 70px;
  margin-bottom: 14px;
}

.rect-icon {
  width: 76px;
  height: 56px;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(44, 130, 201, 0.22), 0 0 0 2px #232a36 inset,
    0 0 0 8px #3a7bd522;
  background: linear-gradient(135deg, #232a36 40%, #3a7bd5 100%);
  transition: box-shadow 0.25s, filter 0.2s, border 0.2s;
  border: 3px solid #232a36;
  z-index: 1;
  filter: grayscale(0.05) brightness(1.05) contrast(1.18)
    drop-shadow(0 2px 8px #3a7bd555);
  object-fit: cover;
}

.menu-item.active .rect-icon,
.menu-item:hover .rect-icon {
  box-shadow: 0 8px 32px 0 rgba(44, 130, 201, 0.32), 0 0 0 10px #3a7bd555,
    0 0 0 2px #3a7bd5 inset;
  filter: brightness(1.22) saturate(1.5) drop-shadow(0 0 18px #3a7bd5cc);
  border-color: #3a7bd5;
}

.menu-glow-rect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 90px;
  background: radial-gradient(ellipse at center, #3a7bd555 0%, #232a3600 80%);
  border-radius: 24px;
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
  animation: menu-glow-rect-pulse 1.2s infinite alternate;
  filter: blur(6px);
}

@keyframes menu-glow-rect-pulse {
  from {
    opacity: 0.7;
    filter: blur(4px);
  }
  to {
    opacity: 1;
    filter: blur(8px);
  }
}

.menu-active-rect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
  filter: drop-shadow(0 0 12px #3a7bd5cc);
}

.menu-label {
  font-size: 1.22rem;
  color: #e0e6ed;
  font-weight: 700;
  letter-spacing: 2px;
  margin-top: 6px;
  text-shadow: 0 2px 0 #232a36, 0 4px 16px #3a7bd544;
  transition: color 0.22s, text-shadow 0.22s;
  user-select: none;
  text-align: center;
  line-height: 1.4;
}

.menu-item.active .menu-label,
.menu-item:hover .menu-label {
  color: #3a7bd5;
  text-shadow: 0 4px 16px #3a7bd588, 0 2px 0 #232a36;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #181c24 0%, #232a36 100%);
  min-width: 0;
  position: relative;
  z-index: 1;
  overflow: auto;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 2, 0.6, 1),
    transform 0.5s cubic-bezier(0.4, 2, 0.6, 1);
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
<style lang="less">
.menu {
  .el-input__wrapper {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: none;
  }
  .el-input__inner {
    color: #fff !important;
  }
  .el-input__wrapper:hover {
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>