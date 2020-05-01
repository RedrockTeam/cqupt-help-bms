import { ImmerReducer, Effect, Subscription } from 'umi'
import { message } from 'antd'
import { pathToRegexp } from 'path-to-regexp'
import {
  VolunteerActivities,
  AddVolunteerActivityInfo,
  UpdateVolunteerActivityInfo,
  VolunteerActivityUserInfos,
  VolunteerActivityHistoryUserInfos,
} from '@/interfaces/volunteer'
import { redirectTo } from '@/utils'
import {
  getVolunteerActivities,
  addVolunteerActivity,
  updateVolunteerActivity,
  getVolunteerActivityUserInfos,
  pushVolunteerUsers,
  getVolunteerActivityHistoryUserInfos,
} from '@/api/volunteer'

export interface VolunteerModelState {
  volunteerActivities: VolunteerActivities,
  volunteerActivityUserInfos: VolunteerActivityUserInfos,
  volunteerActivityHistoryUserInfos: VolunteerActivityHistoryUserInfos,
}

export interface VolunteerModel {
  state: VolunteerModelState,
  subscriptions: {
    onVolunteerPage: Subscription,
    onVolunteerInfoPage: Subscription,
    onVolunteerInfoHistoryPage: Subscription,
  },
  effects: {
    fetchVolunteerActivities: Effect,
    addVolunteerActivity: Effect,
    updateVolunteerActivity: Effect,
    fetchVolunteerActivityUserInfos: Effect,
    pushVolunteerUsers: Effect,
    fetchVolunteerActivityHistoryUserInfos: Effect,
  },
  reducers: {
    setVolunteerActivities: ImmerReducer<VolunteerModelState, ReturnType<typeof createSetVolunteerActivities>>,
    setVolunteerActivitiyUserInfos: ImmerReducer<VolunteerModelState, ReturnType<typeof createSetVolunteerActivitiyUserInfos>>,
    setVolunteerActivityHistoryUserInfos: ImmerReducer<VolunteerModelState, ReturnType<typeof createSetVolunteerActivityHistoryUserInfos>>,
  },
}

export const createFetchVolunteerActivities = () => ({ type: 'fetchVolunteerActivities' })
export const createSetVolunteerActivities = (volunteerActivities: VolunteerActivities) => ({
  type: 'setVolunteerActivities',
  payload: volunteerActivities,
})
export const createAddVolunteerActivity = (info: AddVolunteerActivityInfo) => ({
  type: 'volunteer/addVolunteerActivity',
  payload: info,
})
export const createUpdateVolunteerActivity = (info: UpdateVolunteerActivityInfo) => ({
  type: 'volunteer/updateVolunteerActivity',
  payload: info,
})
export const createFetchVolunteerActivityUserInfos = (id: number) => ({
  type: 'fetchVolunteerActivityUserInfos',
  payload: { id },
})
export const createSetVolunteerActivitiyUserInfos = (infos: VolunteerActivityUserInfos) => ({
  type: 'setVolunteerActivitiyUserInfos',
  payload: infos,
})
export const createPushVolunteerUsers = (activityId: number, ids: number[], qq: string, date: number) => ({
  type: 'volunteer/pushVolunteerUsers',
  payload: { activityId, ids, qq, date },
})
export const createFetchVolunteerActivityHistoryUserInfos = (id: number) => ({
  type: 'fetchVolunteerActivityHistoryUserInfos',
  payload: { id },
})
export const createSetVolunteerActivityHistoryUserInfos = (infos: VolunteerActivityHistoryUserInfos) => ({
  type: 'setVolunteerActivityHistoryUserInfos',
  payload: infos,
})

const volunteerModel: VolunteerModel = {
  state: {
    volunteerActivities: [],
    volunteerActivityUserInfos: [],
    volunteerActivityHistoryUserInfos: [],
  },
  subscriptions: {
    onVolunteerPage({ history, dispatch }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/volunteer').exec(pathname)
        if (match) {
          dispatch(createFetchVolunteerActivities())
        }
      })
    },
    onVolunteerInfoPage({ history, dispatch }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/volunteer/:info/volunteerInfo').exec(pathname)
        if (match) {
          dispatch(createFetchVolunteerActivityUserInfos(parseInt(match[1], 10)))
        }
      })
    },
    onVolunteerInfoHistoryPage({ history, dispatch }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/volunteer/:info/volunteerInfo/history').exec(pathname)
        if (match) {
          dispatch(createFetchVolunteerActivityHistoryUserInfos(parseInt(match[1], 10)))
        }
      })
    },
  },
  effects: {
    * fetchVolunteerActivities(action, { call, put }) {
      const data = yield call(getVolunteerActivities)
      yield put(createSetVolunteerActivities(data))
    },
    * addVolunteerActivity({ payload }, { call }) {
      yield call(addVolunteerActivity, payload)
      message.success('添加成功')
      redirectTo('/volunteer', 2000)
    },
    * updateVolunteerActivity({ payload }, { call }) {
      yield call(updateVolunteerActivity, payload)
      message.success('修改成功')
    },
    * fetchVolunteerActivityUserInfos({ payload }, { call, put }) {
      const data = yield call(getVolunteerActivityUserInfos, payload.id)
      yield put(createSetVolunteerActivitiyUserInfos(data))
    },
    * pushVolunteerUsers({ payload }, { call, put }) {
      yield call(pushVolunteerUsers, {
        ids: payload.ids,
        qq: payload.qq_num,
        date: payload.down_date,
      })
      yield put(createFetchVolunteerActivityUserInfos(payload.activityId))
      message.success('推送成功')
    },
    * fetchVolunteerActivityHistoryUserInfos({ payload }, { call, put }) {
      const data = yield call(getVolunteerActivityHistoryUserInfos, payload.id)
      yield put(createSetVolunteerActivityHistoryUserInfos(data))
    }
  },
  reducers: {
    setVolunteerActivities(state, { payload }) {
      state.volunteerActivities = payload
    },
    setVolunteerActivitiyUserInfos(state, { payload }) {
      state.volunteerActivityUserInfos = payload
    },
    setVolunteerActivityHistoryUserInfos(state, { payload }) {
      state.volunteerActivityHistoryUserInfos = payload
    },
  },
}

export default volunteerModel
