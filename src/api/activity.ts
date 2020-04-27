import { API } from './index'
import { GetActivityInfosResponse, GetActivityHistoryInfosResponse, GetActivityHistoryGiftsResponse, GetActivityGiftsResponse, DeleteActivityResponse, AddActivityResponse, UpdateActivityResponse, UpdateGiftResponse } from '@/interfaces'
import { UpdateActivityOptions, PushGiftInfoOptions } from '@/interfaces/activity'

export const getActivityInfos = (): Promise<GetActivityInfosResponse> => {
  return fetch(`${API}/activity/activity/info`).then(r => r.json()).catch(alert)
}

export const getActivityHistoryInfos = (): Promise<GetActivityHistoryInfosResponse> => {
  return fetch(`${API}/activity/activity/history`, {
    method: 'POST',
  }).then(r => r.json()).catch(alert)
}

export const getActivityHistoryGifts = (id: number): Promise<GetActivityHistoryGiftsResponse> => {
  return fetch(`${API}/activity/gift/history`, {
    method: 'POST',
    body: JSON.stringify({ id }),
  }).then(r => r.json()).catch(alert)
}

export const getActivityGifts = (id: number): Promise<GetActivityGiftsResponse> => {
  return fetch(`${API}/activity/gift/info`, {
    method: 'POST',
    body: JSON.stringify({ id }),
  }).then(r => r.json()).catch(alert)
}

export const deleteActivity = (id: number): Promise<DeleteActivityResponse> => {
  return fetch(`${API}/activity/activity/update`, {
    method: 'POST',
    body: JSON.stringify({
      operation: 'delete',
      activity_id: id,
    }),
  }).then(r => r.json()).catch(alert)
}

export function addActivity(title: string, time_done: number, time: string, type: '线上活动', link: string): Promise<AddActivityResponse>
export function addActivity(title: string, time_done: number, time: string, type: '线下活动', location: string, introduction: string, role: string): Promise<AddActivityResponse>
export function addActivity(title: string, time_done: number, time: string, type: '线上活动' | '线下活动', linkOrlocation: string, introduction?: string, role?: string): Promise<AddActivityResponse> {
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
  return fetch(`${API}/activity/activity/update`, {
    method: 'POST',
    body: JSON.stringify(opts),
  }).then(r => r.json()).catch(alert)
}

export function updateActivity(id: number, time: string, link: string): Promise<UpdateActivityResponse>
export function updateActivity(id: number, time: string, location: string, introduction: string, role: string): Promise<UpdateActivityResponse>
export function updateActivity(id: number, time: string, linkOrlocation: string, introduction?: string, role?: string): Promise<UpdateActivityResponse> {
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
  return fetch(`${API}/activity/activity/update`, {
    method: 'POST',
    body: JSON.stringify(opts),
  }).then(r => r.json()).catch(alert)
}

export const commitPushGift = (opts: PushGiftInfoOptions): Promise<UpdateGiftResponse> => {
  return fetch(`${API}/activity/gift/update`, {
    method: 'POST',
    body: JSON.stringify({ ...opts, operation: 'update' }),
  }).then(r => r.json()).catch(alert)
}
