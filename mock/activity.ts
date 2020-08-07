export default {
  'GET /api/activity/activity/info': {
    status: 10000,
    info: 'success',
    data: [
      {
        id: 2,
        name: '测试大活动',
        username: '土豆的部长',
        create_time: '2020-04-12 18:19:43',
        form: '线上活动',
      },
      {
        id: 1,
        name: '测试大活动',
        username: '土豆的部长',
        create_time: '2020-04-12 18:19:43',
        form: '线上活动',
      },
      {
        id: 3,
        name: '测试大活动',
        username: '土豆的部长',
        create_time: '2020-04-12 18:19:43',
        form: '线上活动',
      },
      {
        id: 5,
        name: '测试大活动',
        username: '土豆的部长',
        create_time: '2020-04-12 18:19:43',
        form: '线上活动',
      },
    ],
  },
  'POST /api/activity/activity/history': {
    status: 10000,
    info: 'success',
    data: [
      {
        id: 2,
        name: '测试大活动',
        username: '土豆的部长',
        create_time: '2020-04-12 18:19:43',
        form: '线上活动',
      },
      {
        id: 1,
        name: '测试大活动',
        username: '土豆的部长',
        create_time: '2020-04-12 18:19:43',
        form: '线上活动',
      },
      {
        id: 3,
        name: '测试大活动',
        username: '土豆的部长',
        create_time: '2020-04-12 18:19:43',
        form: '线上活动',
      },
    ],
  },

  'POST /api/activity/gift/history': {
    status: 10000,
    info: 'success',
    data: [
      {
        level: 1,
        name: 'macpro',
        infos: [
          {
            stu_num: '2018211391',
            name: 'hahahha',
          },
          {
            stu_num: '2018211392',
            name: 'hahahha',
          },
        ],
      },
      {
        level: 2,
        name: 'ipadpro',
        infos: [
          {
            stu_num: '2018211391',
            name: 'hahahha',
          },
          {
            stu_num: '2018211392',
            name: 'hahahha',
          },
        ],
      },
      {
        level: 3,
        name: 'ipad2019',
        infos: [
          {
            stu_num: '2018211391',
            name: 'hahahha',
          },
          {
            stu_num: '2018211392',
            name: 'hahahha',
          },
        ],
      },
    ],
  },

  'POST /api/activity/gift/info': {
    status: 10000,
    info: 'success',
    data: [
      {
        level: 1,
        name: 'macpro',
        infos: [
          {
            stu_num: '2018211391',
            name: 'hahahha',
          },
          {
            stu_num: '2018211392',
            name: 'hahahha',
          },
        ],
      },
      {
        level: 2,
        name: 'ipadpro',
        infos: [
          {
            stu_num: '2018211391',
            name: 'hahahha',
          },
          {
            stu_num: '2018211392',
            name: 'hahahha',
          },
        ],
      },
      {
        level: 3,
        name: 'ipad2019',
        infos: [
          {
            stu_num: '2018211391',
            name: 'hahahha',
          },
          {
            stu_num: '2018211392',
            name: 'hahahha',
          },
        ],
      },
    ],
  },

  'POST /api/activity/activity/update': {
    status: 10000,
    info: 'success',
  },

  'POST /api/activity/gift/update': {
    status: 10000,
    info: 'success',
  },
};
