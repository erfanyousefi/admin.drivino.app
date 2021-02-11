const autoBind = require('auto-bind');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const xss = require("xss");
const fs = require("fs")
const mongoose = require("mongoose")
class Controller {

    constructor() {
        autoBind(this);
    }

    withToken(user,createToken = false) {
        if (user.token) {
            return {token: user.token}
        }
        if (createToken) {
            let token = jwt.sign(
                {user_id: user._id},
                config.jwtSecret,
                {expiresIn: '1440h'}
            );

            return {
                token
            }
        }

        return {};
    }
    
    withTokenTeacher(teacher,createToken = false) {
        if (teacher.token) {
            return {token: user.token}
        }
        if (createToken) {
            let token = jwt.sign(
                {user_id: teacher._id},
                config.jwtSecret,
                {expiresIn: '1440h'}
            );

            return {
                token
            }
        }

        return {};
    }
    
    validationData(req) {
        const errors = validationResult(req);
        let messages = [];
        errors.array().forEach(error => messages.push(error.msg));
        if (messages.length === 0) {
            return true;
        } else {
            req.flash('messages', messages);
            return false;
        }
    }

    createRecaptcha() {
        this.recaptcha = new Recaptcha(
            '6Lfz4zIaAAAAAKVob0cD-wM45SZhwx1_OVVUEZuc',
            '6Lfz4zIaAAAAAPdrBj9BuqD9Fa_rGqnFKjkE4vMK', {
                hl: 'fa-IR'
            })
    }
    recaptchaValidator(req) {
        return new Promise((resolve, reject) => {
            this.recaptcha.verify(req, (err, data) => {
                if (err) {
                    reject("لطفا تیک من ربات نیستم را بزنید")
                } else {
                    resolve(true);
                }
            })
        })

    }
    xssAttak(data) {
        return xss(data, {
            css: false,
            whiteList: [],
            stripIgnoreTag: true,
            stripIgnoreTagBody: ['script']
        }).trim(); //delete every html tags on input data and trim all
    }
    back(req, res) {
        res.redirect(req.header("referer"));
    }
    errorHandler(errors, errorList) {
        Object.values(errors).forEach(err => {
            errorList[err.param] = err.msg;
        })
    }
    checkID(id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            return true;
        } else {
            return false;
        }
    }
    directError(errorCode, message, next) {
        let error = new Error(message)
        error.status = errorCode;
        next(error);
    }
    persianDateTime(date) {
        return moment(date).format("jYYYY/jM/jD");
    }
    persianToGregorianDate(date, time = "") {
        return moment(date + " " + time, 'jYYYY/jM/jD HH:mm:ss').format("YYYY-M-D HH:mm:ss");
    }
    persianNumberToEnglishNumber(str) {
        return str.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
    }
    englishNumberToPersianNumber(str) {
        return str.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹' [d]);
    }
    hashString(str) {
        let salt = bcrypt.genSaltSync(15);
        let hash = bcrypt.hashSync(str, salt);
        return hash;
    }
    removeFile(path) {
        if (fs.existsSync(path)) {
            fs.unlinkSync(path, (err) => {
                console.log(err);
            })
        }
    }

};

module.exports = Controller;