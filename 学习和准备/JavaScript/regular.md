<!--
 * @Author: 黄遥
 * @Date: 2020-04-24 17:59:26
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-25 09:34:49
 * @Description: file content
 -->
## 创建正则

```javascript
var myreg = new RegExp(/test/g)
```

### 正则的方法

- 检测一个字符串是否匹配某个模式
```javascript
var str = "MyTest,mytest,abcdefj";
console.log(myreg.test(str))
```

- 检索字符串中的正则表达式的匹配
```javascript
var str = "MyTest,mytest,abcdefj";
console.log(myreg.exec(str))
```

### String 对象中

- 检索字符串中与指定的子字符串或正则表达式相匹配的子字符串。范围符合条件的第一个字符的位置
```javascript
var str = "MyTest,mytest,abcdefj";
str.search(/a/g)
```

- 在字符串内查找一个或多个与正则表达式匹配的字符串，返回一个对象。开启 g 则返回一个数组
```javascript
var str = "MyTest,mytest,abcdefj";
str.match(/a/g)
```

- 用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
```javascript
var str = "MyTest,mytest,abcdefj";
str.replace(/a/g, 'hy')
```