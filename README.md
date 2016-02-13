# wmc(wechat-message-client)

### What is it?
you can send message to your wechat message reply server.

### How to use it?

##### Install

```javascript
npm i wechat-message-client --save-dev
```

##### Token Verify

```javascript
// the token from your setting.
var token = "YOUR_TOKEN";

// the remote url address.
var remote = {
    protocol:'http',
    slashes:true,
    hostname:'localhost',
    port:3080
};

// require module.
var wmc = require('wechat-message-client');

// instance
var client = wmc(token, remote);

// token verify
client.checkSignature(function(err, data, res){
    if(err) throw err;
    console.log(data.toString());
    console.log(res);
});
```

#### Send Message

```javascript
// xml module
var xml = require('xml');

// message template.
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

// post message [callback]
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

#### Example

install wmc module.

```
npm install wechat-message-client
```

change to example directory.
 
```
cd example
```

install dependence.

```
npm install
```

start example wechat message reply server.

```
node server.js
```

hava a token verify request.

```
 node signature.js
```

post a message to server. 

```
 node message.js
```