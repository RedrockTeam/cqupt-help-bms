import { API } from './index'
import { GetApplyingIdInfosResponse, GetPassedIdInfosResponse, PassIdApplyResponse } from '@/interfaces'

export const getApplyingIdInfos = (): Promise<GetApplyingIdInfosResponse> => {
  return fetch(`${API}/identity/apply/info`).then(r => r.json()).catch(alert)
}

export const getPassedIdInfos = (): Promise<GetPassedIdInfosResponse> => {
  return fetch(`${API}/identity/pass/info`).then(r => r.json()).catch(alert)
}

export const passIdApply = (ids: number[]): Promise<PassIdApplyResponse> => {
  return fetch(`${API}/team/permission/person`, {
    method: 'POST',
    body: JSON.stringify({
      operation: 'add',
      ids,
    }),
  }).then(r => r.json()).catch(alert)
}
