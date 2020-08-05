import { request } from 'umi'

export const getTeamInfo = () => {
  return request(`/team/apply/info`)
}

export const updateTeamInfo = (detail, avatar) => {
  return request('/team/apply/create', {
    method: 'POST',
    body: JSON.stringify({
      detail,
      avatar,
    })
  })
}

export const getCurrentInfo = () => request('/team/apply/recent')
