/**
 * Created by Administrator on 2016/7/27.
 */
var http = require('http');
var qs = require('querystring');
var email = require('./Email');


module.exports = function (user) {
    var content = qs.stringify(user.post_data);
    var options = {
        hostname: '180.97.104.40',
        port: 80,
        path: '/tbmall/onekeySignin1',
        method: 'post',
        headers: {
            Accept:'*/*',
            Connection:'keep-alive',
            Cookie:user.cookie,
            Host:'tieba.baidu.com',
            Origin:'http://tieba.baidu.com',
            Referer:'http://tieba.baidu.com/'
        }
    };
    var req = http.request(options, function (res) {
        var data = '';
        var time = new Date().toDateString();
        console.log(time +'  ' + user.email + "开始签到  " + 'STATUS: ' + res.statusCode);
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            var res = JSON.parse(data);
            email(res, user.email);
        });
    });

    req.write(content);
    req.on('error', function (err) {
        console.log('problem with request: ' + err.message);
    });
    req.end();
};