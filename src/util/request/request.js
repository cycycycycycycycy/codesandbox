import axios from 'axios'
import JSONBIG from 'json-bigint'

axios.defaults.transformResponse = [
  function (data) {
    const json = JSONBIG({
      storeAsString: true
    })
    const res = json.parse(data)
    return res
  }
]
class zybw {
  // 创建axios实例
  instance
  // 保存实例中会用到的一些属性
  interceptors

  // 实例中的拦截器
  constructor(config) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 如果并没有穿showLoading 就用？？ 三元运算符简写 默认赋值为 true

    // 这里是请求拦截器的配置
    // 配置的是 config里面传入的
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 这里是返回拦截器
    // 配置也是config里面传入的
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        //统一处理表单格式
        if (config.contentType === 'multipart/form-data') {
          //formData 表示表单数据的键值对 key/value 的构造方式
          const formData = new FormData()
          //这里遍历一下 因为有可能除了upload 还有其他参数的嘛
          for (let key in config.data) {
            //再一个个append进去
            formData.append(key, config.data[key])
          }
          //重新赋值给config.data -------return出去
          config.data = formData
          //这里设置multipart/form-data 表单传数据需要的contentType
          config.headers['Content-Type'] = config.contentType
        }
        config.responseType && (config.responseType = 'blob')
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {

        // const data = res.data
        // if (res.code === '10000') {
        //   console.log('服务器错误,请联系管理员')
        // }

        return res.data
      },
      (err) => {
        // console.log('yyyyyyyyyyyyyyyyy', err)
        // if (err.response.status === 404) {
        //   console.log('404错误')
        // } else if (!err.response) {
        //   console.log(123)
        // }

        return err
      }
    )
  }
  // request方法的封装
  request(config) {
    return new Promise((resolve, reject) => {
      // 单个api请求中包含的hook 如何处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 具体返回promise对象
      this.instance
        .request(config)
        .then((res) => {
          // 单个api接口的返回拦截处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)

          // localCache.deleteCache('token')
          // location.reload()
        })
    })
  }

  // 对于具体方法的封装 这里使用了泛型
  get(config) {
    return this.request({ ...config, method: 'GET' })
  }
  post(config) {
    return this.request({ ...config, method: 'POST' })
  }
  put(config) {
    return this.request({ ...config, method: 'PUT' })
  }
  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }
}
export default zybw
