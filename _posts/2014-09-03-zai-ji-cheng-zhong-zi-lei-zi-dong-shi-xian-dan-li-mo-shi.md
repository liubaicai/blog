---
layout:     post
title:      "在继承中子类自动实现单例模式"
date:       2014-09-03 10:07:45 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	@<span style="color: rgb(68, 68, 68); font-family: Consolas, 'Microsoft Yahei', Verdana, Arial, Helvetica, sans-serif; font-size: 13px; line-height: 24px;">Paradox 技术支持&lt;/span>
</p>

<pre class="brush:csharp;">public abstract class Base&lt;T&gt; where T : new()
{
	private static T _instance;
	public static T Instance
	{
		get
		{
			if (_instance == null)
				_instance = new T();
			return _instance;
		}
	}
}<br></pre>

<pre class="brush:csharp;">public sealed class A : Base&lt;A&gt;
{
}</pre>

<p>
	&nbsp;
</p>