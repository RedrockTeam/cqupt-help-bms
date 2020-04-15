import { API } from './index'

export const getOrganizationMembers = () => {
  return fetch(`${API}/team/person/info`).then(r => r.json()).catch(alert)
}
