const Middleware = require('app/http/middlewares/middleware');
const Admin = require('app/models/admin');

class RememberLogin extends Middleware{
    handle(req,res,next){
        if(!req.isAuthenticated()){
            const rememberToken = req.signedCookies.remember_token;
            if(rememberToken){
                return this.adminFind(rememberToken,req,next);
            }
        }
        next();
    }

    adminFind(rememberToken,req,next){
        Admin.findOne(
            {
                rememberToken
            }
        ).then(admin =>{
            if(admin){
                req.logIn(admin,err=>{
                    if(err) next(err);
                    next();
                });
            }else{
                next();
            }
        }).catch(err => next(err));
    }
}

module.exports = new RememberLogin();