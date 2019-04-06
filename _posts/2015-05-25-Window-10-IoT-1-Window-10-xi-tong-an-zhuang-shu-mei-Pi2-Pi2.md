---
layout:     post
title:      "[转]【Window 10 IoT - 1】Window 10系统安装（树莓派 Pi2）"
date:       2015-05-25 03:25:08 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<h1 class="postTitle">
	<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/040006190689848.jpg" />
</h1>

<div id="cnblogs_post_body">
	<p>
		<strong>一、硬件准备&lt;/strong>
	</p>

	<p>
		（1）、树莓派Pi2
	</p>

	<p>
		（2）、8G 10速Micro SD卡
	</p>

	<p>
		（3）、LCD显示器（如果是VGA接口，需要加一个HDMI转VGA模块）
	</p>

	<p>
		（4）、鼠标
	</p>

	<p>
		（5）、安装Windows 10的PC（需要物理直接安装，不能虚机机方式，本篇文章不是必须）
	</p>

	<p>
		<strong>二、软件准备&lt;/strong>
	</p>

	<p>
		（1）、Windows 10 IoT 树莓派固件（Windows_IoT_Core_RPI2_BUILD.zip）
	</p>

	<p>
		固件下载链接：
	</p>

	<p>
		<a href="https://connect.microsoft.com/windowsembeddedIoT/Downloads/DownloadDetails.aspx?DownloadID=57782">https://connect.microsoft.com/windowsembeddedIoT/Downloads/DownloadDetails.aspx?DownloadID=57782</a>
	</p>

	<p>
		（2）、Windows ADK工具（部署工具）
	</p>

	<p>
		安装Visual Studio 2015 RC后就会有安装相关工具（不强求系统为Windows 10）
	</p>

	<p>
		也可以单独下载安装（安装包很大，但是用到的大概50多兆）
	</p>

	<p>
		<a href="https://go.microsoft.com/fwlink/p/?LinkId=526740">https://go.microsoft.com/fwlink/p/?LinkId=526740</a>
	</p>

	<p>
		&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/040006354903265.jpg" />
	</p>

	<p>
		（3）、PowerShell （V4.0版本，Windows 8.1系统自带）
	</p>

	<p>
		（4）、Visual Studio 2015 RC安装（开发程序用）
	</p>

	<p>
		<strong>三、Windows 10 IoT</strong><strong>固件烧写</strong>
	</p>

	<p>
		安装Windows 10 IoT的过程，其实就是烧写Micro SD卡的过程。考虑到目前Windows 10 预览版并不稳定，所以我只在虚拟机中安装了Windows 10，烧写还是在Windows 8.1平台上完成。
	</p>

	<p>
		&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/040006492084641.jpg" style="width: 818px;" />
	</p>

	<p>
		<strong>（1</strong><strong>）、打开Deployment and Imaging Tools Environmen</strong><strong>命令对话框，查找SD</strong><strong>卡磁盘序号&lt;/strong>
	</p>

	<p>
		&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/040007042717273.jpg" />
	</p>

	<p>
		SD卡直接插入电脑（如果电脑支持），也可以通过USB转接口模块插入电脑。运行diskpart命令。
	</p>

	<p>
		&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/040007143022309.jpg" />
	</p>

	<p>
		然后运行list disk命令，枚举当前系统的物理磁盘。
	</p>

	<p>
		我的笔记本系统共三个，一个是固态硬盘，一个是普通磁盘，一个就是我们刚刚插入的SD卡了。我们需要记住SD卡磁盘后的序号为&ldquo;2&rdquo;，以供下面的命令来用。（输入Exit命令，退出当前命令对话框）
	</p>

	<p>
		<strong>（2</strong><strong>）、烧写Windows IoT</strong><strong>固件</strong>
	</p>

	<p>
		解压Windows_IoT_Core_RPI2_BUILD.zip文件，提取出一个Flash.ffu文件（802M），我们要把这文件烧写到SD卡，我写了一个批处理，来完成这个烧写过程，如下图所示：
	</p>

	<p>
		&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/040007389278818.jpg" />
	</p>

	<p>
		&nbsp;PhysicalIDrive2（这个数字2就是我们用diskpart命令查到的），执行该命令完成后，就完成了Windows 10 IoT固件的烧写工作。
	</p>

	<p>
		<strong>四、Windows 10 IoT</strong><strong>系统启动</strong>
	</p>

	<p>
		插入SD卡到树莓派Pi2中，接上LCD显示器，插入网线，然后上电。如果一切正常，网友应该可以看到Windows 10的logo（最上图右上图所示）。一会黑屏后，经过相当漫长的等待（几分钟之久），最终会呈现下图（中间还会重启一次）。
	</p>

	<p>
		&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/040007547405120.jpg" />
	</p>

	<p>
		支持鼠标，不过可操作的只有两个地方，一个是系统设置，一个是电源关闭或重启。如下图所示：
	</p>

	<p>
		&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/040008081159067.jpg" style="width: 818px;" />
	</p>

	<p>
		操作鼠标的感觉总体还算流畅，就是感觉启动系统有些太慢了，另外就是感觉系统不是太稳定，容易当机。
	</p>

	<p>
		<strong>五、通信互联</strong>
	</p>

	<p>
		<strong>（1</strong><strong>）、PowerShell</strong><strong>操作</strong>
	</p>

	<p>
		以管理员身份运行PowerShell，输入如下命令，以启动WinRM服务，及添加树莓派为信任主机。
	</p>

	<p>
		&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/040008187862974.jpg" style="width: 818px;" />
	</p>

	<p>
		登录Windows 10 IoT系统，输入如下命令
	</p>

	<p>
		&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/040008258025998.jpg" style="width: 818px;" />
	</p>

	<p>
		用户名：Administrator 密码默认为：p@ssw0rd
	</p>

	<p>
		&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/040008381776117.jpg" style="width: 818px;" />
	</p>

	<p>
		登录成功后，可以输入命令查询一些信息，详情可以参见官方的PowerShell使用说明
	</p>

	<p>
		<strong>（2</strong><strong>）、FTP</strong><strong>服务</strong>
	</p>

	<p>
		系统默认支持FTP服务，可以通过FTP服务上传或下载相关文件。
	</p>

	<p>
		&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/040008448492713.jpg" style="width: 818px;" />
	</p>

	<p>
		用户名：Administrator 密码：p@ssw0rd，和系统登录用户和密码一样。
	</p>

	<p>
		<strong>六、程序编写&lt;/strong>
	</p>

	<p>
		下一篇博文将介绍Windows 10 IoT系统程序编写相关内容，敬请期待。
	</p>

	<p>
		<strong>七、参考资料&lt;/strong>
	</p>

	<p>
		（1）、官方部署说明
	</p>

	<p>
		<a href="http://ms-iot.github.io/content/win10/SetupRPI.htm">http://ms-iot.github.io/content/win10/SetupRPI.htm</a>
	</p>

	<p>
		（2）、PowerShell操作说明
	</p>

	<p>
		<a href="http://ms-iot.github.io/content/win10/samples/PowerShell.htm">http://ms-iot.github.io/content/win10/samples/PowerShell.htm</a>
	</p>

	<p>
		（3）、网友文章
	</p>

	<p>
		<a href="http://bbs.ickey.cn/group-topic-id-48099.html">http://bbs.ickey.cn/group-topic-id-48099.html</a>
	</p>
</div>