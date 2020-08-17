import { ImmerReducer, Effect, Subscription } from 'umi';
import { message } from 'antd';
import { pathToRegexp } from 'path-to-regexp';
import {
  VolunteerActivities,
  AddVolunteerActivityInfo,
  UpdateVolunteerActivityInfo,
  VolunteerActivityUserInfos,
  VolunteerActivityHistoryUserInfos,
} from '@/interfaces/volunteer';
import { redirectTo } from '@/utils';
import {
  getVolunteerActivities,
  addVolunteerActivity,
  updateVolunteerActivity,
  getVolunteerActivityUserInfos,
  pushVolunteerUsers,
  getVolunteerActivityHistoryUserInfos,
} from '@/api/volunteer';

export interface VolunteerModelState {
  volunteerActivities: VolunteerActivities;
  volunteerActivityUserInfos: VolunteerActivityUserInfos;
  volunteerActivityHistoryUserInfos: VolunteerActivityHistoryUserInfos;
}

export interface VolunteerModel {
  state: VolunteerModelState;
  subscriptions: {
    onVolunteerPage: Subscription;
    onVolunteerInfoPage: Subscription;
    onVolunteerInfoHistoryPage: Subscription;
  };
  effects: {
    fetchVolunteerActivities: Effect;
    addVolunteerActivity: Effect;
    updateVolunteerActivity: Effect;
    fetchVolunteerActivityUserInfos: Effect;
    pushVolunteerUsers: Effect;
    fetchVolunteerActivityHistoryUserInfos: Effect;
  };
  reducers: {
    setVolunteerActivities: ImmerReducer<
      VolunteerModelState,
      ReturnType<typeof createSetVolunteerActivities>
    >;
    setVolunteerActivitiyUserInfos: ImmerReducer<
      VolunteerModelState,
      ReturnType<typeof createSetVolunteerActivitiyUserInfos>
    >;
    setVolunteerActivityHistoryUserInfos: ImmerReducer<
      VolunteerModelState,
      ReturnType<typeof createSetVolunteerActivityHistoryUserInfos>
    >;
  };
}

export const createFetchVolunteerActivities = () => ({
  type: 'fetchVolunteerActivities',
});
export const createSetVolunteerActivities = (
  volunteerActivities: VolunteerActivities,
) => ({
  type: 'setVolunteerActivities',
  payload: volunteerActivities,
});
export const createAddVolunteerActivity = (info: AddVolunteerActivityInfo) => ({
  type: 'volunteer/addVolunteerActivity',
  payload: info,
});
export const createUpdateVolunteerActivity = (
  info: UpdateVolunteerActivityInfo,
) => ({
  type: 'volunteer/updateVolunteerActivity',
  payload: info,
});
export const createFetchVolunteerActivityUserInfos = (id: number) => ({
  type: 'fetchVolunteerActivityUserInfos',
  payload: { id },
});
export const createSetVolunteerActivitiyUserInfos = (
  infos: VolunteerActivityUserInfos,
) => ({
  type: 'setVolunteerActivitiyUserInfos',
  payload: infos,
});
export const createPushVolunteerUsers = (
  activityId: number,
  ids: number[],
  qq: string,
  date: number,
) => ({
  type: 'volunteer/pushVolunteerUsers',
  payload: { activityId, ids, qq, date },
});
export const createFetchVolunteerActivityHistoryUserInfos = (id: number) => ({
  type: 'fetchVolunteerActivityHistoryUserInfos',
  payload: { id },
});
export const createSetVolunteerActivityHistoryUserInfos = (
  infos: VolunteerActivityHistoryUserInfos,
) => ({
  type: 'setVolunteerActivityHistoryUserInfos',
  payload: infos,
});

const volunteerModel: VolunteerModel = {
  state: {
    volunteerActivities: [],
    volunteerActivityUserInfos: [],
    volunteerActivityHistoryUserInfos: [],
  },
  subscriptions: {
    onVolunteerPage({ history, dispatch }) {
      history.listen(({ pathname }) => {
        const match1 = pathToRegexp('/volunteer').exec(pathname);
        // const match2 = pathToRegexp('/volunteer/:info').exec(pathname);
        if (match1) {
          dispatch(createFetchVolunteerActivities());
        }
      });
    },
    onVolunteerInfoPage({ history, dispatch }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/volunteer/:info/volunteerInfo').exec(
          pathname,
        );
        if (match) {
          dispatch(
            createFetchVolunteerActivityUserInfos(parseInt(match[1], 10)),
          );
        }
      });
    },
    onVolunteerInfoHistoryPage({ history, dispatch }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp(
          '/volunteer/:info/volunteerInfo/history',
        ).exec(pathname);
        if (match) {
          dispatch(
            createFetchVolunteerActivityHistoryUserInfos(
              parseInt(match[1], 10),
            ),
          );
        }
      });
    },
  },
  effects: {
    *fetchVolunteerActivities(action, { call, put }) {
      const res = yield call(getVolunteerActivities);
      if (res.status === 10000) {
        console.log(res);
        yield put(createSetVolunteerActivities(res.data ?? []));
      }
    },
    *addVolunteerActivity({ payload }, { call }) {
      const res = yield call(addVolunteerActivity, payload);
      if (res.status === 10000) {
        message.success('添加成功');
        redirectTo('/volunteer', 2000);
      }
    },
    *updateVolunteerActivity({ payload }, { call }) {
      const res = yield call(updateVolunteerActivity, payload);
      if (res.status === 10000) {
        message.success('修改成功');
      }
    },
    *fetchVolunteerActivityUserInfos({ payload }, { call, put }) {
      const res = yield call(getVolunteerActivityUserInfos, payload.id);
      if (res.status === 10000) {
        yield put(createSetVolunteerActivitiyUserInfos(res.data ?? []));
      }
    },
    *pushVolunteerUsers({ payload }, { call, put }) {
      const res = yield call(pushVolunteerUsers, {
        activity_id: payload.activityId,
        ids: payload.ids,
        qq: payload.qq,
        time_out: payload.date,
      });
      if (res.status === 10000) {
        yield put(createFetchVolunteerActivityUserInfos(payload.activityId));
        message.success('推送成功');
      }
    },
    *fetchVolunteerActivityHistoryUserInfos({ payload }, { call, put }) {
      const res = yield call(getVolunteerActivityHistoryUserInfos, payload.id);
      if (res.status === 10000) {
        yield put(createSetVolunteerActivityHistoryUserInfos(res.data ?? []));
      }
    },
  },
  reducers: {
    setVolunteerActivities(state, { payload }) {
      state.volunteerActivities = payload;
    },
    setVolunteerActivitiyUserInfos(state, { payload }) {
      state.volunteerActivityUserInfos = payload;
    },
    setVolunteerActivityHistoryUserInfos(state, { payload }) {
      state.volunteerActivityHistoryUserInfos = payload;
    },
  },
};

export default volunteerModel;
