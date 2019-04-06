---
layout:     post
title:      "windows下sqlite的gem无法编译安装的问题"
date:       2017-05-12 13:51:54 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>除了要安装devkit并设置路径，还要下载sqlite的dll和源码到某个目录，然后：</p><pre> gem install do_sqlite3 -v '0.10.17' -- --with-sqlite3-dir=c:/cmd --with-sqlite3-include=c:/cmd --with-sqlite3-lib=c:/cmd<br></pre>