export interface VolunteerActivity {
  id: number;
  user_id: number;
  username: string;
  name: string;
  introduction: string;
  role: string;
  hour: string;
  date: number;
  num: number;
}

export type VolunteerActivities = VolunteerActivity[];

export interface AddVolunteerActivityInfo {
  name: string;
  introduction: string;
  role: string;
  hour: string;
  date: number;
  lastDate: number;
  num: number;
}

export interface UpdateVolunteerActivityInfo extends AddVolunteerActivityInfo {
  id: number;
}

export interface VolunteerActivityUserInfo {
  id: number;
  user_id: number;
  name: string;
  stu_num: string;
  college: string;
  person_num: string;
  phone: string;
  time_part: string;
}

export type VolunteerActivityUserInfos = VolunteerActivityUserInfo[];
export type VolunteerActivityHistoryUserInfo = VolunteerActivityUserInfo;
export type VolunteerActivityHistoryUserInfos = VolunteerActivityHistoryUserInfo[];
