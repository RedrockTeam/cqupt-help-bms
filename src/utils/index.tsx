const nameSymbol = Symbol('name')
const paramsSymbol = Symbol('params')

type pathMap = {
  [nameSymbol]?: string,
  [paramsSymbol]?: pathMap,
  [path: string]: pathMap,
}

const map: pathMap = {
  user: {
    [nameSymbol]: '个人中心',
    history: {
      [nameSymbol]: '历史任务',
    },
  },
  activity: {
    [nameSymbol]: '活动奖品推送中心',
    history: {
      [nameSymbol]: '历史推送',
      [paramsSymbol]: {
        [nameSymbol]: '历史推送名单',
      }
    },
    [paramsSymbol]: {
      [nameSymbol]: '推送名单',
      update: {
        [nameSymbol]: '活动推送编辑',
      },
    },
  },
  id: {
    [nameSymbol]: '身份有证管理中心',
  },
  ticket: {
    [nameSymbol]: '影票上线管理中心',
  },
  volunteer: {
    [nameSymbol]: '志愿服务管理',
  },
  organization: {
    [nameSymbol]: '组织管理',
  },
}

export const pathnameToPagename = (url: string[]) => {
  return url.reduce((acc: pathMap, cur: string): pathMap => {
    const res = acc[cur]
    if (res) {
      return res
    } else {
      return acc[paramsSymbol]!
    }
  }, map)[nameSymbol]
}
