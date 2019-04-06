---
layout:     post
title:      "WSL文件读写权限的配置方法"
date:       2018-12-13 09:22:20 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>技术的世界却是日新月异，连微软都拥抱开源了，Windows subsystem for Linux (WSL) 简直是在赤裸裸的勾引程序员扔掉Mac投奔Windows。</p><p>既有Windows的桌面和Office套件，又可以方便的使用Linux的工具链，这样的生活不要太美好！当然前期坑是少不了的，经过两年时间的改进，wsl团队解决了不少问题（比如本文将提到的文件权限问题），个人觉得已经可以入坑了。当前时间节点18年6月，版本windows 10 1803, build 17134。</p><p>WSL的介绍和安装请看下这里：</p><ul><li><a href="https://docs.microsoft.com/zh-cn/windows/wsl/faq?from=singlemessage&amp;isappinstalled=0" target="_blank" style="color: rgb(37, 143, 184);">Frequently Asked Questions</a></li><li><a href="https://docs.microsoft.com/zh-cn/windows/wsl/install-win10" target="_blank" style="color: rgb(37, 143, 184);">Install the Windows Subsystem for Linux</a></li></ul><h2><a href="https://blogs.msdn.microsoft.com/commandline/2018/03/07/windows10v1803/" target="_blank" style="color: rgb(37, 143, 184);">What’s new for the Command Line in Windows 10 version 1803</a><strong>文件读写权限配置</strong></h2><ul><li>启动WSL，windows的硬盘会自动mount到linux系统下，但是早期版本所有windows文件的owner和group都会设置为root，读写权限则是从windows系统下继承过来。经常可以看到一片绿油油的777权限的文件和文件夹列表，这显然和linux系统中的最佳实践不符的，特别是从Git上拉下来的文件的权限都被改变了，而且对这些文件使用chmod或者chown是不起作用的，简直没法忍。</li></ul><p><a href="http://zuyunfei.com/2018/06/15/file-system-configuration-in-wsl/noMetadata.png" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(37, 143, 184);"><img src="http://zuyunfei.com/2018/06/15/file-system-configuration-in-wsl/noMetadata.png"></a>在<a href="https://blogs.windows.com/windowsexperience/2017/12/19/announcing-windows-10-insider-preview-build-17063-pc/#cbUAtBrErr1A3JJA.97" target="_blank" style="color: rgb(37, 143, 184);">&nbsp;Insider Build 17063</a>&nbsp;中，wsl加入了DrvFs功能，在WSL和Windows文件系统中充当桥梁，使WSL的文件权限可以支持更多的Metadata和更多的Mount选项。详细介绍看这里&nbsp;<a href="https://blogs.msdn.microsoft.com/commandline/2018/01/12/chmod-chown-wsl-improvements/" target="_blank" style="color: rgb(37, 143, 184);">Chmod/Chown WSL Improvements</a>。</p><p>使用简单命令就可以用drvfs重新mount硬盘：</p><pre class="ql-syntax" spellcheck="false">sudo umount /mnt/c
sudo mount -t drvfs C: /mnt/c -o metadata
</pre><p><br></p><p><span style="color: rgb(85, 85, 85);">或者使用添加umask和fmask等参数：</span></p><pre class="ql-syntax" spellcheck="false">sudo mount -t drvfs C: /mnt/c -o metadata,uid=1000,gid=1000,umask=22,fmask=111
</pre><p>但是每次使用时手动mount也太麻烦了，这时正好用上另一个新特性&nbsp;<a href="https://blogs.msdn.microsoft.com/commandline/2018/02/07/automatically-configuring-wsl/" target="_blank" style="color: rgb(37, 143, 184);">Automatically Configuring WSL</a>。把下面automount的选项添加到<code style="background-color: rgb(238, 238, 238);">/etc/wsl.conf</code>文件中就可以了。</p><pre class="ql-syntax" spellcheck="false">[automount] 
enabled = true 
root = /mnt/ 
options = "metadata,umask=22,fmask=11" 
mountFsTab = false 
</pre><p>现在重启WSL的console, windows硬盘上的文件和文件夹都拥有正常权限了。但是坑还没有完，如果这时用mkdir命令创建一个空文件夹，就会发现新的文件夹还是777权限。这可能是wsl的一个bug (<a href="https://github.com/Microsoft/WSL/issues/1801" target="_blank" style="color: rgb(37, 143, 184);">Issue 1801</a>,&nbsp;<a href="https://github.com/Microsoft/WSL/issues/352" target="_blank" style="color: rgb(37, 143, 184);">Issue 352</a>)，console默认的umask值仍然是0000。work-around的方法是在.profile、.bashrc、.zshrc或者其他shell配置文件中重新设置一下umask。</p><pre class="ql-syntax" spellcheck="false">#Fix mkdir command has wrong permissions
if grep -q Microsoft /proc/version; then
    if [ "$(umask)" == '0000' ]; then
        umask 0022
    fi
fi
</pre><p><br></p>