<template>
  <div class="home-container">
    <!-- 侧边菜单，带有玻璃拟态和动态高光效果 -->
    <aside
      :class="
        isShowMenu
          ? 'menu glassmorphism'
          : 'menu menu-small glassmorphism-small'
      "
      :style="{ width: isShowMenu ? '280px' : '80px' }"
    >
      <!-- 搜索框 - 固定在头部 -->
      <div class="search-container fixed-header" @mouseleave="onSearchBlur">
        <!-- 默认状态显示搜索图标 -->
        <div v-if="!isSearchFocused" class="search-icon-default">
          <img
            v-if="isShowMenu"
            @click="onSearchFocus"
            @mouseenter="onSearchFocus"
            src="@/assets/img/query.png"
            class="img3"
            alt=""
          />
          <img
            @click="changeMenuStatus"
            v-if="isShowMenu"
            src="@/assets/img/shouqi.png"
            class="img1"
            alt=""
          />
          <img
            v-if="!isShowMenu"
            @click="changeMenuStatus"
            src="@/assets/img/zhankai.png"
            class="img2"
            alt=""
          />
        </div>

        <!-- 鼠标移入后显示完整输入框 -->

        <transition name="el-zoom-in-top" v-if="isSearchFocused">
          <el-input
            ref="searchInputRef"
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
      <div
        :class="
          isShowMenu ? 'menu-items-container' : 'menu-items-container-small'
        "
      >
        <div
          v-for="(item, idx) in filteredMenuItems"
          :key="item.name"
          class="menu-item"
          :class="{ active: currentComponent === item.name }"
          @click="selectComponent(item.name)"
          tabindex="0"
          @keydown.enter="selectComponent(item.name)"
          :aria-label="item.label"
          @mouseenter="showPopup(item, $event)"
          @mouseleave="hidePopup"
        >
          <div class="menu-icon-wrapper">
            <img
              :src="requireFun(item.name)"
              :alt="item.alt"
              class="rect-icon"
            />
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
          <span class="menu-label" v-if="isShowMenu">{{ item.name }}</span>
        </div>
      </div>
    </aside>

    <!-- 菜单项详情弹框 -->
    <transition name="popup-fade">
      <div
        v-if="popupVisible && hoveredMenuItem"
        class="menu-popup glassmorphism-card2"
        :style="{
          top: popupPosition.top > 500 ? '500px' : popupPosition.top + 'px',
          left: popupPosition.left + 'px',
        }"
        @mouseenter="popupVisible = true"
        @mouseleave="hidePopup"
      >
        <img :src="requireFun(hoveredMenuItem.name)" class="popup-img" />

        <div class="popup-info">
          <div class="popup-title">{{ hoveredMenuItem.name }}</div>
          <div class="popup-desc">{{ hoveredMenuItem.desc }}</div>
        </div>
      </div>
    </transition>
    <main
      class="content"
      v-loading="loading"
      element-loading-text="代码正在构建中coding..."
      element-loading-background="rgba(0, 0, 0, 1)"
    >
      <!-- 头部按钮 -->
      <div class="btnList">
        <el-tooltip
          class="box-item"
          :content="!item.value ? item.content : item.content2"
          placement="bottom"
          v-for="item in btnList"
          :key="item.icon"
        >
          <img
            :src="requireFun(item.icon)"
            @click="item.click"
            style="margin-right: 20px; width: 34px; height: 34px"
            :style="{
              filter: !item.value ? 'grayscale(1)' : 'grayscale(0)',
            }"
            alt=""
          />
        </el-tooltip>
      </div>

      <!-- 代码展示 -->
      <div
        :class="showCode ? 'right-box' : 'right-box-small'"
        s
        style="display: flex"
      >
        <div style="width: 200px; height: 100%" v-if="showCode">
          <el-tree
            :data="data"
            ref="treeRef"
            style="
              width: calc(100% - 20px);
              margin-right: 10px;
              height: calc(100% - 20px);
              padding: 10px;
              background: rgba(0, 0, 0, 0);
              color: #fff;
              border: 1px solid rgba(238, 238, 238, 0.1) !important;
              border-top: 0;

              overflow: auto;
            "
            :props="{ children: 'children', label: 'label' }"
            node-key="label"
            default-expand-all
            indent="10"
            highlight-current
            @node-click="handleNodeDblClick"
          >
            <!-- 自定义节点内容，显示文件夹/文件图标 -->
            <template #default="{ node, data }">
              <span style="display: flex; align-items: center">
                <i
                  v-if="data.children"
                  class="el-icon-folder"
                  style="margin-right: 6px; color: #409eff"
                ></i>
                <i
                  v-else
                  class="el-icon-document"
                  style="margin-right: 6px; color: #67c23a"
                ></i>
                <img
                  style="width: 16px; height: 16px; margin-right: 6px"
                  :src="requireFun(`${data.type}`)"
                  alt=""
                />
                {{ data.label }}
              </span>
            </template>
          </el-tree>
        </div>
        <div
          style="width: calc(100% - 200px); height: 100%; position: relative"
          v-if="showCode && showHighlight"
        >
          <div
            style="
              display: flex;
              align-items: center;
              height: 30px;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              z-index: 1;
              background-color: #21252f;
              justify-content: space-between;
            "
          >
            <div
              style="
                color: #fff;
                margin-left: 20px;
                display: flex;
                align-items: center;
              "
            >
              ./{{ activeFile }}
            </div>
            <div style="display: flex; align-items: center; cursor: pointer">
              <el-tooltip
                v-for="item in pageBtnList"
                :key="item.icon"
                :content="item.content"
                placement="bottom"
              >
                <img
                  :style="{
                    width: item.size + 'px',
                    height: item.size + 'px',
                    marginLeft: '15px',
                  }"
                  :src="item.icon"
                  alt=""
                  @click="item.click"
                />
              </el-tooltip>
            </div>
          </div>
          <!-- <prism-editor
            :text="vueFileContent"
            :readonly="readonly"
            v-if="showCode && showHighlight && imgUrl == ''"
            class="right-box-content"
          /> -->
          <codeEdit
            v-model="vueFileContent"
            language="html"
            v-if="showCode && showHighlight && imgUrl == ''"
            class="right-box-content"
            @editor-mounted="editorMounted"
          ></codeEdit>

          <div
            v-if="showCode && showHighlight && imgUrl != ''"
            style="
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <img style="max-width: 100%; max-height: 100%" :src="imgUrl" />
          </div>
        </div>
      </div>

      <!-- 组件展示 -->
      <div
        :class="
          showCode
            ? 'content-card glassmorphism-card-small'
            : 'content-card glassmorphism-card'
        "
        v-if="showComponent && showPage"
      >
        <div
          style="
            position: absolute;
            top: 10px;
            left: 20px;
            color: #fff;
            font-size: 16px;
          "
        >
          {{ route.name }}
        </div>
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import requireFun from "@/util/requireFun";
import prismEditor from "@/components/prism-editor/prism-editor.vue";
import codeEdit from "@/components/codeEdit/codeEdit.vue";
import { ref, nextTick, computed, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getMenuConfig } from "@/config/menu";
import { ElMessage } from "element-plus";
import JSZip from "jszip";
import { saveAs } from "file-saver";
const editorMounted = (editor) => {
  console.log("editor实例加载完成", editor);
};
const copyFun = async () => {
  console.log("复制代码");
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(vueFileContent.value);
    } else {
      // 降级方案
      const textArea = document.createElement("textarea");
      textArea.value = vueFileContent.value;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    ElMessage.success("复制成功");
  } catch (err) {
    console.error("复制失败:", err);
    ElMessage.error("复制失败，请手动复制");
  }
};

