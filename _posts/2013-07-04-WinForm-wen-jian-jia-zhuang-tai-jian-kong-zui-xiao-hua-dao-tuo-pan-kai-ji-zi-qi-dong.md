---
layout:     post
title:      "(WinForm)文件夹状态监控,最小化到托盘,开机自启动"
date:       2013-07-04 15:20:01 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<b>1.<span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span>文件夾監控（監測文件夾中的文件動態）：&lt;/span><br />
<br />
<img src="mhtml:file://C:\Users\shuai\Desktop\(WinForm)文件夹状态监控,最小化到托盘,开机自启动Windows开发 - 菜园子 - Powered by phpwind.mht!http://common.cnblogs.com/images/copycode.gif" border="0" /></b>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#008000;">//</span><span style="color:#008000;">MSDN上的例子</span><span style="color:#008000;"><br />
</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">public</span> <span style="color:#0000FF;">class</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Watcher<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;{<br />
<br />
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">public</span> <span style="color:#0000FF;">static</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:#0000FF;">void</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Main()<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Run();<br />
<br />
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br />
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[PermissionSet(SecurityAction.Demand,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name = <span style="color:#800000;">"</span><span style="color:#800000;">FullTrust</span><span style="color:#800000;">"</span>)]<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">public</span> <span style="color:#0000FF;">static</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:#0000FF;">void</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Run()<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">string</span>[] args =&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; System.Environment.GetCommandLineArgs();<br />
<br />
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#008000;">//</span><span style="color:#008000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; If a directory is not specified, exit program.</span><span style="color:#008000;"><br />
</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">if</span> (args.Length != <span style="color:#800080;">2</span>)<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#008000;">//</span><span style="color:#008000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Display the proper way to call the program.</span><span style="color:#008000;"><br />
</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(<span style="color:#800000;">"</span><span style="color:#800000;">Usage:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Watcher.exe (directory)</span><span style="color:#800000;">"</span>);<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">return</span>;<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br />
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#008000;">//</span><span style="color:#008000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Create a new FileSystemWatcher and set its properties.</span><span style="color:#008000;"><br />
</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FileSystemWatcher&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; watcher = <span style="color:#0000FF;">new</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FileSystemWatcher();<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;watcher.Path&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = args[<span style="color:#800080;">1</span>];<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#008000;">/*</span><span style="color:#008000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Watch for changes in LastAccess and LastWrite times, and&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; the renaming of files or directories. </span><span style="color:#008000;">*/</span><br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;watcher.NotifyFilter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = NotifyFilters.LastAccess |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; NotifyFilters.LastWrite<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | NotifyFilters.FileName |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; NotifyFilters.DirectoryName;<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#008000;">//</span><span style="color:#008000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Only watch text files.</span><span style="color:#008000;"><br />
</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;watcher.Filter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = <span style="color:#800000;">"</span><span style="color:#800000;">*.txt</span><span style="color:#800000;">"</span>;<br />
<br />
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#008000;">//</span><span style="color:#008000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Add event handlers.</span><span style="color:#008000;"><br />
</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;watcher.Changed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; += <span style="color:#0000FF;">new</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FileSystemEventHandler(OnChanged);<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;watcher.Created&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; += <span style="color:#0000FF;">new</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FileSystemEventHandler(OnChanged);<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;watcher.Deleted&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; += <span style="color:#0000FF;">new</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FileSystemEventHandler(OnChanged);<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;watcher.Renamed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; += <span style="color:#0000FF;">new</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; RenamedEventHandler(OnRenamed);<br />
<br />
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#008000;">//</span><span style="color:#008000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Begin watching.</span><span style="color:#008000;"><br />
</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;watcher.EnableRaisingEvents&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = <span style="color:#0000FF;">true</span>;<br />
<br />
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#008000;">//</span><span style="color:#008000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Wait for the user to quit the program.</span><span style="color:#008000;"><br />
</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(<span style="color:#800000;">"</span><span style="color:#800000;">Press&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \'q\' to quit the sample.</span><span style="color:#800000;">"</span>);<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">while</span> (Console.Read() != <span style="color:#800000;">'</span><span style="color:#800000;">q</span><span style="color:#800000;">'</span>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ;<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br />
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#008000;">//</span><span style="color:#008000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Define the event handlers.</span><span style="color:#008000;"><br />
</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">private</span> <span style="color:#0000FF;">static</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:#0000FF;">void</span> OnChanged(<span style="color:#0000FF;">object</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; source, FileSystemEventArgs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; e)<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#008000;">//</span><span style="color:#008000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Specify what is done when a file is changed, created, or&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; deleted.</span><span style="color:#008000;"><br />
</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(<span style="color:#800000;">"</span><span style="color:#800000;">File:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color:#800000;">"</span> + e.FullPath + <span style="color:#800000;">"</span> <span style="color:#800000;">"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; +&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; e.ChangeType);<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br />
<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">private</span> <span style="color:#0000FF;">static</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:#0000FF;">void</span> OnRenamed(<span style="color:#0000FF;">object</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; source, RenamedEventArgs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; e)<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#008000;">//</span><span style="color:#008000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Specify what is done when a file is renamed.</span><span style="color:#008000;"><br />
</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(<span style="color:#800000;">"</span><span style="color:#800000;">File:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {0} renamed to {1}</span><span style="color:#800000;">"</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; e.OldFullPath,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; e.FullPath);<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<img src="mhtml:file://C:\Users\shuai\Desktop\(WinForm)文件夹状态监控,最小化到托盘,开机自启动Windows开发 - 菜园子 - Powered by phpwind.mht!http://common.cnblogs.com/images/copycode.gif" border="0" /><br />
<br />
<b>　　2.<span><span>&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span>最小化到托盤功能：</span></b><br />
<span>首先給主界面添加一個&lt;/span>notifyIcon<span>控件，給它的</span>Icon<span>添加一個圖標，不添加圖標的話不會在托盤顯示，然後給主界面的</span>SizeChanged<span>事件注冊一個方法，在方法中將主界面隱藏:</span><br />
<br />
<br />
<img src="mhtml:file://C:\Users\shuai\Desktop\(WinForm)文件夹状态监控,最小化到托盘,开机自启动Windows开发 - 菜园子 - Powered by phpwind.mht!http://common.cnblogs.com/images/copycode.gif" border="0" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">void</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; frmMain_SizeChanged(<span style="color:#0000FF;">object</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sender, EventArgs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; e)<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">if</span> (<span style="color:#0000FF;">this</span>.WindowState&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; == FormWindowState.Minimized)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">this</span>.Hide();<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<img src="mhtml:file://C:\Users\shuai\Desktop\(WinForm)文件夹状态监控,最小化到托盘,开机自启动Windows开发 - 菜园子 - Powered by phpwind.mht!http://common.cnblogs.com/images/copycode.gif" border="0" /><br />
<span><span>然後給&lt;/span>notifyIcon<span>的單擊或者雙擊事件添加一個方法，讓鼠標單擊或者雙擊托盤圖標的時候可以將主界面窗口還原:</span></span><br />
<br />
<br />
<img src="mhtml:file://C:\Users\shuai\Desktop\(WinForm)文件夹状态监控,最小化到托盘,开机自启动Windows开发 - 菜园子 - Powered by phpwind.mht!http://common.cnblogs.com/images/copycode.gif" border="0" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">private</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:#0000FF;">void</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; notifyIcon_MouseDoubleClick(<span style="color:#0000FF;">object</span> sender, MouseEventArgs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; e)<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">this</span>.Visible = <span style="color:#0000FF;">true</span>;<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">this</span>.WindowState =&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FormWindowState.Normal;<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<img src="mhtml:file://C:\Users\shuai\Desktop\(WinForm)文件夹状态监控,最小化到托盘,开机自启动Windows开发 - 菜园子 - Powered by phpwind.mht!http://common.cnblogs.com/images/copycode.gif" border="0" /><br />
<b><span><span><span>3.</span><span>讓程序開機自動啟動的方法（編輯注冊表）&lt;/span></span></span></b><br />
<br />
<img src="mhtml:file://C:\Users\shuai\Desktop\(WinForm)文件夹状态监控,最小化到托盘,开机自启动Windows开发 - 菜园子 - Powered by phpwind.mht!http://common.cnblogs.com/images/copycode.gif" border="0" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">private</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:#0000FF;">void</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; chbStartup_CheckedChanged(<span style="color:#0000FF;">object</span> sender, EventArgs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; e)<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">if</span> (<span style="color:#0000FF;">this</span>.chbStartup.Checked)<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">try</span><br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">string</span> startupPath =&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Application.ExecutablePath;<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RegistryKey&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; local =&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Registry.LocalMachine;<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RegistryKey&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; run = local.CreateSubKey(<span style="color:#800000;">@"</span><span style="color:#800000;">SOFTWARE\Microsoft\Windows\CurrentVersion\Run</span><span style="color:#800000;">"</span>);<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;run.SetValue(<span style="color:#800000;">"</span><span style="color:#800000;">FolderWatcher</span><span style="color:#800000;">"</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; startupPath);<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;local.Close();<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">catch</span> (Exception&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ex)<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MessageBox.Show(<span style="color:#800000;">"</span><span style="color:#800000;">開機啟動設置異常：&lt;/span><span style="color:#800000;">"</span> +&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ex.Message);<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">else</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">try</span><br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">string</span> startupPath =&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Application.ExecutablePath;<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RegistryKey&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; local =&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Registry.LocalMachine;<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RegistryKey&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; run = local.CreateSubKey(<span style="color:#800000;">@"</span><span style="color:#800000;">SOFTWARE\Microsoft\Windows\CurrentVersion\Run</span><span style="color:#800000;">"</span>);<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;run.DeleteValue(<span style="color:#800000;">"</span><span style="color:#800000;">FolderWatcher</span><span style="color:#800000;">"</span>);<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;local.Close();<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">catch</span> (Exception&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ex)<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MessageBox.Show(<span style="color:#800000;">"</span><span style="color:#800000;">開機啟動設置異常：&lt;/span><span style="color:#800000;">"</span> +&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ex.Message);<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />