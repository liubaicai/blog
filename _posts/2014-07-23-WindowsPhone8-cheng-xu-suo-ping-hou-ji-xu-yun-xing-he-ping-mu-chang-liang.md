---
layout:     post
title:      "WindowsPhone8程序锁屏后继续运行和屏幕常亮"
date:       2014-07-23 08:45:27 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	锁屏后继续运行:
</p>

<p>
	PhoneApplicationService.Current.ApplicationIdleDetectionMode = IdleDetectionMode.Disabled;
</p>

<p>
	屏幕常亮
</p>

<p>
	PhoneApplicationService.Current.UserIdleDetectionMode = IdleDetectionMode.Disabled;
</p>