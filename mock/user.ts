export default {
  'GET /user/info': {
    status: 10000,
    info: "success",
    data: {
      name: "土豆",
      avatar: "http://img.zhengyua.cn/b777683b5e5dc41c8e73cf1e123ba997f773765a",
      college: "计算机科学与技术学院",
      team_name: "红岩网校",
    },
  },

  'GET /main/tool': {
    "status": 10000,
    "info": "success",
    "data": [
      {
        "id": 1,
        "name": "活动奖品推送",
        "route": "/activity"
      },
      {
        "id": 2,
        "name": "影院中心",
        "route": "/cinema"
      }
    ]
  }
}