
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