import { request } from 'umi'
import {
  OrganizationMembers,
  OrganizationAuths,
  OrganizationCanAuthList,
} from '@/interfaces/organization'

export const getOrganizationMembers = (): Promise<OrganizationMembers> => {
  return request(`/team/person/info`)
}

export const updateOrganizationMember = (
  operation: 'delete' | 'add',
  stuNum: string,
  jobId: number,
): Promise<null> => {
  return request(`/team/person/update`, {
    method: 'POST',
    body: JSON.stringify({
      operation,
      stuNum,
      job_id: jobId,
    }),
  })
}

export const getOrganizationAuths = (): Promise<OrganizationAuths> => {
  return request(`/team/permission/info`)
}

export const getOrganizationCanAuthList = (id: number): Promise<OrganizationCanAuthList> => {
  return request(`/team/permission/person`, {
    method: 'POST',
    body: JSON.stringify({
      job_id: id,
    }),
  })
}

export const updateOrganizationAuth = (
  job_id: number,
  origin_user_id: number,
  user_id: number,
): Promise<null> => {
  return request(`/team/permission/update`, {
    method: 'POST',
    body: JSON.stringify({
      job_id,
      origin_user_id,
      user_id,
    }),
  })
}

export const publishTask = (title: string, content: string): Promise<null> => {
  return request(`/team/task/update`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
    }),
  })
}
