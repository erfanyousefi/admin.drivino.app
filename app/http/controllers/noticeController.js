const Controller = require("app/http/controllers/controller");
const noticeModel = require("app/models/notice");
const schoolModel = require("app/models/school");
const {
    validationResult
} = require("express-validator")
let errorList = {
    errorModal: "",
    successModal: "",
    subject: "",
    title: "",
    body: "",
    ticket: null
}
class noticeController extends Controller {
    async index(req, res, next) {
        let notices = await noticeModel.find({}).populate({
            path: "school",
            select: "name"
        }).sort({
            createdAt: -1
        }).exec();
        // return res.json(tickets)
        res.render("./admin/notices/index", {
            notices,
            messages: errorList
        })
        errorList = {
            errorModal: "",
            successModal: "",
            subject: "",
            title: "",
            body: ""
        }
    }

    async noticeForm(req, res, next) {
        let schools = await schoolModel.find({
            active: true
        });
        res.render("./admin/notices/addNotice", {
            messages: errorList,
            schools
        })
        errorList = {
            errorModal: "",
            successModal: "",
            title: "",
            body: ""
        }
    }
    async createNotice(req, res, next) {
        let result = await validationResult(req)
        if (!result.isEmpty()) {
            if (result.errors) {
                this.errorHandler(result.errors, errorList);
                return this.back(req, res);
            }
        } else {
            let title = this.xssAttak(req.body.title);
            let body = this.xssAttak(req.body.body);
            let notice = new noticeModel();
            if (req.body.school) {
                if (req.body.school === "all") {
                    notice.school = null;
                } else {
                    notice.school = this.xssAttak(req.body.school);
                }
            }
            notice.title = title;
            notice.body = body;
            notice.read = false;
            notice.save(err => {
                if (err) {
                    errorList.errorModal = "اطلاعیه ارسال نشد لطفا بعدا یا مجددا تلاش بفرمائید";
                } else {
                    errorList.successModal = "اطلاعیه با موفقیت ارسال شد";
                }
            })
        }
        return res.redirect("/admin/notice");
    }
    async seenNotice(req, res, next) {
        let id = this.xssAttak(req.params.id);
        if (this.checkID(id)) {
            let notice = await noticeModel.findById(id).populate(["school"]).exec();
            if (notice) {
                if (!notice.read) {
                    notice.read = true;
                    notice.status = 1;
                    notice.save();
                }
            }
            // return res.json(ticket)
            res.render("./admin/tickets/answerTicket", {
                messages: errorList,
                notice
            });
        } else {
            this.directError(404, "موردی یافت نشد", next);
        }
        errorList = {
            errorModal: "",
            successModal: "",
            subject: "",
            title: "",
            body: ""
        }
    }
    async deleteNotice(req, res, next) {
        let id = this.xssAttak(req.params.id);
        if (this.checkID(id)) {
            await noticeModel.findByIdAndDelete(id, (err, notice) => {
                if (err) {
                    errorList.errorModal = "اطلاعیه حذف نشد لطفا بعدا یا مجددا امتحان کنید";
                }
                if (notice) {
                    errorList.successModal = "اطلاعیه با موفقیت حذف شد";
                } else {
                    errorList.errorModal = "اطلاعیه حذف نشد لطفا بعدا یا مجددا امتحان کنید";
                }
            })
            this.back(req, res);
        } else {
            this.directError(404, "موردی یافت نشد", next);
        }
    }
    async findNotice(req, res, next) {
        let id = this.xssAttak(req.params.id);
        if (this.checkID(id)) {
            let notice = await noticeModel.findById(id);
            return res.json(notice)
            // this.back(req, res);
        } else {
            this.directError(404, "موردی یافت نشد", next);
        }
    }
}
module.exports = new noticeController();