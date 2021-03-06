---
layout:     post
title:      "[转]【Window 10 IoT - 2】LED闪烁及动画绘制（树莓派 Pi2）"
date:       2015-05-25 03:26:06 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	在上一篇博文《&lt;a href="http://blog.csdn.net/yfiot/article/details/45464491">Windows 10 IoT系统安装</a>》中，我们实现了在树莓派2平台上运行Window 10 IoT，本篇文章将介绍在该平台上的程序开发。
</p>

<p>
	在最初获得的资讯中，以为Windows 10 IoT版本不支持界面开发，没有想到，实际测试后，画面功能支持的还不错（画面功能的支持，通过命令可以打开也可以关闭）。画面功能的支持，将使Windows 10 IoT系统的应用场景变得更为众多。另外还以为开发Windows 10 IoT，必须基于Windows 10平台，实际测试发现，在Windows 8.1版本上，依然可以用Visual Studio 2015 RC版本进行程序开发和在线调试。
</p>

<p>
	<strong style="line-height: 1.5;">一、开发平台准备&lt;/strong>
</p>

<p>
	（1）、安装Visual Studio 2015 RC或仅安装Windows 10开发工具
</p>

<p>
	下载链接：&lt;a href="https://dev.windows.com/en-US/downloads/install-dev-tools-visual-studio-2015">https://dev.windows.com/en-US/downloads/install-dev-tools-visual-studio-2015</a>
</p>

<p>
	如果已经安装过Visual Studio 2015，可以仅安装Universal Windows App Development Tools即可。
</p>

<p>
	（2）、安装&amp;nbsp;WindowsDeveloperProgramForIoT.msi工具，该工具在树莓派Windows 10镜像下载包中。这一步似乎没有必要，实际测试发现，无论是在Windows 8还是在windows 10 中，该程序都无法正常打开。
</p>

<p>
	（3）、树莓派2（已经正常运行Windows 10 IoT）及LED灯相关组件
</p>

<p>
	&nbsp;&nbsp;&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/051357477045674.jpg" />
</p>

<p>
	（4）、确保系统为&rdquo;Headed&rdquo;模式
</p>

<p>
	&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/051358023454136.jpg" />
</p>

<p>
	可以通过指令 &nbsp;setbootoption.exe headless 或 setbootoption.exe headed指令进行修改，修改完毕后，要重启一下系统。
</p>

<p>
	Headed支持界面显示，headless不支持（网关模式）。
</p>

<p>
	（5）、下载程序示例（LED灯闪烁示例）
</p>

<p>
	<a href="https://github.com/ms-iot/samples/tree/develop/Blinky">https://github.com/ms-iot/samples/tree/develop/Blinky</a>
</p>

<p>
	（本文叶帆工作室版权所有）
</p>

<p>
	<strong>二、程序调试&lt;/strong>
</p>

<p>
	（1）树莓派2要通过网线和你的调试PC连接起来（保证在一个网段）
</p>

<p>
	（2）由于程序中控制的GPIO为5，所以LED灯要连接在GPIO 5（29Pin）这个管脚上。
</p>

<p>
	&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/051358237826219.jpg" style="width: 818px;" />
</p>

<p>
	（3）打开下载的示例程序，并进行如下的配置
</p>

<p>
	&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/051359414856346.jpg" style="width: 818px;" />
</p>

<p>
	设备设置为&amp;ldquo;远程计算机&amp;rdquo;，可以填写机器名称，也可以直接填写IP地址。
</p>

<p>
	（4）单击运行按钮，进行运行调试
</p>

<p>
	&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/051359519703011.jpg" style="width: 818px;" />
</p>

<p>
	支持断点，及单步调试。
</p>

<p>
	（5）实际运行效果
</p>

<p>
	如果一切正常，可以发现LED灯一闪一灭，显示器画面上的圆形也会同步闪烁（变白或变红）。
</p>

<p>
	&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/051400056731158.jpg" />
</p>

<p>
	<strong>三、注意事项&lt;/strong>
</p>

<p>
	（1）、你需要注册为开发者（具备和windows Phone实际设备一样的开发权限）。
</p>

<p>
	&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/051400199859717.jpg" />
</p>

<p>
	否则会出现上面的提示，也会出现这样的部署错误：&amp;ldquo;错误：DEP0100：开发人员授权问题导致部署失败。&amp;rdquo;
</p>

<p>
	（2）、第一次部署的时候，会比较慢一些，会部署一些必要的库到设备中去，如下图所示：
</p>

<p>
	&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/051400277987098.jpg" />
</p>

<p>
	<strong>四、参考资料&lt;/strong>
</p>

<p>
	（1）、配置你的PC
</p>

<p>
	<a href="http://ms-iot.github.io/content/win10/SetupPC.htm">http://ms-iot.github.io/content/win10/SetupPC.htm</a>
</p>

<p>
	（2）、硬件准备及程序调试
</p>

<p>
	<a href="http://ms-iot.github.io/content/win10/samples/Blinky.htm">http://ms-iot.github.io/content/win10/samples/Blinky.htm</a>
</p>

<p>
	<strong>五、小结&lt;/strong>
</p>

<p>
	（1）、除了GPIO微软还提供了诸如I2C，SPI等很多示例供我们去研究，如下图所示：
</p>

<p>
	&nbsp;<img alt="" src="http://images.cnitblog.com/blog2015/11611/201505/051400361264921.jpg" />
</p>

<p>
	其中&ldquo;IoTCoreDefaultApp&rdquo;就是树莓派系统默认自带的一个应用。另外这个仅仅是通用应用开发，还有通用驱动开发值得去研究。
</p>

<p>
	（2）、采用Visual Stdio工具进行开发，支持断点和单步调试，用户开发体验极佳。
</p>

<p>
	（3）、这仅仅是一个开始，相信Window 10 IoT相关设备多起来后，其开发空间更加广阔。
</p>

<p>
	（4）、后续有时间，还会陆陆续续写一些和Windows 10 IoT开发相关的文章。
</p>