---
layout:     post
title:      "在Vue中使用highlight.js"
date:       2017-09-11 14:41:57 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>最后效果：</p><p><img src="http://7xpagu.com1.z0.glb.clouddn.com/uh1pons5e5ss12kdy31izf.jpg-500p"></p><p><br></p><p><strong>通过自定义指令的方式来实现在Vue中实现语法高亮</strong></p><h1>问题</h1><p>highlight.js如果在Vue中使用，这个问题一直困扰着我，而highlight.js的使用说明太过于简单，完全不知道怎么使用。</p><pre class="ql-syntax" spellcheck="false">&lt;link rel="stylesheet" href="/path/to/styles/default.css"&gt;
&lt;script src="/path/to/highlight.pack.js"&gt;&lt;/script&gt;
&lt;script&gt;hljs.initHighlightingOnLoad();&lt;/script&gt;
</pre><p>在<code>highlight.js</code>的Usage有这么一个方法我觉得我使用得到的</p><pre class="ql-syntax" spellcheck="false">$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
</pre><h1>实现</h1><h2>安装</h2><pre class="ql-syntax" spellcheck="false">npm install highlight.js
</pre><h2>编码</h2><p><a href="https://cn.vuejs.org/v2/guide/custom-directive.html" target="_blank" style="color: rgb(0, 154, 97);">Vue自定义指令 文档</a></p><pre class="ql-syntax" spellcheck="false">// Vue-cli生成的工程文件的src/main.js
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' //样式文件
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=&gt;{
    hljs.highlightBlock(block)
  })
})
</pre><h2>使用</h2><pre class="ql-syntax" spellcheck="false">&lt;p v-html="markdownhtml"&nbsp;v-highlight&gt;&lt;/p&gt;
</pre><p>到这里我们就打工告成了。</p><h1>封装成插件</h1><h2>编写插件</h2><pre class="ql-syntax" spellcheck="false">// highlight.js
import Vue from 'vue'
import Hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
let Highlight = {}
Highlight.install = function (Vue, options) {
  Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) =&gt; {
      Hljs.highlightBlock(block)
    })
  })
}
export default Highlight
</pre><h2>使用插件</h2><pre class="ql-syntax" spellcheck="false">import Highlight from 'path/to/Highlight.js'
Vue.use(Highlight)
</pre><p><br></p>