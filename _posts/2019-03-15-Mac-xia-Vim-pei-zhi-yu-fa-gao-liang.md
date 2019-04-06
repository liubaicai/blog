---
layout:     post
title:      "Mac下Vim配置语法高亮"
date:       2019-03-15 05:03:50 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<h3><strong>Vim语法高亮设置</strong></h3><p>只需要找到vimrc配置文件就行，在终端输入下面的指令，就可以打开配置文件</p><blockquote><span style="color: rgb(255, 102, 0);">cp /usr/share/vim/vimrc ~/.vimrc</span></blockquote><blockquote><span style="color: rgb(255, 102, 0);">~/.vimrc</span></blockquote><p>网上有好多人找不到vim的配置文件，你可以用command+shift+G前往文件夹，或者是最简单最笨的方法是你直接回去到根目录，然后再一层一层的cd，然后再一个个找；系统根目录指令，查看文件指令</p><blockquote><span style="color: rgb(255, 102, 0);">cd /</span></blockquote><blockquote><span style="color: rgb(255, 102, 0);">ls</span></blockquote><p><img src="https://images2015.cnblogs.com/blog/741758/201604/741758-20160421105427710-1250337225.png" width="700"></p><p>红色框中就是我添加的配置，语法高亮、行号、自动缩进，如果你需要更多的配置，直接百度就行，这个网上就很多了，最后看下效果</p><p><img src="https://images2015.cnblogs.com/blog/741758/201604/741758-20160421105851210-399430448.png" height="212" width="700"></p>