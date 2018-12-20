//此模块负责所有相关文章的功能
//导包
const m_topic = require('../modles/m_topic');

const moment = require('moment');
//实现渲染列表页面的功能
exports.showTopicList = (req,res)=>{
   
    m_topic.findAlltopics((err,data)=>{
        // console.log(data);
        if(err){
            res.rend({
                code:500,
                msg:'服务器又出错了'
            })
        }else{
            res.render('index.html',{list:data,user:req.session.user});
        }
    })   
}

//实现渲染文章编辑页面
exports.showCreateTopic = (req,res)=>{
    res.render('./topic/create.html',{user:req.session.user})
}

//实现文章页面编辑表单提交功能
exports.editTopic = (req,res)=>{
    const body = req.body
     // 给body添加成员
    // createdAt
    body.createdAt = moment().format();
    // userId (当前添加的新文章的创建者是谁) 文章的userId = 当前登录用户的id值
    body.userId = req.session.user.id;
    m_topic.addTopic(body,(err,data)=>{
        if(err){
            res.rend({
                code:500,
                msg:'服务器再次出现错误'
            })
        }else{
            res.send({
                code:200,
                msg:'文章添加成功'
            })
            
        }
    })
}

//渲染文章详情页
exports.showDetailTopic = (req,res)=>{
    const topicId = req.params.topicId
    // console.log(topicId)
    m_topic.selectIDbytopic(topicId,(err,data)=>{
        // console.log(data);
        if(err){
            res.send({
                code:500,
                msg:'服务器出错'
            })
        }else{
            res.render('topic/show.html',{list:data[0],
                //判断session中有没有用户信息，有的话则传入用户ID，没有的话则传0
                sessionUserID:req.session.user ? req.session.user.id : 0});
        }
    })
   
}

//实现文章的删除功能
exports.deleteTopic = (req,res)=>{
    const topicId = req.params.topicId
    // console.log(topicId);
    m_topic.handleDeleteTopic(topicId,(err,data)=>{
        if(err){
            res.send({
                code:500,
                msg:'服务器出现错误'
            })
        }else{
            res.redirect('/')
        }
    })
}
//渲染文章的编辑页面
exports.showEditTopic = (req,res)=>{
    const topicId = req.params.topicId
    
    m_topic.selectIDbytopic(topicId,(err,data)=>{
        // console.log(data);
        if(err){
            res.send({
                code:500,
                msg:'服务器出错了'
            })
        }else{
            res.render('topic/edit.html',{list:data[0]})
        }
    })
}

//实现文章的编辑功能
exports.handleEditTopic = (req,res)=>{
    // console.log(req.params);
    const body = req.body;
    // console.log(body);
    const topicId = req.params.topicId
    m_topic.editTopic(topicId,body,(err,data)=>{
        if(err){
            res.send({
                code:500,
                msg:'服务器出错'
            })
        }else{
            //此处不能在服务端重定向，因为是AJAX异步操作需要在服务端重定向
            res.send({
                code:200,
                msg:'文章编辑成功'
            });
        }
    })
}

//渲染用户注册页面
exports.showSignup = (req,res)=>{
    res.render('signup.html')
}