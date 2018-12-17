//此模块负责所有相关文章的功能
//导包
const m_topic = require('../modles/m_topic');

const moment = require('moment');
//实现渲染列表页面的功能
exports.showTopicList = (req,res)=>{
   
    m_topic.findAlltopics((err,data)=>{
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
exports.showEditTopic = (req,res)=>{
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