---
layout:     post
title:      "使用VS2010调试WPF/SL/WP7设计器界面异常(转)"
date:       2014-04-02 05:59:20 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	原文地址:http://www.cnblogs.com/tianhonghui/archive/2012/07/21/2602383.html 作者:<a class="headermaintitle" href="http://www.cnblogs.com/tianhonghui/" id="Header1_HeaderTitle" style="margin: 0px; padding: 0px; color: black; text-decoration: none;">孤狼晖&lt;/a>
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	<span style="margin: 0px; padding: 0px; font-size: 10pt;">当使用Vs2010或blend设计器时常常会出现异常而无法进行UI的编辑 如下图所示，这样会对设计带来不便：&lt;/span>
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	<img alt="" src="http://images.cnblogs.com/cnblogs_com/tianhonghui/201207/201207211600493239.png" style="margin: 0px; padding: 0px; border: 0px; width: 991px;" />
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	&nbsp; &nbsp;
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	&nbsp; &nbsp;
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	<img alt="" src="http://images.cnblogs.com/cnblogs_com/tianhonghui/201207/20120721160049175.png" style="margin: 0px; padding: 0px; border: 0px;" />
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	&nbsp; &nbsp;
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	&nbsp; &nbsp;
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	&nbsp; &nbsp;
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	<span style="margin: 0px; padding: 0px; font-size: 10pt;">这时我们可以利用Vs2010的Debug功能对此进行追踪，首先用blend打开要调试的工程，然后在VS2010里面选择Debug--&gt;Attach to Process</span>
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	&nbsp; &nbsp;
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	<span style="margin: 0px; padding: 0px; font-size: 10pt;">里面选中Blend.exe 确定后VS2010进入跟踪模式</span>
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	&nbsp; &nbsp;
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	&nbsp; &nbsp;
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	<img alt="" src="http://images.cnblogs.com/cnblogs_com/tianhonghui/201207/201207211600491570.png" style="margin: 0px; padding: 0px; border: 0px;" />
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	&nbsp; &nbsp;
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	<span style="margin: 0px; padding: 0px; color: rgb(89, 89, 89); font-size: 8pt;">屏幕剪辑的捕获时间: 2012/7/21 15:41</span>
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	&nbsp; &nbsp;
</p>

<p style="margin: 10px auto; padding: 0px; color: rgb(0, 0, 0); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20.880001068115234px;">
	<span style="margin: 0px; padding: 0px; font-size: 10pt;">再回到blend里面打开需要跟踪错误的页面，此时Vs2010就会捕获到这个异常，我们可以根据这个异常来解决UI设计器的问题。十分方便。&lt;/span>
</p>