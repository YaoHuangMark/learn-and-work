<!--
 * @Author: 黄遥
 * @Date: 2020-06-01 10:06:52
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-06-01 10:14:56
 * @Description: file content
--> 
## 什么是 nginx
其实就是一个轻量级的服务器，可以很好的处理反向代理和负载均衡；可以很好的处理静态资源；在前端主要做接口转发下。
```conf
    vim /etc/nginx/nginx.conf
    
    # 设置用户组
    #user  nobody;
    # 占用内核数，一般设置为服务器最高内核  
    worker_processes  1;
    
    # error log 存放位置
    #error_log  logs/error.log;
    #error_log  logs/error.log  notice;
    #error_log  logs/error.log  info;
    
    #pid        logs/nginx.pid;
    
    
    events {
        # 每一个worker进程能并发处理的最大连接数
        worker_connections  1024;
    }
    
    
    http {
        include       mime.types;
        default_type  application/octet-stream;
    
        #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
        #                  '$status $body_bytes_sent "$http_referer" '
        #                  '"$http_user_agent" "$http_x_forwarded_for"';
    
        #access_log  logs/access.log  main;
    
        sendfile        on;
        #tcp_nopush     on;
    
        #keepalive_timeout  0;
        keepalive_timeout  65;

        # 开启gzip压缩
        gzip  on;
        # gzip默认不压缩javascript、图片等静态资源文件
        gzip_types text/plain application/x-javascript text/css text/javascript;
        
        #nginx上传限制,默认为1M;
        client_max_body_size 6m;
        
        # 引入其他配置文件
        include /etc/nginx/conf.d/*.conf;
        
        
        #### 重点在这个里面 ####
        server {
            listen       80;
            # 访问的Domain
            server_name  10.142.78.40;
            # 根目录
            root   E:\work;
            # 文件夹索引，生产环境要关闭
            autoindex on;
            # 匹配到/的时候默认加载index.html 然后在找index.htm
            index index.html index.htm;
            
            # 这2行需要加进来，不然页面的中文可能会出现乱码
            default_type    ‘text/html’;
            charset utf-8;

            # header 允许_字符
            underscores_in_headers on;
                  
           location ~(/usrcenter){
                    # 匹配到usrcenter， 转发到http://10.142.78.40:8787/usrcenter
                    proxy_pass http://10.142.78.40:8787;
            }
            location /o2blog_wx/ {
                # 当访问xxxx/o2blog_wx的时候转发到服务器上的http://127.0.0.1:3000
                # 通过rewrite字段重写，将o2blog_wx进行正则匹配替换
                # 也就是xxxx/o2blog_wx/hello  =》  http://127.0.0.1:3000/hello
                proxy_pass http://127.0.0.1:3000;
                rewrite ^/o2blog_wx/(.*) /$1 break;
            }
            
            # 不让dist的东西去匹配/ 里面的内容
            location ~(/dist){
                   # 关闭静态资源缓存，方便dbeug；生产环境不要用
                  expires off; 
                  # expires 365d;
            }
            
            # 将/下面的URL 都重写到/index.html 
            location / {
                     rewrite ^  /index.html break;
                     index index.html index.htm;
             }
             
             ## 设置302 跳转
            location /o2blog_wx/ {
                # 当匹配到http://aotu.jd.com/o2blog_wx/的时候会跳转到http://aotu.jd.com/wxblog
                return 302 http://aotu.jd.com/wxblog
            }                                                   
            error_log /var/log/nginx/html_error.log;
            
            # 将404 和50X 重定向到 对应的报错页面
            error_page  404              /404.html;
            error_page   500 502 503 504  /50x.html;                
        }
    }
```
