//此模块负责查询数据库中文章内容的功能

const connection = require('../database/basedata');

exports.findAlltopics = (callback)=>{
    //查询数据库中的所有文章
    const sql = "select * from topics order by id desc";
    connection.query(sql,(err,data)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,data);
        }
    })
}
//向数据库中添加新文章
exports.addTopic = (body,callback)=>{
    const sql = "insert into topics set?"

    connection.query(sql,body,(err,data)=>{
        if(err){
           callback(err,null)
        }else{
            callback(null,data);
        }
    })
}
//根据文章列表页传来的文章id查询对应的文章
exports.selectIDbytopic = (topicId,callback)=>{
    // console.log(topicId)
    const sql = "select * from topics where id= ?";
    connection.query(sql,topicId,(err,data)=>{
        // console.log(sql)
        // console.log(data);
        if(err){
            callback(err,null)
        }else{
            callback(null,data)
        }
    })
}
//根据列表传来的文章id删除对应的文章
exports.handleDeleteTopic = (topicId,callback)=>{
    const sql = "delete from topics where id=?";

    connection.query(sql,topicId,(err,data)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,data);
        }
    })
}

//根据传来的文章id和表单数据，对数据库的文章进行编辑
exports.editTopic = (topicId,body,callback)=>{
    const sql = "update topics set ? where id = ?";

    connection.query(sql,[body,topicId],(err,data)=>{
        console.log(data);
        if(err){
            callback(err,null)
        }else{
            callback(null,data)
        }
    })
}

