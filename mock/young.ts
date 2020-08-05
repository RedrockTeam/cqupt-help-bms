export default {
  'GET /api/team/apply/info': {
    "status": 10000,
    "info": "success",
    "data": {
      "id": 9,
      "name": "红岩网校",
      "avatar": "",
      "detail": "红岩网校"
    },
  },
  'POST /api/team/apply/create': {
    "status": 10000,
    "info": "success"
  },
  'GET /api/team/apply/recent': {
    "status": 10000,
    "info": "success",
    "step": 1,
    "data": [
      {
        "id": 1,
        "name": "林其星",
        "stu_num": "2019210435",
        "phone": "13022258199"
      },
      {
        "id": 2,
        "name": "郑志宇",
        "stu_num": "2019210054",
        "phone": "18982230408"
      },
      {
        "id": 3,
        "name": "邱谦",
        "stu_num": "2019210054",
        "phone": "13167882749"
      }
    ]
  },
  'GET /api/team/apply/step': {
    "status": 10000,
    "info": "success",
    "data": [
      {
        "step": 1,
        "username": "何庚坤"
      }
    ]
  },
  'POST /api/team/apply/step/info': {
    "status": 10000,
    "info": "success",
    "data": [
      {
        "id": 1,
        "name": "林其星",
        "stu_num": "2019210435",
        "phone": "13022258199"
      },
      {
        "id": 2,
        "name": "郑志宇\r\n郑志宇\r\n郑志宇",
        "stu_num": "2019210054",
        "phone": "18982230408"
      },
      {
        "id": 3,
        "name": "邱谦",
        "stu_num": "2019210054",
        "phone": "13167882749"
      }
    ],
  },
  'POST /api/team/apply/step/send': {
    "status": 10000,
    "info": "success"
  }
}
