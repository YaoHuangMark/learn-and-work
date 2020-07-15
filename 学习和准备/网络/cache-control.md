<!--
 * @Author: 黄遥
 * @Date: 2020-05-29 10:56:47
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-05-29 13:56:28
 * @Description: file content
--> 
> 网页的缓存控制是由 HTTP 头中的 “Cache-control” 来实现的，常见值有 private、no-cache、max-age、must-revalidate。默认为 private，这几种值的作用是根据重新查看某一页面时不同的方式来区分的
1. 打开新窗口
值为 private、no-cache、must-revalidate，那么打开的窗口访问时都会重新访问服务器，而如果指定了 max-age 值，那么此值内的时间都不会访问服务器。例如：Cache-control: max-age = 5 (表示访问当前页面后的 5 秒内再次访问不会去请求服务器)
2. 在地址栏回车
值为 private、must-revalidate 则只有第一次访问时会访问服务器，以后都不会访问
值为 no-cache，那么每次都会访问
值为 max-age，则在过期之前不会重复访问
3. 按后退按钮
值为 private、must-revalidate、max-age，则不会重复访问
值为 no-cache，则每次都重复访问
4. 刷新按钮
无论为何值，都会重复访问



CacheControl = no-cache

Pragma=no-cache

Expires = -1
如果服务器上的网页经常变化，可以将 expires 设置为 -1，表示立即过期。如果一个网页每天凌晨 1 点更新，可以把 expires 设置为第二天的凌晨 1 点
