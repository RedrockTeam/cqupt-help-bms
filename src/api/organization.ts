import { API } from './index'

export const getOrganizationMembers = () => {
  return fetch(`${API}/team/person/info`).then(r => r.json()).catch(alert)
}

export const updateOrganizationMember = (operation: 'delete' | 'add', stuNum: string, id: number) => {
  return fetch(`${API}/team/person/update`, {
    method: 'POST',
    body: JSON.stringify({
      operation,
      stuNum,
      job_id: id,
    }),
  }).then(r => r.json()).catch(alert)
}

export const getOrganizationAuths = () => {
  return fetch(`${API}/team/permission/info`).then(r => r.json()).catch(alert)
}

export const getOrganizationCanAuthList = (id: number) => {
  return fetch(`${API}/team/permission/person`, {
    method: 'POST',
    body: JSON.stringify({
      job_id: id,
    }),
  }).then(r => r.json()).catch(alert)
}

export const updateOrganizationAuths = (job_id: number, origin_user_id: number, user_id: number) => {
  return fetch(`${API}/team/permission/update`, {
    method: 'POST',
    body: JSON.stringify({
      job_id,
      origin_user_id,
      user_id,
    }),
  }).then(r => r.json()).catch(alert)
}

export const publishTask = (title: string, content: string) => {
  return fetch(`${API}/team/task/update`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
    }),
  }).then(r => r.json()).catch(alert)
}
