import { Effect, ImmerReducer, Subscription } from 'umi'
import { pathToRegexp } from 'path-to-regexp'
// import { OrganizationMembersResponse, OrganizationAuthsResponse, OrganizationPublishTaskResponse } from '@/interfaces'
import { OrganizationMembers, OrganizationAuths, TeamPersons } from '@/interfaces/organization'
import { getOrganizationMembers, updateOrganizationMember, getOrganizationAuths, getOrganizationCanAuthList, updateOrganizationAuth, publishTask } from '@/api/organization'
import { createFetchError } from '@/utils'
import { createSuccessMessage, createErrorMessage } from './layout'

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
    publishTask: Effect,
  },
  reducers: {
    setMembers: ImmerReducer<OrganizationModelState, ReturnType<typeof createSetMembers>>,
    setAuths: ImmerReducer<OrganizationModelState, ReturnType<typeof createSetAuths>>,
    setCanAuthList: ImmerReducer<OrganizationModelState, ReturnType<typeof createSetCanAuthList>>,
  },
}

export const createFetchAuths = () => ({ type: 'fetchAuths' })
export const createFetchMembers = () => ({ type: 'fetchMembers' })
export const createSetAuths = (auths: OrganizationAuths) => ({
  type: 'setAuths',
  payload: auths || [],
})
export const createSetCanAuthList = (canAuthList: TeamPersons) => ({
  type: 'setCanAuthList',
  payload: canAuthList || [],
})
export const createSetMembers = (members: OrganizationMembers) => ({
  type: 'setMembers',
  payload: members || [],
})
export const createUpdateAuth = (jobId: number, UserId: number, originUserId: number) => ({
  type: 'organization/updateAuth',
  payload: {
    job_id: jobId,
    user_id: UserId,
    origin_user_id: originUserId,
  }
})
export const createFetchCanAuthList = (jobId: number) => ({
  type: 'organization/fetchCanAuthList',
  payload: { job_id: jobId },
})
export const createAddMember = (stuNum: string, jobId: number) => ({
  type: 'organization/addMember',
  payload: {
    stuNum,
    job_id: jobId,
  }
})
export const createDeleteMember = (id: number, jobId: number) => ({
  type: 'organization/deleteMember',
  payload: {
    stu_num: `${id}`, // 后端接口，删除时由于没有获得 stu_num 直接在这里使用 id 替代，类型兼容 stu_num 所以转换成 string
    job_id: jobId,
  },
})
export const createPublishTask = (title: string, content: string) => ({
  type: 'organization/publishTask',
  payload: {
    title,
    content,
  }
})

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
          dispatch(createFetchAuths())
        }
      })
    },
    onMember({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/organization-member').exec(pathname)
        if (match) {
          dispatch(createFetchMembers())
        }
      })
    },
  },
  effects: {
    * fetchAuths(action, { call, put }) {
      const res = yield call(getOrganizationAuths)
      if (res.status === 10000) {
        yield put(createSetAuths(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('organization/fetchAuths', res.status, res.info)))
      }
    },
    * fetchCanAuthList({ payload }, { call, put }) {
      const res = yield call(getOrganizationCanAuthList, payload.job_id)
      if (res.status === 10000) {
        yield put(createSetCanAuthList(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('organization/fetchCanAuthList', res.status, res.info)))
      }
    },
    * updateAuth({ payload }, { call, put }) {
      const res = yield call(updateOrganizationAuth, payload.job_id, payload.origin_user_id, payload.user_id)
      if (res.status === 10000) {
        yield put(createFetchAuths())
      } else {
        yield put(createErrorMessage(createFetchError('organization/updateAuth', res.status, res.info)))
      }
    },
    * fetchMembers(action, { call, put }) {
      const res = yield call(getOrganizationMembers)
      if (res.status === 10000) {
        yield put(createSetMembers(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('organization/fetchMembers', res.status, res.info)))
      }
    },
    * deleteMember({ payload }, { call, put }) {
      const res = yield call(updateOrganizationMember, 'delete', payload.id, payload.job_id)
      if (res.status === 10000) {
        yield put(createFetchMembers())
      } else {
        yield put(createErrorMessage(createFetchError('organization/deleteMember', res.status, res.info)))
      }
    },
    * addMember({ payload }, { call, put }) {
      const res = yield call(updateOrganizationMember, 'add', payload.stuNum, payload.job_id)
      if (res.status === 10000) {
        yield put(createFetchMembers())
      } else {
        yield put(createErrorMessage(createFetchError('organization/addMember', res.status, res.info)))
      }
    },
    * publishTask({ payload }, { call, put }) {
      const res = yield call(publishTask, payload.title, payload.content)
      if (res.status === 10000) {
        yield put(createSuccessMessage('发送成功'))
      } else {
        yield put(createErrorMessage(createFetchError('organization/publishTask', res.status, res.info)))
      }
    },
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
