import { ImmerReducer, Subscription, Effect } from 'umi'
import { pathToRegexp } from 'path-to-regexp'
import { ActivityInfos } from '@/interfaces/activity'
import { getActivityInfos } from '@/api/activity'
import { createFetchError } from '@/utils'
import { createErrorMessage } from './layout'

export interface ActivityModelState {
  activities: ActivityInfos,

}

export interface ActivityModel {
  state: ActivityModelState,
  subscriptions: {
    onActivityPage: Subscription,
  },
  effects: {
    fetchActivityInfos: Effect,
  },
  reducers: {
    setActivityInfos: ImmerReducer<ActivityModelState, ReturnType<typeof createSetActivityInfos>>,
  },
}

export const createFetchActivityInfos = () => ({ type: 'activity/fetchActivityInfos' })
export const createSetActivityInfos = (activityInfos: ActivityInfos) => ({
  type: 'activity/setActivityInfos',
  payload: activityInfos,
})

const activityModel: ActivityModel = {
  state: {
    activities: [],
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
  },
  reducers: {
    setActivityInfos(state, { payload }) {
      state.activities = payload
    },
  },
}

export default activityModel
