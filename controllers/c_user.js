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

//实现用户退出登录功能
exports.handleSignout = (req,res)=>{
    console.log(req.session.user)
    delete req.session.user
    res.render('signin.html')
}

//实现用户登录注册功能
exports.handleSignup = (req,res)=>{
    const body = req.body;
    //检查邮箱是否存在
    user.handleLogin(body.email,(err,data)=>{
        if(err){
            res.send({
                code:500,
                msg:'服务器出错了'
            })
        }
        if(data[0]){
            return res.send({
                code:1,
                msg:'邮箱存在'
            })
        }

           //检查昵称是否存在
        user.checknickname(body.nickname,(err,data)=>{
            if(err){
                res.send({
                    code:500,
                    msg:'服务器出错了'
                })
            }
            if(data[0]){
                return res.send({
                    code:2,
                    msg:'昵称存在'
                 })
            }
             //邮箱和昵称都不存在时，则向数据库添加新用户
            user.addUser(body,(err,data)=>{
                if(err){
                    res.send({
                        code:500,
                        msg:'服务器出错了'
                    })
                }
                
                    res.send({
                        code:200,
                        msg:'注册成功'
                    })
                
            })
        })
    })
 
   
}

