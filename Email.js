/**
 * Created by Administrator on 2016/7/28.
 */
var nodemailer = require('nodemailer');
var sendMail = require('./config/config').sendMail;

var transporter = nodemailer.createTransport(sendMail);
function analysis(data) {
    var text = '';
    var time = new Date().toDateString();
    text += time;
    if(data.error == 'success'){
        text += ("签到成功" + "\n");
        text += ("其中失败：" + data.data.signedForumAmountFail + "个\n");
    }
    else{
        text += ("签到失败" + "\n");
        text += ("错误代码：" + data.error);
    }
    return text;
}

module.exports = function (data, userMail) {
    var text = analysis(data);
    var time = new Date().toDateString();
    time += "签到报告";
    transporter.sendMail({
        from: sendMail.auth.user,
        to: userMail,
        subject: time,
        text : text
    }, function (error, response) {
        if(error){
            console.log(error);
        }
        else{
            console.log(userMail + '发送成功\n');
        }
    });
};