/**
 * User: mengkeys
 * Date: 16-2-6
 * File: wechat client
 */
var url = require('url');
var WMC = require('../index');
var config = require('./config');
var server = config.server;
var wechat = config.wechat;
var data = config.data;

var client = WMC(wechat.token,{
    protocol:'http',
    slashes:true,
    hostname:'localhost',
    port:3080
});
client.checkSignature(function(err, data, res){
    if(err) throw err;
    console.log(res);
    console.log(data.toString());
});
