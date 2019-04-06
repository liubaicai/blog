---
layout:     post
title:      "WindowsPhone使用HtmlAgilityPack解析HTML"
date:       2013-07-14 07:37:16 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	NuGet里添加HtmlAgilityPack的引用
</p>

<p>
	添加本地&nbsp;C:\Program Files (x86)\Microsoft SDKs\Silverlight\v4.0\Libraries\Client\System.Xml.XPath.dll的引用
</p>

<pre class="brush:csharp;">
var doc = new HtmlDocument();
doc.Load(&hellip;&hellip;);</pre>

<p>
	之后便可以像操作XML一样操作HTML了
</p>