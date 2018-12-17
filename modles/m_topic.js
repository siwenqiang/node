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