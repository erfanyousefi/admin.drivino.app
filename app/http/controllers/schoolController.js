const Controller = require('app/http/controllers/controller');
const School = require('app/models/school');
const Location = require('app/models/location');
const bcrypt = require("bcrypt");
const {
     validationResult
} = require('express-validator');
let errorList = {
     name: "",
     email: "",
     address: "",
     text: "",
     tele: "",
     mobile: "",
     manager: "",
     province: "",
     city: "",
     password: "",
     confirmPassword: "",
     errorModal: "",
     successModal: ""
}
module.exports = new class SchoolController extends Controller {

     async getSchools(req, res) {
          let filter = {};
          if (req.query.active) {
               let active = this.xssAttak(req.query.active);
               if (active === "true") {
                    filter.active = true
               }
               if (active === "false") {
                    filter.active = false
               }
          }
          if (req.query.province) {
               if (!req.query.province != 0) {
                    filter.province = Number(this.xssAttak(req.query.province));
               }
          }
          if (req.query.city) {
               if (req.query.city != 1) {
                    filter.city = Number(this.xssAttak(req.query.city));
               }
          }
          if (req.query.name) {
               filter.name = new RegExp(this.xssAttak(req.query.name), "gi");
          }
          var schools = await School.find(filter);
          res.render('admin/schools/index', {
               title: "آموزشگاه ها",
               ps: config.provinces,
               cs: config.cities,
               schools,
               messages: errorList
          });
          errorList = {
               name: "",
               email: "",
               address: "",
               text: "",
               tele: "",
               mobile: "",
               manager: "",
               province: "",
               city: "",
               password: "",
               confirmPassword: "",
               errorModal: "",
               successModal: ""
          }
     }

     async addSchoolPage(req, res) {
          res.render('admin/schools/create', {
               title: "افزودن آموزشگاه",
               act: 1,
               messages: errorList
          });
          errorList = {
               name: "",
               email: "",
               address: "",
               text: "",
               tele: "",
               mobile: "",
               manager: "",
               province: "",
               city: "",
               password: "",
               confirmPassword: "",
               errorModal: "",
               successModal: ""
          }
     }

     async addSchoolProcess(req, res) {
          let result = await validationResult(req)
          if (!result.isEmpty()) {
               if (result.errors) {
                    if (req.file) {
                         this.removeFile(req.file.path);
                    }
                    this.errorHandler(result.errors, errorList);
                    this.back(req, res);
               }
          } else {
               let data = {}
               let socials = {}
               if (req.file) {
                    data.image = this.xssAttak(`${req.file.destination}/${req.file.filename}`.substr(8));
               }
               data.name = this.xssAttak(req.body.name);
               data.email = this.xssAttak(req.body.email);
               data.text = this.xssAttak(req.body.text);
               data.tele = this.xssAttak(req.body.tele);
               data.mobile = this.xssAttak(req.body.mobile);
               data.manager = this.xssAttak(req.body.manager);
               data.province = this.xssAttak(req.body.province);
               data.city = this.xssAttak(req.body.city);
               data.address = this.xssAttak(req.body.address);
               data.active = false;
               if (req.body.national_id) {
                    data.national_id = this.xssAttak(req.body.national_id);
               }
               if (req.body.telegram) {
                    socials.telegram = this.xssAttak(req.body.telegram);
               }
               if (req.body.instagram) {
                    socials.instagram = this.xssAttak(req.body.instagram);
               }
               if (req.body.whatsapp) {
                    socials.whatsapp = this.xssAttak(req.body.whatsapp);
               }
               if (req.body.website) {
                    socials.website = this.xssAttak(req.body.website);
               }
               data.socials = socials;
               let password = this.xssAttak(req.body.password);
               let confirmPassword = this.xssAttak(req.body.confirmPassword);
               if (data.name && data.email && data.mobile && data.tele && data.address && data.province && data.city && data.text && data.manager && data.image) {
                    if (password === confirmPassword) {
                         data.password = await this.hashString(password);
                         console.log(data.password);
                         School.create({
                              ...data
                         }, (err, school) => {
                              if (err) {
                                   console.log(err);
                                   errorList.errorModal = "افزودن آموزشگاه انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                              }
                              if (school) {
                                   errorList.successModal = "افزودن آموزشگاه با موفقیت انجام شد"
                              } else {
                                   errorList.errorModal = "افزودن آموزشگاه انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                              }
                         })
                         res.redirect("/admin/schools");
                    } else {
                         errorList.errorModal = "رمز عبور باید با تکرار آن برابر باشد و رمز عبور نمیتواند کمتر یا بیشتر از 8 کاراکتر باشد"
                         return this.back(req, res)
                    }
               } else {
                    errorList.errorModal = "لطفا تمامی فیلد های اجباری را به درستی وارد کنید "
                    return this.back(req, res)
               }
          }
     }

     async editSchool(req, res) {
          let school = await School.findById(req.params.id);
          res.render('admin/schools/edit', {
               title: "کاربران",
               school,
               messages: errorList
          });
          errorList = {
               name: "",
               email: "",
               address: "",
               text: "",
               tele: "",
               mobile: "",
               manager: "",
               province: "",
               city: "",
               password: "",
               confirmPassword: "",
               errorModal: "",
               successModal: ""
          }
     }

     async editSchoolProcess(req, res, next) {
          let id = this.xssAttak(req.params.id);
          if (this.checkID(id)) {
               let result = await validationResult(req)
               if (!result.isEmpty()) {
                    if (result.errors) {
                         if (req.file) {
                              this.removeFile(req.file.path);
                         }
                         this.errorHandler(result.errors, errorList);
                         console.log(errorList);
                         this.back(req, res);
                    }
               } else {
                    console.log(req.body);
                    let data = {}
                    let socials = {}
                    if (req.file) {
                         data.image = this.xssAttak(`${req.file.destination}/${req.file.filename}`.substr(8));
                    }
                    if (req.body.name) {
                         data.name = this.xssAttak(req.body.name);
                    }
                    if (req.body.text) {
                         data.text = this.xssAttak(req.body.text);
                    }
                    if (req.body.text) {
                         data.tele = this.xssAttak(req.body.tele);
                    }
                    // if (req.body.mobile) {
                    //      data.mobile = this.xssAttak(req.body.mobile);
                    // }
                    if (req.body.manager) {
                         data.manager = this.xssAttak(req.body.manager);
                    }
                    if (req.body.province) {
                         data.province = this.xssAttak(req.body.province);
                    }
                    if (req.body.city) {
                         data.city = this.xssAttak(req.body.city);
                    }
                    if (req.body.address) {
                         data.address = this.xssAttak(req.body.address);
                    }
                    if (req.body.active === "on") {
                         data.active = true;
                    } else {
                         data.active = false;
                    }
                    if (req.body.national_id) {
                         data.national_id = this.xssAttak(req.body.national_id);
                    }
                    if (req.body.telegram) {
                         socials.telegram = this.xssAttak(req.body.telegram);
                    }
                    if (req.body.instagram) {
                         socials.instagram = this.xssAttak(req.body.instagram);
                    }
                    if (req.body.whatsapp) {
                         socials.whatsapp = this.xssAttak(req.body.whatsapp);
                    }
                    if (req.body.website) {
                         socials.website = this.xssAttak(req.body.website);
                    }
                    data.socials = socials;
                    School.findByIdAndUpdate(id, {
                         $set: {
                              ...data
                         }
                    }, (err, school) => {
                         if (err) {
                              console.log(err);
                              errorList.errorModal = "ویرایش آموزشگاه انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                         }
                         if (school) {
                              errorList.errorModal = "ویرایش آموزشگاه با موفقیت انجام شد"
                         } else {
                              errorList.errorModal = "ویرایش آموزشگاه انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                         }
                    })
                    res.redirect("/admin/schools");
               }
          } else {
               this.directError(404, "موردی یافت نشد", next);
          }

     }
     deleteProcess(req, res, next) {
          let id = this.xssAttak(req.params.id);
          if (this.checkID(id)) {
               School.findByIdAndDelete(id, (err, school) => {
                    if (err) {
                         errorList.errorModal = "حذف آموزشگاه انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید";
                    }
                    if (school) {
                         errorList.successModal = "حذف آموزشگاه با موفقیت انجام شد"
                    } else {
                         errorList.errorModal = "حذف آموزشگاه انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید";
                    }
               })
               res.redirect("/admin/schools");
          } else {
               this.directError(404, "موردی یافت نشد", next);
          }
     }
     async map(req, res) {
          res.render('admin/schools/map', {
               messages: errorList
          });
     }
}