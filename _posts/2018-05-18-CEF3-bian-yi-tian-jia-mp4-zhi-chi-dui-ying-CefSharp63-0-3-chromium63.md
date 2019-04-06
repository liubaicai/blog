---
layout:     post
title:      "CEF3编译添加mp4支持(对应CefSharp63.0.3)，chromium63(3239)，附下载"
date:       2018-05-18 05:56:31 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>x86/x64 Release包下载:</p><p>链接: https://pan.baidu.com/s/1v-PrSjm2-Z5JVQF5CWpe6w 密码: fxtm</p><p>----------------------------------------------</p><h2>编译环境需求(3239版本)</h2><h3>win7或更高，64位</h3><h3>vs2017 15.3.2+ 默认位置安装</h3><p>不需要安装附带的win10sdk，sdk单独装</p><h3>Windows 10.0.15063.468 SDK 默认位置安装</h3><p><a href="https://developer.microsoft.com/en-us/windows/downloads/sdk-archive" target="_blank">这里</a>下载相应版本sdk</p><h3>8g ram 和 40g disk</h3><p>实测<span style="color: rgb(255, 0, 0);">完全不够</span>，最终编译成功时是16g内存+32g虚拟内存+110g左右的磁盘空间，据说是因为新版official编译巨耗内存</p><h3>可以不可描述的互联网</h3><p>我是用proxfixer配合ss实现全局代理</p><h3>其他</h3><blockquote>https://bitbucket.org/chromiumembedded/cef/wiki/BranchesAndBuilding.md</blockquote><blockquote>在这里可以查看不同的branch版本需要的具体环境</blockquote><pre class="ql-syntax" spellcheck="false">WARNING: If you are using VS2017 15.5.* to build 3282 branch then you must add enable_precompiled_headers=false to GN_DEFINES to avoid a known issue with clang.
</pre><h2>步骤</h2><p>使用cmd命令行操作</p><p>盘符和路径可改，保证目录结构即可，留足至少100g空间</p><h3>创建文件夹</h3><pre class="ql-syntax" spellcheck="false">c:\code\automate
c:\code\chromium_git
</pre><h3>下载depot_tools.zip</h3><p>https://storage.googleapis.com/chrome-infra/depot_tools.zip</p><p>解压到c:\code\depot_tools，注意.git隐藏文件夹也要解压过去</p><p>进入c:\code\depot_tools目录，执行update_depot_tools.bat</p><pre class="ql-syntax" spellcheck="false">cd c:\code\depot_tools
update_depot_tools.bat
</pre><p>这一步会下载python，git，ninja等需要的工具</p><h3>c:\code\depot_tools添加到环境变量PATH</h3><h3>下载automate-git.py到c:\code\automate\automate-git.py</h3><p>https://bitbucket.org/chromiumembedded/cef/raw/master/tools/automate/automate-git.py</p><h3>创建c:\code\chromium_git\update.bat文件</h3><pre class="ql-syntax" spellcheck="false">set CEF_USE_GN=1
set GN_DEFINES=is_official_build=true ffmpeg_branding=Chrome proprietary_codecs=true
set GN_ARGUMENTS=--ide=vs2017 --sln=cef --filters=//cef/*
python ..\automate\automate-git.py --download-dir=c:\code\chromium_git --depot-tools-dir=c:\code\depot_tools --no-distrib --no-build --branch=3239
</pre><p><span style="color: rgb(255, 0, 0);">“ffmpeg_branding=Chrome proprietary_codecs=true”是添加mp3mp4支持，--branch=3239是指定版本</span></p><p>执行update.bat</p><pre class="ql-syntax" spellcheck="false">cd c:\code\chromium_git
update.bat
</pre><p>经过漫长的下载(共下载约10g左右，需翻墙)</p><h3>创建c:\code\chromium_git\build.bat文件</h3><pre class="ql-syntax" spellcheck="false">set CEF_USE_GN=1
set GN_DEFINES=is_official_build=true ffmpeg_branding=Chrome proprietary_codecs=true
set GN_ARGUMENTS=--ide=vs2017 --sln=cef --filters=//cef/*
python ..\automate\automate-git.py --download-dir=c:\code\chromium_git --depot-tools-dir=c:\code\depot_tools --no-depot-tools-update --no-debug-build --force-build --no-update --branch=3239
</pre><p>x64编译，python添加<span style="background-color: rgb(246, 248, 250); color: rgb(0, 0, 0);"> </span><span style="color: rgb(79, 79, 79);" class="hljs-subst">--</span><span style="color: rgb(0, 0, 0); background-color: rgb(246, 248, 250);">x64</span><span style="color: rgb(0, 0, 0);" class="hljs-attribute">-build</span></p><p>执行build.bat</p><pre class="ql-syntax" spellcheck="false">cd c:\code\chromium_git
build.bat
</pre><p>经过漫长的编译(4核8线程3.6ghzcpu，编译耗时约2-2.5小时)</p><h3>如果顺利完成</h3><p>将会自动打包成cef_binary_3.3239.1723.g071d1c1_windows32.zip的包</p><p>从http://opensource.spotify.com/cefbuilds/index.html上下载3239的sample包，运行后打开网址 http://html5test.com，可以查看mp4支持情况</p><blockquote>这里增加编码的方法如下:</blockquote><blockquote>从Chromium的源码third_party\ffmpeg\chromium\config\Chrome\win\ia32\config.h可以得知Chrome采用的FFmpeg的配置选项，在原有的配置选项后面添加如下选项:</blockquote><blockquote>“<span style="color: rgb(136, 0, 0);">FFMPEG_CONFIGURATION</span>”？</blockquote><pre class="ql-syntax" spellcheck="false">--enable-decoder='rv10,rv20,rv30,rv40,cook,h263,h263i,mpeg4,msmpeg4v1,msmpeg4v2,msmpeg4v3,amrnb,amrwb,ac3,flv' --enable-demuxer='rm,mpegvideo,avi,avisynth,h263,aac,amr,ac3,flv,mpegts,mpegtsraw' --enable-parser='mpegvideo,rv30,rv40,h263,mpeg4video,ac3'
</pre><blockquote>其中 rmvb电影视频编码是RV40，音频编码是COOK，所以这样子编译后应该支持rmvb了，不过貌似仍然会有花屏现象（vlc也会出现类似问题，貌似是说ffmpeg的使用问题吧，没空去研究）</blockquote><blockquote>----引用自https://www.cnblogs.com/caibirdy1985/p/7244961.html</blockquote>