<template>
  <div class="editor-container">
    <div class="editor-wrapper">
      <div ref="editorElement" class="editor"></div>
    </div>
    <div class="preview-wrapper">
      <div class="preview-header">实时预览</div>
      <div class="preview-area">
        <div v-if="error" class="error">{{ error }}</div>
        <div v-else ref="previewElement"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as monaco from "monaco-editor";
import { ref, onMounted, watch, onBeforeUnmount } from "vue";

export default {
  setup() {
    const editorElement = ref(null);
    const previewElement = ref(null);
    const editor = ref(null);
    const error = ref("");
    let previewInstance = null;

    // 默认模板代码
    const defaultCode = `<template>
  <div class="demo-container">
    <h1>{{ message }}</h1>
    <p>当前计数: {{ count }}</p>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
    
    <div v-if="showExtra" class="extra">
      <input v-model="inputText" placeholder="输入一些内容..." />
      <p>输入内容: {{ inputText }}</p>
    </div>
    
    <button @click="toggleExtra">
      {{ showExtra ? '隐藏' : '显示' }}额外内容
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('Vue3 在线编辑器');
const count = ref(0);
const showExtra = ref(false);
const inputText = ref('');

const increment = () => count.value++;
const decrement = () => count.value--;
const toggleExtra = () => showExtra.value = !showExtra.value;
<\/script>

<style>
.demo-container {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.extra {
  margin-top: 20px;
  padding: 15px;
  background-color: #e9ecef;
  border-radius: 4px;
}
button {
  margin: 5px;
  padding: 8px 16px;
  cursor: pointer;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #359a6b;
}
input {
  padding: 8px;
  margin: 10px 0;
  width: 80%;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>`;

    // 初始化编辑器
    onMounted(() => {
      initEditor();
      compileCode();
    });

    // 初始化Monaco编辑器
    const initEditor = () => {
      editor.value = monaco.editor.create(editorElement.value, {
        value: defaultCode,
        language: "html",
        theme: "vs-dark",
        automaticLayout: true,
        minimap: { enabled: false },
      });

      // 监听代码变化
      editor.value.onDidChangeModelContent(debounce(compileCode, 500));
    };

    // 编译并执行Vue代码
    const compileCode = () => {
      try {
        const code = editor.value.getValue();
        clearError();

        // 清理之前的预览
        if (previewInstance) {
          previewInstance.unmount();
          previewElement.value.innerHTML = "";
        }

        // 编译模板
        const compiled = Vue.compile(`
          <div id="preview-target">
            ${extractTemplate(code)}
          </div>
        `);

        // 创建新的应用实例
        const app = Vue.createApp({
          ...extractScript(code),
          ...compiled,
          // 添加模板中的CSS样式
          mounted() {
            this.addStyles(code);
          },
          methods: {
            addStyles(css) {
              const styles = extractCSS(css);
              if (styles) {
                const style = document.createElement("style");
                style.textContent = styles;
                this.$el.appendChild(style);
              }
            },
          },
        });

        // 挂载应用到预览区域
        previewInstance = app.mount("#preview-target");
      } catch (e) {
        error.value = `编译错误: ${e.message}`;
        console.error("Vue编译错误:", e);
      }
    };

    // 从代码中提取template部分
    const extractTemplate = (code) => {
      const templateMatch = code.match(/<template>([\s\S]*)<\/template>/);
      return templateMatch ? templateMatch[1].trim() : "<div>模板未找到</div>";
    };

    // 从代码中提取script部分
    const extractScript = (code) => {
      const scriptMatch = code.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/);
      if (!scriptMatch) return {};

      // 通过Function执行获取组件选项
      return new Function(`
        const exports = {};
        ${scriptMatch[1]}
        return exports.default || exports;
      `)();
    };

    // 从代码中提取CSS
    const extractCSS = (code) => {
      const cssMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/);
      return cssMatch ? cssMatch[1] : "";
    };

    // 清除错误信息
    const clearError = () => (error.value = "");

    // 防抖函数
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    // 清理工作
    onBeforeUnmount(() => {
      if (editor.value) editor.value.dispose();
      if (previewInstance) previewInstance.unmount();
    });

    return { editorElement, previewElement, error };
  },
};
</script>

<style scoped>
.editor-container {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.editor-wrapper {
  flex: 1;
  height: 100%;
}

.editor {
  height: 100%;
}

.preview-wrapper {
  flex: 1;
  height: 100%;
  border-left: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}

.preview-header {
  padding: 10px;
  background-color: #2c3e50;
  color: white;
  font-weight: bold;
  text-align: center;
}

.preview-area {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.error {
  color: #ff5555;
  background-color: #fff0f0;
  padding: 15px;
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
  margin: 20px;
}
</style>