const downloadFun = async () => {
  try {
    const zip = new JSZip();

    const filePaths = Object.keys(currentFile.value);

    await Promise.all(
      filePaths.map(async (fullPath) => {
        const relativePath = fullPath.replace(/^\.\/Com\//, "");
        const pathParts = relativePath.split("/");
        let currentFolder = zip;

        for (let i = 0; i < pathParts.length - 1; i++) {
          currentFolder = currentFolder.folder(pathParts[i]) || currentFolder;
        }

        if (isBinary(fullPath)) {
          const urlGetter = filesUrl.value[fullPath];
          const fileUrl = await urlGetter(); // 获取资源 URL
          const res = await fetch(fileUrl);
          const arrayBuffer = await res.arrayBuffer();
          currentFolder.file(pathParts[pathParts.length - 1], arrayBuffer);
        } else {
          const textGetter = files.value[fullPath];
          const content = await textGetter(); // 原始字符串
          currentFolder.file(pathParts[pathParts.length - 1], content);
        }
      })
    );

    const zipContent = await zip.generateAsync({ type: "blob" });
    saveAs(zipContent, `${route.name}.zip`);
    ElMessage.success("下载成功");
  } catch (error) {
    console.error("下载失败:", error);
    ElMessage.error("下载失败：" + error.message);
  }
};

const readonly = ref(false);

const editFun = () => {
  console.log("编辑模式");
  window.open(window.location.origin + "#/edit");
};
const pageBtnList = ref([
  // {
  //   icon: requireFun("edit"),
  //   content: "编辑模式",
  //   size: "18",
  //   click: editFun,
  // },
  {
    icon: requireFun("copy"),
    content: "复制代码",
    size: "22",
    click: copyFun,
  },
  {
    icon: requireFun("download"),
    content: "下载代码",
    size: "22",
    click: downloadFun,
  },
]);

const treeRef = ref(null);
// 模拟文件夹数据
const data = ref([
  {
    id: 1,
    label: "src",
    children: [
      {
        id: 2,
        label: "components",
        children: [
          { id: 3, label: "HelloWorld.vue" },
          { id: 4, label: "Test.vue" },
        ],
      },
      {
        id: 5,
        label: "App.vue",
      },
    ],
  },
  {
    id: 6,
    label: "public",
    children: [{ id: 7, label: "index.html" }],
  },
]);

// 控制展开
const isBinary = (filePath) => {
  return /\.(png|jpe?g|gif|bmp|webp|svg|ico|ttf|woff2?|mp3|mp4)$/i.test(
    filePath
  );
};
const vueFileContent = ref("");
const showHighlight = ref(false);
const fileList = ref([]);
const files = ref(import.meta.glob("./Com/**", { as: "raw" }));
const filesUrl = ref(import.meta.glob("./Com/**", { as: "url" }));
const loadFile = async (path) => {
  // path 例子: '../views/Com/test/test.vue'
  console.log(path);
  if (files.value[path]) {
    vueFileContent.value = await files.value[path]();
    console.log(vueFileContent.value);
  }
};
const imgUrl = ref("");
const activeFile = ref("");
const currentFile = ref({});
const openFolder = async () => {
  currentFile.value = {};
  imgUrl.value = "";
  showHighlight.value = false;
  console.log(route.name);

  let nowData = {};
  fileList.value = [];
  let dataList = [
    {
      label: "components",
      children: [],
      type: "files",
    },
    {
      label: "js",
      children: [],
      type: "files",
    },
    {
      label: "img",
      type: "files",
      children: [],
    },
  ];
  Object.keys(files.value).forEach((item) => {
    console.log(item);
    if (item.includes(route.name)) {
      currentFile.value[item] = files.value[item];
      nowData[item] = files[item];

      if (item.indexOf("/components/") != -1) {
        dataList[0].children.push({
          label: item.split(`./Com/${route.name}/components/`).pop(),
          name: item.split(`./Com/${route.name}/`).pop(),
          type: item.split(`.`).pop(),
        });
      } else if (item.indexOf("/img/") != -1) {
        dataList[2].children.push({
          label: item.split(`./Com/${route.name}/img/`).pop(),
          name: item.split(`./Com/${route.name}/`).pop(),
          type: item.split(`.`).pop(),
        });
      } else if (item.indexOf("/js/") != -1) {
        dataList[1].children.push({
          label: item.split(`./Com/${route.name}/js/`).pop(),
          name: item.split(`./Com/${route.name}/`).pop(),
          type: item.split(`.`).pop(),
        });
      } else {
        dataList.push({
          label: item.split(`./Com/${route.name}/`).pop(),
          name: item.split(`./Com/${route.name}/`).pop(),
          type: item.split(`.`).pop(),
        });
      }
    }
  });
  dataList = dataList.filter(
    (item) => !item.children || item.children.length > 0
  );

  data.value = dataList;

  console.log(nowData);
  console.log(fileList.value);

  // 调用
  await loadFile(`./Com/${route.name}/${route.name}.vue`);

  treeRef.value.setCurrentKey(route.name + ".vue");
  activeFile.value = route.name + ".vue";
  showHighlight.value = true;
};
const showCode = ref(true);

const changeShowCode = () => {
  showCode.value = !showCode.value;
  openFolder();
};
const showPage = ref(true);
const changeShowPage = () => {
  showPage.value = !showPage.value;
};
const btnList = ref([
  {
    content: "显示代码",
    content2: "隐藏代码",
    icon: "code",
    value: computed(() => showCode.value),
    click: changeShowCode,
  },
  {
    content: "显示组件",
    content2: "隐藏组件",
    icon: "views",
    value: computed(() => showPage.value),
    click: changeShowPage,
  },
]);

const isShowMenu = ref(false);
const changeMenuStatus = () => {
  isShowMenu.value = !isShowMenu.value;
};

const menuItems = getMenuConfig();
const showComponent = ref(true);
const searchQuery = ref("");
const isSearchFocused = ref(false);

const currentComponent = ref("");
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const filteredMenuItems = computed(() => {
  if (!searchQuery.value) return menuItems;
  return menuItems.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
const loading = ref(false);
const selectComponent = (component) => {
  if (loading.value) return;
  if (component === currentComponent.value) return;
  loading.value = true;

  setTimeout(() => {
    showComponent.value = false;
    nextTick(() => {
      if (currentComponent.value !== component) {
        currentComponent.value = component;
        showComponent.value = true;
        router.push({
          path: `/${component}`,
        });
        setTimeout(() => {
          openFolder();
          loading.value = false;
        }, 600);
      }
    });
  }, 200);
};
const searchInputRef = ref(null);
const onSearchFocus = () => {
  isSearchFocused.value = true;
  // 让搜索输入框聚焦
  nextTick(() => {
    const inputEl = searchInputRef.value;
    if (inputEl) {
      inputEl.focus();
    }
  });
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

const hoveredMenuItem = ref(null);
const popupVisible = ref(false);
const popupPosition = ref({ top: 0, left: 0 });

const showPopup = (item, event) => {
  hoveredMenuItem.value = item;
  popupVisible.value = true;
  // 计算弹框位置（菜单右侧，垂直居中于菜单项）
  const menuRect = event.currentTarget.getBoundingClientRect();
  popupPosition.value = {
    top: menuRect.top + menuRect.height / 2 - 90, // 90为弹框高度一半
    left: menuRect.right + 24, // 菜单右侧偏移
  };
};
const hidePopup = () => {
  popupVisible.value = false;
  hoveredMenuItem.value = null;
};

const handleNodeDblClick = (data, node, tree) => {
  console.log(data);
  activeFile.value = data.name;
  if (!data.children || data.children.length === 0) {
    console.log("双击叶子节点", data);
    imgUrl.value = "";
    if (data.type === "png") {
      imgUrl.value = requireFun(`${route.name}/${data.name}`, true);
    } else {
      loadFile(`./Com/${route.name}/${data.name}`);
    }
  }
};

onMounted(() => {
  // currentComponent.value = menuItems[0].name;
  currentComponent.value = "";
  // router.push({
  //   path: `/${currentComponent.value}`,
  // });
  if (showCode.value) {
    openFolder();
  }
});
</script>

<style scoped lang="less">
/* 高级玻璃拟态风格 */
.glassmorphism {
  background: rgba(28, 32, 40, 0.82);
  box-shadow: 0 8px 32px 0 rgba(44, 130, 201, 0.18), 0 1.5px 0 0 #232a36 inset;
  backdrop-filter: blur(18px) saturate(1.2);
  border: 1.5px solid rgba(58, 123, 213, 0.18);
}
.glassmorphism-small {
  background: rgba(28, 32, 40, 0.82);
  backdrop-filter: blur(18px) saturate(1.2);
  border: 1.5px solid rgba(58, 123, 213, 0.18) !important;
}
.glassmorphism-card {
  background: rgba(34, 38, 48, 0.92);
  box-shadow: 0 16px 64px 0 rgba(44, 130, 201, 0.22), 0 1.5px 0 0 #232a36 inset;
  border-radius: 48px;
  width: calc(100% - 80px);
  height: calc(100% - 80px);
  margin-top: 40px;

  animation: fadeIn 0.7s cubic-bezier(0.4, 2, 0.6, 1);
  border: 1.5px solid #232a36;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.glassmorphism-card-small {
  background: rgba(34, 38, 48, 0.92);
  width: calc(100% - 80px);
  height: calc(100% - 65px);
  margin-top: 60px;
  animation: fadeIn 0.7s cubic-bezier(0.4, 2, 0.6, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(238, 238, 238, 0.1) !important;
}
.glassmorphism-card2 {
  background: rgba(34, 38, 48, 0.92);
  box-shadow: 0 16px 64px 0 rgba(44, 130, 201, 0.22), 0 1.5px 0 0 #232a36 inset;
  border-radius: 48px;
  width: calc(100% - 80px);
  height: calc(100% - 120px);
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
  width: 280px;
  transition: all 0.3s;
}
.menu-small {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
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
  .menu-active-rect {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 2;
    filter: drop-shadow(0 0 12px #3a7bd5cc);
  }
}
.menu-items-container-small {
  overflow-y: auto;
  flex: 1;
  padding-bottom: 20px;
  overflow-y: auto;
  flex: 1;
  padding-bottom: 20px;
  .menu-item {
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 20px;
    // padding: 28px 0 18px 0;
    border-radius: 28px;
    cursor: pointer;
    // transition: background 0.25s cubic-bezier(0.4, 2, 0.6, 1),
    //   box-shadow 0.25s cubic-bezier(0.4, 2, 0.6, 1),
    //   transform 0.18s cubic-bezier(0.4, 2, 0.6, 1), border 0.22s;
    position: relative;
    overflow: visible;
    border: 1px solid transparent;
    outline: none;
  }
  .menu-item:focus {
    // border: 2px solid #3a7bd5;
    // box-shadow: 0 0 0 4px #3a7bd555;
  }

  .menu-item.active,
  .menu-item:hover {
    // background: linear-gradient(120deg, #232a36 0%, #2d3543 100%);
    // box-shadow: 0 12px 48px 0 rgba(44, 130, 201, 0.22), 0 2px 0 0 #232a36 inset;
    transform: translateY(-4px) scale(0.88);
    // border: 2px solid #3a7bd5;
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
    width: 45px;
    height: 40px;
    border-radius: 5px;
    // box-shadow: 0 4px 24px 0 rgba(44, 130, 201, 0.22), 0 0 0 2px #232a36 inset,
    //   0 0 0 8px #3a7bd522;
    background: linear-gradient(135deg, #232a36 40%, #3a7bd5 100%);
    transition: box-shadow 0.25s, filter 0.2s, border 0.2s;
    z-index: 1;
    filter: grayscale(0.05) brightness(1.05) contrast(1.08)
      drop-shadow(0 2px 8px #3a7bd555);
    object-fit: cover;
    border: 2px solid #555;
  }

  .menu-item.active .rect-icon,
  .menu-item:hover .rect-icon {
    // box-shadow: 0 8px 32px 0 rgba(44, 130, 201, 0.32), 0 0 0 10px #3a7bd555,
    //   0 0 0 2px #3a7bd5 inset;
    // filter: brightness(1.22) saturate(1.5) drop-shadow(0 0 18px #3a7bd5cc);
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
    // animation: menu-glow-rect-pulse 1.2s infinite alternate;
    filter: blur(6px);
  }
  .menu-active-rect {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 2;
    filter: drop-shadow(0 0 12px #3a7bd5cc);
  }
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
.btnList {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: calc(100% - 30px);
  height: 80px;
  align-items: center;
  justify-content: flex-start;
  padding-left: 30px;
  img {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
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

.menu-popup {
  position: fixed;
  min-width: 320px;
  max-width: 400px;
  height: fit-content;
  box-shadow: 0 12px 48px 0 rgba(44, 130, 201, 0.32), 0 2px 0 0 #232a36 inset;
  border-radius: 32px;
  z-index: 9999;
  padding: 32px 32px 32px 24px;
  background: rgba(34, 38, 48, 0.98);
  border: 2px solid #3a7bd5;
  animation: popup-zoom-in 0.25s cubic-bezier(0.4, 2, 0.6, 1);
  transition: box-shadow 0.3s, background 0.3s;
  pointer-events: auto;
}
@keyframes popup-zoom-in {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.popup-img {
  width: 100%;
  height: 300px;
  border-radius: 18px;
  /* margin-right: 28px; */
  box-shadow: 0 8px 32px 0 #3a7bd555, 0 0 0 2px #3a7bd5 inset;
  object-fit: cover;
  background: #232a36;
}
.popup-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.popup-title {
  font-size: 1.3rem;
  color: #3a7bd5;
  font-weight: bold;
  margin-bottom: 10px;
  letter-spacing: 2px;
}
.popup-desc {
  color: #e0e6ed;
  font-size: 1.05rem;
  line-height: 1.7;
  text-shadow: 0 2px 0 #232a36, 0 4px 16px #3a7bd544;
}

.img1 {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.img2 {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.img3 {
  width: 45px;
  height: 45px;
  margin-right: 40px;
}
.search-icon-default {
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-box {
  width: calc(110%);
  height: calc(100% - 65px);
  margin-top: 60px;
  background-color: #fff;
  background: rgba(34, 38, 48, 0.92);
  // border-radius: 0 48px 0 0;
  // box-shadow: 0 16px 64px 0 rgba(44, 130, 201, 0.22), 0 1.5px 0 0 #232a36 inset;
  transition: all 0.5s;
  overflow: hidden;
  // padding: 10px 20px;
  border: 1px solid rgba(238, 238, 238, 0.1) !important;
  border-right: 0 !important;
  border-left: 0 !important;
  padding-right: 10px;
  .right-box-content {
    width: 100%;
    margin-top: 35px;
    z-index: 0;
    height: calc(100% - 40px) !important;
    overflow: auto;
  }
}

.right-box-small {
  width: 0;
  height: 0;
  transition: all 0.5s;
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
.el-tree-node__content {
  overflow: hidden;
  /* 超出隐藏省略号 */
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background: rgba(236, 245, 255, 0.1) !important;
  color: #3a7bd5 !important;
  border-radius: 8px;
}
.el-tree-node__content:hover {
  background: rgba(236, 245, 255, 0.1) !important;
  border-radius: 8px;
}
</style>