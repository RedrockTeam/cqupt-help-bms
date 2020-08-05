export const nameSymbol = Symbol('name');
export const paramsSymbol = Symbol('params');

export type PathMap = {
  [nameSymbol]?: string;
  [paramsSymbol]?: PathMap;
  [path: string]: PathMap;
};

export const pathMap: PathMap = {
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
      },
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
    history: {
      [nameSymbol]: '通过名单',
    },
  },
  ticket: {
    [nameSymbol]: '影票上线管理中心',
    add: {
      [nameSymbol]: '新建影票',
    },
    [paramsSymbol]: {
      [nameSymbol]: '影票信息',
    },
  },
  volunteer: {
    [nameSymbol]: '志愿服务管理',
    add: {
      [nameSymbol]: '新增活动',
    },
    [paramsSymbol]: {
      [nameSymbol]: '活动详情',
      volunteerInfo: {
        [nameSymbol]: '志愿者信息',
        history: {
          [nameSymbol]: '已推送名单',
        },
      },
    },
  },
  'young-input': {
    [nameSymbol]: '青春邮约报名系统 > 部门资料',
  },
  'young-push': {
    [nameSymbol]: '青春邮约报名系统 > 推送信息',
    history: {
      [nameSymbol]: '已推送信息名单',
    },
  },
  'organization-auth': {
    [nameSymbol]: '组织管理 < 权限管理',
  },
  'organization-member': {
    [nameSymbol]: '组织管理 < 部门成员',
  },
  'organization-task': {
    [nameSymbol]: '组织管理 < 任务发布',
  },
};

export const API =
  process.env.NODE_ENV === 'production'
    ? 'https://cyxbsmobile.redrock.team/wxapi/cyb-permissioncenter'
    : 'http://localhost:8080';
