<template>
  <div ref="codeEditBox" class="codeEditBox"></div>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import * as monaco from "monaco-editor";

export default defineComponent({
  name: "monacoEditor",
  props: {
    // 绑定的值
    modelValue: {
      type: String,
      default: null,
    },
    // 编辑器宽度
    width: {
      type: [String, Number],
      default: "100%",
    },
    // 编辑器高度
    height: {
      type: [String, Number],
      default: "100%",
    },
    // 编辑器语言
    language: {
      type: String,
      default: "javascript",
    },
    // 编辑器主题
    theme: {
      type: String,
      validator(value) {
        return ["vs", "hc-black", "vs-dark"].includes(value);
      },
      default: "vs-dark",
    },
    //
    options: {
      type: Object,
      default: function () {
        return {
          automaticLayout: true, // 自适应布局
          foldingStrategy: "indentation", // 代码折叠 auto|indentation
          renderLineHighlight: "all", // 当前行高亮
          selectOnLineNumbers: true, // 显示行号
          minimap: {
            enabled: true, // 是否显示小地图
          },
          readOnly: true, // 是否只读
          fontSize: 14, // 字体大小
          scrollBeyondLastLine: false, // 取消代码后面一大段空白
          overviewRulerBorder: false, // 去除滚动条边框
        };
      },
    },
  },
  emits: ["update:modelValue", "change", "editor-mounted"],
  setup(props, { emit }) {
    self.MonacoEnvironment = {
      getWorker(_, label) {
        if (label === "json") {
          return new jsonWorker();
        }
        if (["css", "scss", "less"].includes(label)) {
          return new cssWorker();
        }
        if (["html", "handlebars", "razor"].includes(label)) {
          return new htmlWorker();
        }
        if (["typescript", "javascript"].includes(label)) {
          return new tsWorker();
        }
        return new EditorWorker();
      },
    };
    let editor;
    const codeEditBox = ref();

    const init = () => {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false,
      });
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
      });

      editor = monaco.editor.create(codeEditBox.value, {
        value: props.modelValue,
        language: props.language,
        theme: props.theme,
        ...props.options,
      });

      // 监听值的变化
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue(); //给父组件实时返回最新文本
        emit("update:modelValue", value);
        emit("change", value);
      });

      emit("editor-mounted", editor);
      monaco.editor.defineTheme("myTheme", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          // "editor.foreground": "#fff",
          "editor.background": "#21252f",
          // "editorCursor.foreground": "#fff",
          // "editor.lineHighlightBackground": "#21252f",
          // "editorLineNumber.foreground": "#fff",
          // "editor.selectionBackground": "#21252f",
          // "editor.inactiveSelectionBackground": "#21252f",
        },
      });
      monaco.editor.setTheme("myTheme");
    };
    watch(
      () => props.modelValue,
      (newValue) => {
        if (editor) {
          const value = editor.getValue();
          if (newValue !== value) {
            editor.setValue(newValue);
          }
        }
      }
    );

    watch(
      () => props.options,
      (newValue) => {
        editor.updateOptions(newValue);
      },
      { deep: true }
    );

    watch(
      () => props.language,
      (newValue) => {
        monaco.editor.setModelLanguage(editor.getModel(), newValue);
      }
    );

    onBeforeUnmount(() => {
      editor.dispose();
    });

    onMounted(() => {
      init();
    });

    return { codeEditBox };
  },
});
</script>

<style lang="less" scoped>
.codeEditBox {
  width: v-bind(width);
  height: v-bind(height);
}
</style>

