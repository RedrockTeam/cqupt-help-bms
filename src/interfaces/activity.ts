export interface ActivityInfo {
  id: number,
  name: string,
  username: string,
  create_time: string,
  form: '线上活动' | '线下活动',
}

export type ActivityInfos = ActivityInfo[]

export type ActivityHistoryInfos = ActivityInfo[]

export interface GiftInfo {
  level: number,
  name: string,
  infos: {
    stu_num: string,
    name: string,
  }[],
}

export type GiftInfos = GiftInfo[]

export interface UpdateActivityOptions {
  activity_id: number,
  operation: 'add' | 'update' | 'delete',
  title?: string,
  time_done?: number,
  type?: 1 | 2, // 1 是线上，2 是线下
  link?: string,
  introduction?: string,
  role?: string,
  location?: string,
  time?: string,
}
