/**
 * User: xtech
 * Date: 16-2-6
 * File:
 */

var express = require('express');
var wechat  = require('wechat');
var http = require('http');
var logger = require('morgan');
var bodyParser = require('body-parser');

var token = 'wechat-message-client-example';

var app = express();
// 日志输出
app.use(logger('dev'));
// 请求解析
app.use(bodyParser.json());
// 请求解析urlencode
app.use(bodyParser.urlencoded({ extended: false }));
app.use(wechat(token, function (req, res, next) {
    var message = req.weixin;
    res.reply("hello, wechat.");
}));
// 404
app.use(function (req, res, next) {
    var error = new Error();
    error.status = 404;
    error.message = 'NOT FIND.';
    return next(error);
});

// 500
app.use(function (err, req, res) {
    var error = new Error(err.message || 'Server Error');
    res.statusCode = err.status || 500;
    res.json(JSON.stringify(error.message));
});

var port = 3080;

var server = http.createServer(app);

server.listen(port, function () {
    console.log('your wechat server listen at port ' + port);
});