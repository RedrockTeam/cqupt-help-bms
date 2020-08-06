import { request } from 'umi';
import {
  OrganizationMembers,
  OrganizationAuths,
  OrganizationCanAuthList,
} from '@/interfaces/organization';

export const getOrganizationMembers = () => {
  return request(`/team/person/info`);
};

export const updateOrganizationMember = (
  operation: 'delete' | 'add',
  stuNum: string,
  jobId: number,
) => {
  return request(`/team/person/update`, {
    method: 'POST',
    body: JSON.stringify({
      operation,
      stuNum,
      job_id: jobId,
    }),
  });
};

export const getOrganizationAuths = () => {
  return request(`/team/permission/info`);
};

export const getOrganizationCanAuthList = (id: number) => {
  return request(`/team/permission/person`, {
    method: 'POST',
    body: JSON.stringify({
      job_id: id,
    }),
  });
};

export const updateOrganizationAuth = (
  job_id: number,
  origin_user_id: number,
  user_id: number,
) => {
  return request(`/team/permission/update`, {
    method: 'POST',
    body: JSON.stringify({
      job_id,
      origin_user_id,
      user_id,
    }),
  });
};

export const publishTask = (title: string, content: string) => {
  return request(`/team/task/update`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
    }),
  });
};
