const {body} = require("express-validator");
class noticeValidator{
    handle(){
        return [
            body("title")
            .notEmpty()
            .withMessage("عنوان اطلاعیه نمیتواند خالی باشد"),
            body("body")
            .notEmpty()
            .withMessage("توضیحات نمیتواند خالی باشد")
        ]
    }
}
module.exports = new noticeValidator();