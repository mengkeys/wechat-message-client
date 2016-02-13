# wechat-message-client （wmc）中文文档

## 干哈？
没啥，也就是一个用于微信公众号消息测试的客户端而已

## 咋用？

#### 安装

```javascript
npm i wechat-message-client --save-dev
```

#### Token验证

```javascript
// 下面的设置与微信公众平台设置无关（因为我们在自己开发）
var token = "你随便设置，只要跟后台一致就行";

// 这是你的服务器地址
var remote = {
    protocol:'http',
    slashes:true,
    hostname:'localhost',
    port:3080
};

// 引入wmc模块
var wmc = require('wechat-message-client');

// 实例化一个客户端
var client = wmc(token, remote);

// 发送token验证请求
client.checkSignature(function(err, data, res){
    if(err) throw err;
    console.log(data.toString());
    console.log(res);
});
```

#### 发送消息
##### 采用[urllib](https://www.npmjs.com/package/urllib)作为HTTP引擎，[xml](https://www.npmjs.com/pacakge/xml)做数据封装具体使用方法可以查看对应的文档。

```javascript
var xml = require('xml');

// 消息哦模板
var textTpl = {
    "xml":[
      {"ToUserName":{"_cdata":"aaaaaaaa"}},
      {"FromUserName":{"_cdata":"bbbbbbbbbbb"}},
      {"CreateTime":"1111111111111111"},
      {"MsgType":"text"},
      {"Content":"这是我发给公众号服务器的文本"},
      {"MsgId":"1234567890123456"}
    ]
};

// 发送(文本)消息
client.sendMessage({
    method:"POST",
    data:xml(textTpl,{ index: true })
}, function(err, data, res){
   if(err) throw err;
   console.log(data.toString());
   console.log(res);
});
```
### 就是这么简单

### 这里提供了一个示例


安装模块到本地

```javascript
npm install wechat-message-client
```

进入示例目录

```javascript
cd example 
```

安装模块依赖

```javascript
npm install
```

启动服务
```
node server.js
```

验证Token

```
 node signature.js
```
发送消息

```
 node message.js
```

