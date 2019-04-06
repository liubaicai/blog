---
layout:     post
title:      "JSON转javabean(pojo)方法"
date:       2016-04-06 08:50:39 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

别再对着json来手写javabean啦。这个工作完全不要脑子，而且耗时。

这里给大家提供三种方式：
<ol>
	<li>android studio版：
万能的插件：GsonFormat
如何安装？
Preference-&gt;Plugins-&gt;Search GsonFormat-&gt;Install-&gt;Restart
如何使用？
新建一个JavaBean，Code-&gt;Generate-&gt;GsonFormat-&gt;input your
JSON炒鸡方便有木有！</li>
	<li>web版：
准确来说是js版，Stay在网上找了段源码放到自己的服务器上供大家使用：
<a href="http://api.stay4it.com/json/index.html">http://api.stay4it.com/json/index.html</a></li>
	<li>java project版
跟GsonFormat类似，只是你不需要自己建javabean，你只需要把json放到指定文件里让程序去读，它会自动帮你生成好你要的javabean文件，如果pojo嵌套pojo，它会帮你生成多个pojo文件。
源代码地址：
<a href="http://pan.baidu.com/s/1sjzalhr">http://pan.baidu.com/s/1sjzalhr</a></li>
</ol>
不论你用哪一种，它都能极大的提升开发效率，其实有很多类似的工具。当你觉得自己是在做纯体力活时，你有必要想想是否应该写个工具，或者google一下～