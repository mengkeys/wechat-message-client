# wechat-message-client 中文文档

# 还没发布呢，别着急！

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
var config = {
    token:"跟你的服务一致",
    encodingAESKey:"也跟你的服务一致"
}
var wechatMessageClient = require('wechat-message-client')(config);

wechatMessageClient.signature(function(err, res){
    console.log(err || res);
});
```

#### 发送消息

```javascript
// 发送文本消息
wechatMessageCilent.message("您好", function(err, res){
   console.log(err || res);
});
```
### 就是这么简单

### 这里提供了一个示例,可以全局安装[mocha](https://www.npmjs.com/package/mocha)进行测试


进示例目录，安装模块依赖
```
 cd example && npm i
```

启动服务（最low的公众号消息服务）
```
 node server.js
```

运行mocha测试
```
 mocha
```


