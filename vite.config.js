import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: "vite",
  transpileDependencies: true,
  plugins: [vue()],
  define: {
    "process.env": process.env
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
      "/v1": {
        // 后台地址
        target: "http://114.242.25.97:20047/api",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/v1/, "")
      }
    }
  }
});
