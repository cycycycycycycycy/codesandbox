import { createApp } from 'vue'
import '@/assets/css/style.css'
import App from './App.vue'
const app = createApp(App);
// 创建vue实例
import router from '@/router';
app.use(router);

import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin';
app.use(hljsVuePlugin);
// 启用快捷css
// import '@/assets/css/common.css'

// 启用动画
// import '@/assets/css/animated.css'
// 字体图标动画
import '../src/font/fonts.css';

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
app.use(ElementPlus, {
    locale: zhCn
})
for (const name in ElementPlusIconsVue) {
    app.component(name, ElementPlusIconsVue[name])
}
import TMap from 'component-tmap'

app.use(TMap)

//使用状态管理
import pinia from './store'
app.use(pinia);



app.mount('#app')
