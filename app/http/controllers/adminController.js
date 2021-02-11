const Controller = require('app/http/controllers/controller');

class AdminController extends Controller {
     
     async index(req,res){
          res.render('admin/dashboard/index',{title:"پنل ادمین",act:0});
     }

}

module.exports = new AdminController();