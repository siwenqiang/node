//路由模块
 const express = require('express')

 const c_user = require('./controllers/c_user')

 const c_topic = require('./controllers/c_topic');

 //实例化router对象

 const router = express.Router();
//登录页面的渲染功能
 router.get('/signin',c_user.showLogin)
//处理登录页面表单提交的功能
 router.post('/signin',c_user.userLogin)
//渲染列表主页，并拿到数据库中的文章数据，使用模板引擎渲染进去
 router.get('/',c_topic.showTopicList)
 //渲染编辑文章页面
 router.get('/topic/create',c_topic.showEditTopic)
 //处理编辑文章页面的表单提交功能
 router.post('/handleEditTopic',c_topic.editTopic)

 module.exports = router;