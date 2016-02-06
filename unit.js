/**
 * User: xtech
 * Date: 16-2-6
 * File:
 */

/*
var crypto = require('crypto');

crypto.randomBytes(32, function (err, buffer) {
    if(err) throw err;
    var string = buffer.toString('base64');
    string = string.replace(/\//g,'_').replace(/\+/g,'-');
    console.log(string.substr(0, 32));
});
*/

var xml2js = require('xml2js');

var data = {"xml":{"ToUserName":{"_cdata":"abcd"}}};

var builder = new xml2js.Builder();
var xml = builder.buildObject(data);

console.log(xml);

