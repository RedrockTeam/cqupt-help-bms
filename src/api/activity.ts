import { request } from 'umi'
import {
  UpdateActivityOptions,
  PushGiftInfoOptions,
  ActivityInfos,
  ActivityHistoryInfos,
  GiftInfos,
} from '@/interfaces/activity'

export const getActivityInfos = (): Promise<ActivityInfos> => {
  return request(`/activity/activity/info`)
}

export const getActivityHistoryInfos = (): Promise<ActivityHistoryInfos> => {
  return request(`/activity/activity/history`, {
    method: 'POST',
    body: JSON.stringify({
      page: 1,
      size: 10,
    }),
  })
}

export const getActivityHistoryGifts = (id: number): Promise<GiftInfos> => {
  return request(`/activity/gift/history`, {
    method: 'POST',
    body: JSON.stringify({ id }),
  })
}

export const getActivityGifts = (id: number): Promise<GiftInfos> => {
  return request(`/activity/gift/info`, {
    method: 'POST',
    body: JSON.stringify({ id }),
  })
}

export const deleteActivity = (id: number): Promise<null> => {
  return request(`/activity/activity/update`, {
    method: 'POST',
    body: JSON.stringify({
      operation: 'delete',
      activity_id: id,
    }),
  })
}

export function addActivity(
  title: string,
  time_done: number,
  time: string,
  type: '线上活动',
  link: string,
): Promise<null>
export function addActivity(
  title: string,
  time_done: number,
  time: string,
  type: '线下活动',
  location: string,
  introduction: string,
  role: string,
): Promise<null>
export function addActivity(
  title: string,
  time_done: number,
  time: string,
  type: '线上活动' | '线下活动',
  linkOrlocation: string,
  introduction?: string,
  role?: string,
): Promise<null> {
  let opts: UpdateActivityOptions = { operation: 'add', activity_id: 0 }
  if (type === '线上活动') {
    opts = {
      ...opts,
      title,
      time_done,
      time,
      type: 1,
      link: linkOrlocation,
    }
  }
  if (type === '线下活动') {
    opts = {
      ...opts,
      title,
      time_done,
      time,
      type: 2,
      location: linkOrlocation,
      introduction,
      role,
    }
  }
  return request(`/activity/activity/update`, {
    method: 'POST',
    body: JSON.stringify(opts),
  })
}

export function updateActivity(
  id: number,
  time: string,
  link: string,
): Promise<null>
export function updateActivity(
  id: number,
  time: string,
  location: string,
  introduction: string,
  role: string,
): Promise<null>
export function updateActivity(
  id: number,
  time: string,
  linkOrlocation: string,
  introduction?: string,
  role?: string,
): Promise<null> {
  let opts: UpdateActivityOptions = { operation: 'update', activity_id: id }
  if (introduction && role) {
    opts = {
      ...opts,
      time,
      location: linkOrlocation,
      introduction,
      role,
    }
  } else {
    opts = {
      ...opts,
      link: linkOrlocation,
    }
  }
  return request(`/activity/activity/update`, {
    method: 'POST',
    body: JSON.stringify(opts),
  })
}

export const commitPushGift = (opts: PushGiftInfoOptions): Promise<null> => {
  return request(`/activity/gift/update`, {
    method: 'POST',
    body: JSON.stringify({ ...opts, operation: 'update' }),
  })
}
