import { ImmerReducer, Subscription, Effect } from 'umi'
import { pathToRegexp } from 'path-to-regexp'
import { ActivityInfos, ActivityHistoryInfos, GiftInfos } from '@/interfaces/activity'
import { getActivityInfos, getActivityHistoryInfos, getActivityHistoryGifts } from '@/api/activity'
import { createFetchError } from '@/utils'
import { createErrorMessage } from './layout'
import { parse } from 'query-string'

export interface ActivityModelState {
  activityInfos: ActivityInfos,
  activityHistoryInfos: ActivityHistoryInfos,
  activityHistoryGifts: GiftInfos,
}

export interface ActivityModel {
  state: ActivityModelState,
  subscriptions: {
    onActivityPage: Subscription,
    onActivityHistoryPage: Subscription,
    onActivityHistoryGiftPage: Subscription,
  },
  effects: {
    fetchActivityInfos: Effect,
    fetchActivityHistoryInfos: Effect,
    fetchActivityHistoryGifts: Effect,
  },
  reducers: {
    setActivityInfos: ImmerReducer<ActivityModelState, ReturnType<typeof createSetActivityInfos>>,
    setActivityHistoryInfos: ImmerReducer<ActivityModelState, ReturnType<typeof createSetActivityHistoryInfos>>,
    setActivityHistoryGifts: ImmerReducer<ActivityModelState, ReturnType<typeof createSetActivityHistoryGifts>>,
  },
}

export const createFetchActivityInfos = () => ({ type: 'activity/fetchActivityInfos' })
export const createSetActivityInfos = (activityInfos: ActivityInfos) => ({
  type: 'activity/setActivityInfos',
  payload: activityInfos,
})
export const createFetchActivityHistoryInfos = () => ({ type: 'activity/fetchActivityHistoryInfos' })
export const createSetActivityHistoryInfos = (activityHistoryInfos: ActivityHistoryInfos) => ({
  type: 'activity/setActivityHistoryInfos',
  payload: activityHistoryInfos,
})
export const createFetchActivityHistoryGifts = (id: number) => ({
  type: 'activity/fetchActivityHistoryGifts',
  payload: { id },
})
export const createSetActivityHistoryGifts = (gifts: GiftInfos) => ({
  type: 'activity/setActivityHistoryGifts',
  payload: gifts,
})

const activityModel: ActivityModel = {
  state: {
    activityInfos: [],
    activityHistoryInfos: [],
    activityHistoryGifts: [],
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
    }
  },
}

export default activityModel
