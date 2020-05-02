import { RequestConfig } from 'umi'
import { message } from 'antd'
import { API } from '@/configs'
import { redirectTo } from './utils'
import { getUserInfo, getUserToolAuth } from './api/user'

export async function getInitialState() {
  
  // TODO: 登录逻辑，无 token 请求并跳转，有 token 继续，之后获取权限，用户信息
  // const data = await fetchXXX();
  // return data;
  // if (!localStorage.getItem('cqupt-help-bms-token')) {
  //   const { data } = await fetch(`https://wx.redrock.team/magicloop/rushb?b=${encodeURIComponent(/* 后端入口 */API!)}%2f&scope=student&pattern=qr`)
  //     .then(r => r.json())
  //     .catch(e => message.error('网络错误'))
  //   redirectTo(data.url)
  // }
  if (window.location.pathname === '/') {
    redirectTo('/user')
  }
  const userInfo = await getUserInfo()
  const userToolAuth = await getUserToolAuth()
  return {
    ...userInfo,
    toolAuth: userToolAuth,
  }
}

const SUCCESS = 10000
const PERMISSION_FAILED = 10012
const PARAMS_ERROR = 10010

export const request: RequestConfig = {
  prefix: API,
  errorConfig: {
    adaptor() { // success 是 true，跳过默认的 errorHandler，自己处理错误同时可以直接返回 res.data
      return { success: true }
    },
  },
  requestInterceptors: [
    function injectToken(url, options) {
      return ({
        url,
        options,
      })
    },
  ],
  responseInterceptors: [
    async function handleFormat(response) {
      const json = await response.json().catch(e => message.error('网络错误'))

      if (json.status === PERMISSION_FAILED) {
        message.error('ERROR: 权限错误')
      } else if (json.status === PARAMS_ERROR) {
        message.error('ERROR: 参数错误')
      }
      // 统一接口格式，方便无数据需要返回和返回数组的情况
      // { code: 10000 | 10010 | 10012, info: string, data: 不是 undefined，不是 null | Array }
      if (json.data === undefined) return null
      else if (json.data === null) return []
      else return json.data
    },
  ],
}
