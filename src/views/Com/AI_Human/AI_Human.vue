<template>
  <!-- 
    新增 :class="theme" 绑定 
    使用方式:
    <GrapeChat theme="light" />  (默认白色)
    <GrapeChat theme="dark" />   (黑色系)
    <GrapeChat propsText="这是一段需要数字人直接播报的文字" /> (直连播报模式)
  -->
  <div :class="['app-layout', propsData.theme]">
    <!-- 音量提示弹窗 (新增) -->
    <div
      v-if="showVolumePrompt"
      class="volume-prompt-overlay"
      @click.self="handleVolumeConfirm"
    >
      <div class="volume-prompt-card">
        <div class="volume-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
            />
          </svg>
        </div>
        <h3 class="volume-title">请打开您的设备音量</h3>
        <p class="volume-desc">
          数字人将为您进行语音播报，开启音量可获得最佳体验
        </p>
        <button class="volume-confirm-btn" @click="handleVolumeConfirm">
          知道了
        </button>
      </div>
    </div>

    <!-- 左侧区域：悬浮气泡聊天界面 -->
    <div class="left-section">
      <!-- 背景装饰 (颜色会随主题变化) -->
      <div class="bg-decoration bg-dec-1"></div>
      <div class="bg-decoration bg-dec-2"></div>

      <!-- 聊天主容器 (气泡卡片) -->
      <div class="chat-bubble-card">
        <!-- 头部 -->
        <header class="chat-header">
          <div class="header-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.22-7.52-3.22 7.52-3.22-7.51-3.22L12 17l-5.5-2.5z"
              />
              <path
                d="M12 22c4.97 0 9-4.03 9-9h-2c0 3.87-3.13 7-7 7s-7-3.13-7-7H3c0 4.97 4.03 9 9 9z"
              />
              <path
                d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
              />
            </svg>
            {{ propsData.nameTitle }}
          </div>
          <!-- <div class="header-status">
            <div class="status-dot"></div>
            在线
          </div> -->
        </header>

        <!-- 内容区 -->
        <main id="main-scroll" class="chat-main">
          <!-- 欢迎界面 -->
          <!-- 如果有 propsText (直连模式)，则不显示欢迎界面 -->
          <div
            id="welcome-screen"
            v-show="!showChat && !propsText"
            class="welcome-screen"
          >
            <div class="welcome-avatar">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 2C10.9 2 10 2.9 10 4V5H8V4C8 2.9 7.1 2 6 2S4 2.9 4 4V11C4 15.4 7.6 19 12 19C16.4 19 20 15.4 20 11V4C20 2.9 19.1 2 18 2S16 2.9 16 4V5H14V4C14 2.9 13.1 2 12 2M6 6H8V8H6V6M16 6H18V8H16V6M6 10H8V11C8 12.66 9.34 14 11 14V16C8.24 16 6 13.76 6 11V10M16 10H18V11C18 13.76 15.76 16 13 16V14C14.66 14 16 12.66 16 11V10Z"
                />
              </svg>
            </div>
            <h2 class="intro-title">您好，我是您的{{ propsData.nameTitle }}</h2>
            <p class="intro-desc">我随时为您提供决策支持</p>

            <!-- 直连模式下不显示建议卡片 -->
            <div class="suggestions" v-if="!propsText">
              <div
                class="suggestion-chip"
                @click="handleSuggestionClick('葡萄白粉病怎么防治？')"
              >
                🍇 葡萄白粉病怎么防治？
              </div>
              <div
                class="suggestion-chip"
                @click="handleSuggestionClick('葡萄栽培如何提高产量？')"
              >
                🚀 如何提高亩产？
              </div>
              <div
                class="suggestion-chip"
                @click="handleSuggestionClick('深施有机肥有什么好处？')"
              >
                🌱 深施有机肥的好处
              </div>
              <div
                class="suggestion-chip"
                @click="handleSuggestionClick('葡萄采收前需要做哪些准备？')"
              >
                📅 采收前准备清单
              </div>
            </div>
          </div>

          <!-- 聊天消息列表 -->
          <div id="chat-list" v-show="showChat || propsText" class="chat-list">
            <div
              v-for="(msg, index) in messages"
              :key="index"
              class="message-row"
              :class="msg.role"
            >
              <div class="avatar" :class="msg.role"></div>
              <div
                class="bubble"
                :class="{
                  'error-bubble': msg.isError,
                  cursor: msg.isLoading && msg.role === 'ai',
                }"
                v-html="msg.text.replace(/\n/g, '<br>')"
              ></div>
            </div>
          </div>
        </main>

        <!-- 底部输入区 -->
        <!-- 如果有 propsText，则禁用输入框，不提供问答服务 -->
        <div
          class="input-area-container"
          :class="{ 'disabled-mode': !!propsText }"
        >
          <div class="input-wrapper" v-if="!propsData.propsText">
            <textarea
              v-model="userInput"
              rows="1"
              :placeholder="
                propsData.propsText ? '当前为直连播报模式' : '输入您的问题...'
              "
              :disabled="!!propsData.propsText"
              @input="autoResizeTextarea"
              @keydown="handleKeydown"
              ref="textareaRef"
            ></textarea>

            <button
              id="send-btn"
              class="send-btn"
              @click="toggleSend"
              :disabled="!!propsData.propsText"
            >
              <svg id="icon-send" v-if="!isGenerating" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
              <svg id="icon-stop" v-else viewBox="0 0 24 24">
                <path d="M6 6h12v12H6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧区域：数字人播报 -->
    <div class="right-section">
      <div class="avatar-wrapper">
        <!-- 数字人实际渲染容器 -->
        <div class="wrapper" style="width: 100%; height: 100%"></div>
        <!-- 如果SDK未加载显示的占位 -->
        <div
          v-if="!avatarSDKReady && !showVolumePrompt"
          class="avatar-placeholder"
        >
          <p>数字人正在初始化...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";

