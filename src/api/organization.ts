import { API } from './index'

export const getOrganizationMembers = () => {
  return fetch(`${API}/team/person/info`).then(r => r.json()).catch(alert)
}

export const updateOrganizationMember = (operation: 'delete' | 'add', stuNum: string, job_id: number) => {
  return fetch(`${API}/team/person/update`, {
    method: 'POST',
    body: JSON.stringify({
      operation,
      stuNum,
      job_id,
    }),
  }).then(r => r.json()).catch(alert)
}
