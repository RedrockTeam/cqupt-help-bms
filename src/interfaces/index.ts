// 前后端接口定义
import { UserInfo, UserToolAuth, UserTasks, UserHistories } from './user'
import { OrganizationMembers, OrganizationAuths } from './organization'

interface BaseStatus {
  /**
   * 10000: success
   * 10012: permission failed
   * 10010: param error
   */
  status: 10000 | 10012 | 10010,
  info: string,
}

// TODO: 优化 interface 定义逻辑
export interface UserInfoResponse extends BaseStatus {
  data: UserInfo,
}
export interface UserToolAuthResponse extends BaseStatus {
  data: UserToolAuth,
}

export interface UserTasksResponse extends BaseStatus {
  data: UserTasks
}

export interface UserHistoriesResponse extends BaseStatus {
  data: UserHistories
}

export interface OrganizationMembersResponse extends BaseStatus {
  data: OrganizationMembers
}

export interface OrganizationAuthsResponse extends BaseStatus {
  data: OrganizationAuths
}
