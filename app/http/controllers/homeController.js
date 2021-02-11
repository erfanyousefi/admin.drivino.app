const Controller = require('app/http/controllers/controller');

class HomeController extends Controller {
     
     async index(req,res){
          res.render('home/index',{title:"درایور شو"});
     }

     
}

module.exports = new HomeController();