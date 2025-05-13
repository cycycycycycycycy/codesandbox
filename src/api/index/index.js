import ZYBW from '@/util/request/index.js'

//获取行政区划
export function getRegionList() {
    return ZYBW.post({
        url: '/platform/center/sysRegion/treeRegion?parentId=0',
    })
}
