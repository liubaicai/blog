---
layout:     post
title:      "WP8.1商店应用SystemTray的变化"
date:       2014-04-16 04:04:39 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	原Microsoft.Phone.Shell中的SystemTray，已经改到Windows.UI.ViewManagement中&lt;span style="line-height: 1.6em;">StatusBar了。&lt;/span>
</p>

<p>
	<span style="line-height: 1.6em;">只能在代码中设置相关属性。&lt;/span>
</p>

<p>
	如:
</p>

<pre class="brush:csharp;">
StatusBar statusBar = StatusBar.GetForCurrentView();
// 显示StatusBar
await statusBar.ShowAsync();
// 隐藏StatusBar
// await statusBar.HideAsync();
// 设置ProgressIndicator
statusBar.ProgressIndicator.Text = "test...";
await statusBar.ProgressIndicator.ShowAsync();</pre>

<p>
	<a href="http://social.msdn.microsoft.com/Forums/zh-CN/744e2878-ccf3-4baa-ac2e-eb973a93ebbb/wp81shellsystemtray?forum=windowsphonezhchs">msdn</a>
</p>