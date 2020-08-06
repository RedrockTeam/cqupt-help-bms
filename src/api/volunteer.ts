import { request } from 'umi';
import {
  AddVolunteerActivityInfo,
  UpdateVolunteerActivityInfo,
  VolunteerActivities,
  VolunteerActivityUserInfos,
  VolunteerActivityHistoryUserInfos,
} from '@/interfaces/volunteer';

export const getVolunteerActivities = () => {
  return request(`/volunteer/activity/info`);
};

export const addVolunteerActivity = (info: AddVolunteerActivityInfo) => {
  return request(`/volunteer/activity/update`, {
    method: 'POST',
    body: JSON.stringify({
      ...info,
      operation: 'add',
      id: 0,
    }),
  });
};

export const updateVolunteerActivity = (info: UpdateVolunteerActivityInfo) => {
  return request(`/cinema/update`, {
    method: 'POST',
    body: JSON.stringify({
      ...info,
      operation: 'update',
    }),
  });
};

export const getVolunteerActivityUserInfos = (id: number) => {
  return request(`/volunteer/user/info`, {
    method: 'POST',
    body: JSON.stringify({ activity_id: id, operation: 'name' }),
  });
};

export const pushVolunteerUsers = (info: {
  ids: number[];
  qq: string;
  date: number;
}) => {
  return request(`/volunteer/user/update`, {
    method: 'POST',
    body: JSON.stringify({ ...info }),
  });
};

export const getVolunteerActivityHistoryUserInfos = (id: number) => {
  return request(`/volunteer/user/pass`, {
    method: 'POST',
    body: JSON.stringify({ activity_id: id, operation: 'name' }),
  });
};
