import { request } from 'umi';
import {
  UserTasks,
  UserToolAuth,
  UserInfo,
  UserHistories,
} from '@/interfaces/user';

export const getUserInfo = () => {
  return request(`/user/info`);
};

export const getUserToolAuth = () => {
  return request(`/main/tool`);
};

export const getUserTasks = () => {
  return request(`/user/task`);
};

export const getUserHistories = () => {
  return request(`/user/history`);
};

export const relogin = () => {
  return request('/relogin');
};

export const chooseOrg = (id: number) => {
  return request('/choose', {
    method: 'POST',
    body: JSON.stringify({
      id,
    }),
  });
};
