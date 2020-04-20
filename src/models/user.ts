import { pathToRegexp } from 'path-to-regexp'
import { getUserInfo, getUserToolAuth, getUserTasks, getUserHistories } from '@/api/user.ts'
import { Effect, ImmerReducer, Subscription } from 'umi'
import { UserToolAuth, UserTasks, UserHistories } from '@/interfaces/user'
import { GetUserToolAuthResponse, GetUserInfoResponse, GetUserTasksResponse, GetUserHistoriesResponse } from '@/interfaces'
import { createFetchError } from '@/utils'
import { createErrorMessage } from './layout'

export interface UserInfo {
  name: string,
  avatar: string,
  college: string,
  team_name: string,
  toolAuth: UserToolAuth,
}
export interface UserModelState {
  info: UserInfo,
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
    fetchUserInfo: Effect,
    fetchUserTasks: Effect,
    fetchUserHistories: Effect,
  },
  reducers: {
    setUserInfo: ImmerReducer<UserModelState, ReturnType<typeof createSetUserInfo>>,
    setUserTasks: ImmerReducer<UserModelState, ReturnType<typeof createSetUserTasks>>,
    setUserHistories: ImmerReducer<UserModelState, ReturnType<typeof createSetUserHistories>>,
  },
}

export const createFetchUserInfo = () => ({ type: 'user/fetchUserInfo' })
export const createFetchUserTasks = () => ({ type: 'user/fetchUserTasks' })
export const createFetchUserHistories = () => ({ type: 'user/fetchUserHistories' })
export const createSetUserInfo = (userInfo: UserInfo) => ({
  type: 'user/setUserInfo',
  payload: userInfo,
})
export const createSetUserTasks = (userTask: UserTasks) => ({
  type: 'user/setUserTasks',
  payload: userTask || [],
})
export const createSetUserHistories = (userHistories: UserHistories) => ({
  type: 'user/setUserHistories',
  payload: userHistories || [],
})

const userModel: UserModel = {
  state: {
    info: {
      name: '',
      avatar: '',
      college: '',
      team_name: '',
      toolAuth: [],
    },
    tasks: [],
    histories: [],
  },
  subscriptions: {
    onPage({ dispatch, history }) {
      history.listen(({ pathname }) => {
        // TODO: 等登录页面的接口，放到登录逻辑，目前先放到这，每次进入 user 页面会发请求
        const match = pathToRegexp('/user').exec(pathname)
        if (match) {
          dispatch(createFetchUserInfo())
          dispatch(createFetchUserTasks())
        }
      })
    },
    onHistories({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/user/history').exec(pathname)
        if (match) {
          dispatch(createFetchUserHistories())
        }
      })
    }
  },
  effects: {
    * fetchUserInfo(action, { call, put, all }) {
      const [infoRes, toolRes]: [
        GetUserInfoResponse,
        GetUserToolAuthResponse,
      ] = yield all([
        call(getUserInfo),
        call(getUserToolAuth),
      ])
      if (infoRes.status === 10000 && toolRes.status === 10000) {
        yield put(createSetUserInfo({ ...infoRes.data, toolAuth: toolRes.data }))
      } else {
        yield put(createErrorMessage([
          createFetchError('user/fetchUserInfo/getUserInfo', infoRes.status, infoRes.info),
          createFetchError('user/fetchUserInfo/getUserToolAuth', toolRes.status, toolRes.info),
        ]))
      }
    },
    * fetchUserTasks(action, { call, put }) {
      const res: GetUserTasksResponse = yield call(getUserTasks)
      if (res.status === 10000) {
        yield put(createSetUserTasks(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('user/fetchUserTasks/getUserTasks', res.status, res.info)))
      }
    },
    * fetchUserHistories(action, { call, put }) {
      const res: GetUserHistoriesResponse = yield call(getUserHistories)
      if (res.status === 10000) {
        yield put(createSetUserHistories(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('user/fetchUserHistories/getUserHistories', res.status, res.info)))
      }
    }
  },
  reducers: {
    setUserInfo(state, { payload }) {
      state.info = payload
    },
    setUserTasks(state, { payload }) {
      state.tasks = payload
    },
    setUserHistories(state, { payload }) {
      state.histories = payload
    },
  },
}

export default userModel
