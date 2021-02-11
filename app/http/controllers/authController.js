const Controller = require('app/http/controllers/controller');
const passport = require('passport');

class AuthController extends Controller {
     
     async loginPage(req,res){
          res.render(
               'auth/login',
               {messages:req.flash('messages'),title:"ورود"});
     }

     async loginProcess(req, res, next) {
          try {
               let status = await this.validationData(req);
               if (status) {
                    passport.authenticate('local.alogin',(err,admin)=>{
                              if(!admin){ 
                                   return res.redirect('/auth/login');
                              }
                              req.logIn(admin,function(err){
                                   if(req.body.remember){
                                        admin.setRememberToken(res);
                                   }
                                   return res.redirect('/');
                              });
                    })(req, res, next);
               } else {
                    res.redirect('/auth/login') 
               }
          } catch (e) {
               next(e);
          }
     }

     async registerPage(req,res){
          res.render(
               'auth/register',
               {messages:req.flash('messages'),title:"ثبت نام"});
     }

     async registerProccess(req,res,next){
          try {
               let status = await this.validationData(req);
               if (status) {
                    passport.authenticate(
                         'local.aregister',{
                             successRedirect:'/',
                             failureRedirect:'/auth/register',
                             failureFlash:true
                         }
                         )(req, res, next);
               } else {
                    res.redirect('/auth/register')   
               }
          } catch (e) {
               next(e);
          }
     }


}

module.exports = new AuthController();