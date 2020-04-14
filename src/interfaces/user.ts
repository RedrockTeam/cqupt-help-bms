export interface UserInfo {
  name: string,
  avatar: string,
  college: string,
  team_name: string,
}

export interface ToolAuth {
  id: number,
  detail: string,
  created_at: string,
}

export type UserToolAuth = ToolAuth[]
