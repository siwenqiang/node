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
 router.get('/topic/create',c_topic.showCreateTopic)
 //处理编辑文章页面的表单提交功能
 router.post('/handleEditTopic',c_topic.editTopic)
 //处理用户退出登录功能
 router.get('/signout',c_user.handleSignout)

 //渲染文章详情页
 router.get('/detail/topic/:topicId',c_topic.showDetailTopic)

 //处理文章删除功能
 router.get('/topic/detail/delete/:topicId',c_topic.deleteTopic)
 //渲染文章编辑页面
 router.get('/topic/detail/edit/:topicId',c_topic.showEditTopic)
 //处理编辑文章的请求
 router.post('/updateTopic/:topicId',c_topic.handleEditTopic)
 //渲染用户注册页面
 router.get('/signup',c_topic.showSignup)
 //处理用户注册表单数据
 router.post('/signup',c_user.handleSignup)

 module.exports = router;