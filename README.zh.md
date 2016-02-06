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

#### 发送消息

```javascript
var xml = require('xml');

// 发送文本消息
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

安装模块到本地之后，进示例目录，安装模块依赖
```
cd example && npm i
```

启动服务（最low的公众号消息服务）
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

### 后续版本
#### 消息数据动态渲染
#### 添加消息的加密/解密传输
#### 根据配置文件自动化测试响应

