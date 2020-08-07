export default {
  'GET /api/team/permission/info': {
    status: 10000,
    info: 'success',
    data: [
      {
        job: {
          job_name: '红岩网校权限等级_1_1',
          job_id: 2,
        },
        TeamPersons: [
          {
            id: 1,
            name: '土豆',
            avatar:
              'http://img.zhengyua.cn/b777683b5e5dc41c8e73cf1e123ba997f773765a',
          },
        ],
      },
      {
        job: {
          job_name: '红岩网校权限等级_1_2',
          job_id: 4,
        },
        TeamPersons: [
          {
            id: 1,
            name: '土豆',
            avatar:
              'http://img.zhengyua.cn/b777683b5e5dc41c8e73cf1e123ba997f773765a',
          },
        ],
      },
      {
        job: {
          job_name: '红岩网校权限等级_2',
          job_id: 5,
        },
        TeamPersons: [
          {
            id: 2,
            name: '土豆长',
            avatar: 'http://img.zhengyua.cn/img/20191118184621.png',
          },
        ],
      },
    ],
  },

  'POST /api/team/permission/person': {
    status: 10000,
    info: 'success',
    data: [
      {
        id: 1,
        name: '土豆',
        avatar:
          'http://img.zhengyua.cn/b777683b5e5dc41c8e73cf1e123ba997f773765a',
      },
      {
        id: 2,
        name: '土豆dou',
        avatar:
          'http://img.zhengyua.cn/b777683b5e5dc41c8e73cf1e123ba997f773765a',
      },
    ],
  },

  'POST /api/team/permission/update': {
    status: 10000,
    info: 'success',
    data: null,
  },

  'GET /api/team/person/info': {
    status: 10000,
    info: 'success',
    data: [
      {
        job: {
          job_name: '红岩网校部门等级_0',
          job_id: 1,
        },
        TeamPersons: [
          {
            id: 1,
            name: '土豆',
            avatar:
              'http://img.zhengyua.cn/b777683b5e5dc41c8e73cf1e123ba997f773765a',
          },
          {
            id: 2,
            name: '小土豆',
            avatar:
              'http://img.zhengyua.cn/b777683b5e5dc41c8e73cf1e123ba997f773765a',
          },
        ],
      },
      {
        job: {
          job_name: '红岩网校部门等级_1',
          job_id: 3,
        },
        TeamPersons: [
          {
            id: 2,
            name: '土豆的不',
            avatar: 'http://img.zhengyua.cn/img/20191118184621.png',
          },
          {
            id: 3,
            name: '土豆的不',
            avatar: 'http://img.zhengyua.cn/img/20191118184621.png',
          },
        ],
      },
    ],
  },

  'POST /api/team/person/update': {
    status: 10000,
    info: 'success',
  },

  'POST /api/team/task/update': {
    status: 10000,
    info: 'success',
  },
};
