//路由模块
 const express = require('express')

 const c_user = require('./controllers/c_user')

 //实例化router对象

 const router = express.Router();

 router.get('/signin',c_user.showLogin)

 module.exports = router;