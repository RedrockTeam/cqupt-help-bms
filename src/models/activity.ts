import { ImmerReducer, Subscription, Effect } from 'umi'
import { pathToRegexp } from 'path-to-regexp'
import { ActivityInfos, ActivityHistoryInfos, GiftInfos, UpdateActivityOptions } from '@/interfaces/activity'
import { getActivityInfos, getActivityHistoryInfos, getActivityHistoryGifts, getActivityGifts, deleteActivity, addActivity } from '@/api/activity'
import { createFetchError } from '@/utils'
import { createErrorMessage, createSuccessMessage } from './layout'
import { parse } from 'query-string'

export interface ActivityModelState {
  activityInfos: ActivityInfos,
  activityHistoryInfos: ActivityHistoryInfos,
  activityHistoryGifts: GiftInfos,
  activityGifts: GiftInfos,
}

export interface ActivityModel {
  state: ActivityModelState,
  subscriptions: {
    onActivityPage: Subscription,
    onActivityHistoryPage: Subscription,
    onActivityHistoryGiftPage: Subscription,
    onActivityGiftPage: Subscription,
  },
  effects: {
    fetchActivityInfos: Effect,
    fetchActivityHistoryInfos: Effect,
    fetchActivityHistoryGifts: Effect,
    fetchActivityGifts: Effect,
    deleteActivity: Effect,
    addActivity: Effect,
  },
  reducers: {
    setActivityInfos: ImmerReducer<ActivityModelState, ReturnType<typeof createSetActivityInfos>>,
    setActivityHistoryInfos: ImmerReducer<ActivityModelState, ReturnType<typeof createSetActivityHistoryInfos>>,
    setActivityHistoryGifts: ImmerReducer<ActivityModelState, ReturnType<typeof createSetActivityHistoryGifts>>,
    setActivityGifts: ImmerReducer<ActivityModelState, ReturnType<typeof createSetActivityGifts>>,
  },
}

export const createFetchActivityInfos = () => ({ type: 'fetchActivityInfos' })
export const createSetActivityInfos = (activityInfos: ActivityInfos) => ({
  type: 'setActivityInfos',
  payload: activityInfos,
})
export const createFetchActivityHistoryInfos = () => ({ type: 'fetchActivityHistoryInfos' })
export const createSetActivityHistoryInfos = (activityHistoryInfos: ActivityHistoryInfos) => ({
  type: 'setActivityHistoryInfos',
  payload: activityHistoryInfos,
})
export const createFetchActivityHistoryGifts = (id: number) => ({
  type: 'fetchActivityHistoryGifts',
  payload: { id },
})
export const createSetActivityHistoryGifts = (gifts: GiftInfos) => ({
  type: 'setActivityHistoryGifts',
  payload: gifts,
})
export const createFetchActivityGifts = (id: number) => ({
  type: 'fetchActivityGifts',
  payload: { id },
})
export const createSetActivityGifts = (gifts: GiftInfos) => ({
  type: 'setActivityGifts',
  payload: gifts,
})
export const createDeleteActivity = (id: number) => ({
  type: 'activity/deleteActivity',
  payload: { id },
})
export const createAddActivity = (opts: UpdateActivityOptions) => ({
  type: 'activity/addActivity',
  payload: opts,
})

const activityModel: ActivityModel = {
  state: {
    activityInfos: [],
    activityHistoryInfos: [],
    activityHistoryGifts: [],
    activityGifts: [],
  },
  subscriptions: {
    onActivityPage({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/activity').exec(pathname)
        if (match) {
          dispatch(createFetchActivityInfos())
        }
      })
    },
    onActivityHistoryPage({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/activity/history').exec(pathname)
        if (match) {
          dispatch(createFetchActivityHistoryInfos())
        }
      })
    },
    onActivityHistoryGiftPage({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/activity/history/:info').exec(pathname)
        if (match) {
          const { id } = parse(history.location.search)
          dispatch(createFetchActivityHistoryGifts(id as unknown as number))
        }
      })
    },
    onActivityGiftPage({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/activity/:info').exec(pathname)
        if (match && match[1] !== 'history') {
          const { id } = parse(history.location.search)
          dispatch(createFetchActivityGifts(id as unknown as number))
        }
      })
    }
  },
  effects: {
    * fetchActivityInfos(action, { call, put }) {
      const res = yield call(getActivityInfos)
      if (res.status === 10000) {
        yield put(createSetActivityInfos(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('activity/fetchActivityInfos/getActivityInfos', res.status, res.info)))
      }
    },
    * fetchActivityHistoryInfos(action, { call, put }) {
      const res = yield call(getActivityHistoryInfos)
      if (res.status === 10000) {
        yield put(createSetActivityHistoryInfos(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('activity/fetchActivityHistoryInfos/getActivityHistoryInfos', res.status, res.info)))
      }
    },
    * fetchActivityHistoryGifts({ payload }, { call, put }) {
      const res = yield call(getActivityHistoryGifts, payload.id)
      if (res.status === 10000) {
        yield put(createSetActivityHistoryGifts(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('activity/fetchActivityHistoryGifts/getActivityHistoryGifts', res.status, res.info)))
      }
    },
    * fetchActivityGifts({ payload }, { call, put }) {
      const res = yield call(getActivityGifts, payload.id)
      if (res.status === 10000) {
        yield put(createSetActivityGifts(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('activity/fetchActivityGifts/getActivityGifts', res.status, res.info)))
      }
    },
    * deleteActivity({ payload }, { call, put, all }) {
      const res = yield call(deleteActivity, payload.id)
      if (res.status === 10000) {
        yield all([
          put(createFetchActivityInfos()),
          put(createSuccessMessage('删除成功'))
        ])
      } else {
        yield put(createErrorMessage(createFetchError('activity/deleteActivity/deleteActivity', res.status, res.info)))
      }
    },
    * addActivity({ payload }, { call, put, all }) {
      let res
      if (payload.type === '线上活动') {
        res = yield call(addActivity, payload.title, payload.time_done, payload.time, payload.type, payload.link)
      } else {
        res = yield call(addActivity, payload.title, payload.time_done, payload.time, payload.type, payload.location, payload.introduction, payload.role)
      }
      if (res.status === 10000) {
        yield all([
          put(createFetchActivityInfos()),
          put(createSuccessMessage('申请成功'))
        ])
      } else {
        yield put(createErrorMessage(createFetchError('activity/addActivity/addActivity', res.status, res.info)))
      }
    }
  },
  reducers: {
    setActivityInfos(state, { payload }) {
      state.activityInfos = payload
    },
    setActivityHistoryInfos(state, { payload }) {
      state.activityHistoryInfos = payload
    },
    setActivityHistoryGifts(state, { payload }) {
      state.activityHistoryGifts = payload
    },
    setActivityGifts(state, { payload }) {
      state.activityGifts = payload
    },
  },
}

export default activityModel