// --- 接收父组件传递的主题参数 ---

const propsData = ref({
  theme: "dark",
  nameTitle: "AI智能体",
  propsText: ``, // 修改默认值为空字符串，便于判断是否传入`,
});
import { useRoute } from "vue-router";
if (window.name) {
  let NAME = JSON.parse(window.name);
  propsData.value.theme = NAME.theme || "dark";
  propsData.value.nameTitle = NAME.nameTitle || "AI智能体";
  propsData.value.propsText = NAME.propsText || "";
}

// const props = defineProps({
//   theme: {
//     type: String,
//     default: "dark",
//     validator: (value) => ["light", "dark"].includes(value),
//   },
//   nameTitle: {
//     type: String,
//     default: "AI智能体",
//   },
//   propsText: {
//     type: String,
//     default: ``, // 修改默认值为空字符串，便于判断是否传入`,
//   },
// });

// 模拟 SDK 引入 (保持原有逻辑)
import AvatarPlatform, {
  PlayerEvents,
  SDKEvents,
} from "/public/testSdk/3.1.2.1002/avatar-sdk-web_3.1.2.1002/index.js";

// ==================== 新增：音量提示相关变量 ====================
const showVolumePrompt = ref(false);
const hasInteracted = ref(false);

// ==================== 数字人相关代码 ====================
const avatarSDKReady = ref(false);
const avatarInputText = ref("你好，我是AI数字人助手！");

