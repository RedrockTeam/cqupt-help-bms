export interface UserInfo {
  name: string;
  avatar: string;
  college: string;
  team_name: string;
}

export interface ToolAuth {
  id: number;
  name: string;
  route: string;
}

export type UserToolAuth = ToolAuth[];

export interface UserTask {
  id: number;
  name: string;
  title: string;
  content: string;
  updated_time: string;
}

export type UserTasks = UserTask[];

export interface UserHistory {
  id: number;
  detail: string;
  created_at: string;
}

export type UserHistories = UserHistory[];
