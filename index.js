/*
 * config client | check signature | send message
 * mengekeys 2015-02-07
 * */
var urllib = require('urllib');
var crypto = require('crypto');
var url = require('url');
const util = require('util');
var xml2js  = require('xml2js');

// 抛出错误
function throwError(message){
    throw new Error(message || 'error');
}

// 生成signature
function signatureGenerator(token, timestamp, nonce) {
    var shasum = crypto.createHash('sha1');
    var arr = [token, timestamp, nonce].sort();
    shasum.update(arr.join(''));
    return shasum.digest('hex');
}

// 生成时间戳
function timestampGenerator(){
    return new Date().getTime();
}

// 生成随机数
function nonceGenerator(length){
    var collection = '0123456789'; //纯数字
    var str = "";   //结果
    for(i=0;i<length;i++){
        c=Math.floor(Math.random()*99999)%collection.length;
        str += collection.substr(c,1)
    }
    return str;
}

// 生成随机字符串
function echoStringGenerator(length){
    var buf = crypto.randomBytes(length || 32);
    var string = buf.toString('base64');
    string = string.replace(/\//g,'_').replace(/\+/g,'-');
    return string.substr(0, length);
}

// 封装xml数据
function xmlGenerator(){

}

// 解析xml数据
function xmlParser(xml, callback){
    xml2js.parseString(xml, {trim: true}, callback);
}

// wmc对象
var WMC = function (token,urlObject) {
    this.token = token;
    this.timestamp = timestampGenerator();
    this.nonce     = nonceGenerator(16);
    this.echostr   = echoStringGenerator(32);
    this.signature = signatureGenerator(this.token,this.timestamp,this.nonce);
    this.urlObject = urlObject;
    this.urlObject.query = {
        signature:this.signature,
        timestamp:this.timestamp,
        nonce:this.nonce,
        echostr:this.echostr
    };
    this.remote = url.format(this.urlObject);
    this.checkSignature = function (callback) {
        if(!util.isFunction(callback)) {
            throwError('callback function required.');
        }
        urllib.request(this.remote, callback);
    };
    this.sendMessage　= function (option, callback) {
        if(!util.isFunction(callback)){
            throwError('callback function required.');
        }
        // TODO 处理xml数据格式化
        urllib.request(this.remote, option, function (err, data, res) {
            if(err) return callback(err);
            // 把res.data转换成xml数据
            // 把data转换成json/js数据
            xml2js.parseString(res.data.toString(),{trim:true}, function (err, result) {
                res.data = result;
                data = data.toString();
                if(err) return callback(err);
                return callback(null, data, res);
            });
        });
    }
};

module.exports = function (token,urlObject) {
    if(!util.isString(token)){
        throwError('token string required.')
    }

    if(!util.isObject(urlObject)){
        throwError('url object to format required.');
    }
    return new WMC(token,urlObject);
};

