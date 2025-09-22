
/**
* @File el-table合并方法
* @Type function
* @Author chen_yu
* @Date 2023-08-05 16:43:17
* @Version 1.0
* 
* @Params 
* 
* @Description
* 使用页面基础配置
* 1.el-table中写入 
     :span-method="
        (data) => {
        return objectSpanMethod(data, pooledData);
    }"
* 2.页面引入方法  
    import { getSpanData,objectSpanMethod} from "此文件地址";
 * 3.使用
    初始化合并数据
    const pooledData = ref({});
    调用方法
    pooledData.value = getSpanData(["需要合并的列"]，需要合并的表格数组);（详细查看下方方法）
* 
* 
* 
* @returns 表格合并相同值
*/

// 计算需要合并的单元格
export const getSpanData = (columnList, data) => {
    let columnArr = [];//合并表格的列
    let spanArr = []; //临时组
    let spanData = []; // 组合的合并组
    //调用此方法第一个参数是配置需要合并的列(数组需要传入数组)
    /**
       * 第一列 columnArr = ['columnProps1']
       * 第二列 columnArr = ['','columnProps2']
       * ...
      */
    console.log(columnList, data);
    columnArr = columnList
    spanData = [];
    columnArr.forEach((element) => {

        let contactDot = 0;
        spanArr = [];
        data.forEach((item, index) => {
            if (index === 0) {
                spanArr.push(1);
            } else {
                if (item[element] === data[index - 1][element]) {
                    spanArr[contactDot] += 1;
                    spanArr.push(0);
                } else {
                    contactDot = index;
                    spanArr.push(1);
                }
            }
        });
        spanData.push(spanArr);
    });
    return { columnArr, spanData }
};
//表格方法
export const objectSpanMethod = ({ row, column, rowIndex, columnIndex }, { columnArr, spanData }) => {
    if (columnArr.includes(column.property)) {
        if (spanData[columnIndex][rowIndex]) {
            return {
                rowspan: spanData[columnIndex][rowIndex],
                colspan: 1,
            };
        } else {
            return {
                rowspan: 0,
                colspan: 0,
            };
        }
    }
};