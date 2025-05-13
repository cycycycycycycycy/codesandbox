
import { defineStore } from 'pinia'
const userInfo = defineStore("userInfo", {
    state: () => ({
        userData: '',
        token: "",
        mapObj: "",
        mapTrue: '0',

    }),

    getters: {

    },

    actions: {
        changeMap(val) {
            this.mapObj = val
            this.mapTrue = '1'
        },


    }

})

//暴露这个useCounter模块

export default userInfo
