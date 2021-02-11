const express = require('express');
const router = express.Router();

//Controllers
const AdminController = require('app/http/controllers/adminController');
const SchoolController = require('app/http/controllers/schoolController');
const UserController = require('app/http/controllers/userController');
const MessageController = require('app/http/controllers/messageController');
const AccountController = require('app/http/controllers/accountController');
const ticketController = require('app/http/controllers/ticketController');
const noticeController = require('app/http/controllers/noticeController');
//Middlewares
const {
     uploadImage
} = require('app/helpers/uploadImages');
const ConvertFileToField = require('app/http/middlewares/convertFileToField');
const RDIA = require('app/http/middlewares/redirectIfAuthenticated');
const RDINA = require('app/http/middlewares/redirectIfNotAuthenticated');
//validator 

const schoolValidator = require("app/http/validators/schoolValidator");
const noticeValidator = require("app/http/validators/noticeValidator");
const ticketValidator = require("app/http/validators/ticketValidator");
router.use((req, res, next) => {
     res.locals.layout = "admin/master2";
     next();
});

router.get('/', AdminController.index);
router.get('/schools', SchoolController.getSchools);
router.get('/schools/add', SchoolController.addSchoolPage);
router.post('/schools/add',
     uploadImage.single('image'),
     ConvertFileToField.handle,
     schoolValidator.addSchool(),
     SchoolController.addSchoolProcess
);
router.get('/schools/edit/:id', SchoolController.editSchool);
router.put('/schools/edit/:id',
     uploadImage.single('image'),
     ConvertFileToField.handle,
     schoolValidator.addSchool(),
     SchoolController.editSchoolProcess);
router.delete("/schools/:id", SchoolController.deleteProcess)
router.get("/schools/map", SchoolController.map);

router.get('/users', UserController.index);

router.get('/messages', MessageController.index);

router.get('/account', AccountController.index);
router.get("/account/edit", AccountController.editForm)
router.put("/account/edit", uploadImage.single("image"), ConvertFileToField.handle, AccountController.editProcess)

router.get('/ticket', ticketController.index);
router.get("/ticket/add", ticketController.ticketForm)
router.post('/ticket/answer/:id', ticketController.answerTicket);
router.post('/ticket/closeTicket/:id', ticketController.closeTicket);
router.get("/ticket/send", ticketController.sendForm);
router.post("/ticket/send", ticketValidator.handle(), ticketController.sendProcess);
router.get("/ticket/send/list", ticketController.sendList);
router.get("/ticket/send/:id", ticketController.seenTicketSend);
router.post("/ticket/answerToReceive/:id", ticketController.answerToReceiveTicket);
router.post('/ticket/send/closeTicket/:id', ticketController.closeSendTicket);
router.get('/ticket/:id', ticketController.seenTicket);

router.get('/notice', noticeController.index);
router.get('/notice/add', noticeController.noticeForm);
router.post("/notice/add", noticeValidator.handle(), noticeController.createNotice);
router.get("/notice/:id", noticeController.findNotice);
router.delete("/notice/:id", noticeController.deleteNotice);

module.exports = router;