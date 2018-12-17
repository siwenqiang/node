//导包
const user = require('../modles/m_user')

//实现具体的登录页面渲染的功能
exports.showLogin = (req,res)=>{
    res.render('signin.html')
}
//实现登录页面的登录验证功能
exports.userLogin = (req,res)=>{
    const body = req.body
    user.handleLogin(body.email,(err,data)=>{
        if(err){
            res.send({
                message:'服务器出现错误',
                code:500
            })
            return;
        }
        if(data.length===0){
            res.send({
                code:1,
                message:'邮箱不存在'
            })
            return
        }
        if(data[0].password!==body.password){
            res.send({
                code:0,
                message:'密码不正确'
            })
        }else{
            req.session.user = data[0];
            console.log(req.session)
            res.send({
                code:200,
                message:'可以登录了'
            })
        }
        
    })
}

