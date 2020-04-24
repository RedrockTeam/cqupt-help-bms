// 前后端接口定义
// TODO: 完善
import { UserInfo, UserToolAuth, UserTasks, UserHistories } from './user'
import { OrganizationMembers, OrganizationAuths, OrganizationCanAuthList } from './organization'
import { IdInfos } from './id'
import { ActivityInfos, ActivityHistoryInfos, GiftInfos } from './activity'

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
  data: UserTasks,
}

export interface GetUserHistoriesResponse extends BaseStatus {
  data: UserHistories,
}

// Organization
export interface GetOrganizationMembersResponse extends BaseStatus {
  data: OrganizationMembers,
}

export interface GetOrganizationAuthsResponse extends BaseStatus {
  data: OrganizationAuths,
}

export interface GetOrganizationCanAuthListResponse extends BaseStatus {
  data: OrganizationCanAuthList,
}

export type OrganizationPublishTaskResponse = BaseStatus

export type UpdateOrganizationMemberResponse = BaseStatus

export type UpdateOrganizationAuthResponse = BaseStatus

// Id
export interface GetApplyingIdInfosResponse extends BaseStatus {
  data: IdInfos,
}

export type GetPassedIdInfosResponse = GetApplyingIdInfosResponse

export type PassIdApplyResponse = BaseStatus

// Activity
export interface GetActivityInfosResponse extends BaseStatus {
  data: ActivityInfos,
}

export interface GetActivityHistoryInfosResponse extends BaseStatus {
  data: ActivityHistoryInfos,
}

export interface GetActivityHistoryGiftsResponse extends BaseStatus {
  data: GiftInfos,
}

export interface GetActivityGiftsResponse extends BaseStatus {
  data: GiftInfos,
}

export type DeleteActivityResponse = BaseStatus
export type AddActivityResponse = BaseStatus
export type UpdateActivityResponse = BaseStatus



