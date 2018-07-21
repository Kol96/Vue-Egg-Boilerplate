# Authentication

> 用户认证是Web中常见的功能，由于HTTP是无状态的，当用户将账号密码通过HTTP请求发送给后端校验后，后端在用户第二次请求时无法知晓用户是否登录。为了保证系统的安全，我们需要通过某种方法让用户能保持登录态。

## 一、cookie-session

### 1、实现方式

​	后端拿到用户账号和密码，校验成功后，通过算法生成sessionid，然后将它通过设置cookie存储到客户端，用户具体信息会存在服务器的内存（cookie，数据库，缓存）中。当用户下次请求时，请求体会带上cookie，后端根据sessionid可以拿到用户的信息。

```json
{
    "SESSIONID": "XXXXXXXXXXXXXXXXXXXXXXXX"
}
```

​	很早以前的做法是校验用户信息成功后将信息直接存储在cookie上，当时大多数是直接明码存储，这样导致了攻击者通过伪造cookie中的内容，可能获取网站的最高权限带来安全隐患。所以衍生出了新的方法，签名（信息摘要算法），服务器会存储一个secret key，通过sha1将用户信息和key加密，再存储在cookie上，这时候用户就没法伪造了，后端会每次对cookie做一遍校验。

```json
{
    "uid": "XXXXXXXXXXX",
    "uid.sig": "XXXXXXXXXXX"
}
```

### 2、优点

​	安全，由于sessionid是随机生成的，而且位数足够多，不用担心有人能伪造的问题。在设置cookie时设置了`httpOnly:true`，不用担心脚本会修改cookie的值。

### 3、缺点

​	如果把用户信息存放在内存中，在开发调试的时候很方便，但是在生产环境使用这种方法，服务器一重启，所有用户的session信息就都没了。同时它也不利于session信息的进程共享。

​	如果存在数据库，每次获取用户信息都需要操作数据库，查询效率相比于其他显得低很多。

​	缓存方式（redis，memcached）是为了实现进程共享而出现的方法，当我们有四个进程跑着同一个服务，用户A访问进程1后，他的用户信息被存入内存，下次请求时他被负载均衡到了进程2，这时进程2的内存上没有他的用户信息，这会导致用户在我们的服务上会有不同的状态。因此我们可以使用缓存实现session信息的同步。

​	存在cookie上的session方法经过优化，安全性得到了保证，但是由于cookie有长度限制，当设置的session内容过大时，浏览器会拒绝保存。同时由于在每次请求时浏览器都会带上cookie，内容过多时会影响传输的速度。

​	可能会导致csrf（Cross Site Request Forgery）攻击，使用者在登录网站时，没有退出登录，此时打开了攻击者的网站，攻击者向登录网站发起请求，由于cookie会自动在请求时带上，这样会让攻击者轻松的执行在使用者权限内的的任何请求操作。

## 二、JWT

全称JSON Web Token，它定义了一种用于简洁，自包含的用于通信双方之间以 JSON 对象的形式安全传递信息的方法。

### 1、实现方式

​	JWT由三部分组成，第一部分header，规范了token的类型和加密算法，使用Base64编码。第二部分payload，是存放用户信息的地方，可以设置 iss（签发者），exp（过期时间），sub（面向的用户），aud（接收方），iat（签发时间），使用Base64编码。第三部分signature，将上述两部分用点连接，再结合私钥使用HS256加密后得到。将得到的三部分按点相接，就组成了JWT，后端返回给前端，前端可以在localStorage或cookie中设置。

```javascript
const header = {
    typ: "JWT",
	alg: "HS256"
}
const payload = {
    uid: 'XXXXXX',
    role: 'admin',
    exp: 24 * 60 * 60 // 秒
}
const signature = HS256(base64(header) + '.' + base64(payload), secrect_key)
const token = base64(header) + '.' + base64(payload) + '.' + signature
```

​	在每次请求时，前端在header的Authorization位带上token，后端进行认证，判断签名是否正确，token是否过期等。

```
header {
    Authorization: 'Bearer Token'
}
```

### 2、优点

​	简单实用，用户信息存储在客户端，减轻服务器内存压力，不易被攻击，不存在session共享问题，支持跨域访问，没有csrf安全问题。非常适合前后端分离（SPA）的项目，适合没有cookie机制的项目（微信小程序，移动端），适合做单点登录。

### 3、缺点

​	用户注销可以将客户端的token从cookie中去除，但是token本身必须等到设置的过期时间到了后才会自动过期。

​	token中不能保存私密信息，Head和Payload使用base64进行编码。

​	无法作废已颁布的token，由于所有的认证信息都在JWT中，如果某个JWT被盗取了，是没有办法在服务端将其作废（自己放出去的token，含着泪也要认证到底）

### 4、依赖包

| 平台    | 库                                              |
| ------- | ----------------------------------------------- |
| Java    | maven com.auth0 / java-jwt / 0.4                |
| Node.js | npm install jsonwebtoken                        |
| .NET    | Install-Package System.IdentityModel.Tokens.Jwt |
