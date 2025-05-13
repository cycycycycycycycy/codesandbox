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

      let token = sessionStorage.getItem('token')
      // token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaGVueXUiLCJpYXQiOjE2OTM0NjU3MzIsImV4cCI6MTY5MzU1MjEzMn0.7zSi2RutNs7pePMJWKnQzGHv9lxHCPGruYY_DKDGaCuianvqLXTj7wJ0i6DbMyA63KnMFkLK_bKYdPgA9FCv_w"
      // console.log(token);
      if (token && config.headers) {
        // config.headers.token = `${token}`
        config.headers.token = `${token}`
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
