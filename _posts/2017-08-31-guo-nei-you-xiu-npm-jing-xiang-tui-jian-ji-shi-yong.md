---
layout:     post
title:      "国内优秀npm镜像推荐及使用"
date:       2017-08-31 03:21:06 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>npm全称Node Package Manager，是node.js的模块依赖管理工具。由于npm的源在国外，所以国内用户使用起来各种不方便。下面整理出了一部分国内优秀的npm镜像资源，国内用户可以选择使用。</p><p><br></p><h2>国内优秀npm镜像</h2><p><br></p><blockquote>淘宝npm镜像</blockquote><p>搜索地址：http://npm.taobao.org/</p><p>registry地址：http://registry.npm.taobao.org/</p><p><br></p><blockquote>cnpmjs镜像</blockquote><p>搜索地址：http://cnpmjs.org/</p><p>registry地址：http://r.cnpmjs.org/</p><p>如何使用</p><p><br></p><p>有很多方法来配置npm的registry地址，下面根据不同情境列出几种比较常用的方法。以淘宝npm镜像举例：</p><p><br></p><p>1.临时使用</p><pre>npm --registry https://registry.npm.taobao.org install express</pre><p>2.持久使用</p><pre>npm config set registry https://registry.npm.taobao.org<br>// 配置后可通过下面方式来验证是否成功<br>npm config get registry<br>// 或<br>npm info express</pre><p>3.通过cnpm使用</p><pre>npm install -g cnpm --registry=https://registry.npm.taobao.org<br>// 使用<br>cnpm install express</pre>