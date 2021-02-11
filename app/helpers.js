const Path = require('path');
const moment_jalali = require("moment-jalali");
moment_jalali.loadPersian({
     usePersianDigits: true
});
module.exports = class Helpers{

     constructor(req,res){
          this.req = req;
          this.res = res;
     }
     
     getObjects(){
          return {
               auth:{
                    user : this.req.user,
                    check : this.req.isAuthenticated()
               },
               viewPath:this.viewPath,
               req : this.req,
               date: this.convertDateToPersian,
               dateTime : this.convertDateToPersianWithTime
          }
     }

     viewPath(dir){
          return Path.resolve(config.layout.view_dir+'/'+dir)
     }
     convertDateToPersian(date) {
          return moment_jalali(date).format("jD jMMMM jYYYY");
     }
     convertDateToPersianWithTime(date) {
          return moment_jalali(date).format("jD jMMMM jYYYY - ساعت :  HH:mm");
     }
}