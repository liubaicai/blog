---
layout:     post
title:      "Win10开发第(12)弹，设置WebView访问时的UserAgent"
date:       2015-12-24 10:07:57 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

文章介绍了如何在WebView里以自定义UA去访问web页面。

第一种方法是通过HttpRequestMessage设置，然后使用NavigateWithHttpRequestMessage导航到目标页。
<pre class="lang:c# decode:true ">var url = new Uri("http://map.baidu.com");
var userAgent = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36";
using (var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, url))
{
    httpRequestMessage.Headers.Add("User-Agent", userAgent);
    WebView.NavigateWithHttpRequestMessage(httpRequestMessage);
}</pre>
第二种方法是调用Win32的api，可以在本地运行，但是提交不了商店：
<pre class="lang:c# decode:true ">[DllImport("urlmon.dll", CharSet = CharSet.Ansi)]
private static extern int UrlMkSetSessionOption(int dwOption, string pBuffer, int dwBufferLength, int dwReserved);

public void ChangeUserAgent(string Agent)
{
    UrlMkSetSessionOption(URLMON_OPTION_USERAGENT, Agent, Agent.Length, 0);
}</pre>
&nbsp;