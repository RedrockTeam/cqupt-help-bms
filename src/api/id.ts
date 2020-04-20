import { API } from './index'

export const getApplyingIdInfos = () => {
  return fetch(`${API}/identity/apply/info`).then(r => r.json()).catch(alert)
}

export const getPassedIdInfos = () => {
  return fetch(`${API}/identity/pass/info`).then(r => r.json()).catch(alert)
}

export const passIdApply = (ids: number[]) => {
  return fetch(`${API}/team/permission/person`, {
    method: 'POST',
    body: JSON.stringify({
      operation: 'add',
      ids,
    }),
  }).then(r => r.json()).catch(alert)
}
