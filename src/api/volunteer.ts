import { GetVolunteerActivitiesResponse } from '@/interfaces'
import { API } from './index'

export const getVolunteerActivities = (): Promise<GetVolunteerActivitiesResponse> => {
  return fetch(`${API}/volunteer/activity/info`).then(r => r.json()).catch(alert)
}

