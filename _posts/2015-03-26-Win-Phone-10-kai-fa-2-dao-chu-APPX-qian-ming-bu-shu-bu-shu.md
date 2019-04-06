---
layout:     post
title:      "Win(Phone)10开发第(2)弹，导出APPX包并签名部署"
date:       2015-03-26 07:08:09 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	当我们新建一个win10 uap项目，如果想导出测试包，需要点击项目名称，选择商店-导出应用包，这个时候会生成一个文件夹，包含appx和ps1等文件。
</p>

<p>
	powershell运行Add-AppDevPackage.ps1安装脚本，可能会提示：
</p>

<p>
	<span style="color: rgb(255, 255, 255);"><span style="background-color: rgb(0, 0, 255);">执行策略更改</span><br />
	<span style="background-color: rgb(0, 0, 255);">执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 </span></span><a href="http://go.microsoft.com/fwlink/?LinkID=135170"><span style="color: rgb(255, 255, 255);"><span style="background-color: rgb(0, 0, 255);">http://go.microsoft.com/fwlink/?LinkID=135170</span></span></a><br />
	<span style="color: rgb(255, 255, 255);"><span style="background-color: rgb(0, 0, 255);">中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?</span><br />
	<span style="background-color: rgb(0, 0, 255);">[Y] 是(Y)&nbsp; [N] 否(N)&nbsp; [S] 挂起(S)&nbsp; [?] 帮助 (默认值为&ldquo;Y&rdquo;):&nbsp; 输入Y</span></span>
</p>

<p>
	<span style="color: rgb(255, 255, 255);"><span style="background-color: rgb(0, 0, 255);">PS E:\AppPackages\BlankApplication_1.0.0.0_AnyCPU_Test&gt; .\Add-AppDevPackage.ps1</span><br />
	<span style="background-color: rgb(0, 0, 255);">找到包: E:\AppPackages\BlankApplication_1.0.0.0_AnyCPU_Test\BlankApplication_1.0.0.0_AnyCPU.appx</span><br />
	<span style="background-color: rgb(0, 0, 255);">错误:&nbsp; 包或捆绑无数字签名或其签名已损坏。&lt;/span><br />
	<span style="background-color: rgb(0, 0, 255);">按 Enter 键继续...:</span></span>
</p>

<p>
	出现这个问题说明生成的appx包未经签名。
</p>

<p>
	在项目目录下会发现一个 项目名_TemporaryKey.pfx的文件，打开vs自带的开发人员命令行工具或者从网上下载一个signtool工具，执行以下命令：
</p>

<div>
	<span style="color: rgb(255, 0, 0);">signtool&nbsp;sign&nbsp;/a&nbsp;/v&nbsp;/fd&nbsp;SHA256&nbsp;/f&nbsp;pfxpath&nbsp;appxpath</span>
</div>

<div>
	<span style="color: rgb(105, 105, 105);">比如：&lt;/span>
</div>

<div>
	<span style="color: rgb(255, 255, 255);"><span style="background-color: rgb(0, 0, 0);">signtool sign /a /v /fd SHA256 /f "C:\Users\BaicaiVM\Documents\Visua</span><br />
	<span style="background-color: rgb(0, 0, 0);">l Studio 2015\Projects\BlankApplication\BlankApplication\BlankApplication_TemporaryKey.pfx" E:\AppPackages\BlankApplicat</span><br />
	<span style="background-color: rgb(0, 0, 0);">ion_1.0.0.0_AnyCPU_Test\BlankApplication_1.0.0.0_AnyCPU.appx</span></span>
</div>

<div>
	&nbsp;
</div>

<div>
	会提示：
	<p>
		<span style="color: rgb(255, 255, 255);"><span style="background-color: rgb(0, 0, 0);">The following certificate was selected:</span><br />
		<span style="background-color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp; Issued to: BaicaiVM</span><br />
		<span style="background-color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp; Issued by: BaicaiVM</span><br />
		<span style="background-color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp; Expires:&nbsp;&nbsp; Fri Mar 25 19:59:44 2016</span><br />
		<span style="background-color: rgb(0, 0, 0);">&nbsp;&nbsp;&nbsp; SHA1 hash: 2A54908A7EAB2EC3DEBDD1B2DD7D3EFD65B201C3</span></span>
	</p>

	<p>
		<span style="color: rgb(255, 255, 255);"><span style="background-color: rgb(0, 0, 0);">Done Adding Additional Store</span><br />
		<span style="background-color: rgb(0, 0, 0);">Successfully signed: E:\AppPackages\BlankApplication_1.0.0.0_AnyCPU_Test\BlankApplication_1.0.0.0_AnyCPU.appx</span></span>
	</p>

	<p>
		<span style="color: rgb(255, 255, 255);"><span style="background-color: rgb(0, 0, 0);">Number of files successfully Signed: 1</span><br />
		<span style="background-color: rgb(0, 0, 0);">Number of warnings: 0</span><br />
		<span style="background-color: rgb(0, 0, 0);">Number of errors: 0</span></span>
	</p>

	<p>
		这就说明签名完毕。
	</p>

	<p>
		再次用powershell执行安装脚本就会成功了
	</p>
</div>

<p>
	<span style="color: rgb(255, 255, 255);"><span style="background-color: rgb(0, 0, 255);">PS E:\AppPackages\BlankApplication_1.0.0.0_AnyCPU_Test&gt; .\Add-AppDevPackage.ps1</span><br />
	<span style="background-color: rgb(0, 0, 255);">找到包: E:\AppPackages\BlankApplication_1.0.0.0_AnyCPU_Test\BlankApplication_1.0.0.0_AnyCPU.appx</span></span>
</p>

<p>
	<span style="color: rgb(255, 255, 255);"><span style="background-color: rgb(0, 0, 255);">正在安装应用程序...</span></span>
</p>

<p>
	<span style="color: rgb(255, 255, 255);"><span style="background-color: rgb(0, 0, 255);">成功:&nbsp; 成功安装了应用程序。&lt;/span><br />
	<span style="background-color: rgb(0, 0, 255);">按 Enter 键继续...:</span></span>
</p>