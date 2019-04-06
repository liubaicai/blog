---
layout:     post
title:      "WP8代码实现一键锁屏和一键重启"
date:       2014-04-14 07:52:56 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	<strong style="font-family: 'times new roman', times, serif; font-size: 20px; color: rgb(255, 0, 0); line-height: 1.6em;">锁屏篇:</strong>
</p>

<p>
	<span style="font-size:24px;">WP8.1的锁屏需要新建WP8.1Runtime Component项目，然后建立W8.1RT项目来引用它。&lt;/span>
</p>

<p>
	1.新建Windows Store -&nbsp;Windows Runtime Component项目（需要win8SDK）
</p>

<p>
	2.DllImport引入ShellChromeAPI.dll，封装Shell_TurnScreenOn(bool value)方法
</p>

<pre class="brush:csharp;">
public sealed class Lock
{
    [DllImport("ShellChromeAPI.dll")]
    private extern static void Shell_TurnScreenOn(bool value);
    public static void TurnScreen(bool isOn)
    {
        Shell_TurnScreenOn(isOn);
    }
}</pre>

<p>
	3.项目属性选择arm平台，生成
</p>

<p>
	4.将生成的.winmd文件引入wp项目
</p>

<p>
	5.调用(false为锁屏)
</p>

<p>
	<strong style="color: rgb(255, 0, 0); font-family: 'times new roman', times, serif; font-size: 20px;">重启篇(wp8.1已失效):</strong>
</p>

<p>
	await Launcher.LaunchUriAsync(new Uri("test:"));
</p>

<p>
	收工
</p>