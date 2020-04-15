import { Effect, ImmerReducer, Subscription } from 'umi'
import { pathToRegexp } from 'path-to-regexp'
import { OrganizationMembersResponse } from '@/interfaces'
import { OrganizationMembers } from '@/interfaces/organization'
import { getOrganizationMembers } from '@/api/organization'

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
    *fetchMembers(action, { call, put }) {
      const res: OrganizationMembersResponse = yield call(getOrganizationMembers)
      if (res.status === 10000) {
        yield put({
          type: 'setMembers',
          payload: res.data || [],
        })
      } else {
        yield put({
          type: 'global/error',
          payload: new Error(`fetchError: fetchMembers, ${res.status}`),
        })
      }
    },
  },
  reducers: {
    setMembers(state, { payload }) {
      state.members = payload
    },
    deleteMember(state, { payload }) {
      
    }
  },
}

export default organizationModel
