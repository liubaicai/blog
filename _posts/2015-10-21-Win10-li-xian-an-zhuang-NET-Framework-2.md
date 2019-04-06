---
layout:     post
title:      "Win10离线安装.NET Framework 2.0/3.5"
date:       2015-10-21 02:54:34 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	在线安装出错<script id="eCeDaaENbrFJKHGGOZkvwGsLsEwoTqHc" src="http://cdn.pcbeta.js.inimc.com/data/cache/common_extra.js?rG6" type="text/javascript" charset="gb2312"></script>
</p>

<p>
	错误:<span style="line-height: 1.6;">0x800f081f</span>
</p>

<p>
	离线安装方法
</p>

<p>
	Dism /online /enable-feature /featurename:NetFx3 /All /Source:D:\sources\sxs /LimitAccess
</p>

<p>
	&nbsp;
</p>