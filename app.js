//导包
const express = require('express')

const fs = require('fs')

const router = require('./router')
//主要使用req.body中的属性获取表单提交的数据
const bodyParser = require('body-parser');
//保存正确的用户信息到session中
const session = require('express-session');
//登录时将用户信息存入数据库中，使数据持久化
const MySQLStore = require('express-mysql-session')(session);
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'node'
};

const sessionStore = new MySQLStore(options);

const app = express();

//暴露公开静态资源

app.use('/public',express.static('./public'))

app.use('/node_modules',express.static('./node_modules'))


//配置包
app.engine('html',require('express-art-template'))

app.use(bodyParser.urlencoded({
    extended: false
}));
// 配置express-mysql-session

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

//使用路由
app.use(router);

app.listen(56666,(err)=>{
    console.log('The sever is running')
})