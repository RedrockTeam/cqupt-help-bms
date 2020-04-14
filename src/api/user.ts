import { API } from './index'

export const getUserInfo = () => {
  return fetch(`${API}/user/info`).then(r => r.json()).catch(alert)
}

export const getUserToolAuth = () => {
  return fetch(`${API}/main/tool`).then(r => r.json()).catch(alert)
}
