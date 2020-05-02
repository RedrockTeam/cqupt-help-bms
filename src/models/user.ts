import { pathToRegexp } from 'path-to-regexp'
import { getUserTasks, getUserHistories } from '@/api/user.ts'
import { Effect, ImmerReducer, Subscription } from 'umi'
import { UserTasks, UserHistories } from '@/interfaces/user'

export interface UserModelState {
  tasks: UserTasks,
  histories: UserHistories,
}

export interface UserModel {
  state: UserModelState,
  subscriptions: {
    onPage: Subscription,
    onHistories: Subscription,
  },
  effects: {
    fetchUserTasks: Effect,
    fetchUserHistories: Effect,
  },
  reducers: {
    setUserTasks: ImmerReducer<UserModelState, ReturnType<typeof createSetUserTasks>>,
    setUserHistories: ImmerReducer<UserModelState, ReturnType<typeof createSetUserHistories>>,
  },
}

export const createFetchUserTasks = () => ({ type: 'fetchUserTasks' })
export const createFetchUserHistories = () => ({ type: 'fetchUserHistories' })
export const createSetUserTasks = (userTask: UserTasks) => ({
  type: 'setUserTasks',
  payload: userTask || [],
})
export const createSetUserHistories = (userHistories: UserHistories) => ({
  type: 'setUserHistories',
  payload: userHistories || [],
})

const userModel: UserModel = {
  state: {
    tasks: [],
    histories: [],
  },
  subscriptions: {
    onPage({ dispatch, history }) {
      history.listen(({ pathname }) => {
        // TODO: 等登录页面的接口，放到登录逻辑，目前先放到这，每次进入 user 页面会发请求
        const match = pathToRegexp('/user').exec(pathname)
        if (match) {
          console.log('on page: /user')
          dispatch(createFetchUserTasks())
        }
      })
    },
    onHistories({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/user/history').exec(pathname)
        if (match) {
          console.log('on page: /user/history')
          dispatch(createFetchUserHistories())
        }
      })
    }
  },
  effects: {
    * fetchUserTasks(action, { call, put }) {
      const data = yield call(getUserTasks)
      yield put(createSetUserTasks(data))
    },
    * fetchUserHistories(action, { call, put }) {
      const data = yield call(getUserHistories)
      yield put(createSetUserHistories(data))
    }
  },
  reducers: {
    setUserTasks(state, { payload }) {
      state.tasks = payload
    },
    setUserHistories(state, { payload }) {
      state.histories = payload
    },
  },
}

export default userModel
