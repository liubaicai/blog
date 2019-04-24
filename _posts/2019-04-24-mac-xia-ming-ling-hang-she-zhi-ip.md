---
layout: post
title: mac下命令行设置ip
date: 2019-04-24 10:42:26 +0800
tags:
     - macos
     - ip
author: baicai
catalog: true
---

解决“无效的服务器地址 BasicIPv6ValidationError”
~~~
networksetup -listallnetworkservices //列出所有网络服务信息;
networksetup -setv6off "Ethernet 2"  //停止对应网卡的ipV6服务;
networksetup -setmanual "Ethernet 2" 10.10.22.222 255.255.255.0 10.10.22.1
~~~