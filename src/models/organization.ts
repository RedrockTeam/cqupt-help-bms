import { Effect, ImmerReducer, Subscription } from 'umi';
import { message } from 'antd';
import { pathToRegexp } from 'path-to-regexp';
import {
  OrganizationMembers,
  OrganizationAuths,
  TeamPersons,
} from '@/interfaces/organization';
import {
  getOrganizationMembers,
  updateOrganizationMember,
  getOrganizationAuths,
  getOrganizationCanAuthList,
  updateOrganizationAuth,
  publishTask,
  checkIsBoss,
} from '@/api/organization';
import { createFetchError } from '@/utils';

export interface OrganizationModelState {
  members: OrganizationMembers;
  auths: OrganizationAuths;
  canAuthList: TeamPersons;
  isBoss: boolean;
}

export interface OrganizationModel {
  state: OrganizationModelState;
  subscriptions: {
    onAuth: Subscription;
    onMember: Subscription;
  };
  effects: {
    checkIsBoss: Effect;
    fetchAuths: Effect;
    fetchCanAuthList: Effect;
    addAuth: Effect;
    updateAuth: Effect;
    fetchMembers: Effect;
    deleteMember: Effect;
    addMember: Effect;
    publishTask: Effect;
  };
  reducers: {
    setIsBoss: ImmerReducer;
    setMembers: ImmerReducer<
      OrganizationModelState,
      ReturnType<typeof createSetMembers>
    >;
    setAuths: ImmerReducer<
      OrganizationModelState,
      ReturnType<typeof createSetAuths>
    >;
    setCanAuthList: ImmerReducer<
      OrganizationModelState,
      ReturnType<typeof createSetCanAuthList>
    >;
  };
}

export const createCheckIsBoss = () => ({ type: 'checkIsBoss' });
export const createFetchAuths = () => ({ type: 'fetchAuths' });
export const createFetchMembers = () => ({ type: 'fetchMembers' });
export const createAddAuth = (stuNum: string, jobId: number) => ({
  type: 'organization/addAuth',
  payload: {
    stuNum,
    job_id: jobId,
  },
});
export const createSetAuths = (auths: OrganizationAuths) => ({
  type: 'setAuths',
  payload: auths || [],
});
export const createSetCanAuthList = (canAuthList: TeamPersons) => ({
  type: 'setCanAuthList',
  payload: canAuthList || [],
});
export const createSetMembers = (members: OrganizationMembers) => ({
  type: 'setMembers',
  payload: members || [],
});
export const createUpdateAuth = (
  jobId: number,
  UserId: number,
  originUserId: number,
) => ({
  type: 'organization/updateAuth',
  payload: {
    job_id: jobId,
    user_id: UserId,
    origin_user_id: originUserId,
  },
});
export const createFetchCanAuthList = (jobId: number) => ({
  type: 'organization/fetchCanAuthList',
  payload: { job_id: jobId },
});
export const createAddMember = (stuNum: string, jobId: number) => ({
  type: 'organization/addMember',
  payload: {
    stuNum,
    job_id: jobId,
  },
});
export const createDeleteMember = (id: number, jobId: number) => ({
  type: 'organization/deleteMember',
  payload: {
    id, // 后端接口，删除时由于没有获得 stu_num 直接在这里使用 id 替代
    job_id: jobId,
  },
});
export const createPublishTask = (title: string, content: string) => ({
  type: 'organization/publishTask',
  payload: {
    title,
    content,
  },
});

const organizationModel: OrganizationModel = {
  state: {
    members: [],
    auths: [],
    canAuthList: [],
    isBoss: false,
  },
  subscriptions: {
    onAuth({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/organization-auth').exec(pathname);
        if (match) {
          console.log('on page: /organization-auth');
          dispatch(createFetchAuths());
        }
      });
    },
    onMember({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/organization-member').exec(pathname);
        if (match) {
          console.log('on page: /organization-member');
          dispatch(createFetchMembers());
        }
      });
    },
  },
  effects: {
    *checkIsBoss(action, { call, put }) {
      const res = yield call(checkIsBoss);
      console.log('??');
      yield put({
        type: 'organization/setIsBoss',
        payload: { isBoss: res.status === 10000 },
      });
    },
    *fetchAuths(action, { call, put, all }) {
      const [res] = yield all([
        call(getOrganizationAuths),
        put(createCheckIsBoss()),
      ]);
      if (res.status === 10000) {
        yield put(createSetAuths(res.data ?? []));
      }
    },
    *fetchCanAuthList({ payload }, { call, put }) {
      const res = yield call(getOrganizationCanAuthList, payload.job_id);
      if (res.status === 10000) {
        yield put(createSetCanAuthList(res.data ?? []));
      }
    },
    *addAuth({ payload }, { call, put }) {
      const res = yield call(
        updateOrganizationAuth,
        'add',
        payload.stuNum,
        payload.job_id,
      );
      if (res.status === 10000) {
        yield put(createFetchAuths());
      }
    },
    *updateAuth({ payload }, { call, put }) {
      const res = yield call(
        updateOrganizationAuth,
        payload.job_id,
        payload.origin_user_id,
        payload.user_id,
      );
      if (res.status === 10000) {
        yield put(createFetchAuths());
      }
    },
    *fetchMembers(action, { call, put, all }) {
      const [res] = yield all([
        call(getOrganizationMembers),
        put(createCheckIsBoss()),
      ]);
      if (res.status === 10000) {
        yield put(createSetMembers(res.data ?? []));
      }
    },
    *deleteMember({ payload }, { call, put }) {
      const res = yield call(
        updateOrganizationMember,
        'delete',
        payload.id,
        payload.job_id,
      );
      if (res.status === 10000) {
        yield put(createFetchMembers());
      }
    },
    *addMember({ payload }, { call, put }) {
      const res = yield call(
        updateOrganizationMember,
        'add',
        payload.stuNum,
        payload.job_id,
      );
      if (res.status === 10000) {
        yield put(createFetchMembers());
      }
    },
    *publishTask({ payload }, { call, put }) {
      const res = yield call(publishTask, payload.title, payload.content);
      if (res.status === 10000) {
        message.success('发送成功');
      }
    },
  },
  reducers: {
    setIsBoss(state, { payload }) {
      state.isBoss = payload.isBoss;
    },
    setMembers(state, { payload }) {
      state.members = payload.sort(
        (a, b) =>
          parseInt(b.job.job_name.split('_')[1][0], 0) -
          parseInt(a.job.job_name.split('_')[1][0], 0),
      );
    },
    setAuths(state, { payload }) {
      state.auths = payload.sort(
        (a, b) =>
          parseInt(b.job.job_name.split('_')[1][0], 0) -
          parseInt(a.job.job_name.split('_')[1][0], 0),
      );
    },
    setCanAuthList(state, { payload }) {
      state.canAuthList = payload;
    },
  },
};

export default organizationModel;
