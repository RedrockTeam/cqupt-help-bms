import { Effect, ImmerReducer, Subscription } from 'umi'
import { pathToRegexp } from 'path-to-regexp'
import { IdInfos } from '@/interfaces/id'
import { createFetchError } from '@/utils'
import { getApplyingIdInfos, getPassedIdInfos, passIdApply } from '@/api/id'
import { createSuccessMessage, createErrorMessage } from './layout'

export interface IdModelState {
  applyList: IdInfos,
  passList: IdInfos,
}

export interface IdModel {
  state: IdModelState,
  subscriptions: {
    onIdPage: Subscription,
    onIdHistory: Subscription,
  },
  effects: {
    fetchApplyingIdInfos: Effect,
    fetchPassedIdInfos: Effect,
    passIdApply: Effect,
  },
  reducers: {
    setApplyingIdInfos: ImmerReducer<IdModelState, ReturnType<typeof createSetApplyingIdInfos>>,
    setPassedIdInfos: ImmerReducer<IdModelState, ReturnType<typeof createSetPassedIdInfos>>,
  },
}

export const createFetchApplyingIdInfos = () => ({ type: 'fetchApplyingIdInfos' })
export const createFetchPassedIdInfos = () => ({ type: 'fetchPassedIdInfos' })
export const createSetApplyingIdInfos = (applyingIdInfos: IdInfos) => ({
  type: 'setApplyingIdInfos',
  payload: applyingIdInfos || [],
})
export const createSetPassedIdInfos = (passedIdInfos: IdInfos) => ({
  type: 'setPassedIdInfos',
  payload: passedIdInfos || [],
})
export const createPassIdApply = (ids: number[]) => ({
  type: 'id/passIdApply',
  payload: { ids },
})

const idModel: IdModel = {
  state: {
    applyList: [],
    passList: [],
  },
  subscriptions: {
    onIdPage({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/id').exec(pathname)
        if (match) {
          dispatch(createFetchApplyingIdInfos())
        }
      })
    },
    onIdHistory({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/id/history').exec(pathname)
        if (match) {
          dispatch(createFetchPassedIdInfos())
        }
      })
    },
  },
  effects: {
    * fetchApplyingIdInfos(action, { call, put }) {
      const res = yield call(getApplyingIdInfos)
      if (res.status === 10000) {
        yield put(createSetApplyingIdInfos(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('id/fetchApplyingIdInfos/getApplyingIdInfos', res.status, res.info)))
      }
    },
    * fetchPassedIdInfos(action, { call, put }) {
      const res = yield call(getPassedIdInfos)
      if (res.status === 10000) {
        yield put(createSetPassedIdInfos(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('id/fetchPassedIdInfos/getPassedIdInfos', res.status, res.info)))
      }
    },
    * passIdApply({ payload }, { call, put, all }) {
      const res = yield call(passIdApply, payload.ids)
      if (res.status === 10000) {
        yield all([
          put(createSuccessMessage('生成成功')),
          put(createFetchApplyingIdInfos()),
        ])
      } else {
        yield put(createErrorMessage(createFetchError('id/passIdApply/passIdApply', res.status, res.info)))
      }
    }
  },
  reducers: {
    setApplyingIdInfos(state, { payload }) {
      state.applyList = payload
    },
    setPassedIdInfos(state, { payload }) {
      state.passList = payload
    },
  },
}

export default idModel
