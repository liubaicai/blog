---
layout:     post
title:      "WP8VS的XAML编辑器报错“无法确定调用方的应用程序标识”的解决方法"
date:       2014-03-06 06:48:10 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	vs的xaml编辑器真心不好用，经常报蓝线错误，但是又可以编译通过。
</p>

<p>
	其中有一个错误&amp;ldquo;无法确定调用方的应用程序标识&rdquo;，往往是由于在控件初始化里执行了存取隔离存储空间或者AppSetting的操作。如果这部分操作时必须的，可以尝试将此操作转移到控件的loaded事件中，蓝线报错可以解决。
</p>