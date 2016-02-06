/**
 * User: xtech
 * Date: 16-2-6
 * File:
 */

var url = require('url');
var xml = require('xml');
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

client.sendMessage({
    method:'POST',
    data:xml(data['message']['text'],{ index: true })
},function(err, data, res){
    if(err) throw err;
    console.log(res);
    console.log(data);
});