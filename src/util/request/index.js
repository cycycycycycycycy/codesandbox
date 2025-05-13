// service的出口
import zybw from './request'
import { BASE_URL, TIME_OUT } from './config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const ZYBW = new zybw({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      NProgress.start()

      const token = sessionStorage.getItem('token')
      const userName = sessionStorage.getItem('tokenName')
      // const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaGVueXUiLCJpYXQiOjE3MDM2NzY3NDEsImV4cCI6MTcwMzc2MzE0MX0.ZUxgcOvrbCGQVO8SN63IGhjH8b-PGTkqSBbF2-Qk7El2K4U9kBveZuVatc0cz1rsv07NM4k2AOGDR8pNVDZQLA`
      // const userName = 'chenyu'
      if (token && config.headers) {
        // config.headers.token = `${token}`
        config.headers.Authorization = `${token}`
        config.headers.userName = `${userName}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      NProgress.done()
      return res
    },
    responseInterceptorCatch(error) {

      return error
    }
  }
})


export default ZYBW
