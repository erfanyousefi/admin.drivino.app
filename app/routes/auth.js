const express = require('express');
const router = express.Router();

//Controllers
const AuthController = require('app/http/controllers/authController');

//Middlewares
const {uploadImage} = require('app/helpers/uploadImages');
const ConvertFileToField = require('app/http/middlewares/convertFileToField');
const RDIA = require('app/http/middlewares/redirectIfAuthenticated');

router.use((req,res,next)=>{
     // res.locals.layout = "auth/master";
     next();
});

router.get('/login',
     RDIA.handle,
     AuthController.loginPage);
router.post('/login',
     RDIA.handle,
     AuthController.loginProcess);
router.get('/register',
     RDIA.handle,
     AuthController.registerPage);
router.post('/register',
     RDIA.handle,
     uploadImage.single('images'),
     ConvertFileToField.handle,
     AuthController.registerProccess);

router.get('/logout',(req,res)=>{
     req.logout();
     res.clearCookie('remember_token')
     res.redirect('/')
});

module.exports = router;