// Layout 页面的 model
// errors: 错误信息的提示，同时处理错误
// infos: 成功信息的提示
// TODO: breadcrumb: 面包屑，顶部 `活动奖品推送中心 < 历史推送 < 历史推送名单`
import { ImmerReducer } from 'umi'
import { pathToRegexp } from 'path-to-regexp'

export interface LayoutModelState {
  errorMessages: Error[],
  successMessages: string[],
}

export interface LayoutModel {
  state: LayoutModelState,
  reducers: {
    error: ImmerReducer<LayoutModelState, ReturnType<typeof createErrorMessage>>,
    success: ImmerReducer<LayoutModelState, ReturnType<typeof createSuccessMessage>>,
  },
}

export const createErrorMessage = (err: Error[] | Error) => ({
  type: 'layout/error',
  payload: err,
})
export const createSuccessMessage = (msg: string[] | string) => ({
  type: 'layout/success',
  payload: msg,
})

const layoutModel: LayoutModel = {
  state: {
    errorMessages: [],
    successMessages: [],
  },
  reducers: {
    error(state, { payload }) {
      if (!Array.isArray(payload)) state.errorMessages = [payload]
      else state.errorMessages = payload
    },
    success(state, { payload }) {
      if (!Array.isArray(payload)) state.successMessages = [payload]
      else state.successMessages = payload
    },
  },
}

export default layoutModel
