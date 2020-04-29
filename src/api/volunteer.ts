import { GetVolunteerActivitiesResponse, AddVolunteerActivityResponse, UpdateVolunteerActivityResponse, GetVolunteerActivityUserInfosResponse, PushVolunteerUsersResponse, GetVolunteerActivityHistoryUserInfosResponse } from '@/interfaces'
import { API } from './index'
import { AddVolunteerActivityInfo, UpdateVolunteerActivityInfo } from '@/interfaces/volunteer'

export const getVolunteerActivities = (): Promise<GetVolunteerActivitiesResponse> => {
  return fetch(`${API}/volunteer/activity/info`).then(r => r.json()).catch(alert)
}

export const addVolunteerActivity = (info: AddVolunteerActivityInfo): Promise<AddVolunteerActivityResponse> => {
  return fetch(`${API}/volunteer/activity/update`, {
    method: 'POST',
    body: JSON.stringify({
      ...info,
      operation: 'add',
      id: 0,
    }),
  }).then(r => r.json()).catch(alert)
}

export const updateVolunteerActivity = (info: UpdateVolunteerActivityInfo): Promise<UpdateVolunteerActivityResponse> => {
  return fetch(`${API}/cinema/update`, {
    method: 'POST',
    body: JSON.stringify({
      ...info,
      operation: 'update',
    }),
  }).then(r => r.json()).catch(alert) 
}

export const getVolunteerActivityUserInfos = (id: number): Promise<GetVolunteerActivityUserInfosResponse> => {
  return fetch(`${API}/volunteer/user/info`, {
    method: 'POST',
    body: JSON.stringify({ activity_id: id, operation: 'name' })
  }).then(r => r.json()).catch(alert)
}

export const pushVolunteerUsers = (info: { ids: number[], qq: string, date: number }): Promise<PushVolunteerUsersResponse> => {
  return fetch(`${API}/volunteer/user/update`, {
    method: 'POST',
    body: JSON.stringify({ ...info }),
  }).then(r => r.json()).catch(alert)
}

export const getVolunteerActivityHistoryUserInfos = (id: number): Promise<GetVolunteerActivityHistoryUserInfosResponse> => {
  return fetch(`${API}/volunteer/user/pass`, {
    method: 'POST',
    body: JSON.stringify({ activity_id: id, operation: 'name' })
  }).then(r => r.json()).catch(alert)
}
