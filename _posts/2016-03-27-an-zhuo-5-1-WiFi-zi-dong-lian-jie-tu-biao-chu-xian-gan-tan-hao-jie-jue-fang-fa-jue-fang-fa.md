---
layout:     post
title:      "安卓5.1的WiFi不自动连接和图标出现感叹号的解决方法"
date:       2016-03-27 08:47:56 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<div>谷歌原生安卓系统当连接到移动数据网络或者WIFI网络的时候，其NetworkMonitor模块会向特定的服务器发起一个http的请求并利用收到的响应进行网络状态判断。由于谷歌的服务器被天朝屏蔽，所以导致没有返回值，这个时候谷歌安卓系统就会在信号或者wifi上打一个感叹号。&lt;/div>
<div></div>
<div>解决的办法比较简单，修改接收请求的服务器地址：&lt;/div>
<div>首先搞定您pc的adb环境，然后连接您的手机和电脑，在命令提示符用下面命令来修改将服务器地址修改成http://api.liubaicai.net/generate_204</div>
<div></div>
<div>adb shell settings put global captive_portal_server api.liubaicai.net</div>
<div></div>
<div>然后重启见效！&lt;/div>
<div></div>
<div>如果您想恢复的话，使用下面的语句：&lt;/div>
<div></div>
<div>
<div>adb shell settings delete global captive_portal_server</div>
<div>adb shell settings put global captive_portal_detection_enabled 1</div>
</div>
&nbsp;