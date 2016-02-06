# wechat-message-client
wechat client message send module

#### Install

```javascript
npm i wechat-message-client --save-dev

```

#### Token Verify

```javascript

var token = "TOKEN";
var remote = {
    protocol:'http',
    slashes:true,
    hostname:'localhost',
    port:3080
};

var wmc = require('wechat-message-client');

var client = wmc(token, remote);

client.checkSignature(function(err, data, res){
    if(err) throw err;
    console.log(data.toString());
    console.log(res);
});
```

#### Send Message

```javascript
var xml = require('xml');

// text message 
var textTpl = {
    "xml":[
      {"ToUserName":{"_cdata":"aaaaaaaa"}},
      {"FromUserName":{"_cdata":"bbbbbbbbbbb"}},
      {"CreateTime":"1111111111111111"},
      {"MsgType":"text"},
      {"Content":"hello,wechat"},
      {"MsgId":"1234567890123456"}
    ]
};

client.sendMessage({
    method:"POST",
    data:xml(textTpl,{ index: true })
}, function(err, data, res){
   if(err) throw err;
   console.log(data.toString());
   console.log(res);
});
```
### so easy to access your wechat reply server

### Example

install, into example directory and install dependence.
```
cd example && npm i
```

start server
```
node server.js
```

http(get) verify token 
```
 node signature.js
```
http(post) post message 
```
 node message.js
```