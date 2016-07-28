/**
 * Created by Administrator on 2016/7/27.
 */
var config = require('./config/config');
var signStart = require('./sign');
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.hour = 4;
rule.minute = 15;
console.log("自动签到启动");
schedule.scheduleJob(rule, function () {
    signStart(config.luoye);
});