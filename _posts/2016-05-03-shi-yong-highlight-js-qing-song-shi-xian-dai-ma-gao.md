---
layout:     post
title:      "使用highlight.js轻松实现代码高亮"
date:       2016-05-03 04:46:48 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p></p><p>highlight.js是一个强大的代码高亮工具，它可以自动解析pre标签，自动识别语言，加载高亮样式，几十种主题可选。&lt;/p><p>下载地址：&lt;/p><p><a href="https://highlightjs.org/download/">https://highlightjs.org/download/</a></p><p>快速使用：</p><pre>&lt;link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.3.0/styles/default.min.css"&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.3.0/highlight.min.js"&gt;&lt;/script&gt;
&lt;script&gt;hljs.initHighlightingOnLoad();&lt;/script&gt;<br></pre><p>插件会自动查找并分析语言，加载样式&lt;/p><p></p><pre>&lt;pre&gt;&lt;code&gt;...&lt;/code&gt;&lt;/pre&gt;<br></pre>可以指定语言：&lt;p></p><pre>&lt;pre&gt;&lt;code class="html"&gt;...&lt;/code&gt;&lt;/pre&gt;<br></pre><p>可以自定义初始化，比如加载所有pre标签</p><pre>$(document).ready(function() {
  $('pre').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});<br></pre><p>总之，非常强大和方便的。&lt;/p>