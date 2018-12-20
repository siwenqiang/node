//此模块负责用户功能操作数据库的功能
const connection = require('../database/basedata');

const sql = "select * from users";

exports.handleLogin = (email,callback)=>{
    const sql = "select * from users where email=?"
    connection.query(sql,email,(err,data)=>{
        // console.log(data);(data是一个数组)
        //要想在函数外部拿到函数内部异步操作的结果需要使用回调函数
        if(err){
            callback(err,null)
        }else{
            callback(null,data);
        }
        
    })
}
//拿到登录注册页面的表单数据并操作数据库 注册用户 验证昵称是否存在
exports.checknickname = (nickname,callback)=>{
    const sql = "select * from users where nickname=?"
    connection.query(sql,nickname,(err,data)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,data);
        }
    })
}
//向数据库中添加新用户
exports.addUser = (body,callback)=>{
    const sql = "insert into users set?"
    connection.query(sql,body,(err,data)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,data);
        }
    })
}