const mockLoadSDK = () => {
  console.warn("正在尝试加载 Avatar SDK...");
  setTimeout(() => {
    console.log("SDK Mock Loaded");
    avatarSDKReady.value = true;
  }, 500);
};
let avatarPlatform = null;
const initAvatar = () => {
  // 防止重复初始化
  if (avatarPlatform) return;

  avatarPlatform = new AvatarPlatform();

  avatarPlatform
    .on(SDKEvents.connected, (initResp) =>
      console.log("sdk event: connected", initResp)
    )
    .on(SDKEvents.stream_start, () => console.log("sdk event: stream_start"))
    .on(SDKEvents.disconnected, (err) =>
      console.error("sdk event: disconnected", err)
    )
    .on(SDKEvents.error, (error) => console.error("sdk event: error", error));

  const player = avatarPlatform.player || avatarPlatform.createPlayer();
  player
    ?.on(PlayerEvents.play, () => console.log("sdk event: player play"))
    .on(PlayerEvents.playing, () => console.log("sdk event: player playing"));

  avatarPlatform.setApiInfo({
    appId: "e9eef25a",
    apiKey: "eba52f7ad3e9955254ab357543a098de",
    apiSecret: "N2VlNGJmNGIwMGFhYzc4ZmRiOGNmYzc3",
    sceneId: "319683821131927552",
    serverUrl: "wss://avatar.cn-huadong-1.xf-yun.com/v1/interact",
  });

  avatarPlatform.setGlobalParams({
    stream: { protocol: "xrtc", alpha: 1 },
    avatar: { avatar_id: "111283001" },
    tts: { vcn: "x4_yuexiaoni_assist" },
  });

  avatarPlatform
    .start({ wrapper: document.querySelector(".wrapper") })
    .then(() => {
      console.log("connected && stream play successfully");
      avatarSDKReady.value = true;
    })
    .catch((e) => console.error(e));

  mockLoadSDK();
};

const triggerAvatarSpeak = (text) => {
  if (!text) return;
  if (avatarPlatform) {
    avatarPlatform.writeText(text, {
      nlp: false,
      tts: { volume: 100 },
    });

    avatarPlatform.writeCmd("action", "A_RH_Show_rightup_O");
  } else {
    console.log(`[数字人模拟播报]: ${text}`);
  }
};

// ==================== 新增：音量提示处理方法 ====================
const handleVolumeConfirm = () => {
  showVolumePrompt.value = false;
  hasInteracted.value = true;

  // 非首次进入，直接初始化数字人

  // 检查是否有 propsText，如果有则进入直连播报模式
  if (propsData.value.propsText && propsData.value.propsText.trim()) {
    console.log("检测到 propsText，进入直连播报模式");
    showChat.value = true;

    // 直接输出 propsText
    appendMessage("ai", propsData.value.propsText);

    // 延迟触发播报，等待数字人初始化
    const trySpeak = () => {
      if (avatarPlatform) {
        setTimeout(() => {
          triggerAvatarSpeak(propsData.value.propsText);
        }, 500);
      } else {
        setTimeout(trySpeak, 500);
      }
    };
    setTimeout(trySpeak, 500);
  }
};

// ==================== 智能助手聊天相关代码 ====================
const userInput = ref("");
const textareaRef = ref(null);
const isGenerating = ref(false);
const showChat = ref(false);
const messages = ref([]);
let abortController = null;

const autoResizeTextarea = (e) => {
  const textarea = e.target;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
  if (textarea.value === "") textarea.style.height = "24px";
};

const handleKeydown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    toggleSend();
  }
};

const handleSuggestionClick = (text) => {
  // 点击建议卡片时自动关闭音量提示
  if (showVolumePrompt.value) {
    handleVolumeConfirm();
  }

  userInput.value = text;
  autoResizeTextarea({ target: textareaRef.value });
  toggleSend();
};

const toggleSend = async () => {
  // 如果处于直连模式，禁止发送
  if (propsData.value.propsText) return;

  // 点击发送按钮时自动关闭音量提示
  if (showVolumePrompt.value) {
    handleVolumeConfirm();
  }

  const text = userInput.value.trim();

  if (isGenerating.value) {
    if (abortController) {
      abortController.abort();
    }
    isGenerating.value = false;
    return;
  }

  if (!text) return;

  appendMessage("user", text);
  userInput.value = "";
  if (textareaRef.value) textareaRef.value.style.height = "24px";

  showChat.value = true;
  await nextTick();

  const aiMessageIndex = appendMessage("ai", "", false, true);
  isGenerating.value = true;

  try {
    await fetchAIResponse(text, aiMessageIndex);
  } catch (error) {
    if (error.name === "AbortError") {
      messages.value[aiMessageIndex].text += "\n[已停止生成]";
    } else {
      console.error("请求错误：", error);
      messages.value[aiMessageIndex].isError = true;
      messages.value[aiMessageIndex].text = `请求失败：${error.message}`;
    }
  } finally {
    isGenerating.value = false;
    messages.value[aiMessageIndex].isLoading = false;
  }
};

