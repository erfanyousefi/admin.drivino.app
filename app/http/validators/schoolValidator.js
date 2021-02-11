const {
    body
} = require("express-validator");
const path = require("path");
class schoolValidator {
    addSchool() {
        return [
            body("name")
            .notEmpty()
            .withMessage("نام آموزشگاه نمی تواند خالی باشد"),
            body("manager")
            .notEmpty()
            .withMessage("نام مدیر آموزشگاه نمی تواند خالی باشد"),
            body("mobile")
            .notEmpty()
            .withMessage("شماره موبایل نمی تواند خالی باشد"),
            body("tele")
            .notEmpty()
            .withMessage("تلفن آموزشگاه نمی تواند خالی باشد"),
            body("address")
            .notEmpty()
            .withMessage("آدرس آموزشگاه نمی تواند خالی باشد"),
            body("text")
            .notEmpty()
            .withMessage("توضیحات مربوطه آموزشگاه نمی تواند خالی باشد"),
            body("province")
            .notEmpty()
            .withMessage("استان  نمی تواند خالی باشد"),
            body("city")
            .notEmpty()
            .withMessage("شهر نمی تواند خالی باشد"),
            body("password")
            .custom((value, {
                req
            }) => {
                if (value) {
                    if(value.length < 8 || value.length > 16){
                        throw new Error("رمز عبور نمیتواند خالی باشد و باید حداقل 8 و حداکثر 16 کاراکتر باشد")
                    }else{
                        return true;
                    }
                } else {
                    if (req.query._method === "put") {
                        return true;
                    } else {
                        throw new Error("رمز عبور نمیتواند خالی باشد و باید حداقل 8 و حداکثر 16 کاراکتر باشد")
                    }
                }

            }),
            body("confirmPassword")
            .custom((value, {
                req
            }) => {
                if (value) {
                    if (value === req.body.password) {
                        return true;
                    } else {
                        throw new Error("رمز عبور و تکرار آن باید برابر باشند لطفا کاراکتر های یکسان را وارد کنید");
                    }
                } else {
                    if (req.query._method === "put") {
                        return true;
                    } else {
                        throw new Error("رمز عبور نمیتواند خالی باشد و باید حداقل 8 و حداکثر 16 کاراکتر باشد");
                    }
                }
            }),
            body("image")
            .custom((value, {
                req
            }) => {
                if (!value) {
                    if (req.query._method === "put") {
                        return true;
                    } else {
                        throw new Error("فیلد تصویر نمیتوان خالی باشد")
                    }
                }
                if (value) {
                    let exts = [".png", ".jpg", ".jpeg", ".svg", ".gif"];
                    let ext = path.extname(value).toLowerCase();
                    if (exts.includes(ext)) {
                        return true;
                    } else {
                        throw new Error("فرمت انتخابی تصویر آموزشگاه باید یکی از فرمت های .png, .jpeg, .jpg, .svg, .gif باشد ")
                    }
                }
            })
        ]
    }
}
module.exports = new schoolValidator();