const Controller = require('app/http/controllers/controller');
const User = require('app/models/user');

class UserController extends Controller {

     async index(req, res) {
          let users = await User.find({});
          // return res.json(users)
          res.render('admin/users/index', {
               title: "کاربران",
               ps: config.provinces,
               cs: config.cities,
               users,
               act: 2
          });
     }


}

module.exports = new UserController();