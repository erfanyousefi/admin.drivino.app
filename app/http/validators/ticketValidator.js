const {body} = require("express-validator");
class ticketValidator{
    handle(){
        return [
            body("school")
            .notEmpty()
            .withMessage(" گیرنده نمیتواند خالی باشد"),
            body("title")
            .notEmpty()
            .withMessage("عنوان تیکت نمیتواند خالی باشد"),
            body("body")
            .notEmpty()
            .withMessage("توضیحات نمیتواند خالی باشد")
        ]
    }
}
module.exports = new ticketValidator();