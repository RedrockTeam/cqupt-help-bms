import { RequestConfig } from 'umi';
import { message } from 'antd';
import { API, LOGIN } from '@/configs';
import { redirectTo } from './utils';
import { getUserInfo, getUserToolAuth, relogin } from './api/user';

export async function getInitialState() {
  // TODO: 登录逻辑，无 token 请求并跳转，有 token 继续，之后获取权限，用户信息
  // const data = await fetchXXX();
  // return data;
  if (!localStorage.getItem('cqupt-help-bms-token')) {
    const token = location.search.split('?token=')[1];
    if (token) {
      localStorage.setItem('cqupt-help-bms-token', token.replace(/%20/g, '+'));
    } else {
      const { data } = await fetch(
        `${LOGIN}/magicloop/rushb?b=${encodeURIComponent(
          /* 后端入口 */ `${API}/login`,
        )}%2f&scope=student&pattern=qr`,
      )
        .then(r => r.json())
        .catch(e => message.error('网络错误'));
      redirectTo(data.url);
    }
  }
  // if (window.location.pathname === '/') {
  //   redirectTo('/user');
  // }
  const reloginRes = await relogin();
  const userInfo = await getUserInfo();
  const userToolAuth = await getUserToolAuth();
  return {
    orgs: reloginRes.data,
    ...userInfo.data,
    toolAuth: userToolAuth.data,
  };
}

const SUCCESS = 10000;
const PERMISSION_FAILED = 10012;
const PARAMS_ERROR = 10010;
const INTERNAL_ERROR = 10020;

export const request: RequestConfig = {
  prefix: API,
  errorConfig: {
    adaptor() {
      // success 是 true，跳过默认的 errorHandler，自己处理错误同时可以直接返回 res.data
      return { success: true };
    },
  },
  requestInterceptors: [
    function injectToken(url, options: any) {
      options.headers.Authorization =
        'Bearer ' + localStorage.getItem('cqupt-help-bms-token');
      return {
        url,
        options: { ...options, interceptors: true },
      };
    },
  ],
  responseInterceptors: [
    async function handleFormat(response) {
      const json = await response.json().catch(e => message.error('网络错误'));

      if (json.status === PERMISSION_FAILED) {
        message.error('ERROR: 权限错误');
      } else if (json.status === PARAMS_ERROR) {
        message.error('ERROR: 参数错误');
      } else if (json.status === INTERNAL_ERROR) {
        message.error('ERROR: 服务内部错误');
      }
      console.log('json', json);
      return json;
    },
  ],
};
