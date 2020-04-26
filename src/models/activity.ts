import { ImmerReducer, Subscription, Effect } from 'umi'
import { pathToRegexp } from 'path-to-regexp'
import { ActivityInfos, ActivityHistoryInfos, GiftInfos, UpdateActivityOptions, PushGiftInputResults } from '@/interfaces/activity'
import { getActivityInfos, getActivityHistoryInfos, getActivityHistoryGifts, getActivityGifts, deleteActivity, addActivity, commitPushGift } from '@/api/activity'
import { createFetchError } from '@/utils'
import { createErrorMessage, createSuccessMessage } from './layout'

export interface ActivityModelState {
  activityInfos: ActivityInfos,
  activityHistoryInfos: ActivityHistoryInfos,
  activityHistoryGifts: GiftInfos,
  activityGifts: GiftInfos,
  pushGiftInputs: PushGiftInputResults,
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
    commitPushGift: Effect,
  },
  reducers: {
    setActivityInfos: ImmerReducer<ActivityModelState, ReturnType<typeof createSetActivityInfos>>,
    setActivityHistoryInfos: ImmerReducer<ActivityModelState, ReturnType<typeof createSetActivityHistoryInfos>>,
    setActivityHistoryGifts: ImmerReducer<ActivityModelState, ReturnType<typeof createSetActivityHistoryGifts>>,
    setActivityGifts: ImmerReducer<ActivityModelState, ReturnType<typeof createSetActivityGifts>>,
    setPushGiftInputLevel: ImmerReducer<ActivityModelState, ReturnType<typeof createSetPushGiftInputLevel>>,
    setPushGiftInputName: ImmerReducer<ActivityModelState, ReturnType<typeof createSetPushGiftInputName>>
    setPushGiftInputStuNum: ImmerReducer<ActivityModelState, ReturnType<typeof createSetPushGiftInputStuNum>>
    addPushGiftInput: ImmerReducer<ActivityModelState>,
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
export const createSetPushGiftInputLevel = (index: number, level: number) => ({
  type: 'activity/setPushGiftInputLevel',
  payload: { index, level },
})
export const createSetPushGiftInputName = (index: number, name: string) => ({
  type: 'activity/setPushGiftInputName',
  payload: { index, name },
})
export const createSetPushGiftInputStuNum = (index: number, stuNum: string) => ({
  type: 'activity/setPushGiftInputStuNum',
  payload: { index, stuNum },
})
export const createAddPushGiftInput = () => ({ type: 'activity/addPushGiftInput' })
export const createCommitPushGift = (
  id: number,
  location: string,
  timeBegin: number,
  timeEnd: number,
  timeOut: number,
  gifts: PushGiftInputResults,
) => ({
  type: 'activity/commitPushGift',
  payload: { activity_id: id, location, timeBegin, timeEnd, timeOut, gift_models: gifts },
})

const activityModel: ActivityModel = {
  state: {
    activityInfos: [],
    activityHistoryInfos: [],
    activityHistoryGifts: [],
    activityGifts: [],
    pushGiftInputs: [],
  },
  subscriptions: {
    onActivityPage({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/activity').exec(pathname)
        if (match) {
          console.log('on page: /activity')
          dispatch(createFetchActivityInfos())
        }
      })
    },
    onActivityHistoryPage({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/activity/history').exec(pathname)
        if (match) {
          console.log('on page: /activity/history/')
          dispatch(createFetchActivityHistoryInfos())
        }
      })
    },
    onActivityHistoryGiftPage({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/activity/history/:info').exec(pathname)
        if (match) {
          console.log('on page: /activity/history/:info')
          dispatch(createFetchActivityHistoryGifts(parseInt(match[1], 10)))
        }
      })
    },
    onActivityGiftPage({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/activity/:info').exec(pathname)
        if (match && match[1] !== 'history') {
          console.log('on page: /activity/:info')
          dispatch(createFetchActivityGifts(parseInt(match[1], 10)))
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
          put(createSuccessMessage('申请成功')),
        ])
      } else {
        yield put(createErrorMessage(createFetchError('activity/addActivity/addActivity', res.status, res.info)))
      }
    },
    * commitPushGift({ payload }, { call, put }) {
      const res = yield call(commitPushGift, payload)
      if (res.status === 10000) {
        yield put(createSuccessMessage('推送成功'))
        setTimeout(() => window.location.pathname = '/activity', 2000)
      } else {
        yield put(createErrorMessage(createFetchError('activity/commitPushGift/commitPushGift', res.status, res.info)))
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
    setPushGiftInputLevel(state, { payload }) {
      state.pushGiftInputs[payload.index].level = payload.level
    },
    setPushGiftInputName(state, { payload }) {
      state.pushGiftInputs[payload.index].name = payload.name
    },
    setPushGiftInputStuNum(state, { payload }) {
      state.pushGiftInputs[payload.index].stu_nums.push(payload.stuNum)
    },
    addPushGiftInput(state) {
      state.pushGiftInputs.push({
        name: '',
        level: 0,
        stu_nums: [],
      })
    },
  },
}

export default activityModel
