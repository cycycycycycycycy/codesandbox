import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import cesium from 'vite-plugin-cesium'
// https://vitejs.dev/config/
export default defineConfig({
  // 强制预构建插件包
  optimizeDeps: {
    include: [
      `monaco-editor/esm/vs/language/json/json.worker`,
      `monaco-editor/esm/vs/language/css/css.worker`,
      `monaco-editor/esm/vs/language/html/html.worker`,
      `monaco-editor/esm/vs/language/typescript/ts.worker`,
      `monaco-editor/esm/vs/editor/editor.worker`
    ],
  },

  resolve: {
    alias: {
      "@antv/g6": path.resolve("./node_modules/@antv/g6/dist/g6.js"),
    },
  },
  base: "./",
  transpileDependencies: true,
  plugins: [vue(), viteCommonjs(),
  cesium()],
  optimizeDeps: {
    exclude: ['cesium']
  },
  define: {
    'process.env': JSON.stringify({
      NODE_ENV: process.env.NODE_ENV,
      // 只添加你明确需要的前端环境变量，不要多写
      // VITE_API_BASE_URL: process.env.VITE_API_BASE_URL
    })
  },
  resolve: {
    // Vite路径别名配置
    alias: {
      "@": path.resolve("./src")
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
  },
  // 配置前端服务地址和端口
  server: {
    host: "0.0.0.0",
    port: 8888,
    // 是否开启 https
    https: false,
    // 设置反向代理，跨域
    proxy: {
      "/v1/api": {

        target: "http://36.105.164.5:27893/",

        changeOrigin: true,
        rewrite: path => path.replace(/^\/v1/, "")
      },
      "/v1": {
        // 后台地址
        // target: "http://114.242.25.97:20047/api",
        target: 'http://192.168.1.129:7890/crop-info-platform',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/v1/, "")
      },

      "/zhjcApi": {

        target: "http://192.168.1.150:28088",
        changeOrigin: true,
        rewrite: path => path.replace("/zhjcApi", "")
      },
    }
  }
});
