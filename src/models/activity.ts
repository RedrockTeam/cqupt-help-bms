import { ImmerReducer, Subscription, Effect } from 'umi'
import { message } from 'antd'
import { pathToRegexp } from 'path-to-regexp'
import {
  ActivityInfos,
  ActivityHistoryInfos,
  GiftInfos,
  UpdateActivityOptions,
  PushGiftInputResults,
} from '@/interfaces/activity'
import {
  getActivityInfos,
  getActivityHistoryInfos,
  getActivityHistoryGifts,
  getActivityGifts,
  deleteActivity,
  addActivity,
  commitPushGift,
} from '@/api/activity'
import { redirectTo } from '@/utils'

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
      const data = yield call(getActivityInfos)
      yield put(createSetActivityInfos(data))
    },
    * fetchActivityHistoryInfos(action, { call, put }) {
      const data = yield call(getActivityHistoryInfos)
      yield put(createSetActivityHistoryInfos(data))
    },
    * fetchActivityHistoryGifts({ payload }, { call, put }) {
      const data = yield call(getActivityHistoryGifts, payload.id)
      yield put(createSetActivityHistoryGifts(data))
    },
    * fetchActivityGifts({ payload }, { call, put }) {
      const data = yield call(getActivityGifts, payload.id)
      yield put(createSetActivityGifts(data))
    },
    * deleteActivity({ payload }, { call, put }) {
      yield call(deleteActivity, payload.id)
      yield put(createFetchActivityInfos())
      message.success('删除成功')
    },
    * addActivity({ payload }, { call, put }) {
      if (payload.type === '线上活动') {
        yield call(addActivity, payload.title, payload.time_done, payload.time, payload.type, payload.link)
      } else {
        yield call(addActivity, payload.title, payload.time_done, payload.time, payload.type, payload.location, payload.introduction, payload.role)
      }
      yield put(createFetchActivityInfos())
      message.success('申请成功')
    },
    * commitPushGift({ payload }, { call }) {
      yield call(commitPushGift, payload)
      message.success('推送成功')
      redirectTo('/activity', 2000)
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
