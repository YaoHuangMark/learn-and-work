<!--
 * @Author: 黄遥
 * @Date: 2020-04-24 10:43:56
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-05-03 15:11:30
 * @Description: file content
 -->
## Closure

当函数可以记住并访问所在词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包

>Closure is a behavior of functions and only functions. If you aren't dealing with a function, closure does not apply. An object cannot have closure, nor does a class have closure (though its functions/methods might). Only functions have closure.

>For closure to be observed, a function must be invoked, and specifically it must be invoked in a different branch of the scope chain from where it was originally defined. A function executing in the same scope it was defined would not exhibit any observably different behavior with or without closure being possible; by the observational perspective and definition, that is not closure.

## define closure

Closure is observed when a function uses variable(s) from outer scope(s) even while running in a scope where those variable(s) wouldn't be accessible.

The key parts of this definition are:

- Must be a function involved
- Must reference at least one variable from an outer scope
- Must be invoked in a different branch of the scope chain from the variable(s)