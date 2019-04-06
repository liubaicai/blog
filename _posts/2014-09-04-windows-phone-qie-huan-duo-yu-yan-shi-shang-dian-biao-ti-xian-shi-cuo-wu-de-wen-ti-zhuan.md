---
layout:     post
title:      "windows phone 切换多语言时，商店标题显示错误的问题(转)"
date:       2014-09-04 06:20:13 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	前段时间，用业余时间写了一款 wp8 app（&amp;ldquo;超级滤镜&rdquo;商店，&lt;a href="http://www.windowsphone.com/zh-cn/store/app/%e8%b6%85%e7%ba%a7%e6%bb%a4%e9%95%9c/444f4133-4466-4c7c-93be-8ad04ecf8383?signin=true" style="margin: 0px; padding: 0px; color: rgb(51, 51, 51);">中文地址</a>；&lt;a href="http://www.windowsphone.com/en-us/store/app/super-imaging/444f4133-4466-4c7c-93be-8ad04ecf8383" style="margin: 0px; padding: 0px; color: rgb(51, 51, 51);">英文地址</a>），在多语言的时候，给 app title
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	和 app tile title 进行多语言时（参考&amp;nbsp;<a href="http://msdn.microsoft.com/zh-cn/library/windowsphone/develop/ff967550(v=vs.105).aspx" style="margin: 0px; padding: 0px; color: rgb(51, 51, 51);">MSDN</a>），中文商店（zh-cn）总是显示 &ldquo;Super Imaging&rdquo; 而不是 &ldquo;超级滤镜&rdquo;，
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	但是在手机上切换多语言时，名称显示正确，所以猜测是清单文件 WMAppManifest.xml 配置错误。
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	&nbsp;
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	默认情况下，把英语作为 app 的显示语言，设置如下：
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	1、右键单击项目属性，单击 &ldquo;程序集信息&amp;rdquo;：
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	<img alt="" height="334" src="http://images.cnitblog.com/i/348363/201407/311037396181541.jpg" style="margin: 0px; padding: 0px; border: 0px;" width="742" />
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	&nbsp;
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	2、在&ldquo;非特定语言&rdquo; 中选择 en-us 作为默认语言：
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	<img alt="" src="http://images.cnitblog.com/i/348363/201407/311038348057014.jpg" style="margin: 0px; padding: 0px; border: 0px;" />
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	&nbsp;
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	3、在 WMAppManifest.xml 清单文件中，勾选相应的语言，注意，因为英文为默认语言，这里不能
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	勾选 Chinese 选项，如下：
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	<img alt="" src="http://images.cnitblog.com/i/348363/201407/311044335082762.jpg" style="margin: 0px; padding: 0px; border: 0px;" />
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	&nbsp;
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	4、查看清单文件中的勾选结果，如图：
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	<img alt="" src="http://images.cnitblog.com/i/348363/201407/311045545241046.jpg" style="margin: 0px; padding: 0px; border: 0px;" />
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	&nbsp;
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	经过了多次清单文件的配置，切换商店显示显示正常（英国为 en-gb）。
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	切换显示：
</p>

<p style="margin: 10px auto; padding: 0px; line-height: 19.5px; color: rgb(0, 0, 0); font-size: 13px; font-family: verdana, 'ms song', 宋体, Arial, 微软雅黑, Helvetica, sans-serif;">
	<img alt="" src="http://images.cnitblog.com/i/348363/201407/311057587126634.jpg" style="margin: 0px; padding: 0px; border: 0px;" />
</p>