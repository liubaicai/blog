---
layout:     post
title:      "升级Win10“无法使用安装程序在U盘上安装Windows”解决方法"
date:       2018-05-01 08:06:53 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p><span style="color: rgb(68, 68, 68);">解决方法：</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">1、先关闭安装程序；</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">2、打开注册表（WIN+R 输入regedit）；</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">3、找到[HKEY_LOCAL_MACHINE\system\ControlSet001\Control]</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">4、将“PortableOperatingSystem”=dword:00000001，把 “PortableOperatingSystem”删掉</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">5、再执行Win10安装即可解决。</span></p>