<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :close-on-click-modal="false"
  >
    <div class="json-viewer">
      <div class="json-toolbar">
        <el-button size="small" type="primary" @click="copyJson">
          <el-icon><CopyDocument /></el-icon>
          复制数据
        </el-button>
      </div>
      <div class="json-content">
        <vue-json-pretty
          :data="jsonData"
          :deep="deep"
          :show-double-quotes="true"
          :show-length="true"
          :collapsed-on-click-brackets="true"
          :show-icon="true"
          :show-line="true"
          :collapsed-strings-length="20"
          :theme="'dark'"
          ref="jsonViewer"
        />
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import { CopyDocument } from "@element-plus/icons-vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

interface Props {
  modelValue: boolean;
  data: any;
  title?: string;
  width?: string | number;
  deep?: number;
}

const props = withDefaults(defineProps<Props>(), {
  title: "数据查看",
  width: "800px",
  deep: 2,
});

const emit = defineEmits(["update:modelValue"]);

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const jsonViewer = ref();
const jsonData = computed(() => props.data);

// 复制 JSON 数据
async function copyJson() {
  const jsonString = JSON.stringify(jsonData.value, null, 2);
  try {
    await navigator.clipboard.writeText(jsonString);
    ElMessage.success("数据已复制到剪贴板");
  } catch (error) {
    console.error("复制失败:", error);
    // 降级处理：使用传统复制方法
    const textarea = document.createElement("textarea");
    textarea.value = jsonString;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      ElMessage.success("数据已复制到剪贴板");
    } catch (err) {
      ElMessage.error("复制失败，请手动复制");
    }
    document.body.removeChild(textarea);
  }
}
</script>

<style lang="less" scoped>
.json-viewer {
  background: #1e1e1e;
  border-radius: 8px;
  height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;

  .json-toolbar {
    position: sticky;
    top: 0;
    z-index: 10;
    background: #1e1e1e;
    padding: 16px;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #333;
  }

  .json-content {
    flex: 1;
    overflow: auto;
    padding: 0 16px 16px;
  }
}

:deep(.vjs-tree) {
  font-family: "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro",
    monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #d4d4d4;
  background: transparent;
}

:deep(.vjs-tree-node) {
  padding: 2px 0;
}

:deep(.vjs-value) {
  &.vjs-value-string {
    color: #ce9178;
  }

  &.vjs-value-number {
    color: #b5cea8;
  }

  &.vjs-value-boolean {
    color: #569cd6;
  }

  &.vjs-value-null {
    color: #569cd6;
  }
}

:deep(.vjs-key) {
  color: #9cdcfe;
}

:deep(.vjs-bracket) {
  color: #d4d4d4;
}

:deep(.vjs-comma) {
  color: #d4d4d4;
}

:deep(.vjs-toggle) {
  color: #666;
  transition: color 0.2s;

  &:hover {
    color: #9cdcfe;
  }
}

:deep(.vjs-line-number) {
  color: #858585;
  margin-right: 8px;
}

:deep(.el-dialog__body) {
  padding: 20px;
}
</style> 