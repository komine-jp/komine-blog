import axios, { AxiosRequestConfig } from 'axios'
import router from '@/router'
import nprogress from 'nprogress'
import messageFn from './single-notify'
import { SUCCESS_CODE } from '@/constants/http'

type requestParamsITF = {
  data?: any
  params?: any
  url: string
  method?: any
  baseURL?: any
  timeout?: number
  headers?: any
  hideLoading?: boolean
  hideErrorMsg?: boolean,
  needCode?: boolean
}

// type urlMapInterface = {
//   [index: string]: string | boolean | undefined,
// }

// const baseUrlMap: urlMapInterface = {
//   '/api': import.meta.env.VITE_BASE_API,
//   '/file': import.meta.env.VITE_FILE_API,
//   '/user': import.meta.env.VITE_USER_API,
// }

export default function ({
  data,
  params,
  url,
  method = 'GET',
  baseURL = '/api',
  timeout,
  headers,
  hideLoading,
  hideErrorMsg,
  needCode = false,
}: requestParamsITF): Promise<object> {
  return new Promise((resolve, reject) => {
    const defaultHeader = {
      'Content-Type': 'application/json;charset=UTF-8',
    }
    if (!hideLoading) {
      nprogress.start()
    }
    // if (!import.meta.env.DEV && baseURL) {
    //   baseURL = baseURL ? baseUrlMap[baseURL] : baseUrlMap['/api']
    // }
    // vite 将测试也作为DEV环境，使用DEV无法正确判断，MODE可以
    // baseURL = import.meta.env.MODE === 'native' ? '/api' : import.meta.env.VITE_BASE_API
    const requestConfig: AxiosRequestConfig = {
      withCredentials: true,
      url,
      method,
      baseURL,
      timeout: timeout || 10000,
      headers: headers || defaultHeader,
      params,
      data,
    }

    axios(requestConfig)
      .then((response) => {
        // 获取实际数据体
        const resData = response.data
        if (response.status === 200) {
          console.log(response.statusText)
          if (response.statusText === SUCCESS_CODE) {
            const data =resData
            needCode && (data._resCode = resData.statusText)
            resolve(data)
          } else {
            const message = resData.message || '接口发生错误，请检查提交数据'
            messageFn.warning({ message })
            reject({ message })
          }
        }
      })
      .catch((err) => {
        const errorData = err.response.data
        const hasErrorData = typeof errorData === 'object'
        let message = '请求错误'
        let description = '请求出错，请检查网络连接或者联系管理员'

        switch (err.response.status) {
          // 根据状态码处理报错文案
          case 401:
            if (router.currentRoute.value.path !== '/login') {
              message = '未登录'
              description = '获取基本信息失败，请先登陆系统'
              router.replace({ path: '/login' })
            }
            break
          case 400:
            if (hasErrorData) {
              message = '请求参数错误'
              description = errorData.message
            }
            break
          // 统一，网络连接错误、服务端宕机 5xx
          default:
            description = errorData.message || description
            break
        }
        !hideErrorMsg && messageFn.error({ message, description })
        reject(err)
      })
      .finally(() => {
        nprogress.done()
      })
  })
}
