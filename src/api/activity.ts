import { API } from './index'
import { GetActivityInfosResponse } from '@/interfaces'

export const getActivityInfos = (): Promise<GetActivityInfosResponse> => {
  return fetch(`${API}/activity/activity/info`).then(r => r.json()).catch(alert)
}

