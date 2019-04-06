---
layout:     post
title:      "c#静态属性方法也能继承?(大雾)"
date:       2014-08-26 08:35:00 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<pre class="brush:csharp;">


    class A
    {
        public static string a;
    }

    class B:A
    {
        // 
    }

    class C:A
    {
        // 
    }


C.a = "1";
var str = B.a;
//str="1";
</pre>

<p>
	ABC三个类中的a其实是同一个。
</p>