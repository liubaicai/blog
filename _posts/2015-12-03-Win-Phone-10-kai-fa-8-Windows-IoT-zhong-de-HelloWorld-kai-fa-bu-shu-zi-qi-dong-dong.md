---
layout:     post
title:      "Win(Phone)10开发第(8)弹，Windows IoT中的HelloWorld开发部署和自启动"
date:       2015-12-03 03:41:41 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<h2 id="c-">创建新的 UAP 项目</h2>
<h2>添加对 Windows IoT 扩展 SDK 的引用&lt;/h2>
由于默认情况下 IoT 扩展 SDK 不会添加到项目，因此我们将需要添加引用，以便 Windows.Devices.Gpio 之类的命名空间在项目中可用。若要执行此操作，只需右键单击项目下的“引用”项、选择“添加引用”，然后将生成的对话框导航到 Universal Windows-&gt;Extensions-&gt;Windows IoT Extensions for the UWP、选中该复选框，并单击“确定”。
<h2>在本地生成并测试应用</h2>
添加需要的ui和逻辑代码，确保程序可以成功生成
<h2>将应用部署到 Windows IoT 核心版设备&lt;/h2>
当然，我们想要将第一个应用部署到 Windows IoT 核心版设备。轻松。在 <a href="http://ms-iot.github.io/content/zh-CN/win10/samples/PowerShell.htm">PowerShell</a> 文档中，你可以找到关于为你的 Windows IoT 核心版设备选择唯一名称的说明。在本示例中，我们将在 VS 的“远程计算机调试”设置中使用该名称（不过你也可以使用自己的 IP 地址）。如果你要针对 Minnowboard Max 进行生成，请选择 Visual Studio 工具栏体系结构下拉列表中的 <code>x86</code>。如果你要针对 Raspberry Pi 2 进行生成，请选择 <code>ARM</code>。

接下来，在 Visual Studio 工具栏中，单击 <code>Local Machine</code> 下拉列表并选择 <code>Remote Machine</code>

<img class="img-responsive" src="http://ms-iot.github.io/content/images/HelloWorld/cs-remote-machine-debugging.png" alt="RemoteMachine 目标" />

此时，Visual Studio 将显示“远程连接”对话框。输入 IP 地址或你的 Windows IoT 核心版设备的名称（在此示例中，我们使用的是“我的设备”），然后选择 <code>None</code> 以进行 Windows 身份验证。然后单击“选择”。&lt;img class="img-responsive" src="http://ms-iot.github.io/content/images/HelloWorld/cs-remote-connections.PNG" alt="远程计算机调试&quot; />

几点说明：你可以使用 IP 地址而不使用 Windows IoT 核心版设备名称。其次，你可以通过导航到项目属性（在解决方案资源管理器中选择“属性”）验证和/或修改这些值并在左侧选择“调试”选项卡：

<img class="img-responsive" src="http://ms-iot.github.io/content/images/HelloWorld/cs-debug-project-properties.PNG" alt="项目属性调试选项卡&quot; />

现在，我们可以随时部署到远程 Windows IoT Core 设备。只需按 F5（或依次选择“调试”|“启动调试”）即可开始调试应用。你应在 Windows IoT 核心版设备屏幕上看到该应用出现，并且你应该能够单击该按钮。

在部署过程中，如果你在 Visual Studio 中看到一条错误消息，提示“无法连接到名为‘XXXX’的 Microsoft Visual Studio 远程调试程序。Visual Studio 2015 远程调试程序 (MSVSMON.EXE) 似乎没有在远程计算机上运行。”，则远程调试程序可能已超时。使用 <a href="http://ms-iot.github.io/content/zh-CN/win10/samples/PowerShell.htm">PowerShell</a> 连接到你的设备并通过运行 <code>tlist</code> 查询活动进程。如果至少一个 msvsmon.exe 未存在于该列表中，你将需要运行以下命令，才能重新启动远程调试程序（也可以重新启动你的设备）：<code>schtasks /run /tn StartMsvsmon</code>。

你可以设置断点、查看变量值，等等。若要停止应用，请按“停止调试”按钮（或依次选择“调试”|“停止调试”）。

成功部署和调试第一个 UWP 应用程序后，只需将 Visual Studio 工具栏配置下拉列表从 <code>Debug</code> 更改为 <code>Release</code>，即可创建发布版本。现在，你可以通过依次选择“生成”|“重新生成解决方案”和“生成”|“部署解决方案”，生成应用并将其部署到你的设备。

恭喜你！ 你刚刚已经将你的第一个 UWP 应用程序部署到运行 Windows IoT 核心版的设备！
<h2>将 HelloWorld 设置为启动应用&lt;/h2>
<div class="default-main">
<div class="row">
<div class="default-max-width">
<div class="content-container col-md-12">

你还可以将此 HelloWorld 应用设置为 Windows IoT 核心版设备的“启动应用”，以便在重新启动该设备时，它将自动启动 HelloWorld。为此，需要在 Windows IoT 核心版设备上运行一个名为 iotstartup 的命令行实用工具。我们将使用 PowerShell 执行此操作。

注意： 微软正在处理当前影响 C#/VB 调试项目的 Bug。请仅使用 iotstartup 配置发布项目。

通过你的 Windows IoT 核心版设备启动 PowerShell (PS) 会话，如<a href="http://ms-iot.github.io/content/zh-CN/win10/samples/PowerShell.htm">此处</a>所述。

在 PS 会话中，键入：
[192.168.0.243]: PS C:\&gt; iotstartup list HelloWorld
此时你应看到 HelloWorld UWP 应用程序的完整名称，如下所示：
Headed : HelloWorld_n2pe7ts0w7wey!App
实用工具将确认 HelloWorld 是否是“有外设”应用程序，以及是否正确安装。

现在，可以轻松地将此应用设置为“启动应用”。只需键入以下命令：
[192.168.0.243]: PS C:\&gt; iotstartup add headed HelloWorld
实用工具将确认 HelloWorld 现已成为新的有外设启动应用：
AppId changed to HelloWorld_n2pe7ts0w7wey!App

继续下一步，然后重新启动 Windows IoT 核心版设备。可以在 PS 会话中发出关闭命令：
[192.168.0.243]: PS C:\&gt; shutdown /r /t 0

设备重新启动后，你将会看到 HelloWorld 自动启动。

此时，可以还原回将 DefaultApp 用作“启动应用”。只需键入以下命令：
[192.168.0.243]: PS C:\&gt; iotstartup add headed DefaultApp

实用工具将确认 DefaultApp 现已成为新的有外设启动应用：
AppId changed to DefaultApp_cw5n1h2txyewy!App

</div>
</div>
</div>
</div>
<div class="chrome-header-wrapper"></div>