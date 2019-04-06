---
layout:     post
title:      "Android Studio升级到2.0后卡在Gradle project refresh的解决办法"
date:       2016-04-08 15:51:22 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>两种解决方式：
</p><p>
第一种：

关闭 Android studio

到用户文件夹

删掉三个文件夹&amp;nbsp;a).android, b).androidstudio1.5, c).gradle

打开Android studio
</p><p>
不行的话第二种：

Settings--Build,Exx.D...--Build Tools--Gradle--Use local gradle distribution选择正确版本和路径&lt;/p>