const Controller = require('app/http/controllers/controller');
const adminModel = require('app/models/admin');
let errorList = {
     errorModal : "",
     successModal :""
}
class AccountController extends Controller {

     async index(req, res) {
          res.render('admin/account/index', {
               title: "اطلاعات حساب",
               user: req.user,
               messages: errorList
          });
          errorList = {
               errorModal : "",
               successModal :""
          }
     }
     async editForm(req, res) {
          res.render('admin/account/edit', {
               title: "اطلاعات حساب",
               user: req.user,
               messages: errorList
          });
          errorList = {
               errorModal : "",
               successModal :""
          }
     }
     async editProcess(req, res, next) {
          let id = req.user._id;
          let data = {};
          let socials = {}
          if (req.body.name) {
               data.name = this.xssAttak(req.body.name);
          }
          if (req.body.family) {
               data.family = this.xssAttak(req.body.family);
          }
          if (req.body.address) {
               data.address = this.xssAttak(req.body.address);
          }
          if (req.body.mobile) {
               data.mobile = this.xssAttak(req.body.mobile);
          }
          if (req.body.tele) {
               data.tele = this.xssAttak(req.body.tele);
          }
          if (req.body.email) {
               data.email = this.xssAttak(req.body.email);
          }
          if (req.body.text) {
               data.text = this.xssAttak(req.body.text);
          }
          if (req.body.telegram) {
               socials.telegram = this.xssAttak(req.body.telegram);
          }
          if (req.body.whatsapp) {
               socials.whatsapp = this.xssAttak(req.body.whatsapp);
          }
          if (req.body.instagram) {
               socials.instagram = this.xssAttak(req.body.instagram);
          }
          if (req.body.website) {
               socials.website = this.xssAttak(req.body.website);
          }
          if (req.body.github) {
               socials.github = this.xssAttak(req.body.github);
          }
          if (req.body.linkedin) {
               socials.linkedin = this.xssAttak(req.body.linkedin);
          }
          if (socials) {
               data.socials = socials;
          }
          if (req.file) {
               data.image = `${req.file.destination}/${req.file.filename}`.substr(8);
          }
          adminModel.findByIdAndUpdate(id, {
               $set: {
                    ...data
               }
          }, (err, account) => {
               if (err) {
                    console.log(err);
                    if (req.file) {
                         this.removeFile(req.file.path)
                    }
                    errorList.errorModal = "ویرایش اطلاعات حساب انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید";
               }
               if (account) {
                    errorList.successModal = "ویرایش اطلاعات حساب با موفقیت انجام شد";
               } else {
                    errorList.errorModal = "ویرایش اطلاعات حساب انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید";
                    if (req.file) {
                         this.removeFile(req.file.path);
                    }
               }
          });
          res.redirect("/admin/account");
     }

}

module.exports = new AccountController();