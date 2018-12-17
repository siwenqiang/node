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