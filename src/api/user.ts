import { request } from 'umi'
import { UserTasks, UserToolAuth, UserInfo, UserHistories } from '@/interfaces/user'

export const getUserInfo = (): Promise<UserInfo> => {
  return request(`/user/info`)
}

export const getUserToolAuth = (): Promise<UserToolAuth> => {
  return request(`/main/tool`)
}

export const getUserTasks = (): Promise<UserTasks> => {
  return request(`/user/task`)
}

export const getUserHistories = (): Promise<UserHistories> => {
  return request(`/user/history`)
}
