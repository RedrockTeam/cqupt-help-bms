export interface VolunteerActivity {
  id: number,
  user_id: number,
  username: string,
  name: string,
  introduction: string,
  role: string,
  hour: string,
  date: number,
  num: number,
}

export type VolunteerActivities = VolunteerActivity[]

