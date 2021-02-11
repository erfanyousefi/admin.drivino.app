const Controller = require("app/http/controllers/controller");
const adminTicketModel = require("app/models/adminTicket");
const ticketModel = require("app/models/ticket");
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
class ticketController extends Controller {
    async index(req, res, next) {
        let tickets = await adminTicketModel.find({}).populate({
            path: "school",
            select: "name"
        }).sort({
            createdAt: -1
        }).exec();
        let answers = await adminTicketModel.find({});
        let ticketUnRead = await adminTicketModel.find({
            read: false,
            status: 0
        }).count();
        if (ticketUnRead > 0) {
            errorList.ticket = ` شما ${ticketUnRead} تیکت خوانده نشده دارید لطفا بررسی های لازم را انجام دهید`;
        }
        // return res.json(tickets)
        res.render("./admin/tickets/index", {
            tickets,
            messages: errorList,
            answers
        })
        errorList = {
            errorModal: "",
            successModal: "",
            subject: "",
            title: "",
            body: ""
        }
    }
    async sendList(req, res, next) {
        let tickets = await ticketModel.find({}).populate({
            path: "school",
            select: "name"
        }).sort({
            createdAt: -1
        }).exec();
        let answers = await ticketModel.find({});
        // return res.json(tickets)
        res.render("./admin/tickets/sendList", {
            tickets,
            messages: errorList,
            answers
        })
        errorList = {
            errorModal: "",
            successModal: "",
            subject: "",
            title: "",
            body: ""
        }
    }

    async ticketForm(req, res, next) {
        let schools = await schoolModel.find({
            active: true
        });
        res.render("./admin/tickets/adminTicket", {
            messages: errorList,
            schools
        })
        errorList = {
            errorModal: "",
            successModal: "",
            subject: "",
            title: "",
            body: ""
        }
    }
    async sendForm(req, res, next) {
        let schools = await schoolModel.find({
            active: true
        });
        res.render("./admin/tickets/sendTicket", {
            messages: errorList,
            schools
        })
        errorList = {
            errorModal: "",
            successModal: "",
            subject: "",
            title: "",
            body: ""
        }
    }
    async sendProcess(req, res, next) {
        let result = await validationResult(req)
        if (!result.isEmpty()) {
            if (result.errors) {
                this.errorHandler(result.errors, errorList);
            }
        } else {
            let title = this.xssAttak(req.body.title);
            let body = this.xssAttak(req.body.body);
            let school = this.xssAttak(req.body.school);
            if (title && body && school) {
                let ticket = new ticketModel();
                ticket.school = school;
                ticket.title = title;
                ticket.body = body;
                ticket.sender = req.user._id;
                ticket.status = 0;
                ticket.read = false;
                ticket.save(err => {
                    if (err) {
                        errorList.errorModal = "تیکت ارسال نشد لطفا بعدا یا مجددا تلاش بفرمائید";
                    } else {
                        errorList.successModal = "تیکت با موفقیت ارسال شد";
                    }
                })
            }else{
                errorList.errorModal = "تیکت ارسال نشد لطفا تمامی اطلاعات را به درستی وارد کنید";
            }

        }
        return this.back(req, res);
    }
    async seenTicket(req, res, next) {
        let id = this.xssAttak(req.params.id);
        if (this.checkID(id)) {
            let ticket = await adminTicketModel.findById(id).populate(["school"]).exec();
            let answers = await adminTicketModel.find({
                parrent: id
            }).populate(["school"]).exec();

            if (ticket) {
                if (!ticket.read) {
                    ticket.read = true;
                    ticket.status = 1;
                    ticket.save();
                }
            }
            answers.forEach(answer => {
                if (answer) {
                    if (!answer.read) {
                        answer.read = true;
                        answer.save();
                    }
                }
            })

            // return res.json(ticket)
            res.render("./admin/tickets/answerTicket", {
                messages: errorList,
                ticket,
                answers
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
    async answerTicket(req, res, next) {
        let id = this.xssAttak(req.params.id);
        if (this.checkID(id)) {
            let ticket = new adminTicketModel();
            let parentTicket = await adminTicketModel.findById(id);
            ticket.parrent = id;
            ticket.school = this.xssAttak(req.body.school);
            ticket.body = this.xssAttak(req.body.body);
            ticket.sender = this.xssAttak(req.user._id);
            ticket.status = 2;
            ticket.read = false;
            ticket.title = undefined;
            ticket.subject = undefined;
            parentTicket.status = 2;
            parentTicket.save();
            ticket.save(err => {
                if (err) {
                    errorList.errorModal = "ارسال پاسخ به تیکت انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید";
                } else {
                    errorList.successModal = "ارسال پاسخ به تیکت با موفقیت انجام شد";
                }
            });
            return res.redirect("/admin/ticket");
        } else {
            this.directError(404, "موردی یافت نشد", next);
        }
    }
    async closeTicket(req, res, next) {
        let id = this.xssAttak(req.params.id);
        if (this.checkID(id)) {
            let ticket = await adminTicketModel.findById(id);
            ticket.status = 3;
            ticket.save(err => {
                if (err) {
                    errorList.errorModal = "بستن تیکت انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید";
                } else {
                    errorList.successModal = "تیکت با موفقیت بسته شد";
                }
            });
            this.back(req, res);
        } else {
            this.directError(404, "موردی یافت نشد", next);
        }
    }
    async seenTicketSend(req, res, next){
        let id = this.xssAttak(req.params.id);
        if (this.checkID(id)) {
            let ticket = await ticketModel.findById(id).populate(["school"]).exec();
            let answers = await ticketModel.find({
                parrent: id
            }).populate(["school"]).exec();
            // return res.json(ticket)
            answers.forEach(answer => {
                if (answer) {
                    if (!answer.read) {
                        answer.read = true;
                        answer.save();
                    }
                }
            })

            // return res.json(ticket)
            res.render("./admin/tickets/seenTicketSend", {
                messages: errorList,
                ticket,
                answers
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
    async answerToReceiveTicket(req, res, next) {
        let id = this.xssAttak(req.params.id);
        if (this.checkID(id)) {
            let ticket = new ticketModel();
            let parentTicket = await ticketModel.findById(id);
            ticket.parrent = id;
            ticket.school = this.xssAttak(req.body.school);
            ticket.body = this.xssAttak(req.body.body);
            ticket.status = 2;
            ticket.read = false;
            ticket.title = undefined;
            ticket.sender = req.user._id;
            parentTicket.status = 2;
            parentTicket.save();
            ticket.save(err => {
                if (err) {
                    errorList.errorModal = "ارسال پاسخ به تیکت انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید";
                } else {
                    errorList.successModal = "ارسال پاسخ به تیکت با موفقیت انجام شد";
                }
            });
            return res.redirect("/admin/ticket/send/list");
        } else {
            this.directError(404, "موردی یافت نشد", next);
        }
    }
    async closeSendTicket(req, res, next){
        let id = this.xssAttak(req.params.id);
        if (this.checkID(id)) {
            let ticket = await ticketModel.findById(id);
            ticket.status = 3;
            ticket.save(err => {
                if (err) {
                    errorList.errorModal = "بستن تیکت انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید";
                } else {
                    errorList.successModal = "تیکت با موفقیت بسته شد";
                }
            });
            this.back(req, res);
        } else {
            this.directError(404, "موردی یافت نشد", next);
        }
    }
}
module.exports = new ticketController();