const appendMessage = (role, text, isError = false, isLoading = false) => {
  messages.value.push({
    role,
    text,
    isError,
    isLoading,
  });
  scrollToBottom();
  return messages.value.length - 1;
};

const scrollToBottom = () => {
  nextTick(() => {
    const mainScroll = document.getElementById("main-scroll");
    if (mainScroll) {
      mainScroll.scrollTop = mainScroll.scrollHeight;
    }
  });
};

const fetchAIResponse = async (query, messageIndex) => {
  abortController = new AbortController();

  // 演示用 Mock 流式逻辑
  const mockResponse = `针对您询问的“${query}”，我为您查询了葡萄种植知识库。\n\n1. **病害特征**：该病害主要危害叶片、果实和新梢。\n2. **防治建议**：建议使用戊唑醇或苯醚甲环唑进行喷雾防治，间隔7-10天喷一次，连续2-3次。\n3. **农事操作**：及时摘除病叶病果，清除枯枝败叶，减少病源。`;

  let i = 0;
  const chunkSpeed = 30;

  await new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (abortController.signal.aborted) {
        clearInterval(interval);
        reject(new DOMException("Aborted", "AbortError"));
        return;
      }

      if (i < mockResponse.length) {
        const chunk = mockResponse.slice(i, i + 2);
        messages.value[messageIndex].text += chunk;
        scrollToBottom();
        i += 2;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, chunkSpeed);
  });

  const finalAnswer = messages.value[messageIndex].text;
  if (finalAnswer && !messages.value[messageIndex].isError) {
    console.log("AI回答完成，准备数字人播报...");
    triggerAvatarSpeak(finalAnswer);
  }
};

// ==================== 生命周期钩子 ====================
onMounted(() => {
  // 检查用户是否已经确认过音量提示
  const promptShown = false;

  if (!promptShown) {
    // 首次进入，显示音量提示
    showVolumePrompt.value = true;
    initAvatar();
  } else {
  }
});

onUnmounted(() => {
  if (avatarPlatform) {
    avatarPlatform.stop();
  }
  if (abortController) {
    abortController.abort();
  }
});
</script>

<style scoped lang="less">
/* ==================== 新增：音量提示弹窗样式 ==================== */
.volume-prompt-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.volume-prompt-card {
  background: var(--glass-bg);
  border-radius: 24px;
  padding: 40px 32px;
  width: 90%;
  max-width: 420px;
  text-align: center;
  box-shadow: var(--shadow-card);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(15px);
  animation: slideUp 0.4s ease;
}

.volume-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--primary-light)
  );
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 8px 24px rgba(106, 27, 154, 0.3);

  svg {
    width: 40px;
    height: 40px;
  }
}

.volume-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 12px;
}

.volume-desc {
  font-size: 15px;
  color: var(--text-sub);
  line-height: 1.6;
  margin-bottom: 32px;
}

