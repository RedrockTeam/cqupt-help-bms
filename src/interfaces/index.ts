// 前后端接口定义
import { UserInfo, UserToolAuth, UserTasks, UserHistories } from './user'
import { OrganizationMembers, OrganizationAuths } from './organization'
import { IdInfos } from './id'

interface BaseStatus {
  /**
   * 10000: success
   * 10012: permission failed
   * 10010: param error
   */
  status: 10000 | 10012 | 10010,
  info: string,
}

// User
export interface GetUserInfoResponse extends BaseStatus {
  data: UserInfo,
}
export interface GetUserToolAuthResponse extends BaseStatus {
  data: UserToolAuth,
}

export interface GetUserTasksResponse extends BaseStatus {
  data: UserTasks
}

export interface GetUserHistoriesResponse extends BaseStatus {
  data: UserHistories
}

// Organization
export interface GetOrganizationMembersResponse extends BaseStatus {
  data: OrganizationMembers
}

export interface GetOrganizationAuthsResponse extends BaseStatus {
  data: OrganizationAuths
}

export interface GetOrganizationCanAuthListResponse extends BaseStatus {

}

export type OrganizationPublishTaskResponse = BaseStatus

export interface GetApplyingIdInfosResponse extends BaseStatus {
  data: IdInfos,
}

export type GetPassedIdInfosResponse = GetApplyingIdInfosResponse

export type PassIdApplyResponse = BaseStatus
