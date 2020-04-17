import { Effect, ImmerReducer, Subscription } from 'umi'
import { pathToRegexp } from 'path-to-regexp'
import { OrganizationMembersResponse, OrganizationAuthsResponse } from '@/interfaces'
import { OrganizationMembers, OrganizationAuths, TeamPersons } from '@/interfaces/organization'
import { getOrganizationMembers, updateOrganizationMember, getOrganizationAuths, getOrganizationCanAuthList, updateOrganizationAuths } from '@/api/organization'
import { createFetchError } from '@/utils'

export interface OrganizationModelState {
  members: OrganizationMembers,
  auths: OrganizationAuths,
  canAuthList: TeamPersons,
}

export interface OrganizationModel {
  state: OrganizationModelState,
  subscriptions: {
    onAuth: Subscription,
    onMember: Subscription,
  },
  effects: {
    fetchAuths: Effect,
    fetchCanAuthList: Effect,
    updateAuth: Effect,
    fetchMembers: Effect,
    deleteMember: Effect,
    addMember: Effect,
  },
  reducers: {
    setMembers: ImmerReducer<OrganizationModelState>,
    setAuths: ImmerReducer<OrganizationModelState>,
    setCanAuthList: ImmerReducer<OrganizationModelState>,
  },
}

const organizationModel: OrganizationModel = {
  state: {
    members: [],
    auths: [],
    canAuthList: [],
  },
  subscriptions: {
    onAuth({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/organization-auth').exec(pathname)
        if (match) {
          dispatch({ type: 'fetchAuths' })
        }
      })
    },
    onMember({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/organization-member').exec(pathname)
        if (match) {
          dispatch({ type: 'fetchMembers' })
        }
      })
    },
  },
  effects: {
    * fetchAuths(action, { call, put }) {
      const res: OrganizationAuthsResponse = yield call(getOrganizationAuths)
      if (res.status === 10000) {
        yield put({
          type: 'setAuths',
          payload: res.data || [],
        })
      } else {
        yield put({
          type: 'layout/error',
          payload: createFetchError('organization/fetchAuths', res.status, res.info),
        })
      }
    },
    * fetchCanAuthList({ payload }, { call, put }) {
      const res = yield call(getOrganizationCanAuthList, payload.job_id)
      if (res.status === 10000) {
        yield put({
          type: 'setCanAuthList',
          payload: res.data || [],
        })
      } else {
        yield put({
          type: 'layout/error',
          payload: createFetchError('organization/fetchCanAuthList', res.status, res.info),
        })
      }
    },
    * updateAuth({ payload }, { call, put }) {
      const res = yield call(updateOrganizationAuths, payload.job_id, payload.origin_user_id, payload.user_id)
      if (res.status === 10000) {
        yield put({
          type: 'fetchAuths',
        })
      } else {
        yield put({
          type: 'layout/error',
          payload: createFetchError('organization/updateAuth', res.status, res.info),
        })
      }
    },
    * fetchMembers(action, { call, put }) {
      const res: OrganizationMembersResponse = yield call(getOrganizationMembers)
      if (res.status === 10000) {
        yield put({
          type: 'setMembers',
          payload: res.data || [],
        })
      } else {
        yield put({
          type: 'layout/error',
          payload: createFetchError('organization/fetchMembers', res.status, res.info),
        })
      }
    },
    * deleteMember({ payload }, { call, put }) {
      // TODO: 等后端改成 stuNum
      const res = yield call(updateOrganizationMember, 'delete', payload.id, payload.job_id)
      if (res.status === 10000) {
        yield put({
          type: 'fetchMembers',
        })
      } else {
        yield put({
          type: 'layout/error',
          payload: createFetchError('organization/deleteMember', res.status, res.info),
        })
      }
    },
    * addMember({ payload }, { call, put }) {
      const res = yield call(updateOrganizationMember, 'add', payload.stuNum, payload.job_id)
      if (res.status === 10000) {
        yield put({
          type: 'fetchMembers',
        })
      } else {
        yield put({
          type: 'layout/error',
          payload: createFetchError('organization/addMember', res.status, res.info),
        })
      }
    }
  },
  reducers: {
    setMembers(state, { payload }) {
      state.members = payload
    },
    setAuths(state, { payload }) {
      state.auths = payload
    },
    setCanAuthList(state, { payload }) {
      state.canAuthList = payload
    }
  },
}

export default organizationModel