.volume-confirm-btn {
  width: 100%;
  padding: 14px 24px;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--primary-light)
  );
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(106, 27, 154, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(106, 27, 154, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
}

/* ==================== CSS 变量定义 (核心换肤逻辑) ==================== */

/* 默认亮色变量 */
.app-layout.light {
  --primary-color: #6a1b9a;
  --primary-light: #9c4dcc;
  --primary-dark: #38006b;

  --bg-gradient: linear-gradient(135deg, #2e004f 0%, #5e1b86 100%);
  --bg-decoration-1: #9c4dcc;
  --bg-decoration-2: #d500f9;

  --glass-bg: rgba(255, 255, 255, 0.95);
  --glass-border: rgba(255, 255, 255, 0.3);
  --header-bg: rgba(255, 255, 255, 0.6);
  --header-border: rgba(0, 0, 0, 0.05);

  --chat-bg-user: linear-gradient(
    135deg,
    var(--primary-color),
    var(--primary-light)
  );
  --chat-text-user: #ffffff;

  --chat-bg-ai: #f3f0f7;
  --chat-text-ai: #333333;

  --text-main: #333;
  --text-sub: #666;
  --text-placeholder: #999;

  --bg-chat-main: #fafafa;

  --input-bg: #ffffff;
  --input-border: rgba(0, 0, 0, 0.05);
  --input-text: #333;

  --suggestion-bg: #ffffff;
  --suggestion-border: rgba(0, 0, 0, 0.08);
  --suggestion-text: var(--primary-dark);
  --suggestion-hover-shadow: rgba(106, 27, 154, 0.15);

  --shadow-soft: 0 10px 40px rgba(0, 0, 0, 0.2);
  --shadow-card: 0 20px 60px rgba(0, 0, 0, 0.3);
  --shadow-input: 0 8px 30px rgba(0, 0, 0, 0.1);

  --scrollbar-thumb: rgba(0, 0, 0, 0.1);
}

/* 黑色系变量 */
.app-layout.dark {
  --primary-color: #bb86fc;
  --primary-light: #cf94e6;
  --primary-dark: #9955e8;

  /* 深邃背景 */
  --bg-gradient: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  --bg-decoration-1: #4a148c;
  --bg-decoration-2: #7b1fa2;

  /* 深色玻璃拟态 */
  --glass-bg: rgba(30, 30, 40, 0.85);
  --glass-border: rgba(255, 255, 255, 0.1);
  --header-bg: rgba(30, 30, 40, 0.6);
  --header-border: rgba(255, 255, 255, 0.08);

  /* 聊天气泡 */
  --chat-bg-user: linear-gradient(135deg, #6200ea, #b388ff);
  --chat-text-user: #ffffff;

  --chat-bg-ai: #33334d; /* 深紫色偏灰 */
  --chat-text-ai: #e0e0e0;

  /* 文字颜色 */
  --text-main: #ffffff;
  --text-sub: #b0b0b0;
  --text-placeholder: #666;

  /* 背景色 */
  --bg-chat-main: #1a1a2e;

  /* 输入框 */
  --input-bg: #2d2d3a;
  --input-border: rgba(255, 255, 255, 0.1);
  --input-text: #fff;

  /* 建议卡片 */
  --suggestion-bg: #2c2c35;
  --suggestion-border: rgba(255, 255, 255, 0.1);
  --suggestion-text: #e0e0e0;
  --suggestion-hover-shadow: rgba(187, 134, 252, 0.2);

  /* 阴影 */
  --shadow-soft: 0 10px 40px rgba(0, 0, 0, 0.5);
  --shadow-card: 0 20px 60px rgba(0, 0, 0, 0.6);
  --shadow-input: 0 8px 30px rgba(0, 0, 0, 0.4);

  --scrollbar-thumb: rgba(255, 255, 255, 0.2);
}

/* ==================== 基础样式 ==================== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

.app-layout {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: end;
  background: rgba(0, 0, 0, 0.6);
}

/* ==================== 左侧区域 ==================== */
.left-section {
  width: 70%;
  height: 100%;
  background: transparent;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  overflow: hidden;
}

.bg-decoration {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.4;
}
.bg-dec-1 {
  width: 400px;
  height: 400px;
  background: var(--bg-decoration-1);
  top: -100px;
  left: -100px;
}
.bg-dec-2 {
  width: 300px;
  height: 300px;
  background: var(--bg-decoration-2);
  bottom: -50px;
  right: 20%;
}

.chat-bubble-card {
  position: relative;
  z-index: 10;
  width: 60%;
  max-width: 900px;
  height: 90%;
  max-height: 800px;
  background: var(--glass-bg);
  border-radius: 32px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
  transition: background 0.3s ease, border-color 0.3s ease;
}

/* 顶部导航 */
.chat-header {
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--header-border);
  background: var(--header-bg);
  flex-shrink: 0;
  transition: background 0.3s ease;
}

.header-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-dark);

  .app-layout.dark & {
    color: var(--primary-light);
  }

  display: flex;
  align-items: center;
  gap: 8px;
}

