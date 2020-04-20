import { API } from './index'
import { GetUserToolAuthResponse, GetUserTasksResponse, GetUserInfoResponse, GetUserHistoriesResponse } from '@/interfaces'

export const getUserInfo = (): Promise<GetUserInfoResponse> => {
  return fetch(`${API}/user/info`).then(r => r.json()).catch(alert)
}

export const getUserToolAuth = (): Promise<GetUserToolAuthResponse> => {
  return fetch(`${API}/main/tool`).then(r => r.json()).catch(alert)
}

export const getUserTasks = (): Promise<GetUserTasksResponse> => {
  return fetch(`${API}/user/task`).then(r => r.json()).catch(alert)
}

export const getUserHistories = (): Promise<GetUserHistoriesResponse> => {
  return fetch(`${API}/user/history`).then(r => r.json()).catch(alert)
}
