const Middleware = require('app/http/middlewares/middleware');

class ConvertFileToField extends Middleware {

     handle(req, res, next) {
          if (req.file) {
               req.body.image = req.file.filename;
          } else {
               req.body.image = undefined;
          }
          next();
     }
}

module.exports = new ConvertFileToField();