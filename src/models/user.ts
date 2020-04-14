import { pathToRegexp } from 'path-to-regexp'
import { getUserInfo, getUserToolAuth } from '@/api/user.ts'
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi'
import { UserToolAuth, UserInfo } from '@/interfaces/user'
import { UserToolAuthResponse, UserInfoResponse } from '@/interfaces'

export interface UserModelState {
  name: string,
  avatar: string,
  college: string,
  team: string,
  toolAuth: UserToolAuth,
}

export interface UserModel {
  state: UserModelState,
  subscriptions: {
    setup: Subscription,
  },
  effects: {
    fetchUserInfo: Effect
  },
  reducers: {
    setUserInfo: ImmerReducer<UserModelState>,
  },
}

const userModel: UserModel = {
  state: {
    name: '',
    avatar: '',
    college: '',
    team: '',
    toolAuth: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        // TODO: 等登录页面的接口，放到登录逻辑，目前先放到这，每次进入 user 页面会发请求
        const match = pathToRegexp('/user').exec(pathname)
        if (match) {
          dispatch({ type: 'fetchUserInfo' })
        }
      })
    },
  },
  effects: {
    *fetchUserInfo(action, { call, put, all }) {
      const [infoRes, toolRes]: [UserInfoResponse, UserToolAuthResponse] = yield all([
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
          type: 'global/error',
          payload: new Error(`fetchError: fetchUserInfo, ${infoRes.status}, ${toolRes.status}`),
        })
      }
    },
  },
  reducers: {
    setUserInfo(state, { payload }) {
      state.name = payload.name
      state.avatar = payload.avatar
      state.college = payload.college
      state.team = payload.team
      state.toolAuth = payload.toolAuth
    }
  },
}

export default userModel
