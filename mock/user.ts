export default {
  'GET /api/user/info': {
    status: 10000,
    info: 'success',
    data: {
      name: '土豆',
      avatar: 'http://img.zhengyua.cn/b777683b5e5dc41c8e73cf1e123ba997f773765a',
      college: '计算机科学与技术学院',
      team_name: '红岩网校',
    },
  },

  'GET /api/main/tool': {
    status: 10000,
    info: 'success',
    data: [
      {
        id: 1,
        name: '活动奖品推送',
        route: '/activity',
      },
      {
        id: 2,
        name: '影院中心',
        route: '/cinema',
      },
    ],
  },

  'GET /api/user/task': {
    status: 10000,
    info: 'success',
    data: [
      {
        id: 3,
        name: '',
        title: '你好',
        content: '前端辛苦了',
        updated_time: '2020-04-12 17:48:39',
      },
      {
        id: 2,
        name: '土豆的部长',
        title: '测试1',
        content: '测试1',
        updated_time: '2020-04-09 09:20:21',
      },
      {
        id: 1,
        name: '土豆的部长',
        title: '测试',
        content: '测试',
        updated_time: '2020-04-09 09:20:07',
      },
    ],
  },

  'GET /api/user/history': {
    status: 10000,
    info: 'success',
    data: [
      {
        id: 9,
        detail: '活动奖品推送中心:修改活动推送',
        created_at: '2020-04-13 18:05:05',
      },
      {
        id: 8,
        detail: '活动奖品推送中心:新建活动',
        created_at: '2020-04-13 18:04:51',
      },
      {
        id: 7,
        detail: '活动奖品推送中心:修改活动推送',
        created_at: '2020-04-13 16:26:46',
      },
      {
        id: 6,
        detail: '活动奖品推送中心:新建活动推送',
        created_at: '2020-04-13 16:24:04',
      },
      {
        id: 5,
        detail: '活动奖品推送中心:新建活动',
        created_at: '2020-04-13 08:01:33',
      },
      {
        id: 4,
        detail: '活动奖品推送中心:删除活动',
        created_at: '2020-04-12 18:21:19',
      },
      {
        id: 2,
        detail: '活动奖品推送中心:新建活动',
        created_at: '2020-04-12 18:17:50',
      },
      {
        id: 1,
        detail: '测试用户',
        created_at: '2020-04-09 09:42:05',
      },
    ],
  },
};
