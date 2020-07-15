<!--
 * @Author: 黄遥
 * @Date: 2020-05-30 17:05:57
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-05-30 17:39:37
 * @Description: file content
--> 
## XSS
跨站脚本攻击。XSS 攻击者在 web 页面插入恶意的代码。当用户浏览该页面的时候，代码执行，从而实现攻击目的。对受害者用户可能采取Cookie资料窃取、会话劫持、钓鱼欺骗等各种攻击。

XSS跨站脚本攻击分为：
1. 反射性XSS
反射性XSS，也就是非持久性XSS。用户点击攻击链接，服务器解析后响应，在返回的响应内容中出现攻击者的XSS代码，被浏览器执行。一来一去，XSS攻击脚本被 web server 反射回来给浏览器执行，所以称为反射性 XSS

2. 持久性XSS
指通过提交恶意数据到服务器的数据库。应用程序从数据库中查询数据，在页面中显示出来，攻击者在相关页面输入恶意的脚本数据后，用户浏览此类页面时就可能受到攻击。这个流程简单可以描述为:恶意用户的Html输入Web程序->进入数据库->Web程序->用户浏览器。

3. DOM-based XSS
基于DOM的XSS，也就是 web server 不参与，仅仅涉及到浏览器的XSS。比如根据用户的输入来动态构造一个DOM节点，如果没有对用户的输入进行过滤，那么也就导致XSS攻击的产生
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="#">
    <label>please input your name:</label>
    <input type="text" id="username">
    <input id="sbm" type="submit" value="submit">
</form>
<div id="container">

</div>
<script>
    function getUserName(){
        var btn=document.getElementById("sbm");
        btn.addEventListener("click",function(e){
            e.preventDefault();
            document.getElementById("container").innerHTML=document.getElementById("username").value;
        },false)
    }
    getUserName();

</script>

</body>
</html>
```
如果我在输入框中输入<img src="1" onerror="alert('xss')">会出现什么情况

### XSS 防御
> 　　原则：不相信客户输入的数据
　　注意:  攻击代码不一定在<script></script>中

　　1.使用XSS Filter。

　　输入过滤，对用户提交的数据进行有效性验证，仅接受指定长度范围内并符合我们期望格式的的内容提交，阻止或者忽略除此外的其他任何数据。比如：电话号码必须是数字和中划线组成，而且要设定长度上限。过滤一些些常见的敏感字符，例如：< > ‘ “ & # \ javascript expression  "οnclick="  "onfocus"；过滤或移除特殊的Html标签， 例如: <script>, <iframe> ,  &lt; for <, &gt; for >, &quot for；过滤JavaScript 事件的标签，例如 "οnclick=", "onfocus" 等等。

　　输出编码，当需要将一个字符串输出到Web网页时，同时又不确定这个字符串中是否包括XSS特殊字符（如< > &‘”等），为了确保输出内容的完整性和正确性，可以使用编码（HTMLEncode）进行处理。

　　2.DOM型的XSS攻击防御

　　把变量输出到页面时要做好相关的编码转义工作，如要输出到 <script>中，可以进行JS编码；要输出到HTML内容或属性，则进行HTML编码处理。根据不同的语境采用不同的编码处理方式。

　　3.HttpOnly Cookie

　　将重要的cookie标记为http only,   这样的话当浏览器向Web服务器发起请求的时就会带上cookie字段，但是在脚本中却不能访问这个cookie，这样就避免了XSS攻击利用JavaScript的document.cookie获取cookie：

## CSRF跨站请求伪造攻击
![Image text](https://img-blog.csdn.net/20160719195923567)

要完成一次CSRF攻击，受害者必须依次完成两个步骤
1. 登录受信任网站A，并在本地生成 cookie
2. 在不退出A的情况下，访问危险网站B

### CSRF防御
1.对于关键操作我们应该采用post方法。

2.CSRF在攻击的时候往往是在用户不情的情况下提交的，我们可以使用验证码来强制跟用户交互，但是太多强制性的操作对用户来说体验感不好，所以要权衡利弊。

3.在重要的请求中添加Token，目前主流的做法是使用Token抵御CSRF攻击。CSRF攻击成功的条件在于攻击者能够预测所有的参数从而构造出合法的请求，所以我们可以加大这个预测的难度，加入一些黑客不能伪造的信息。我们在提交表单时，保持原有参数不变，另外添加一个参数Token，该值可以是随机并且加密的，当提交表单时，客户端也同时提交这个token，然后由服务端验证，验证通过才是有效的请求。但是由于用户的Cookie很容易由于网站的XSS漏洞而被盗取，所以这个方案必须要在没有XSS的情况下才安全。

4.检测Referer.所谓Referer，就是在一个网络请求头中的键值对，标示着目前的请求是从哪个页面过来的。服务器通过检查Referer的值，如果判断出Referer并非本站页面，而是一个外部站点的页面，那么我们就可以判断出这个请求是非法的。与此同时，我们也就检测到了一次csrf攻击。但是，服务器有时候并不能接收Referer值，所以单纯地只通过Referer来防御是不太合理的，它因此经常用于csrf的检测。

https://blog.csdn.net/wuhuimin521/article/details/80421851