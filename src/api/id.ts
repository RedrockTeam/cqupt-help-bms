import { request } from 'umi';
import { IdInfos } from '@/interfaces/id';

export const getApplyingIdInfos = () => {
  return request(`/identity/apply/info`);
};

export const getPassedIdInfos = () => {
  return request(`/identity/pass/info`);
};

export const passIdApply = (ids: number[]) => {
  return request(`/identity/apply/update`, {
    method: 'POST',
    body: JSON.stringify({
      operation: 'add',
      ids,
    }),
  });
};
