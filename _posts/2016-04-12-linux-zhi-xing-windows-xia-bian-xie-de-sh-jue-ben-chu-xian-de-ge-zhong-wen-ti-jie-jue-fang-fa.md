---
layout:     post
title:      "linux执行windows下编写的sh脚本出现的各种问题解决方法"
date:       2016-04-12 06:32:52 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>比如#!/bin/sh报错not found sh啦，变量不可用啦之类的。&lt;/p><p>

先安装

dos2unix
</p><p>
然后

dos2unix xxxxx.sh
</p><p>
就可以欢快的

./xxxxx.sh 了

&nbsp;</p>