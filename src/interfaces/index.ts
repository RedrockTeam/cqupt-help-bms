// 前后端接口定义
import { UserInfo, UserToolAuth } from './user'

interface BaseStatus {
  /**
   * 10000: success
   * 10012: permission failed
   * 10010: param error
   */
  status: 10000 | 10012 | 10010,
  info: string,
}

export interface UserInfoResponse extends BaseStatus {
  data: UserInfo,
}
export interface UserToolAuthResponse extends BaseStatus {
  data: UserToolAuth,
}

