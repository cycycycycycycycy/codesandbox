// vite.config.js
import { defineConfig } from "file:///D:/%E4%B8%AA%E4%BA%BA%E8%B5%84%E6%96%99/codesandbox/node_modules/.pnpm/vite@4.5.14_@types+node@26.1.0_less@4.6.7_terser@5.48.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/%E4%B8%AA%E4%BA%BA%E8%B5%84%E6%96%99/codesandbox/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vi_fb5e00f5ebfe6901e974bc94b80ecd0e/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { viteCommonjs } from "file:///D:/%E4%B8%AA%E4%BA%BA%E8%B5%84%E6%96%99/codesandbox/node_modules/.pnpm/@originjs+vite-plugin-commonjs@1.0.3/node_modules/@originjs/vite-plugin-commonjs/lib/index.js";
import cesium from "file:///D:/%E4%B8%AA%E4%BA%BA%E8%B5%84%E6%96%99/codesandbox/node_modules/.pnpm/vite-plugin-cesium@1.2.23_c_3f62bbd8bcfcc0e1e9081a0204d9ae5a/node_modules/vite-plugin-cesium/dist/index.mjs";
var vite_config_default = defineConfig({
  // 强制预构建插件包
  optimizeDeps: {
    include: [
      `monaco-editor/esm/vs/language/json/json.worker`,
      `monaco-editor/esm/vs/language/css/css.worker`,
      `monaco-editor/esm/vs/language/html/html.worker`,
      `monaco-editor/esm/vs/language/typescript/ts.worker`,
      `monaco-editor/esm/vs/editor/editor.worker`
    ]
  },
  resolve: {
    alias: {
      "@antv/g6": path.resolve("./node_modules/@antv/g6/dist/g6.js")
    }
  },
  base: "./",
  transpileDependencies: true,
  plugins: [
    vue(),
    viteCommonjs(),
    cesium()
  ],
  optimizeDeps: {
    exclude: ["cesium"]
  },
  define: {
    "process.env": JSON.stringify({
      NODE_ENV: process.env.NODE_ENV
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
        rewrite: (path2) => path2.replace(/^\/v1/, "")
      },
      "/v1": {
        // 后台地址
        // target: "http://114.242.25.97:20047/api",
        target: "http://192.168.1.129:7890/crop-info-platform",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/v1/, "")
      },
      "/zhjcApi": {
        target: "http://192.168.1.150:28088",
        changeOrigin: true,
        rewrite: (path2) => path2.replace("/zhjcApi", "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTRFMkFcdTRFQkFcdThENDRcdTY1OTlcXFxcY29kZXNhbmRib3hcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFx1NEUyQVx1NEVCQVx1OEQ0NFx1NjU5OVxcXFxjb2Rlc2FuZGJveFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovJUU0JUI4JUFBJUU0JUJBJUJBJUU4JUI1JTg0JUU2JTk2JTk5L2NvZGVzYW5kYm94L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IHZpdGVDb21tb25qcyB9IGZyb20gJ0BvcmlnaW5qcy92aXRlLXBsdWdpbi1jb21tb25qcydcclxuaW1wb3J0IGNlc2l1bSBmcm9tICd2aXRlLXBsdWdpbi1jZXNpdW0nXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgLy8gXHU1RjNBXHU1MjM2XHU5ODg0XHU2Nzg0XHU1RUZBXHU2M0QyXHU0RUY2XHU1MzA1XHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbXHJcbiAgICAgIGBtb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS9qc29uL2pzb24ud29ya2VyYCxcclxuICAgICAgYG1vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2Nzcy9jc3Mud29ya2VyYCxcclxuICAgICAgYG1vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2h0bWwvaHRtbC53b3JrZXJgLFxyXG4gICAgICBgbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvdHlwZXNjcmlwdC90cy53b3JrZXJgLFxyXG4gICAgICBgbW9uYWNvLWVkaXRvci9lc20vdnMvZWRpdG9yL2VkaXRvci53b3JrZXJgXHJcbiAgICBdLFxyXG4gIH0sXHJcblxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQGFudHYvZzZcIjogcGF0aC5yZXNvbHZlKFwiLi9ub2RlX21vZHVsZXMvQGFudHYvZzYvZGlzdC9nNi5qc1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBiYXNlOiBcIi4vXCIsXHJcbiAgdHJhbnNwaWxlRGVwZW5kZW5jaWVzOiB0cnVlLFxyXG4gIHBsdWdpbnM6IFt2dWUoKSwgdml0ZUNvbW1vbmpzKCksXHJcbiAgY2VzaXVtKCldLFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgZXhjbHVkZTogWydjZXNpdW0nXVxyXG4gIH0sXHJcbiAgZGVmaW5lOiB7XHJcbiAgICAncHJvY2Vzcy5lbnYnOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIE5PREVfRU5WOiBwcm9jZXNzLmVudi5OT0RFX0VOVixcclxuICAgICAgLy8gXHU1M0VBXHU2REZCXHU1MkEwXHU0RjYwXHU2NjBFXHU3ODZFXHU5NzAwXHU4OTgxXHU3Njg0XHU1MjREXHU3QUVGXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHVGRjBDXHU0RTBEXHU4OTgxXHU1OTFBXHU1MTk5XHJcbiAgICAgIC8vIFZJVEVfQVBJX0JBU0VfVVJMOiBwcm9jZXNzLmVudi5WSVRFX0FQSV9CQVNFX1VSTFxyXG4gICAgfSlcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIC8vIFZpdGVcdThERUZcdTVGODRcdTUyMkJcdTU0MERcdTkxNERcdTdGNkVcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoXCIuL3NyY1wiKVxyXG4gICAgfSxcclxuICAgIGV4dGVuc2lvbnM6IFtcIi5tanNcIiwgXCIuanNcIiwgXCIudHNcIiwgXCIuanN4XCIsIFwiLnRzeFwiLCBcIi5qc29uXCIsIFwiLnZ1ZVwiXVxyXG4gIH0sXHJcbiAgLy8gXHU5MTREXHU3RjZFXHU1MjREXHU3QUVGXHU2NzBEXHU1MkExXHU1NzMwXHU1NzQwXHU1NDhDXHU3QUVGXHU1M0UzXHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcclxuICAgIHBvcnQ6IDg4ODgsXHJcbiAgICAvLyBcdTY2MkZcdTU0MjZcdTVGMDBcdTU0MkYgaHR0cHNcclxuICAgIGh0dHBzOiBmYWxzZSxcclxuICAgIC8vIFx1OEJCRVx1N0Y2RVx1NTNDRFx1NTQxMVx1NEVFM1x1NzQwNlx1RkYwQ1x1OERFOFx1NTdERlxyXG4gICAgcHJveHk6IHtcclxuICAgICAgXCIvdjEvYXBpXCI6IHtcclxuXHJcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly8zNi4xMDUuMTY0LjU6Mjc4OTMvXCIsXHJcblxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgvXlxcL3YxLywgXCJcIilcclxuICAgICAgfSxcclxuICAgICAgXCIvdjFcIjoge1xyXG4gICAgICAgIC8vIFx1NTQwRVx1NTNGMFx1NTczMFx1NTc0MFxyXG4gICAgICAgIC8vIHRhcmdldDogXCJodHRwOi8vMTE0LjI0Mi4yNS45NzoyMDA0Ny9hcGlcIixcclxuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTkyLjE2OC4xLjEyOTo3ODkwL2Nyb3AtaW5mby1wbGF0Zm9ybScsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9eXFwvdjEvLCBcIlwiKVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgXCIvemhqY0FwaVwiOiB7XHJcblxyXG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vMTkyLjE2OC4xLjE1MDoyODA4OFwiLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZShcIi96aGpjQXBpXCIsIFwiXCIpXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUixTQUFTLG9CQUFvQjtBQUM5UyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sWUFBWTtBQUVuQixJQUFPLHNCQUFRLGFBQWE7QUFBQTtBQUFBLEVBRTFCLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxZQUFZLEtBQUssUUFBUSxvQ0FBb0M7QUFBQSxJQUMvRDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLHVCQUF1QjtBQUFBLEVBQ3ZCLFNBQVM7QUFBQSxJQUFDLElBQUk7QUFBQSxJQUFHLGFBQWE7QUFBQSxJQUM5QixPQUFPO0FBQUEsRUFBQztBQUFBLEVBQ1IsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLFFBQVE7QUFBQSxFQUNwQjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sZUFBZSxLQUFLLFVBQVU7QUFBQSxNQUM1QixVQUFVLFFBQVEsSUFBSTtBQUFBO0FBQUE7QUFBQSxJQUd4QixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBO0FBQUEsSUFFUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxPQUFPO0FBQUEsSUFDM0I7QUFBQSxJQUNBLFlBQVksQ0FBQyxRQUFRLE9BQU8sT0FBTyxRQUFRLFFBQVEsU0FBUyxNQUFNO0FBQUEsRUFDcEU7QUFBQTtBQUFBLEVBRUEsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFFTixPQUFPO0FBQUE7QUFBQSxJQUVQLE9BQU87QUFBQSxNQUNMLFdBQVc7QUFBQSxRQUVULFFBQVE7QUFBQSxRQUVSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQUEsVUFBUUEsTUFBSyxRQUFRLFNBQVMsRUFBRTtBQUFBLE1BQzNDO0FBQUEsTUFDQSxPQUFPO0FBQUE7QUFBQTtBQUFBLFFBR0wsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFBQSxVQUFRQSxNQUFLLFFBQVEsU0FBUyxFQUFFO0FBQUEsTUFDM0M7QUFBQSxNQUVBLFlBQVk7QUFBQSxRQUVWLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQUEsVUFBUUEsTUFBSyxRQUFRLFlBQVksRUFBRTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
