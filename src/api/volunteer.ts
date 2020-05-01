import { request } from 'umi'
import {
  AddVolunteerActivityInfo,
  UpdateVolunteerActivityInfo,
  VolunteerActivities,
  VolunteerActivityUserInfos,
  VolunteerActivityHistoryUserInfos,
} from '@/interfaces/volunteer'

export const getVolunteerActivities = (): Promise<VolunteerActivities> => {
  return request(`/volunteer/activity/info`)
}

export const addVolunteerActivity = (info: AddVolunteerActivityInfo): Promise<null> => {
  return request(`/volunteer/activity/update`, {
    method: 'POST',
    body: JSON.stringify({
      ...info,
      operation: 'add',
      id: 0,
    }),
  })
}

export const updateVolunteerActivity = (info: UpdateVolunteerActivityInfo): Promise<null> => {
  return request(`/cinema/update`, {
    method: 'POST',
    body: JSON.stringify({
      ...info,
      operation: 'update',
    }),
  }) 
}

export const getVolunteerActivityUserInfos = (id: number): Promise<VolunteerActivityUserInfos> => {
  return request(`/volunteer/user/info`, {
    method: 'POST',
    body: JSON.stringify({ activity_id: id, operation: 'name' })
  })
}

export const pushVolunteerUsers = (info: {
  ids: number[],
  qq: string,
  date: number,
}): Promise<null> => {
  return request(`/volunteer/user/update`, {
    method: 'POST',
    body: JSON.stringify({ ...info }),
  })
}

export const getVolunteerActivityHistoryUserInfos = (id: number): Promise<
  VolunteerActivityHistoryUserInfos
> => {
  return request(`/volunteer/user/pass`, {
    method: 'POST',
    body: JSON.stringify({ activity_id: id, operation: 'name' })
  })
}
