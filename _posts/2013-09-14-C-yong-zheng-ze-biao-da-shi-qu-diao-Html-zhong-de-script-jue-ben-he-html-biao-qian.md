---
layout:     post
title:      "C#用正则表达式去掉Html中的script脚本和html标签"
date:       2013-09-14 12:13:39 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<pre class="brush:csharp;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; /// &lt;summary&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; /// 用正则表达式去掉Html中的script脚本和html标签
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; /// &lt;/summary&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; /// &lt;param name="Htmlstring"&gt;&lt;/param&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; /// &lt;returns&gt;&lt;/returns&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; public static string NoHTML(string Htmlstring)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //删除脚本&nbsp;&nbsp; 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = Regex.Replace(Htmlstring, @"&lt;script[^>]*?&gt;.*?&lt;/script&gt;", "", RegexOptions.IgnoreCase);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //删除HTML&nbsp;&nbsp; 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = Regex.Replace(Htmlstring, @"&lt;(.[^>]*)&gt;", "", RegexOptions.IgnoreCase);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = Regex.Replace(Htmlstring, @"([\r\n])[\s]+", "", RegexOptions.IgnoreCase);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = Regex.Replace(Htmlstring, @"--&gt;", "", RegexOptions.IgnoreCase);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = Regex.Replace(Htmlstring, @"&lt;!--.*", "", RegexOptions.IgnoreCase);

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = Regex.Replace(Htmlstring, @"&amp;(quot|#34);", "\"", RegexOptions.IgnoreCase);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = Regex.Replace(Htmlstring, @"&amp;(amp|#38);", "&amp;", RegexOptions.IgnoreCase);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = Regex.Replace(Htmlstring, @"&amp;(lt|#60);", "&lt;", RegexOptions.IgnoreCase);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = Regex.Replace(Htmlstring, @"&amp;(gt|#62);", "&gt;", RegexOptions.IgnoreCase);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = Regex.Replace(Htmlstring, @"&amp;(nbsp|#160);", "&nbsp;&nbsp; ", RegexOptions.IgnoreCase);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = Regex.Replace(Htmlstring, @"&amp;(iexcl|#161);", "\xa1", RegexOptions.IgnoreCase);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = Regex.Replace(Htmlstring, @"&amp;(cent|#162);", "\xa2", RegexOptions.IgnoreCase);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = Regex.Replace(Htmlstring, @"&amp;(pound|#163);", "\xa3", RegexOptions.IgnoreCase);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = Regex.Replace(Htmlstring, @"&amp;(copy|#169);", "\xa9", RegexOptions.IgnoreCase);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = Regex.Replace(Htmlstring, @"&amp;#(\d+);", "", RegexOptions.IgnoreCase);

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring.Replace("&lt;", "");
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring.Replace("&gt;", "");
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring.Replace("\r\n", "");
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Htmlstring = HttpUtility.HtmlDecode(Htmlstring).Replace("&lt;br/&gt;", "").Replace("&lt;br&gt;", "").Trim();

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return Htmlstring;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</pre>

<p>
	&nbsp;
</p>