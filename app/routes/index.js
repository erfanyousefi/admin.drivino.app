const express = require('express');
const router = express.Router();

//Controllers
const HomeController = require('app/http/controllers/homeController')

const AuthRouter = require('app/routes/auth');
const AdminRouter = require('app/routes/admin');
const redirect_if_not_authenticated = require("app/http/middlewares/redirectIfNotAuthenticated")
router.use((req,res,next)=>{
     // res.locals.layout = "home/master";
     next();
});

router.use('/auth', AuthRouter);
router.use('/admin',redirect_if_not_authenticated.handle, AdminRouter);

router.get('/',HomeController.index);

module.exports = router;