const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const webRouter = require('app/routes');
const passport = require('passport');
const Helpers = require('app/helpers');
const rememberLogin = require('app/http/middlewares/rememberLogin');
const expressLayouts = require('express-ejs-layouts');
const methodOverrirde = require("method-override");
module.exports = class Application{
     
     constructor(){
          this.setupExpress();
          this.setMongoConnection();
          this.setConfig();
          this.setRouters();
     }

     setupExpress(){
          const server = http.createServer(app);
          server.listen(
               config.port,
               ()=>{
                    console.log(`Listening on port ${config.port}`);
               }
          );
     }

     setMongoConnection() {
          mongoose.Promise = global.Promise;
          mongoose.connect(
              config.database.url,
              {useNewUrlParser: true, useUnifiedTopology: true}
          );
     }

     setConfig(){
          require('app/passport/passport-local');
          app.use(express.static(config.layout.public_dir));
          app.set('view engine', config.layout.view_engine);
          app.set('views',config.layout.view_dir);
          app.use(expressLayouts);
          app.set("layout extractScripts", true);
          app.set("layout extractStyles",true);
          app.set('layout',config.layout.layout);
          app.use(bodyParser.json());
          app.use(bodyParser.urlencoded({extended:true}));
          app.use(session({...config.session}));
          app.use(cookieParser(config.cookie_secret));
          app.use(flash());
          app.use(passport.initialize());
          app.use(passport.session());
          app.use(rememberLogin.handle);
          app.use(methodOverrirde("_method"))
          app.use((req,res,next)=>{
               app.locals = new Helpers(req,res).getObjects();
               next();
          });
     }
     
     setRouters() {
          app.use('/',webRouter);
     }
     
}