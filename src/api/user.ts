import { API } from './index'
import { UserToolAuthResponse, UserTasksResponse } from '@/interfaces'

export const getUserInfo = () => {
  return fetch(`${API}/user/info`).then(r => r.json()).catch(alert)
}

export const getUserToolAuth = (): Promise<UserToolAuthResponse> => {
  return fetch(`${API}/main/tool`).then(r => r.json()).catch(alert)
}

export const getUserTasks = (): Promise<UserTasksResponse> => {
  return fetch(`${API}/user/task`).then(r => r.json()).catch(alert)
}

export const getUserHistories = () => {
  return fetch(`${API}/user/history`).then(r => r.json()).catch(alert)
}
