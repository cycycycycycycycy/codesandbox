// 菜单配置 - 用于动态生成路由
let modules = import.meta.glob("../views/Com/**/**.vue")
export const menuConfig = [
    {
        name: "test",
        label: "测试组件",
        desc: "这是一个测试组件，用于验证系统功能。",
    },
    {
        name: "tcplayer",
        label: "腾讯云播放器",
        desc: "腾讯云播放器组件，支持多种格式视频播放。",
    },
    {
        name: "echart_map_line",
        label: "ECharts地图连线",
        desc: "ECharts地图连线组件，支持动态数据可视化。",
    },
    {
        name: "videojs",
        label: "Video.js播放器",
        desc: "Video.js视频播放器，开源高性能播放器。",
    },
    {
        name: "tooltip",
        label: "自定义提示框",
        desc: "自定义Tooltip组件，支持多样化提示信息。",
    },
    {
        name: "year_transverse",
        label: "横向年份进度条",
        desc: "横向年份进度条，适合年度数据展示。",
    },
    {
        name: "year_round",
        label: "圆形年份进度条",
        desc: "圆形年份进度条，适合周期性数据展示。",
    },
    {
        name: "TMap",
        label: "天地图组件",
        desc: "天地图地图组件，支持地图展示与交互。",
    },
    {
        name: "rule_editor",
        label: "规则编辑器",
        desc: "规则编辑器，支持复杂规则的可视化配置。",

    },
    {
        name: "mind_map",
        label: "思维导图",
        desc: "思维导图组件，支持结构化信息可视化。",
    },
    {
        name: "cesium",
        label: "Cesium三维地球",
        desc: "Cesium三维地球组件，支持地理空间可视化。",
    },
    {
        name: "download_progress",
        label: "下载进度条",
        desc: "下载进度组件，展示文件下载的实时进度。",
    },
    {
        name: "time_line",
        label: "时间轴组件",
        desc: "时间轴组件，展示事件的时间流转。",
    },
    {
        name: "last_next_month",
        label: "上半月和下半月",
        desc: "区分上半月和下半月组件，可选择月份区间。",
    },
    {
        name: "table_merger",
        label: "表格合并插件",
        desc: "表格合并插件，支持表格合并。",
    }
];

// 获取菜单配置
export const getMenuConfig = () => {
    return menuConfig;
};

// 根据路径获取菜单项
export const getMenuItemByPath = (path) => {
    return menuConfig.find(item => item.path === path);
};

// 根据名称获取菜单项
export const getMenuItemByName = (name) => {
    return menuConfig.find(item => item.name === name);
};

// 获取所有路由配置
export const getRouteConfig = () => {
    return menuConfig.map(item => ({
        path: `/${item.name}`,
        name: item.name,
        component: modules[`../views/Com/${item.name}/${item.name}.vue`],
    }));
};