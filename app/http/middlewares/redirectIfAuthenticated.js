const Middleware = require('app/http/middlewares/middleware');


class RedirectIfAuthenticated extends Middleware {
    
    handle(req , res ,next) {
        if(req.isAuthenticated())
            return res.redirect('/')
    
        next();
    }


}


module.exports = new RedirectIfAuthenticated();