import { ImmerReducer, Effect, Subscription } from 'umi'
import { pathToRegexp } from 'path-to-regexp'
import { VolunteerActivities } from '@/interfaces/volunteer'
import { createErrorMessage } from './layout'
import { createFetchError } from '@/utils'
import { getVolunteerActivities } from '@/api/volunteer'

export interface VolunteerModelState {
  volunteerActivities: VolunteerActivities,
}

export interface VolunteerModel {
  state: VolunteerModelState,
  subscriptions: {
    onVolunteerPage: Subscription,
  },
  effects: {
    fetchVolunteerActivities: Effect,
  },
  reducers: {
    setVolunteerActivities: ImmerReducer<VolunteerModelState, ReturnType<typeof createSetVolunteerActivities>>,
  },
}

export const createFetchVolunteerActivities = () => ({ type: 'fetchVolunteerActivities' })
export const createSetVolunteerActivities = (volunteerActivities: VolunteerActivities) => ({
  type: 'setVolunteerActivities',
  payload: volunteerActivities,
})

const volunteerModel: VolunteerModel = {
  state: {
    volunteerActivities: [],
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
  },
  effects: {
    * fetchVolunteerActivities(action, { call, put }) {
      const res = yield call(getVolunteerActivities)
      if (res.status === 10000) {
        yield put(createSetVolunteerActivities(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('user/fetchUserTasks/getUserTasks', res.status, res.info)))
      }
    },
  },
  reducers: {
    setVolunteerActivities(state, { payload }) {
      state.volunteerActivities = payload
    },
  },
}

export default volunteerModel
