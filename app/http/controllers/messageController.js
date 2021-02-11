const Controller = require('app/http/controllers/controller');

class MessageController extends Controller {
     
     async index(req,res){
          res.render('admin/messages/index',{title:"پیام ها",act:7});
     }

     
}

module.exports = new MessageController();