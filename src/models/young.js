import { pathToRegexp } from 'path-to-regexp'
import { message } from 'antd'
import { getTeamInfo, updateTeamInfo, getCurrentInfo } from '../api/young'

export const createFetchTeamInfo = () => ({ type: 'fetchTeamInfo' })
export const createSetTeamInfo = (teamInfo) => ({ type: 'young/setTeamInfo', payload: teamInfo })
export const createUpdateTeamInfo = (detail, avatar) => ({
  type: 'young/updateTeamInfo',
  payload: { detail, avatar }
})
export const createFetchCurrentInfo = () => ({ type: 'fetchCurrentInfo' })
export const createSetCurrentInfo = (data) => ({
  type: 'setCurrentInfo',
  payload: data,
})

const YoungModel = {
  state: {
    teamInfo: {
      id: null, // number
      name: '',
      detail: '',
      avatar: '',
    },
    current: {
      step: null, // number 面试轮数
      data: [],
    },
  },
  subscriptions: {
    onInputPage({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/young-input').exec(pathname)
        if (match) {
          console.log('on page: /young-input')
          dispatch(createFetchTeamInfo())
        }
      })
    },
    onPushPage({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/young-push').exec(pathname)
        if (match) {
          console.log('on page: /young-push')
          dispatch(createFetchCurrentInfo())
        }
      })
    }
  },
  effects: {
    * fetchTeamInfo(action, { call, put }) {
      const data = yield call(getTeamInfo)
      yield put(createSetTeamInfo(data))
    },
    * updateTeamInfo({ payload }, { call, put }) {
      yield call(updateTeamInfo, payload.detail, payload.avatar)
      message.success('修改成功')
    },
    * fetchCurrentInfo(action, { call, put }) {
      const data = yield call(getCurrentInfo)
      yield put(createSetCurrentInfo(data))
    }
  },
  reducers: {
    setTeamInfo(state, { payload }) {
      state.teamInfo = payload
    },
    setCurrentInfo(state, { payload }) {
      state.current.step = payload.step
      state.current.data = payload.data
    }
  },
}

export default YoungModel
