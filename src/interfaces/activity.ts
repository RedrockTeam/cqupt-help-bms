export interface ActivityInfo {
  id: number;
  name: string;
  username: string;
  create_time: string;
  form: '线上活动' | '线下活动';
}

export type ActivityInfos = ActivityInfo[];

export type ActivityHistoryInfos = ActivityInfo[];

export interface GiftInfo {
  level: number;
  name: string;
  stu_nums: string[];
  names: string[];
}

export type GiftInfos = GiftInfo[];

export interface UpdateActivityOptions {
  activity_id: number;
  operation: 'add' | 'update' | 'delete';
  title?: string;
  time_done?: number;
  type?: 1 | 2; // 1 是线上，2 是线下
  link?: string;
  introduction?: string;
  role?: string;
  location?: string;
  time?: string;
}

export interface PushGiftInputResult {
  name: string;
  level: number;
  stu_nums: string[];
}

export type PushGiftInputResults = PushGiftInputResult[];

export interface PushGiftInfoOptions {
  activity_id: number;
  location: string;
  time_begin: number;
  time_end: number;
  time_out: number;
  gift_models: PushGiftInputResults;
}
