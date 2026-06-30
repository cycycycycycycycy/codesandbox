<template>
  <UniverSheet :workbookData="workbookData" @ready="onReady" ref="sheetRef" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { UniverSheet } from "vue-univer";

const workbookData = {
  id: "my-workbook",
  sheetOrder: ["sheet"],
  name: "My Sheet",
  appVersion: "1",
  locale: "enUS",
  styles: {
    "2h7Gf3": {
      bd: {
        t: {
          s: 1,
          cl: {
            rgb: "#000000",
          },
        },
        r: {
          s: 1,
          cl: {
            rgb: "#000000",
          },
        },
        b: {
          s: 1,
          cl: {
            rgb: "#000000",
          },
        },
        l: {
          s: 1,
          cl: {
            rgb: "#000000",
          },
        },
      },
    },
  },
  sheets: {
    sheet: {
      id: "sheet",
      name: "Sheet",
      tabColor: "",
      hidden: 0,
      rowCount: 10,
      columnCount: 10,
      zoomRatio: 1,
      scrollTop: 0,
      scrollLeft: 0,
      defaultColumnWidth: 93,
      defaultRowHeight: 27,
      showGridlines: 1,
      rightToLeft: 0,
      freeze: {
        startRow: -1,
        startColumn: -1,
        ySplit: 0,
        xSplit: 0,
      },
      rowHeader: {
        width: 46,
        hidden: 0,
      },
      columnHeader: {
        height: 20,
        hidden: 0,
      },
      mergeData: [
        {
          startRow: 9,
          endRow: 9,
          startColumn: 0,
          endColumn: 9,
          rangeType: 0,
        },
      ],
      cellData: {
        0: {
          0: {
            v: "姓名",
            t: 1,
            custom: {
              isTitle: true,
            },
          },
          1: {
            v: "年龄",
            t: 1,
            custom: {
              isTitle: true,
            },
          },
          2: {
            custom: {
              isTitle: true,
            },
          },
          3: {
            custom: {
              isTitle: true,
            },
          },
          4: {
            custom: {
              isTitle: true,
            },
          },
          5: {
            custom: {
              isTitle: true,
            },
          },
          6: {
            custom: {
              isTitle: true,
            },
          },
          7: {
            custom: {
              isTitle: true,
            },
          },
        },
        1: {
          0: {
            custom: {
              isTitle: true,
            },
          },
          1: {
            v: 25,
            t: 2,
          },
        },
        2: {
          0: {
            custom: {
              isTitle: true,
            },
          },
        },
        3: {
          0: {
            custom: {
              isTitle: true,
            },
            v: "姓名",
            t: 1,
          },
          1: {
            v: "年龄",
            t: 1,
          },
        },
        4: {
          0: {
            custom: {
              isTitle: true,
            },
            v: "张三123",
            t: 1,
          },
          1: {
            v: 25,
            t: 2,
          },
        },
        5: {
          0: {
            custom: {
              isTitle: true,
            },
          },
          2: {
            v: 21,
            t: 2,
          },
        },
        6: {
          0: {
            custom: {
              isTitle: true,
            },
          },
          2: {
            v: 3,
            t: 2,
          },
          3: {
            v: 123,
            t: 2,
          },
        },
        7: {
          0: {
            custom: {
              isTitle: true,
            },
          },
        },
        8: {
          0: {
            v: "张三",
            t: 1,
            custom: {
              isTitle: true,
            },
          },
        },
        9: {
          0: {
            s: "2h7Gf3",
            custom: {
              isTitle: true,
            },
          },
          1: {
            s: "2h7Gf3",
            custom: {
              isTitle: true,
            },
          },
          2: {
            s: "2h7Gf3",
            custom: {
              isTitle: true,
            },
          },
          3: {
            s: "2h7Gf3",
            custom: {
              isTitle: true,
            },
          },
          4: {
            custom: {
              isTitle: true,
            },
          },
          5: {
            custom: {
              isTitle: true,
            },
          },
          6: {
            custom: {
              isTitle: true,
            },
          },
          7: {
            custom: {
              isTitle: true,
            },
          },
          8: {
            custom: {
              isTitle: true,
            },
          },
          9: {
            custom: {
              isTitle: true,
            },
          },
        },
      },
      rowData: {
        9: {
          hd: 0,
        },
      },
      columnData: {},
    },
  },
  resources: [
    {
      name: "SHEET_RANGE_PROTECTION_PLUGIN",
      data: '{"sheet":[{"ranges":[{"startRow":0,"endRow":0,"startColumn":0,"endColumn":0,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"swHUOp9V","id":"ruleId_zkYdWv","description":"禁止编辑_行0_列0","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":1,"endRow":1,"startColumn":0,"endColumn":0,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"OfJ3zxam","id":"ruleId_Ob5l2s","description":"禁止编辑_行1_列0","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":2,"endRow":2,"startColumn":0,"endColumn":0,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"UJ7cr2MV","id":"ruleId_3XqbK5","description":"禁止编辑_行2_列0","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":3,"endRow":3,"startColumn":0,"endColumn":0,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"JEy33epP","id":"ruleId_o9sFhG","description":"禁止编辑_行3_列0","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":4,"endRow":4,"startColumn":0,"endColumn":0,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"2rA-AjKj","id":"ruleId_HR-Q38","description":"禁止编辑_行4_列0","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":5,"endRow":5,"startColumn":0,"endColumn":0,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"njfaXtHc","id":"ruleId_2yNqQ5","description":"禁止编辑_行5_列0","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":6,"endRow":6,"startColumn":0,"endColumn":0,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"ERJmY7mU","id":"ruleId_9g5Skm","description":"禁止编辑_行6_列0","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":7,"endRow":7,"startColumn":0,"endColumn":0,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"1C4WIkRu","id":"ruleId_j62jhs","description":"禁止编辑_行7_列0","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":8,"endRow":8,"startColumn":0,"endColumn":0,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"-IVeIsX_","id":"ruleId_ZumS0x","description":"禁止编辑_行8_列0","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":0,"endRow":0,"startColumn":1,"endColumn":1,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"636G7amU","id":"ruleId_wK1CeR","description":"禁止编辑_行0_列1","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":0,"endRow":0,"startColumn":2,"endColumn":2,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"Yv2uCXCa","id":"ruleId_n76ReY","description":"禁止编辑_行0_列2","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":0,"endRow":0,"startColumn":3,"endColumn":3,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"goT5dKNh","id":"ruleId_J2trZG","description":"禁止编辑_行0_列3","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":0,"endRow":0,"startColumn":4,"endColumn":4,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"_eh22T-d","id":"ruleId_7HfTAM","description":"禁止编辑_行0_列4","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":0,"endRow":0,"startColumn":5,"endColumn":5,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"v2YrbXoL","id":"ruleId_fep8wE","description":"禁止编辑_行0_列5","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":0,"endRow":0,"startColumn":6,"endColumn":6,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"eYarL5Ko","id":"ruleId_2FclXw","description":"禁止编辑_行0_列6","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":0,"endRow":0,"startColumn":7,"endColumn":7,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"rusiOM9v","id":"ruleId_j3AaRW","description":"禁止编辑_行0_列7","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":9,"endRow":9,"startColumn":0,"endColumn":0,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"QiOTKPHN","id":"ruleId_IGeCjd","description":"禁止编辑_行9_列0","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":9,"endRow":9,"startColumn":1,"endColumn":1,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"TyV9gHYP","id":"ruleId_1yLYlT","description":"禁止编辑_行9_列1","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":9,"endRow":9,"startColumn":2,"endColumn":2,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"Tj-HbAjq","id":"ruleId_FWc1ii","description":"禁止编辑_行9_列2","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":9,"endRow":9,"startColumn":3,"endColumn":3,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"QMYepMgm","id":"ruleId_lOBYiI","description":"禁止编辑_行9_列3","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":9,"endRow":9,"startColumn":4,"endColumn":4,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"zWRE8JCm","id":"ruleId_mjz4nF","description":"禁止编辑_行9_列4","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":9,"endRow":9,"startColumn":5,"endColumn":5,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"dkroLWhI","id":"ruleId_DnjvV1","description":"禁止编辑_行9_列5","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":9,"endRow":9,"startColumn":6,"endColumn":6,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"1ybnvQIw","id":"ruleId_tan2NO","description":"禁止编辑_行9_列6","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":9,"endRow":9,"startColumn":7,"endColumn":7,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"coLQhe90","id":"ruleId_NHR8Kv","description":"禁止编辑_行9_列7","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":9,"endRow":9,"startColumn":8,"endColumn":8,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"rZYow4-O","id":"ruleId_zj32Qq","description":"禁止编辑_行9_列8","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"},{"ranges":[{"startRow":9,"endRow":9,"startColumn":9,"endColumn":9,"unitId":"my-workbook","sheetId":"sheet"}],"permissionId":"Jbg4uyT3","id":"ruleId_5iXzkb","description":"禁止编辑_行9_列9","unitType":3,"unitId":"my-workbook","subUnitId":"sheet","viewState":"othersCanView","editState":"onlyMe"}]}',
    },
    {
      name: "SHEET_AuthzIoMockService_PLUGIN",
      data: '{"ZbVUqqp5":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列0","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列0","scope":{"edit":2,"read":1}}},"T2Y9Y5Kj":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列1","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列1","scope":{"edit":2,"read":1}}},"rekPATTZ":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列2","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列2","scope":{"edit":2,"read":1}}},"q77TQCJ1":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列3","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列3","scope":{"edit":2,"read":1}}},"swHUOp9V":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行0_列0","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行0_列0","scope":{"edit":2,"read":1}}},"OfJ3zxam":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行1_列0","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行1_列0","scope":{"edit":2,"read":1}}},"UJ7cr2MV":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行2_列0","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行2_列0","scope":{"edit":2,"read":1}}},"JEy33epP":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行3_列0","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行3_列0","scope":{"edit":2,"read":1}}},"2rA-AjKj":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行4_列0","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行4_列0","scope":{"edit":2,"read":1}}},"njfaXtHc":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行5_列0","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行5_列0","scope":{"edit":2,"read":1}}},"ERJmY7mU":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行6_列0","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行6_列0","scope":{"edit":2,"read":1}}},"1C4WIkRu":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行7_列0","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行7_列0","scope":{"edit":2,"read":1}}},"-IVeIsX_":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行8_列0","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行8_列0","scope":{"edit":2,"read":1}}},"636G7amU":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行0_列1","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行0_列1","scope":{"edit":2,"read":1}}},"Yv2uCXCa":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行0_列2","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行0_列2","scope":{"edit":2,"read":1}}},"goT5dKNh":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行0_列3","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行0_列3","scope":{"edit":2,"read":1}}},"_eh22T-d":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行0_列4","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行0_列4","scope":{"edit":2,"read":1}}},"v2YrbXoL":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行0_列5","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行0_列5","scope":{"edit":2,"read":1}}},"eYarL5Ko":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行0_列6","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行0_列6","scope":{"edit":2,"read":1}}},"rusiOM9v":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行0_列7","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行0_列7","scope":{"edit":2,"read":1}}},"cWmSTxS-":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列4","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列4","scope":{"edit":2,"read":1}}},"nYwHPrTa":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列5","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列5","scope":{"edit":2,"read":1}}},"SARsphDy":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列6","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列6","scope":{"edit":2,"read":1}}},"NBj31XOA":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列7","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列7","scope":{"edit":2,"read":1}}},"dln6C12e":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列8","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列8","scope":{"edit":2,"read":1}}},"5x3UZAnu":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列9","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列9","scope":{"edit":2,"read":1}}},"QiOTKPHN":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列0","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列0","scope":{"edit":2,"read":1}}},"TyV9gHYP":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列1","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列1","scope":{"edit":2,"read":1}}},"Tj-HbAjq":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列2","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列2","scope":{"edit":2,"read":1}}},"QMYepMgm":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列3","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列3","scope":{"edit":2,"read":1}}},"zWRE8JCm":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列4","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列4","scope":{"edit":2,"read":1}}},"dkroLWhI":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列5","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列5","scope":{"edit":2,"read":1}}},"1ybnvQIw":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列6","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列6","scope":{"edit":2,"read":1}}},"coLQhe90":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列7","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列7","scope":{"edit":2,"read":1}}},"rZYow4-O":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列8","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列8","scope":{"edit":2,"read":1}}},"Jbg4uyT3":{"objectType":3,"unitID":"my-workbook","name":"禁止编辑_行9_列9","strategies":[{"action":6,"role":2},{"action":16,"role":2},{"action":17,"role":2},{"action":18,"role":2},{"action":19,"role":2},{"action":33,"role":2},{"action":34,"role":2},{"action":35,"role":2},{"action":36,"role":2},{"action":37,"role":2},{"action":38,"role":2},{"action":39,"role":2},{"action":40,"role":2}],"selectRangeObject":{"collaborators":[],"unitID":"my-workbook","name":"禁止编辑_行9_列9","scope":{"edit":2,"read":1}}}}',
    },
    {
      name: "SHEET_WORKSHEET_PROTECTION_PLUGIN",
      data: "{}",
    },
    {
      name: "SHEET_WORKSHEET_PROTECTION_POINT_PLUGIN",
      data: "{}",
    },
    {
      name: "SHEET_DEFINED_NAME_PLUGIN",
      data: "",
    },
    {
      name: "SHEET_RANGE_THEME_MODEL_PLUGIN",
      data: "{}",
    },
    {
      name: "SHEET_DATA_VALIDATION_PLUGIN",
      data: '{"sheet":[]}',
    },
  ],
};
const sheetRef = ref(null);
const onReady = (instance) => {
  console.log("实例已准备就绪", instance);

  sheetRef.value.setSheetPermission();
  //   sheetRef.value.hideUniverUI();
  console.log(sheetRef.value.readme);
};
</script>

<style lang="less">
@import "vue-univer/style.css";
</style>
