import { Effect, ImmerReducer, Subscription } from 'umi';
import { pathToRegexp } from 'path-to-regexp';
import { IdInfos } from '@/interfaces/id';
import { getApplyingIdInfos, getPassedIdInfos, passIdApply } from '@/api/id';
import { message } from 'antd';

export interface IdModelState {
  applyList: IdInfos;
  passList: IdInfos;
}

export interface IdModel {
  state: IdModelState;
  subscriptions: {
    onIdPage: Subscription;
    onIdHistory: Subscription;
  };
  effects: {
    fetchApplyingIdInfos: Effect;
    fetchPassedIdInfos: Effect;
    passIdApply: Effect;
  };
  reducers: {
    setApplyingIdInfos: ImmerReducer<
      IdModelState,
      ReturnType<typeof createSetApplyingIdInfos>
    >;
    setPassedIdInfos: ImmerReducer<
      IdModelState,
      ReturnType<typeof createSetPassedIdInfos>
    >;
  };
}

export const createFetchApplyingIdInfos = () => ({
  type: 'fetchApplyingIdInfos',
});
export const createFetchPassedIdInfos = () => ({ type: 'fetchPassedIdInfos' });
export const createSetApplyingIdInfos = (applyingIdInfos: IdInfos) => ({
  type: 'setApplyingIdInfos',
  payload: applyingIdInfos || [],
});
export const createSetPassedIdInfos = (passedIdInfos: IdInfos) => ({
  type: 'setPassedIdInfos',
  payload: passedIdInfos || [],
});
export const createPassIdApply = (ids: number[]) => ({
  type: 'id/passIdApply',
  payload: { ids },
});

const idModel: IdModel = {
  state: {
    applyList: [],
    passList: [],
  },
  subscriptions: {
    onIdPage({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/id').exec(pathname);
        if (match) {
          console.log('on page: /id');
          dispatch(createFetchApplyingIdInfos());
        }
      });
    },
    onIdHistory({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/id/history').exec(pathname);
        if (match) {
          console.log('on page: /id/history');
          dispatch(createFetchPassedIdInfos());
        }
      });
    },
  },
  effects: {
    *fetchApplyingIdInfos(action, { call, put }) {
      const res = yield call(getApplyingIdInfos);
      if (res.status === 10000) {
        yield put(createSetApplyingIdInfos(res.data ?? []));
      }
    },
    *fetchPassedIdInfos(action, { call, put }) {
      const res = yield call(getPassedIdInfos);
      if (res.status === 10000) {
        yield put(createSetPassedIdInfos(res.data ?? []));
      }
    },
    *passIdApply({ payload }, { call, put }) {
      const res = yield call(passIdApply, payload.ids);
      if (res.status === 10000) {
        yield put(createFetchApplyingIdInfos());
        message.success('生成成功');
      }
    },
  },
  reducers: {
    setApplyingIdInfos(state, { payload }) {
      state.applyList = payload;
    },
    setPassedIdInfos(state, { payload }) {
      state.passList = payload;
    },
  },
};

export default idModel;
