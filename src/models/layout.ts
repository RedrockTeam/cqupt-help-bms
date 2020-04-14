// Layout 页面的 model
// error: 统一的错误处理，出错时会使 Layout 页面 Content 部分提示出错
// breadcrumb: 面包屑，顶部 `活动奖品推送中心 < 历史推送 < 历史推送名单`
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi'
import { pathToRegexp } from 'path-to-regexp'
import { pathnameToPagename } from '@/utils'

type Breadcrumb = string[]

export interface LayoutModelState {
  error: Error | null,
  // breadcrumb: Breadcrumb,
}

export interface LayoutModel {
  state: LayoutModelState,
  // subscriptions: {
  //   getBreadcrumb: Subscription,
  // },
  reducers: {
    error: ImmerReducer<LayoutModelState>,
    // setBreadcrumb: ImmerReducer<LayoutModelState>,
  },
}

const layoutModel: LayoutModel = {
  state: {
    error: null,
  },
  // subscriptions: {
  //   getBreadcrumb({ dispatch, history }) {
  //     history.listen(({ pathname }) => {
  //       pathnameToPagename(pathname)
  //     })
  //   },
  // },
  reducers: {
    error(state, { payload }) {

    },
  },
}

export default layoutModel
