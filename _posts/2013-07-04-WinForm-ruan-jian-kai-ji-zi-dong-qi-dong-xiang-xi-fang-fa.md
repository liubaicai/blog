---
layout:     post
title:      "WinForm软件开机自动启动详细方法"
date:       2013-07-04 15:18:47 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<span>现在正在制作一个物资公司的管理软件，把自己掌握的学到的一点点细细的讲给喜欢C#的同仁们，互相交流。&lt;/span><br />
想要给你制作的应用程序做一个开机启动，很方便，你可以让用户选择，在你的工具栏中的某个下拉菜单里添加一个“开机启动”，你想练习的话，也可以只先设置一个按钮即可。&lt;br />
<span>首先你要添加两个命名空间，这是必须的啊。&lt;/span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div align="left">
	using Microsoft.Win32;
</div>
<div align="left">
	using System.IO;
</div>
<br />
然后在你的按钮单击事件里加入如下即可&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<div align="left">
	private void 开机启动KToolStripMenuItem_Click(objectsender,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EventArgs e)
</div>
<div align="left">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
</div>
<div align="left">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//从这里开始复制
</div>
<div align="left">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; string KJLJ = Application.ExecutablePath;
</div>
<div align="left">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (!System.IO.File.Exists(KJLJ))//判断指定文件是否存在
</div>
<div align="left">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return;
</div>
<div align="left">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; string newKJLJ = KJLJ.Substring(KJLJ.LastIndexOf("\\") + 1);
</div>
<div align="left">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; RegistryKey Rkey =
</div>
<div align="left">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Registry.LocalMachine.OpenSubKey("SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run",true);
</div>
<div align="left">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (Rkey == null)
</div>
<div align="left">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rkey&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; =Registry.LocalMachine.CreateSubKey("SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run");
</div>
<div align="left">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rkey.SetValue(newKJLJ, KJLJ);
</div>
<div align="left">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; MessageBox.Show("程序设置完毕,请重新启动计算机后即可生效！",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "程序员的爬行温馨提醒",MessageBoxButtons.OK, MessageBoxIcon.Information);
</div>
<div align="left">
	//到这里结束，试一试，无需修改，即可，呵呵，不过你也要努力学习啊
</div>
<div align="left">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
</div>