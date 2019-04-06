---
layout:     post
title:      "Mac OS X 中 hostname 的设置"
date:       2019-03-20 15:26:52 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<h2>查看系统 hostname 设置</h2><p>使用命令行工具 hostname 可以查看系统 hostname 设置：</p><pre class="ql-syntax" spellcheck="false">$ hostname
</pre><p>它的值会按优先级依次取决于下列值：</p><ul><li>hostname 命令设置的值</li><li>HostName 属性值</li><li>LocalHostName 属性值（通常系统都会设置此属性）</li></ul><p>关于 hostname 相关属性，scutil 命令手册（info scutil 或 man scutil）中有如下描述：</p><pre class="ql-syntax" spellcheck="false">          ComputerName   The user-friendly name for the system.

          LocalHostName  The local (Bonjour) host name.

          HostName       The name associated with hostname(1) and
</pre><blockquote><code><em>                         gethostname(3).</em></code></blockquote><h2>设置 hostname</h2><p>有三种方式设置 hostname：</p><ul><li>System Preferences</li><li>命令行工具 hostname</li><li>命令行工具 scutil</li></ul><h3>System Preferences</h3><p>设置方法：</p><blockquote><em>System Preferences -&gt; Sharing</em></blockquote><p>在这里可以查看和设置&nbsp;<em>ComputerName</em>&nbsp;和&nbsp;<em>LocalHostName</em>，但不能设置&nbsp;<em>HostName</em>&nbsp;的值。</p><p>对于普通用户通常使用这种方式就可以了，因为通常情况下都没有用 hostname 和 scutil 来设置，所以就会取&nbsp;<em>LocalHostName</em>&nbsp;的值。</p><h3>命令行工具 hostname</h3><p>设置当前系统的 hostname 为 MyMac：</p><pre class="ql-syntax" spellcheck="false">$ hostname MyMac
</pre><p><em>注意：这种方式不能保持到重启后</em></p><p>根据 hostname 命令的手册（info hostname 或 man hostname），可以使用 scutil 命令来持久修改 hostname</p><h3>命令行工具 scutil</h3><p>查看各属性值：</p><pre class="ql-syntax" spellcheck="false">$ sudo scutil --get ComputerName
Yanke's MBP
$ sudo scutil --get LocalHostName
Yankes-MBP
$ sudo scutil --get HostName
HostName: not set
</pre><p>设置 HostName 属性值：</p><pre class="ql-syntax" spellcheck="false">scutil --set HostName MyMac
</pre><p>scutil 可以修改&nbsp;<em>ComputerName</em>，<em>LocalHostName</em>&nbsp;和&nbsp;<em>HostName</em>&nbsp;任意一个值。</p>