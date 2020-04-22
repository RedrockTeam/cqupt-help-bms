import { API } from './index'
import {
  GetOrganizationMembersResponse,
  GetOrganizationAuthsResponse,
  GetOrganizationCanAuthListResponse,
  OrganizationPublishTaskResponse,
  UpdateOrganizationAuthResponse,
  UpdateOrganizationMemberResponse,
} from '@/interfaces'

export const getOrganizationMembers = (): Promise<GetOrganizationMembersResponse> => {
  return fetch(`${API}/team/person/info`).then(r => r.json()).catch(alert)
}

export const updateOrganizationMember = (operation: 'delete' | 'add', stuNum: string, jobId: number): Promise<UpdateOrganizationMemberResponse> => {
  return fetch(`${API}/team/person/update`, {
    method: 'POST',
    body: JSON.stringify({
      operation,
      stuNum,
      job_id: jobId,
    }),
  }).then(r => r.json()).catch(alert)
}

export const getOrganizationAuths = (): Promise<GetOrganizationAuthsResponse> => {
  return fetch(`${API}/team/permission/info`).then(r => r.json()).catch(alert)
}

export const getOrganizationCanAuthList = (id: number): Promise<GetOrganizationCanAuthListResponse> => {
  return fetch(`${API}/team/permission/person`, {
    method: 'POST',
    body: JSON.stringify({
      job_id: id,
    }),
  }).then(r => r.json()).catch(alert)
}

export const updateOrganizationAuth = (job_id: number, origin_user_id: number, user_id: number): Promise<UpdateOrganizationAuthResponse> => {
  return fetch(`${API}/team/permission/update`, {
    method: 'POST',
    body: JSON.stringify({
      job_id,
      origin_user_id,
      user_id,
    }),
  }).then(r => r.json()).catch(alert)
}

export const publishTask = (title: string, content: string): Promise<OrganizationPublishTaskResponse> => {
  return fetch(`${API}/team/task/update`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
    }),
  }).then(r => r.json()).catch(alert)
}
