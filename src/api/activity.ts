import { API } from './index'
import { GetActivityInfosResponse, GetActivityHistoryInfosResponse, GetActivityHistoryGiftsResponse } from '@/interfaces'

export const getActivityInfos = (): Promise<GetActivityInfosResponse> => {
  return fetch(`${API}/activity/activity/info`).then(r => r.json()).catch(alert)
}

export const getActivityHistoryInfos = (): Promise<GetActivityHistoryInfosResponse> => {
  return fetch(`${API}/activity/activity/history`, {
    method: 'POST',
  }).then(r => r.json()).catch(alert)
}

export const getActivityHistoryGifts = (id: number): Promise<GetActivityHistoryGiftsResponse> => {
  return fetch(`${API}/activity/gift/history`, {
    method: 'POST',
    body: JSON.stringify({ id }),
  }).then(r => r.json()).catch(alert)
}