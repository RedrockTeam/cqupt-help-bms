import { Effect, ImmerReducer, Subscription } from 'umi'
import { pathToRegexp } from 'path-to-regexp'
import { OrganizationMembersResponse } from '@/interfaces'
import { OrganizationMembers } from '@/interfaces/organization'
import { getOrganizationMembers, updateOrganizationMember } from '@/api/organization'
import { createFetchError } from '@/utils'

export interface OrganizationModelState {
  members: OrganizationMembers,
}

export interface OrganizationModel {
  state: OrganizationModelState,
  subscriptions: {
    onMember: Subscription,
  },
  effects: {
    fetchMembers: Effect,
    deleteMember: Effect,
    addMember: Effect,
  },
  reducers: {
    setMembers: ImmerReducer<OrganizationModelState>,
  },
}

const organizationModel: OrganizationModel = {
  state: {
    members: [],
  },
  subscriptions: {
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
  },
}

export default organizationModel
