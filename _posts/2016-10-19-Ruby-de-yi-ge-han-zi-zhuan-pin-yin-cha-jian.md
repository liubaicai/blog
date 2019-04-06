---
layout:     post
title:      "Ruby的一个汉字转拼音插件"
date:       2016-10-19 07:26:01 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p style="font-family: "Lucida Sans", "Lucida Grande", Verdana, Arial, sans-serif; font-size: 15px;">Translate chinese hanzi to pinyin.</p><p style="font-family: "Lucida Sans", "Lucida Grande", Verdana, Arial, sans-serif; font-size: 15px;">The dict is borrowed from&nbsp;<a href="http://github.com/fayland/perl-lingua-han/tree/master/Lingua-Han-PinYin/">http://github.com/fayland/perl-lingua-han/tree/master/Lingua-Han-PinYin/</a><a href="http://github.com/fayland/perl-lingua-han/tree/master/Lingua-Han-PinYin/" style="color: rgb(0, 85, 170);"></a></p><div id="content" style="font-family: "Lucida Sans", "Lucida Grande", Verdana, Arial, sans-serif; font-size: 13px;"><div id="filecontents" style="font-size: 15px; line-height: 1.5145em;"><h2 id="Install" style="padding-bottom: 3px; border-bottom: 1px solid rgb(170, 170, 170); font-size: 1.4em; margin-top: 1.8em; margin-bottom: 0.5em; position: relative;">Install</h2><pre class="code ruby" style="color: rgb(0, 0, 0); tab-size: 2; font-family: monospace; padding: 9px 14px; margin-top: 4px; border-color: rgb(225, 225, 232); background: rgb(247, 247, 249); font-size: 1em; line-height: 1.2em;"><code class="ruby"><span class="id identifier rubyid_gem">gem</span> <span class="id identifier rubyid_install">install</span> <span class="id identifier rubyid_chinese_pinyin">chinese_pinyin</span>
</code></pre><p>or add in Gemfile.</p><pre class="code ruby" style="color: rgb(0, 0, 0); tab-size: 2; font-family: monospace; padding: 9px 14px; margin-top: 4px; border-color: rgb(225, 225, 232); background: rgb(247, 247, 249); font-size: 1em; line-height: 1.2em;"><code class="ruby"><span class="id identifier rubyid_gem">gem</span> <span class="tstring" style="color: rgb(3, 106, 7);"><span class="tstring_beg">'</span><span class="tstring_content">chinese_pinyin</span><span class="tstring_end">'</span></span>
</code></pre><h2 id="Usage" style="padding-bottom: 3px; border-bottom: 1px solid rgb(170, 170, 170); font-size: 1.4em; margin-top: 1.8em; margin-bottom: 0.5em; position: relative;">Usage</h2><p>By CLI</p><pre class="code ruby" style="color: rgb(0, 0, 0); tab-size: 2; font-family: monospace; padding: 9px 14px; margin-top: 4px; border-color: rgb(225, 225, 232); background: rgb(247, 247, 249); font-size: 1em; line-height: 1.2em;"><code class="ruby">$ ch2py -h
Usage: ch2py [opts]
    -c, --camelcase                  Camelcase of each word
    -i, --stdin                      Read from stdard input
    -t, --tone                       Show tone at end of word
    -m, --tonemarks                  Show tone at top of letter, this
would cover -t option
    -s, --splitter &lt;splitter&gt;        Splitter of each word, use a space
by default
    -v, --version                    Show version
    -h, --help                       Show this help

$ ch2py 中文
zhong wen
</code></pre><p>By code</p><pre class="code ruby" style="color: rgb(0, 0, 0); tab-size: 2; font-family: monospace; padding: 9px 14px; margin-top: 4px; border-color: rgb(225, 225, 232); background: rgb(247, 247, 249); font-size: 1em; line-height: 1.2em;"><code class="ruby">require 'chinese_pinyin'

Pinyin.t('中国')  =&gt; "zhong guo"
Pinyin.t('你好world') =&gt; "ni hao world"
Pinyin.t('中国', splitter: '-') =&gt; "zhong-guo"
Pinyin.t('中国', splitter: '') =&gt; "zhongguo"
Pinyin.t('中国', tone: true) =&gt; "zhong1 guo2"
Pinyin.t('中国', tonemarks: true) =&gt; "zhōng guó"
Pinyin.t('北京') { |letters| letters[0].upcase } =&gt; 'BJ'
Pinyin.t('北京') { |letters, i| letters[0].upcase if i == 0 } =&gt; 'B'
</code></pre><h2 id="Polyphone_Issue" style="padding-bottom: 3px; border-bottom: 1px solid rgb(170, 170, 170); font-size: 1.4em; margin-top: 1.8em; margin-bottom: 0.5em; position: relative;">Polyphone Issue</h2><p>use Words.dat to override default behavior.</p><p>by default</p><pre class="code ruby" style="color: rgb(0, 0, 0); tab-size: 2; font-family: monospace; padding: 9px 14px; margin-top: 4px; border-color: rgb(225, 225, 232); background: rgb(247, 247, 249); font-size: 1em; line-height: 1.2em;"><code class="ruby">Pinyin.t('广州') =&gt; "yan zhou"
</code></pre><p>add file Words.dat</p><pre class="code ruby" style="color: rgb(0, 0, 0); tab-size: 2; font-family: monospace; padding: 9px 14px; margin-top: 4px; border-color: rgb(225, 225, 232); background: rgb(247, 247, 249); font-size: 1em; line-height: 1.2em;"><code class="ruby">广州|guang3 zhou1
</code></pre><p>set&nbsp;<code>ENV['WORDS_FILE']</code>&nbsp;for Words.dat</p><pre class="code ruby" style="color: rgb(0, 0, 0); tab-size: 2; font-family: monospace; padding: 9px 14px; margin-top: 4px; border-color: rgb(225, 225, 232); background: rgb(247, 247, 249); font-size: 1em; line-height: 1.2em;"><code class="ruby">ENV['WORDS_FILE'] = "Words.dat path"
Pinyin.t('广州') =&gt; "guang zhou"</code></pre></div></div>