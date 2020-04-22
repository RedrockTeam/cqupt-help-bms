export interface ActivityInfo {
  id: number,
  name: string,
  username: string,
  create_time: string,
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

