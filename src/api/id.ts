import { request } from 'umi'
import { IdInfos } from '@/interfaces/id'

export const getApplyingIdInfos = (): Promise<IdInfos> => {
  return request(`/identity/apply/info`)
}

export const getPassedIdInfos = (): Promise<IdInfos> => {
  return request(`/identity/pass/info`)
}

export const passIdApply = (ids: number[]): Promise<null> => {
  return request(`/team/permission/person`, {
    method: 'POST',
    body: JSON.stringify({
      operation: 'add',
      ids,
    }),
  })
}
