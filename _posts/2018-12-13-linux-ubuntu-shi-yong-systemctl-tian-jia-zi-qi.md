---
layout:     post
title:      "linux(ubuntu)使用systemctl添加自启动"
date:       2018-12-13 05:39:19 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>新建配置文件</p><pre class="ql-syntax" spellcheck="false">sudo vim /lib/systemd/system/abc.service&nbsp;
</pre><p>abc.service里写入以下内容</p><pre class="ql-syntax" spellcheck="false">[Unit]
Description=abc service
After=network.target syslog.target
Wants=network.target

[Service]
Type=simple
#启动服务的命令（此处写你的abc的实际安装目录）
ExecStart=/your/path/abc -a your -b params

[Install]
WantedBy=multi-user.target
</pre><p><br></p><p>启动abc&nbsp;</p><pre class="ql-syntax" spellcheck="false">sudo systemctl start abc
</pre><p>打开自启动&nbsp;</p><pre class="ql-syntax" spellcheck="false">sudo systemctl enable abc
</pre><p>重启应用</p><pre class="ql-syntax" spellcheck="false">sudo systemctl restart abc
</pre><p>停止应用</p><pre class="ql-syntax" spellcheck="false">sudo systemctl stop abc
</pre><p>查看应用的日志</p><pre class="ql-syntax" spellcheck="false">sudo systemctl status abc
</pre>