import { pathToRegexp } from 'path-to-regexp'
import { getUserInfo, getUserToolAuth, getUserTasks, getUserHistories } from '@/api/user.ts'
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi'
import { UserToolAuth, UserInfo, UserTasks, UserHistories } from '@/interfaces/user'
import { UserToolAuthResponse, UserInfoResponse, UserTasksResponse, UserHistoriesResponse } from '@/interfaces'
import { createFetchError } from '@/utils'
export interface UserModelState {
  info: {
    name: string,
    avatar: string,
    college: string,
    team: string,
    toolAuth: UserToolAuth,
  },
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
    setUserInfo: ImmerReducer<UserModelState>,
    setUserTasks: ImmerReducer<UserModelState>,
    setUserHistories: ImmerReducer<UserModelState>,
  },
}

const userModel: UserModel = {
  state: {
    info: {
      name: '',
      avatar: '',
      college: '',
      team: '',
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
          dispatch({ type: 'fetchUserInfo' })
          dispatch({ type: 'fetchUserTasks' })
        }
      })
    },
    onHistories({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/user/history').exec(pathname)
        if (match) {
          dispatch({ type: 'fetchUserHistories' })
        }
      })
    }
  },
  effects: {
    * fetchUserInfo(action, { call, put, all }) {
      const [infoRes, toolRes]: [
        UserInfoResponse,
        UserToolAuthResponse,
      ] = yield all([
        call(getUserInfo),
        call(getUserToolAuth),
      ])
      if (infoRes.status === 10000 && toolRes.status === 10000) {
        yield put({
          type: 'setUserInfo',
          payload: {
            ...infoRes.data,
            team: infoRes.data.team_name,
            toolAuth: toolRes.data,
          },
        })
      } else {
        yield put({
          type: 'layout/error',
          payload: [
            createFetchError('user/fetchUserInfo/getUserInfo', infoRes.status, infoRes.info),
            createFetchError('user/fetchUserInfo/getUserToolAuth', toolRes.status, toolRes.info),
          ],
        })
      }
    },
    * fetchUserTasks(action, { call, put }) {
      const res: UserTasksResponse = yield call(getUserTasks)
      if (res.status === 10000) {
        yield put({
          type: 'setUserTasks',
          payload: res.data || [],
        })
      } else {
        yield put({
          type: 'layout/error',
          payload: createFetchError('user/fetchUserTasks/getUserTasks', res.status, res.info),
        })
      }
    },
    * fetchUserHistories(action, { call, put }) {
      const res: UserHistoriesResponse = yield call(getUserHistories)
      if (res.status === 10000) {
        yield put({
          type: 'setUserHistories',
          payload: res.data || [],
        })
      } else {
        yield put({
          type: 'layout/error',
          payload: createFetchError('user/fetchUserHistories/getUserHistories', res.status, res.info),
        })
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
