import { RequestConfig } from 'umi';
import { message } from 'antd';
import { API } from '@/configs';
import { redirectTo } from './utils';
import { getUserInfo, getUserToolAuth } from './api/user';

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
    redirectTo('/user');
  }
  const userInfo = await getUserInfo();
  const userToolAuth = await getUserToolAuth();
  return {
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
        'Bearer eyJjbGFzcyI6IjEzMDAxODA3IiwiY29sbGVnZSI6Iui9r+S7tuW3peeoi+WtpumZoiIsImV4cCI6IjEwMjQzNzk0MTE5IiwiaGVhZEltZ1VybCI6Imh0dHA6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9ScDRyTklJWWRtU05IRTFOSHZBR215UEUzRDRQd3l4aWFubG9jZ3lwcFhQR1BoMnJ3ZG5DN1p3NklkNUxZN1k4TjVyYWIzbmNUcHFlenQ3a3hUZUJVVmcvMTMyIiwiaWF0IjoiMTU4OTA3NzIzOSIsIm1ham9yIjoiIiwibmlja25hbWUiOiJhaGFiaGdr8J+NsCIsInJlYWxOYW1lIjoi5L2V5bqa5Z2kIiwicmVkSWQiOiIyYzEyMmMwOTAyMzVjMzFkODI2NWQ2MWQzZjE4MGIzYTY2NWJhYmRlIiwic3R1TnVtIjoiMjAxODIxNDEzOSIsInN1YiI6InhicyJ9.g++rv4igrRn71/MtY/bXU++PHFQJ4/rxNZXoI9cG/lVd/9vs8UnGKCW/veUPY3iY5/mGfBIh3gFqOarHU6QmkMNvqe4gWxZIP7f52CmmLB3c/a9Hdhm3F+Y4pSDqHHH2PNLKvXkgco8K2+4W83ofzCMKgGUjxXSQSmE2BTghwt4oiEx423tfMjmCUtPMEHCHXGr5eiq0Ko1oJEefpzb32xwvR5hCXSXDqkQIoo1eQZEJ0tBb4v6d8+19bzBHP8kLC7QFz9HwlhDAPn614m45iyGZMo04pRNThGfd4Q5EQLQ1tCXD2W8p8Jxw3h9VTUgvuLP/PF4yozgQO1RhWVmxWA==';
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
