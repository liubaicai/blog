---
layout:     post
title:      "WP8创建protected或internal的Page或者UserControl"
date:       2014-08-21 09:30:17 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	由于Page或者UserControl是partial定义的，需要在两个部分声明
</p>

<p>
	只要分别定义
</p>

<pre class="brush:csharp;">
public partial class MainPage</pre>

<p>
	然后在xaml的根节点添加
</p>

<pre class="brush:xml;">
x:ClassModifier="internal"</pre>

<p>
	即可
</p>