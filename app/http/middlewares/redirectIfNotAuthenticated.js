const Middleware = require('app/http/middlewares/middleware');
class RedirectIfNotAuthenticated extends Middleware {
    handle(req , res ,next) {
        if(!req.isAuthenticated())
            return res.redirect('/')
        next();
    }
}

module.exports = new RedirectIfNotAuthenticated();