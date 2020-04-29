import { ImmerReducer, Effect, Subscription } from 'umi'
import { pathToRegexp } from 'path-to-regexp'
import { VolunteerActivities, AddVolunteerActivityInfo, UpdateVolunteerActivityInfo, VolunteerActivityUserInfos, VolunteerActivityHistoryUserInfos } from '@/interfaces/volunteer'
import { createErrorMessage, createSuccessMessage } from './layout'
import { createFetchError } from '@/utils'
import { getVolunteerActivities, addVolunteerActivity, updateVolunteerActivity, getVolunteerActivityUserInfos, pushVolunteerUsers, getVolunteerActivityHistoryUserInfos } from '@/api/volunteer'

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
      const res = yield call(getVolunteerActivities)
      if (res.status === 10000) {
        yield put(createSetVolunteerActivities(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('volunteer/fetchUserTasks/getUserTasks', res.status, res.info)))
      }
    },
    * addVolunteerActivity({ payload }, { call, put }) {
      const res = yield call(addVolunteerActivity, payload)
      if (res.status === 10000) {
        yield put(createSuccessMessage('添加成功'))
        setTimeout(() => window.location.pathname = '/volunteer', 2000)
      } else {
        yield put(createErrorMessage(createFetchError('volunteer/addVolunteerActivity/addVolunteerActivity', res.status, res.info)))
      }
    },
    * updateVolunteerActivity({ payload }, { call, put }) {
      const res = yield call(updateVolunteerActivity, payload)
      if (res.status === 10000) {
        yield put(createSuccessMessage('修改成功'))
      } else {
        yield put(createErrorMessage(createFetchError('volunteer/updateVolunteerActivity/updateVolunteerActivity', res.status, res.info)))
      }
    },
    * fetchVolunteerActivityUserInfos({ payload }, { call, put }) {
      const res = yield call(getVolunteerActivityUserInfos, payload.id)
      if (res.status === 10000) {
        yield put(createSetVolunteerActivitiyUserInfos(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('volunteer/fetchVolunteerActivityUserInfos', res.status, res.info)))
      }
    },
    * pushVolunteerUsers({ payload }, { call, put, all }) {
      const res = yield call(pushVolunteerUsers, {
        ids: payload.ids,
        qq: payload.qq_num,
        date: payload.down_date,
      })
      if (res.status === 10000) {
        yield all([
          put(createSuccessMessage('推送成功')),
          put(createFetchVolunteerActivityUserInfos(payload.activityId)),
        ])
      } else {
        yield put(createErrorMessage(createFetchError('volunteer/pushVolunteerUsers', res.status, res.info)))
      }
    },
    * fetchVolunteerActivityHistoryUserInfos({ payload }, { call, put }) {
      const res = yield call(getVolunteerActivityHistoryUserInfos, payload.id)
      if (res.status === 10000) {
        yield put(createSetVolunteerActivityHistoryUserInfos(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('volunteer/fetchVolunteerActivityHistoryUserInfos', res.status, res.info)))
      }
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
