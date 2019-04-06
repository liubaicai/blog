---
layout:     post
title:      "WP8中使用Async执行HTTP请求"
date:       2013-07-14 07:12:15 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	<a href="https://nuget.org/packages/Microsoft.Bcl.Async" target="_blank">Async for .NET Framework 4, Silverlight 4 and 5, and Windows Phone 7.5 and 8</a>
</p>

<p>
	This package enables Visual Studio 2012 projects targeting .NET Framework 4 (with KB2468871), Silverlight 4 and 5, and Windows Phone 7.5 (including any portable library combinations) to use the new &#39;async&#39; and &#39;await&#39; keywords. This package also includes Task-based extension methods that allow using some of the existing asynchronous APIs with the new language keywords. Windows Phone 8 projects can use this package to get access to async extension methods for the networking types.
</p>

<p>
	&nbsp;
</p>

<p>
	This package is not supported in Visual Studio 2010, and is only required for projects targeting .NET Framework 4.5 or .NET for Windows Store apps when consuming a library that uses this package. For known issues, please see: http://blogs.msdn.com/b/bclteam/p/asynctargetingpackkb.aspx.
</p>

<p>
	To install Async for .NET Framework 4, Silverlight 4 and 5, and Windows Phone 7.5 and 8, run the following command in the <a href="http://docs.nuget.org/docs/start-here/using-the-package-manager-console"><font color="#0066cc"> Package Manager Console</font></a>
</p>

<h3>
	<font face="Courier New">PM&gt; Install-Package Microsoft.Bcl.Async </font>
</h3>