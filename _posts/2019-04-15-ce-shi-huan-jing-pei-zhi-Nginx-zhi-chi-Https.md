---
layout: post
title: 测试环境配置Nginx支持Https
date: 2019-04-15 11:28:25 +0800
tags:
     - nginx https
author: baicai
catalog: true
---

配置步骤（共8步）：

0、创建私钥和证书存放目录

mkdir -p /usr/local/nginx/ssl/private
cd /usr/local/nginx/ssl/private

1、创建服务器私钥

# 会提示输入两次密码(Enter pass phrase for server.key)，
# 两次密码保持一致，后面还会用到
openssl genrsa -des3 -out server.key 1024
2、用于向第三方SSL证书颁发机构的请求文件CSR

# 提示输入私钥的密码后，会提示输入地域和邮箱，本着能偷懒就偷懒的原则，
# 直接留空回车，注意提示Common Name的时候输入自己的域名niliu.me, 也可以是泛域名*.niliu.me
openssl req -new -key server.key -out server.csr

3、生成自签名的证书CRT

# 会提示输入私钥密码
openssl x509 -req -in server.csr -out server.crt -signkey server.key -days 3650
4、剥离密码（避免重启Nginx的时候需要输入密码，提示Enter PEM pass phrase）

# 会提示输入私钥密码
openssl rsa -in server.key -out server.key.unsecure
5、配置nginx

# 在nginx 配置文件server块listen 80; 后一行新增如下指令
listen 443 ssl;
ssl_certificate /usr/local/nginx/ssl/private/server.crt;
ssl_certificate_key /usr/local/nginx/ssl/private/server.key.unsecure;
6、重启Nginx

systemctl reload nginx
7、测试
本地绑测试环境host
Mac 下 Chrome打开https地址
提示“您的连接不是私密连接”，选择高级，继续前往niliu.me(不安全)


Mac下 Safari打开https地址
提示此网站证书无效的时候，点击显示证书，选择始终信任。


注：局域网内测试可以，公网不可以。

