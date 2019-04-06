---
layout:     post
title:      "WP8.1StoreApp(WP8.1RT)---本地Toast"
date:       2014-04-17 15:03:25 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	WP7/8中的Toast是不能在前台弹出的。
</p>

<p>
	WP8.1StoreApp可以利用Win8中的方式:<span style="line-height: 1.6em;">&nbsp;</span>
</p>

<pre class="brush:csharp;">
private void Toast(string title,string content)
{
    ToastTemplateType toastTemplate = ToastTemplateType.ToastText02;//WindowsPhone上只支持这一种
    XmlDocument toastXml = ToastNotificationManager.GetTemplateContent(toastTemplate);
    XmlNodeList toastTextElements = toastXml.GetElementsByTagName("text");
    toastTextElements[0].AppendChild(toastXml.CreateTextNode(title));
    toastTextElements[1].AppendChild(toastXml.CreateTextNode(content));
    ToastNotification toast = new ToastNotification(toastXml);
&nbsp; &nbsp; var guid = Guid.NewGuid().ToString("N").Substring(0, 16);
&nbsp; &nbsp; toast.Tag = guid;
&nbsp; &nbsp; toast.Dismissed += (sender, args) =&gt; ToastNotificationManager.History.Remove(guid);
&nbsp; &nbsp; toast.Activated += (sender, args) =&gt; ToastNotificationManager.History.Remove(guid);
    ToastNotificationManager.CreateToastNotifier().Show(toast);
}</pre>

<p>
	&nbsp;
</p>