const r=`<template>\r
  <!-- \r
    新增 :class="theme" 绑定 \r
    使用方式:\r
    <GrapeChat theme="light" />  (默认白色)\r
    <GrapeChat theme="dark" />   (黑色系)\r
    <GrapeChat propsText="这是一段需要数字人直接播报的文字" /> (直连播报模式)\r
  -->\r
  <div :class="['app-layout', propsData.theme]">\r
    <!-- 音量提示弹窗 (新增) -->\r
    <div\r
      v-if="showVolumePrompt"\r
      class="volume-prompt-overlay"\r
      @click.self="handleVolumeConfirm"\r
    >\r
      <div class="volume-prompt-card">\r
        <div class="volume-icon">\r
          <svg viewBox="0 0 24 24" fill="currentColor">\r
            <path\r
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"\r
            />\r
          </svg>\r
        </div>\r
        <h3 class="volume-title">请打开您的设备音量</h3>\r
        <p class="volume-desc">\r
          数字人将为您进行语音播报，开启音量可获得最佳体验\r
        </p>\r
        <button class="volume-confirm-btn" @click="handleVolumeConfirm">\r
          知道了\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- 左侧区域：悬浮气泡聊天界面 -->\r
    <div class="left-section">\r
      <!-- 背景装饰 (颜色会随主题变化) -->\r
      <div class="bg-decoration bg-dec-1"></div>\r
      <div class="bg-decoration bg-dec-2"></div>\r
\r
      <!-- 聊天主容器 (气泡卡片) -->\r
      <div class="chat-bubble-card">\r
        <!-- 头部 -->\r
        <header class="chat-header">\r
          <div class="header-title">\r
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">\r
              <path\r
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.22-7.52-3.22 7.52-3.22-7.51-3.22L12 17l-5.5-2.5z"\r
              />\r
              <path\r
                d="M12 22c4.97 0 9-4.03 9-9h-2c0 3.87-3.13 7-7 7s-7-3.13-7-7H3c0 4.97 4.03 9 9 9z"\r
              />\r
              <path\r
                d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"\r
              />\r
            </svg>\r
            {{ propsData.nameTitle }}\r
          </div>\r
          <!-- <div class="header-status">\r
            <div class="status-dot"></div>\r
            在线\r
          </div> -->\r
        </header>\r
\r
        <!-- 内容区 -->\r
        <main id="main-scroll" class="chat-main">\r
          <!-- 欢迎界面 -->\r
          <!-- 如果有 propsText (直连模式)，则不显示欢迎界面 -->\r
          <div\r
            id="welcome-screen"\r
            v-show="!showChat && !propsText"\r
            class="welcome-screen"\r
          >\r
            <div class="welcome-avatar">\r
              <svg viewBox="0 0 24 24">\r
                <path\r
                  d="M12 2C10.9 2 10 2.9 10 4V5H8V4C8 2.9 7.1 2 6 2S4 2.9 4 4V11C4 15.4 7.6 19 12 19C16.4 19 20 15.4 20 11V4C20 2.9 19.1 2 18 2S16 2.9 16 4V5H14V4C14 2.9 13.1 2 12 2M6 6H8V8H6V6M16 6H18V8H16V6M6 10H8V11C8 12.66 9.34 14 11 14V16C8.24 16 6 13.76 6 11V10M16 10H18V11C18 13.76 15.76 16 13 16V14C14.66 14 16 12.66 16 11V10Z"\r
                />\r
              </svg>\r
            </div>\r
            <h2 class="intro-title">您好，我是您的{{ propsData.nameTitle }}</h2>\r
            <p class="intro-desc">我随时为您提供决策支持</p>\r
\r
            <!-- 直连模式下不显示建议卡片 -->\r
            <div class="suggestions" v-if="!propsText">\r
              <div\r
                class="suggestion-chip"\r
                @click="handleSuggestionClick('葡萄白粉病怎么防治？')"\r
              >\r
                🍇 葡萄白粉病怎么防治？\r
              </div>\r
              <div\r
                class="suggestion-chip"\r
                @click="handleSuggestionClick('葡萄栽培如何提高产量？')"\r
              >\r
                🚀 如何提高亩产？\r
              </div>\r
              <div\r
                class="suggestion-chip"\r
                @click="handleSuggestionClick('深施有机肥有什么好处？')"\r
              >\r
                🌱 深施有机肥的好处\r
              </div>\r
              <div\r
                class="suggestion-chip"\r
                @click="handleSuggestionClick('葡萄采收前需要做哪些准备？')"\r
              >\r
                📅 采收前准备清单\r
              </div>\r
            </div>\r
          </div>\r
\r
          <!-- 聊天消息列表 -->\r
          <div id="chat-list" v-show="showChat || propsText" class="chat-list">\r
            <div\r
              v-for="(msg, index) in messages"\r
              :key="index"\r
              class="message-row"\r
              :class="msg.role"\r
            >\r
              <div class="avatar" :class="msg.role"></div>\r
              <div\r
                class="bubble"\r
                :class="{\r
                  'error-bubble': msg.isError,\r
                  cursor: msg.isLoading && msg.role === 'ai',\r
                }"\r
                v-html="msg.text.replace(/\\n/g, '<br>')"\r
              ></div>\r
            </div>\r
          </div>\r
        </main>\r
\r
        <!-- 底部输入区 -->\r
        <!-- 如果有 propsText，则禁用输入框，不提供问答服务 -->\r
        <div\r
          class="input-area-container"\r
          :class="{ 'disabled-mode': !!propsText }"\r
        >\r
          <div class="input-wrapper" v-if="!propsData.propsText">\r
            <textarea\r
              v-model="userInput"\r
              rows="1"\r
              :placeholder="\r
                propsData.propsText ? '当前为直连播报模式' : '输入您的问题...'\r
              "\r
              :disabled="!!propsData.propsText"\r
              @input="autoResizeTextarea"\r
              @keydown="handleKeydown"\r
              ref="textareaRef"\r
            ></textarea>\r
\r
            <button\r
              id="send-btn"\r
              class="send-btn"\r
              @click="toggleSend"\r
              :disabled="!!propsData.propsText"\r
            >\r
              <svg id="icon-send" v-if="!isGenerating" viewBox="0 0 24 24">\r
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />\r
              </svg>\r
              <svg id="icon-stop" v-else viewBox="0 0 24 24">\r
                <path d="M6 6h12v12H6z" />\r
              </svg>\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- 右侧区域：数字人播报 -->\r
    <div class="right-section">\r
      <div class="avatar-wrapper">\r
        <!-- 数字人实际渲染容器 -->\r
        <div class="wrapper" style="width: 100%; height: 100%"></div>\r
        <!-- 如果SDK未加载显示的占位 -->\r
        <div\r
          v-if="!avatarSDKReady && !showVolumePrompt"\r
          class="avatar-placeholder"\r
        >\r
          <p>数字人正在初始化...</p>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</template>\r
\r
<script setup>\r
import { ref, onMounted, onUnmounted, nextTick } from "vue";\r
\r
// --- 接收父组件传递的主题参数 ---\r
\r
const propsData = ref({\r
  theme: "dark",\r
  nameTitle: "AI智能体",\r
  propsText: \`\`, // 修改默认值为空字符串，便于判断是否传入\`,\r
});\r
import { useRoute } from "vue-router";\r
if (window.name) {\r
  let NAME = JSON.parse(window.name);\r
  propsData.value.theme = NAME.theme || "dark";\r
  propsData.value.nameTitle = NAME.nameTitle || "AI智能体";\r
  propsData.value.propsText = NAME.propsText || "";\r
}\r
\r
// const props = defineProps({\r
//   theme: {\r
//     type: String,\r
//     default: "dark",\r
//     validator: (value) => ["light", "dark"].includes(value),\r
//   },\r
//   nameTitle: {\r
//     type: String,\r
//     default: "AI智能体",\r
//   },\r
//   propsText: {\r
//     type: String,\r
//     default: \`\`, // 修改默认值为空字符串，便于判断是否传入\`,\r
//   },\r
// });\r
\r
// 模拟 SDK 引入 (保持原有逻辑)\r
import AvatarPlatform, {\r
  PlayerEvents,\r
  SDKEvents,\r
} from "/public/testSdk/3.1.2.1002/avatar-sdk-web_3.1.2.1002/index.js";\r
\r
// ==================== 新增：音量提示相关变量 ====================\r
const showVolumePrompt = ref(false);\r
const hasInteracted = ref(false);\r
\r
// ==================== 数字人相关代码 ====================\r
const avatarSDKReady = ref(false);\r
const avatarInputText = ref("你好，我是AI数字人助手！");\r
\r
const mockLoadSDK = () => {\r
  console.warn("正在尝试加载 Avatar SDK...");\r
  setTimeout(() => {\r
    console.log("SDK Mock Loaded");\r
    avatarSDKReady.value = true;\r
  }, 500);\r
};\r
let avatarPlatform = null;\r
const initAvatar = () => {\r
  // 防止重复初始化\r
  if (avatarPlatform) return;\r
\r
  avatarPlatform = new AvatarPlatform();\r
\r
  avatarPlatform\r
    .on(SDKEvents.connected, (initResp) =>\r
      console.log("sdk event: connected", initResp)\r
    )\r
    .on(SDKEvents.stream_start, () => console.log("sdk event: stream_start"))\r
    .on(SDKEvents.disconnected, (err) =>\r
      console.error("sdk event: disconnected", err)\r
    )\r
    .on(SDKEvents.error, (error) => console.error("sdk event: error", error));\r
\r
  const player = avatarPlatform.player || avatarPlatform.createPlayer();\r
  player\r
    ?.on(PlayerEvents.play, () => console.log("sdk event: player play"))\r
    .on(PlayerEvents.playing, () => console.log("sdk event: player playing"));\r
\r
  avatarPlatform.setApiInfo({\r
    appId: "e9eef25a",\r
    apiKey: "eba52f7ad3e9955254ab357543a098de",\r
    apiSecret: "N2VlNGJmNGIwMGFhYzc4ZmRiOGNmYzc3",\r
    sceneId: "319683821131927552",\r
    serverUrl: "wss://avatar.cn-huadong-1.xf-yun.com/v1/interact",\r
  });\r
\r
  avatarPlatform.setGlobalParams({\r
    stream: { protocol: "xrtc", alpha: 1 },\r
    avatar: { avatar_id: "111283001" },\r
    tts: { vcn: "x4_yuexiaoni_assist" },\r
  });\r
\r
  avatarPlatform\r
    .start({ wrapper: document.querySelector(".wrapper") })\r
    .then(() => {\r
      console.log("connected && stream play successfully");\r
      avatarSDKReady.value = true;\r
    })\r
    .catch((e) => console.error(e));\r
\r
  mockLoadSDK();\r
};\r
\r
const triggerAvatarSpeak = (text) => {\r
  if (!text) return;\r
  if (avatarPlatform) {\r
    avatarPlatform.writeText(text, {\r
      nlp: false,\r
      tts: { volume: 100 },\r
    });\r
\r
    avatarPlatform.writeCmd("action", "A_RH_Show_rightup_O");\r
  } else {\r
    console.log(\`[数字人模拟播报]: \${text}\`);\r
  }\r
};\r
\r
// ==================== 新增：音量提示处理方法 ====================\r
const handleVolumeConfirm = () => {\r
  showVolumePrompt.value = false;\r
  hasInteracted.value = true;\r
\r
  // 非首次进入，直接初始化数字人\r
\r
  // 检查是否有 propsText，如果有则进入直连播报模式\r
  if (propsData.value.propsText && propsData.value.propsText.trim()) {\r
    console.log("检测到 propsText，进入直连播报模式");\r
    showChat.value = true;\r
\r
    // 直接输出 propsText\r
    appendMessage("ai", propsData.value.propsText);\r
\r
    // 延迟触发播报，等待数字人初始化\r
    const trySpeak = () => {\r
      if (avatarPlatform) {\r
        setTimeout(() => {\r
          triggerAvatarSpeak(propsData.value.propsText);\r
        }, 500);\r
      } else {\r
        setTimeout(trySpeak, 500);\r
      }\r
    };\r
    setTimeout(trySpeak, 500);\r
  }\r
};\r
\r
// ==================== 智能助手聊天相关代码 ====================\r
const userInput = ref("");\r
const textareaRef = ref(null);\r
const isGenerating = ref(false);\r
const showChat = ref(false);\r
const messages = ref([]);\r
let abortController = null;\r
\r
const autoResizeTextarea = (e) => {\r
  const textarea = e.target;\r
  textarea.style.height = "auto";\r
  textarea.style.height = \`\${textarea.scrollHeight}px\`;\r
  if (textarea.value === "") textarea.style.height = "24px";\r
};\r
\r
const handleKeydown = (e) => {\r
  if (e.key === "Enter" && !e.shiftKey) {\r
    e.preventDefault();\r
    toggleSend();\r
  }\r
};\r
\r
const handleSuggestionClick = (text) => {\r
  // 点击建议卡片时自动关闭音量提示\r
  if (showVolumePrompt.value) {\r
    handleVolumeConfirm();\r
  }\r
\r
  userInput.value = text;\r
  autoResizeTextarea({ target: textareaRef.value });\r
  toggleSend();\r
};\r
\r
const toggleSend = async () => {\r
  // 如果处于直连模式，禁止发送\r
  if (propsData.value.propsText) return;\r
\r
  // 点击发送按钮时自动关闭音量提示\r
  if (showVolumePrompt.value) {\r
    handleVolumeConfirm();\r
  }\r
\r
  const text = userInput.value.trim();\r
\r
  if (isGenerating.value) {\r
    if (abortController) {\r
      abortController.abort();\r
    }\r
    isGenerating.value = false;\r
    return;\r
  }\r
\r
  if (!text) return;\r
\r
  appendMessage("user", text);\r
  userInput.value = "";\r
  if (textareaRef.value) textareaRef.value.style.height = "24px";\r
\r
  showChat.value = true;\r
  await nextTick();\r
\r
  const aiMessageIndex = appendMessage("ai", "", false, true);\r
  isGenerating.value = true;\r
\r
  try {\r
    await fetchAIResponse(text, aiMessageIndex);\r
  } catch (error) {\r
    if (error.name === "AbortError") {\r
      messages.value[aiMessageIndex].text += "\\n[已停止生成]";\r
    } else {\r
      console.error("请求错误：", error);\r
      messages.value[aiMessageIndex].isError = true;\r
      messages.value[aiMessageIndex].text = \`请求失败：\${error.message}\`;\r
    }\r
  } finally {\r
    isGenerating.value = false;\r
    messages.value[aiMessageIndex].isLoading = false;\r
  }\r
};\r
\r
const appendMessage = (role, text, isError = false, isLoading = false) => {\r
  messages.value.push({\r
    role,\r
    text,\r
    isError,\r
    isLoading,\r
  });\r
  scrollToBottom();\r
  return messages.value.length - 1;\r
};\r
\r
const scrollToBottom = () => {\r
  nextTick(() => {\r
    const mainScroll = document.getElementById("main-scroll");\r
    if (mainScroll) {\r
      mainScroll.scrollTop = mainScroll.scrollHeight;\r
    }\r
  });\r
};\r
\r
const fetchAIResponse = async (query, messageIndex) => {\r
  abortController = new AbortController();\r
\r
  // 演示用 Mock 流式逻辑\r
  const mockResponse = \`针对您询问的“\${query}”，我为您查询了葡萄种植知识库。\\n\\n1. **病害特征**：该病害主要危害叶片、果实和新梢。\\n2. **防治建议**：建议使用戊唑醇或苯醚甲环唑进行喷雾防治，间隔7-10天喷一次，连续2-3次。\\n3. **农事操作**：及时摘除病叶病果，清除枯枝败叶，减少病源。\`;\r
\r
  let i = 0;\r
  const chunkSpeed = 30;\r
\r
  await new Promise((resolve, reject) => {\r
    const interval = setInterval(() => {\r
      if (abortController.signal.aborted) {\r
        clearInterval(interval);\r
        reject(new DOMException("Aborted", "AbortError"));\r
        return;\r
      }\r
\r
      if (i < mockResponse.length) {\r
        const chunk = mockResponse.slice(i, i + 2);\r
        messages.value[messageIndex].text += chunk;\r
        scrollToBottom();\r
        i += 2;\r
      } else {\r
        clearInterval(interval);\r
        resolve();\r
      }\r
    }, chunkSpeed);\r
  });\r
\r
  const finalAnswer = messages.value[messageIndex].text;\r
  if (finalAnswer && !messages.value[messageIndex].isError) {\r
    console.log("AI回答完成，准备数字人播报...");\r
    triggerAvatarSpeak(finalAnswer);\r
  }\r
};\r
\r
// ==================== 生命周期钩子 ====================\r
onMounted(() => {\r
  // 检查用户是否已经确认过音量提示\r
  const promptShown = false;\r
\r
  if (!promptShown) {\r
    // 首次进入，显示音量提示\r
    showVolumePrompt.value = true;\r
    initAvatar();\r
  } else {\r
  }\r
});\r
\r
onUnmounted(() => {\r
  if (avatarPlatform) {\r
    avatarPlatform.stop();\r
  }\r
  if (abortController) {\r
    abortController.abort();\r
  }\r
});\r
<\/script>\r
\r
<style scoped lang="less">\r
/* ==================== 新增：音量提示弹窗样式 ==================== */\r
.volume-prompt-overlay {\r
  position: fixed;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  background: rgba(0, 0, 0, 0.6);\r
  backdrop-filter: blur(5px);\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  z-index: 1000;\r
  animation: fadeIn 0.3s ease;\r
}\r
\r
.volume-prompt-card {\r
  background: var(--glass-bg);\r
  border-radius: 24px;\r
  padding: 40px 32px;\r
  width: 90%;\r
  max-width: 420px;\r
  text-align: center;\r
  box-shadow: var(--shadow-card);\r
  border: 1px solid var(--glass-border);\r
  backdrop-filter: blur(15px);\r
  animation: slideUp 0.4s ease;\r
}\r
\r
.volume-icon {\r
  width: 80px;\r
  height: 80px;\r
  margin: 0 auto 24px;\r
  background: linear-gradient(\r
    135deg,\r
    var(--primary-color),\r
    var(--primary-light)\r
  );\r
  border-radius: 50%;\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  color: white;\r
  box-shadow: 0 8px 24px rgba(106, 27, 154, 0.3);\r
\r
  svg {\r
    width: 40px;\r
    height: 40px;\r
  }\r
}\r
\r
.volume-title {\r
  font-size: 22px;\r
  font-weight: 700;\r
  color: var(--text-main);\r
  margin-bottom: 12px;\r
}\r
\r
.volume-desc {\r
  font-size: 15px;\r
  color: var(--text-sub);\r
  line-height: 1.6;\r
  margin-bottom: 32px;\r
}\r
\r
.volume-confirm-btn {\r
  width: 100%;\r
  padding: 14px 24px;\r
  background: linear-gradient(\r
    135deg,\r
    var(--primary-color),\r
    var(--primary-light)\r
  );\r
  color: white;\r
  border: none;\r
  border-radius: 12px;\r
  font-size: 16px;\r
  font-weight: 600;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
  box-shadow: 0 4px 12px rgba(106, 27, 154, 0.2);\r
\r
  &:hover {\r
    transform: translateY(-2px);\r
    box-shadow: 0 6px 16px rgba(106, 27, 154, 0.3);\r
  }\r
\r
  &:active {\r
    transform: translateY(0);\r
  }\r
}\r
\r
/* ==================== CSS 变量定义 (核心换肤逻辑) ==================== */\r
\r
/* 默认亮色变量 */\r
.app-layout.light {\r
  --primary-color: #6a1b9a;\r
  --primary-light: #9c4dcc;\r
  --primary-dark: #38006b;\r
\r
  --bg-gradient: linear-gradient(135deg, #2e004f 0%, #5e1b86 100%);\r
  --bg-decoration-1: #9c4dcc;\r
  --bg-decoration-2: #d500f9;\r
\r
  --glass-bg: rgba(255, 255, 255, 0.95);\r
  --glass-border: rgba(255, 255, 255, 0.3);\r
  --header-bg: rgba(255, 255, 255, 0.6);\r
  --header-border: rgba(0, 0, 0, 0.05);\r
\r
  --chat-bg-user: linear-gradient(\r
    135deg,\r
    var(--primary-color),\r
    var(--primary-light)\r
  );\r
  --chat-text-user: #ffffff;\r
\r
  --chat-bg-ai: #f3f0f7;\r
  --chat-text-ai: #333333;\r
\r
  --text-main: #333;\r
  --text-sub: #666;\r
  --text-placeholder: #999;\r
\r
  --bg-chat-main: #fafafa;\r
\r
  --input-bg: #ffffff;\r
  --input-border: rgba(0, 0, 0, 0.05);\r
  --input-text: #333;\r
\r
  --suggestion-bg: #ffffff;\r
  --suggestion-border: rgba(0, 0, 0, 0.08);\r
  --suggestion-text: var(--primary-dark);\r
  --suggestion-hover-shadow: rgba(106, 27, 154, 0.15);\r
\r
  --shadow-soft: 0 10px 40px rgba(0, 0, 0, 0.2);\r
  --shadow-card: 0 20px 60px rgba(0, 0, 0, 0.3);\r
  --shadow-input: 0 8px 30px rgba(0, 0, 0, 0.1);\r
\r
  --scrollbar-thumb: rgba(0, 0, 0, 0.1);\r
}\r
\r
/* 黑色系变量 */\r
.app-layout.dark {\r
  --primary-color: #bb86fc;\r
  --primary-light: #cf94e6;\r
  --primary-dark: #9955e8;\r
\r
  /* 深邃背景 */\r
  --bg-gradient: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);\r
  --bg-decoration-1: #4a148c;\r
  --bg-decoration-2: #7b1fa2;\r
\r
  /* 深色玻璃拟态 */\r
  --glass-bg: rgba(30, 30, 40, 0.85);\r
  --glass-border: rgba(255, 255, 255, 0.1);\r
  --header-bg: rgba(30, 30, 40, 0.6);\r
  --header-border: rgba(255, 255, 255, 0.08);\r
\r
  /* 聊天气泡 */\r
  --chat-bg-user: linear-gradient(135deg, #6200ea, #b388ff);\r
  --chat-text-user: #ffffff;\r
\r
  --chat-bg-ai: #33334d; /* 深紫色偏灰 */\r
  --chat-text-ai: #e0e0e0;\r
\r
  /* 文字颜色 */\r
  --text-main: #ffffff;\r
  --text-sub: #b0b0b0;\r
  --text-placeholder: #666;\r
\r
  /* 背景色 */\r
  --bg-chat-main: #1a1a2e;\r
\r
  /* 输入框 */\r
  --input-bg: #2d2d3a;\r
  --input-border: rgba(255, 255, 255, 0.1);\r
  --input-text: #fff;\r
\r
  /* 建议卡片 */\r
  --suggestion-bg: #2c2c35;\r
  --suggestion-border: rgba(255, 255, 255, 0.1);\r
  --suggestion-text: #e0e0e0;\r
  --suggestion-hover-shadow: rgba(187, 134, 252, 0.2);\r
\r
  /* 阴影 */\r
  --shadow-soft: 0 10px 40px rgba(0, 0, 0, 0.5);\r
  --shadow-card: 0 20px 60px rgba(0, 0, 0, 0.6);\r
  --shadow-input: 0 8px 30px rgba(0, 0, 0, 0.4);\r
\r
  --scrollbar-thumb: rgba(255, 255, 255, 0.2);\r
}\r
\r
/* ==================== 基础样式 ==================== */\r
* {\r
  box-sizing: border-box;\r
  margin: 0;\r
  padding: 0;\r
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,\r
    Arial, sans-serif;\r
}\r
\r
.app-layout {\r
  display: flex;\r
  width: 100%;\r
  height: 100%;\r
  justify-content: end;\r
  background: rgba(0, 0, 0, 0.6);\r
}\r
\r
/* ==================== 左侧区域 ==================== */\r
.left-section {\r
  width: 70%;\r
  height: 100%;\r
  background: transparent;\r
  position: relative;\r
  display: flex;\r
  justify-content: flex-end;\r
  align-items: center;\r
  padding: 20px;\r
  overflow: hidden;\r
}\r
\r
.bg-decoration {\r
  position: absolute;\r
  border-radius: 50%;\r
  filter: blur(80px);\r
  z-index: 0;\r
  opacity: 0.4;\r
}\r
.bg-dec-1 {\r
  width: 400px;\r
  height: 400px;\r
  background: var(--bg-decoration-1);\r
  top: -100px;\r
  left: -100px;\r
}\r
.bg-dec-2 {\r
  width: 300px;\r
  height: 300px;\r
  background: var(--bg-decoration-2);\r
  bottom: -50px;\r
  right: 20%;\r
}\r
\r
.chat-bubble-card {\r
  position: relative;\r
  z-index: 10;\r
  width: 60%;\r
  max-width: 900px;\r
  height: 90%;\r
  max-height: 800px;\r
  background: var(--glass-bg);\r
  border-radius: 32px;\r
  box-shadow: var(--shadow-card);\r
  display: flex;\r
  flex-direction: column;\r
  overflow: hidden;\r
  border: 1px solid var(--glass-border);\r
  backdrop-filter: blur(10px);\r
  transition: background 0.3s ease, border-color 0.3s ease;\r
}\r
\r
/* 顶部导航 */\r
.chat-header {\r
  padding: 16px 24px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  border-bottom: 1px solid var(--header-border);\r
  background: var(--header-bg);\r
  flex-shrink: 0;\r
  transition: background 0.3s ease;\r
}\r
\r
.header-title {\r
  font-size: 18px;\r
  font-weight: 700;\r
  color: var(--primary-dark);\r
\r
  .app-layout.dark & {\r
    color: var(--primary-light);\r
  }\r
\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
}\r
\r
.header-status {\r
  font-size: 12px;\r
  color: #4caf50;\r
  display: flex;\r
  align-items: center;\r
  gap: 4px;\r
}\r
.status-dot {\r
  width: 8px;\r
  height: 8px;\r
  background-color: #4caf50;\r
  border-radius: 50%;\r
  animation: pulse 2s infinite;\r
}\r
\r
/* 主内容区域 */\r
.chat-main {\r
  flex: 1;\r
  overflow-y: auto;\r
  padding: 24px;\r
  padding-bottom: 100px;\r
  scroll-behavior: smooth;\r
  background-color: var(--bg-chat-main);\r
  transition: background-color 0.3s ease;\r
}\r
\r
.chat-main::-webkit-scrollbar {\r
  width: 6px;\r
}\r
.chat-main::-webkit-scrollbar-thumb {\r
  background-color: var(--scrollbar-thumb);\r
  border-radius: 3px;\r
}\r
\r
/* 欢迎界面 */\r
.welcome-screen {\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  height: 100%;\r
  text-align: center;\r
  animation: fadeIn 0.6s ease;\r
}\r
\r
.welcome-avatar {\r
  width: 100px;\r
  height: 100px;\r
  background: linear-gradient(135deg, #e1bee7, #ab47bc);\r
  border-radius: 50%;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  margin-bottom: 24px;\r
  box-shadow: 0 8px 20px rgba(106, 27, 154, 0.3);\r
}\r
.welcome-avatar svg {\r
  width: 60px;\r
  height: 60px;\r
  fill: white;\r
}\r
\r
.intro-title {\r
  font-size: 26px;\r
  font-weight: 800;\r
  color: var(--text-main);\r
  margin-bottom: 8px;\r
}\r
.intro-desc {\r
  font-size: 15px;\r
  color: var(--text-sub);\r
  margin-bottom: 40px;\r
  max-width: 60%;\r
  line-height: 1.6;\r
}\r
\r
/* 建议卡片网格 */\r
.suggestions {\r
  display: grid;\r
  grid-template-columns: repeat(2, 1fr);\r
  gap: 16px;\r
  width: 100%;\r
  max-width: 500px;\r
}\r
\r
.suggestion-chip {\r
  background: var(--suggestion-bg);\r
  border: 1px solid var(--suggestion-border);\r
  color: var(--suggestion-text);\r
  padding: 16px;\r
  border-radius: 16px;\r
  font-size: 14px;\r
  cursor: pointer;\r
  transition: all 0.2s ease;\r
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);\r
  font-weight: 500;\r
}\r
\r
.suggestion-chip:hover {\r
  transform: translateY(-2px);\r
  box-shadow: 0 6px 16px var(--suggestion-hover-shadow);\r
  border-color: var(--primary-light);\r
}\r
\r
/* 聊天消息列表 */\r
.chat-list {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 20px;\r
}\r
\r
.message-row {\r
  display: flex;\r
  align-items: flex-end;\r
  gap: 12px;\r
  opacity: 0;\r
  animation: slideUp 0.4s forwards;\r
}\r
\r
.message-row.user {\r
  flex-direction: row-reverse;\r
}\r
\r
.avatar {\r
  width: 40px;\r
  height: 40px;\r
  border-radius: 50%;\r
  flex-shrink: 0;\r
  background-size: cover;\r
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\r
  border: 2px solid transparent;\r
}\r
\r
.app-layout.light .avatar.ai {\r
  border-color: white;\r
}\r
.app-layout.dark .avatar.ai {\r
  border-color: #444;\r
}\r
\r
.bubble {\r
  max-width: 75%;\r
  padding: 14px 18px;\r
  border-radius: 20px;\r
  font-size: 15px;\r
  line-height: 1.6;\r
  position: relative;\r
  word-wrap: break-word;\r
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);\r
}\r
\r
.message-row.ai .bubble {\r
  background-color: var(--chat-bg-ai);\r
  color: var(--chat-text-ai);\r
  border-bottom-left-radius: 4px;\r
}\r
\r
.message-row.user .bubble {\r
  background: var(--chat-bg-user);\r
  color: var(--chat-text-user);\r
  border-bottom-right-radius: 4px;\r
}\r
\r
.cursor::after {\r
  content: "▋";\r
  display: inline-block;\r
  vertical-align: text-bottom;\r
  animation: blink 1s step-start infinite;\r
  color: var(--primary-color);\r
  font-size: 0.9em;\r
  margin-left: 4px;\r
}\r
\r
/* 底部输入区 */\r
.input-area-container {\r
  position: absolute;\r
  bottom: 24px;\r
  left: 50%;\r
  transform: translateX(-50%);\r
  width: calc(100% - 48px);\r
  z-index: 20;\r
\r
  // 直连模式下的输入框容器样式调整\r
  &.disabled-mode {\r
    opacity: 0.6;\r
    pointer-events: none; // 禁止点击\r
  }\r
}\r
\r
.input-wrapper {\r
  background: var(--input-bg);\r
  border-radius: 50px;\r
  padding: 8px 8px 8px 20px;\r
  display: flex;\r
  align-items: flex-end;\r
  gap: 10px;\r
  box-shadow: var(--shadow-input);\r
  border: 1px solid var(--input-border);\r
  transition: box-shadow 0.2s, background-color 0.3s;\r
}\r
\r
.input-wrapper:focus-within {\r
  box-shadow: 0 8px 30px rgba(106, 27, 154, 0.25);\r
  border-color: var(--primary-light);\r
}\r
\r
textarea {\r
  flex: 1;\r
  border: none;\r
  outline: none;\r
  background: transparent;\r
  font-size: 15px;\r
  resize: none;\r
  max-height: 120px;\r
  min-height: 45px;\r
  padding: 10px 0;\r
  line-height: 1.5;\r
  color: var(--input-text);\r
}\r
\r
textarea::placeholder {\r
  color: var(--text-placeholder);\r
}\r
\r
textarea:disabled {\r
  cursor: not-allowed;\r
}\r
\r
.send-btn {\r
  width: 42px;\r
  height: 42px;\r
  border-radius: 50%;\r
  background: var(--primary-color);\r
  border: none;\r
  color: white;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  cursor: pointer;\r
  transition: all 0.2s;\r
  flex-shrink: 0;\r
  margin-bottom: 2px;\r
}\r
\r
.send-btn:hover:not(:disabled) {\r
  background: var(--primary-light);\r
  transform: scale(1.05);\r
}\r
\r
.send-btn:active:not(:disabled) {\r
  transform: scale(0.95);\r
}\r
\r
.send-btn:disabled {\r
  opacity: 0.7;\r
  cursor: not-allowed;\r
  filter: grayscale(0.5);\r
}\r
\r
.send-btn svg {\r
  width: 18px;\r
  height: 18px;\r
  fill: currentColor;\r
}\r
\r
.error-bubble {\r
  background: #ffebee !important;\r
  color: #c62828 !important;\r
}\r
\r
/* ==================== 右侧区域 ==================== */\r
.right-section {\r
  width: 30%;\r
  height: 100%;\r
  background-color: transparent;\r
  display: flex;\r
  flex-direction: column;\r
}\r
\r
.avatar-wrapper {\r
  flex: 1;\r
  width: 100%;\r
  background-color: transparent;\r
  position: relative;\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  overflow: hidden;\r
}\r
\r
.wrapper {\r
  width: 100%;\r
  height: 100%;\r
}\r
\r
.avatar-placeholder {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  width: 100%;\r
  height: 100%;\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  color: var(--text-sub);\r
  font-size: 14px;\r
  background: transparent !important;\r
}\r
\r
/* ==================== 动画 ==================== */\r
@keyframes fadeIn {\r
  from {\r
    opacity: 0;\r
  }\r
  to {\r
    opacity: 1;\r
  }\r
}\r
@keyframes slideUp {\r
  from {\r
    opacity: 0;\r
    transform: translateY(20px);\r
  }\r
  to {\r
    opacity: 1;\r
    transform: translateY(0);\r
  }\r
}\r
@keyframes blink {\r
  50% {\r
    opacity: 0;\r
  }\r
}\r
@keyframes pulse {\r
  0% {\r
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);\r
  }\r
  70% {\r
    box-shadow: 0 0 0 6px rgba(76, 175, 80, 0);\r
  }\r
  100% {\r
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);\r
  }\r
}\r
</style>`;export{r as default};