.header-status {
  font-size: 12px;
  color: #4caf50;
  display: flex;
  align-items: center;
  gap: 4px;
}
.status-dot {
  width: 8px;
  height: 8px;
  background-color: #4caf50;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

/* 主内容区域 */
.chat-main {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  padding-bottom: 100px;
  scroll-behavior: smooth;
  background-color: var(--bg-chat-main);
  transition: background-color 0.3s ease;
}

.chat-main::-webkit-scrollbar {
  width: 6px;
}
.chat-main::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb);
  border-radius: 3px;
}

/* 欢迎界面 */
.welcome-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  animation: fadeIn 0.6s ease;
}

.welcome-avatar {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #e1bee7, #ab47bc);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  box-shadow: 0 8px 20px rgba(106, 27, 154, 0.3);
}
.welcome-avatar svg {
  width: 60px;
  height: 60px;
  fill: white;
}

.intro-title {
  font-size: 26px;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 8px;
}
.intro-desc {
  font-size: 15px;
  color: var(--text-sub);
  margin-bottom: 40px;
  max-width: 60%;
  line-height: 1.6;
}

/* 建议卡片网格 */
.suggestions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 500px;
}

.suggestion-chip {
  background: var(--suggestion-bg);
  border: 1px solid var(--suggestion-border);
  color: var(--suggestion-text);
  padding: 16px;
  border-radius: 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  font-weight: 500;
}

.suggestion-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px var(--suggestion-hover-shadow);
  border-color: var(--primary-light);
}

/* 聊天消息列表 */
.chat-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-row {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  opacity: 0;
  animation: slideUp 0.4s forwards;
}

.message-row.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  background-size: cover;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
}

.app-layout.light .avatar.ai {
  border-color: white;
}
.app-layout.dark .avatar.ai {
  border-color: #444;
}

.bubble {
  max-width: 75%;
  padding: 14px 18px;
  border-radius: 20px;
  font-size: 15px;
  line-height: 1.6;
  position: relative;
  word-wrap: break-word;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.message-row.ai .bubble {
  background-color: var(--chat-bg-ai);
  color: var(--chat-text-ai);
  border-bottom-left-radius: 4px;
}

.message-row.user .bubble {
  background: var(--chat-bg-user);
  color: var(--chat-text-user);
  border-bottom-right-radius: 4px;
}

.cursor::after {
  content: "▋";
  display: inline-block;
  vertical-align: text-bottom;
  animation: blink 1s step-start infinite;
  color: var(--primary-color);
  font-size: 0.9em;
  margin-left: 4px;
}

/* 底部输入区 */
.input-area-container {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 48px);
  z-index: 20;

  // 直连模式下的输入框容器样式调整
  &.disabled-mode {
    opacity: 0.6;
    pointer-events: none; // 禁止点击
  }
}

.input-wrapper {
  background: var(--input-bg);
  border-radius: 50px;
  padding: 8px 8px 8px 20px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  box-shadow: var(--shadow-input);
  border: 1px solid var(--input-border);
  transition: box-shadow 0.2s, background-color 0.3s;
}

.input-wrapper:focus-within {
  box-shadow: 0 8px 30px rgba(106, 27, 154, 0.25);
  border-color: var(--primary-light);
}

textarea {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 15px;
  resize: none;
  max-height: 120px;
  min-height: 45px;
  padding: 10px 0;
  line-height: 1.5;
  color: var(--input-text);
}

textarea::placeholder {
  color: var(--text-placeholder);
}

textarea:disabled {
  cursor: not-allowed;
}

.send-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--primary-color);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  margin-bottom: 2px;
}

.send-btn:hover:not(:disabled) {
  background: var(--primary-light);
  transform: scale(1.05);
}

.send-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.send-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  filter: grayscale(0.5);
}

.send-btn svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.error-bubble {
  background: #ffebee !important;
  color: #c62828 !important;
}

/* ==================== 右侧区域 ==================== */
.right-section {
  width: 30%;
  height: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
}

.avatar-wrapper {
  flex: 1;
  width: 100%;
  background-color: transparent;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.wrapper {
  width: 100%;
  height: 100%;
}

.avatar-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-sub);
  font-size: 14px;
  background: transparent !important;
}

/* ==================== 动画 ==================== */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(76, 175, 80, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
}
</style>