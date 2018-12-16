//导包
const express = require('express')

const fs = require('fs')

const router = require('./router')

const app = express();

//暴露公开静态资源

app.use('/public',express.static('./public'))

app.use('/node_modules',express.static('./node_modules'))

app.engine('html',require('express-art-template'))

//使用路由
app.use(router);

app.listen(56666,(err)=>{
    console.log('The sever is running')
})