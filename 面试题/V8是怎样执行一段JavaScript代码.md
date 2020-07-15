## 编译型语言
编译型语言在程序执行之前，需要经过编译器的编译过程，并且编译之后会直接保留机器能读懂的二进制文件，这样每次运行程序时，都可以直接运行该二进制文件，而不需要再次重新编译了。比如 C/C++、Go 等都是编译型语言
## 解释型语言
由解释型语言编写的程序，在每次运行时都需要通过解释器对程序进行动态解释和执行。比如 Python、JavaScript 等都是解释型语言

![Image text](https://note.youdao.com/yws/api/personal/file/WEB529e367a6ccfdc4e4918f8d6874e73f6?method=download&shareKey=86fbd9b75851e7d7a79a341f6bf45fa9)

## V8 是如何执行一段 JavaScript 代码
![Image text](https://static001.geekbang.org/resource/image/1a/ae/1af282bdc4036096c03074da53eb84ae.png)
从上图看出，V8 在执行过程中既有解释器 lgnition，又有编译器 TurboFan。
### 生成抽象语法树（AST）和执行上下文
AST 可以看成是代码的结构化的表示，编译器或者解析器后续的工作都需要依赖于 AST，而不是源代码。

Babel 的工作原理就是把 ES6 源码转换为 AST，再将 ES6 的 AST 转换为 ES5 的 AST，最后利用 ES5 的 AST 生成 JavaScript 代码。

ESLint 也是将源码转换为 AST，然后利用 AST 来检查代码规范化的问题。

1. 第一阶段是分词（tokenize），又称为词法分析，其作用是将一行行的源码拆解为一个个 token。所谓 token，指的是语法上不可能再分的、最小的单个字符或字符串
![Image text](https://static001.geekbang.org/resource/image/83/f5/838028071f63a132cc8b27b23960e5f5.png)
从图中可以看出，通过var myName = “极客时间”简单地定义了一个变量，其中关键字“var”、标识符“myName” 、赋值运算符“=”、字符串“极客时间”四个都是 token，而且它们代表的属性还不一样。
2. 第二阶段是解析（parse），又称为语法分析，其作用是将上一步生成的 token 数据，根据语法规则转为 AST。如果源码符合语法规则，这一步就会顺利完成。但如果源码存在语法错误，这一步就会终止，并抛出一个“语法错误”。这就是 AST 的生成过程，先分词，再解析。

有了 AST 后，那接下来 V8 就会生成该段代码的执行上下文。

### 生成字节码
解释器 Ignition 就登场了，它会根据 AST 生成字节码，并解释执行字节码。

字节码就是介于 AST 和机器码之间的一种代码。但是与特定类型的机器码无关，字节码需要通过解释器将其转换为机器码后才能执行。
![Image text](https://static001.geekbang.org/resource/image/87/ff/87d1ab147d1dc4b78488e2443d58a3ff.png)

### 执行代码
通常，如果有一段第一次执行的字节码，解释器 Ignition 会逐条解释执行。到了这里，相信你已经发现了，解释器 Ignition 除了负责生成字节码之外，它还有另外一个作用，就是解释执行字节码。在 Ignition 执行字节码的过程中，如果发现有热点代码（HotSpot），比如一段代码被重复执行多次，这种就称为热点代码，那么后台的编译器 TurboFan 就会把该段热点的字节码编译为高效的机器码，然后当再次执行这段被优化的代码时，只需要执行编译后的机器码就可以了，这样就大大提升了代码的执行效率。
![Image 即时编译(JIT)技术](https://static001.geekbang.org/resource/image/66/8a/662413313149f66fe0880113cb6ab98a.png)

