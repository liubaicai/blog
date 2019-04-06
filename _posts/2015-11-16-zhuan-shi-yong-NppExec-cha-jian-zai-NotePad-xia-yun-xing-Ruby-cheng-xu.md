---
layout:     post
title:      "[转]使用NppExec插件在NotePad++下运行Ruby程序"
date:       2015-11-16 13:54:33 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	首先，最基本的当然是安装NotePad++啦
</p>

<p>
	官网地址：&lt;a href="http://notepad-plus-plus.org/" rel="nofollow">http://notepad-plus-plus.org/</a>
</p>

<p>
	其次，下载NppExec：
</p>

<p>
	地址：&lt;a href="http://sourceforge.net/projects/npp-plugins/files/NppExec/" rel="nofollow">http://sourceforge.net/projects/npp-plugins/files/NppExec/</a>
</p>

<p>
	下载后，将NppExec_043_dll_ANSI文件夹下的NppExec.dll和NppExec文件夹复制到&nbsp;Program Files\Notepad++\plugins&nbsp;下。
</p>

<p>
	重新打开NotePad++就可以在菜单栏的插件中找到NppExec.
</p>

<p>
	打开一个可直接运行的.rb文件，按F6，会弹出一个对话框，在里面输入
</p>

<p>
	cd $(CURRENT_DIRECTORY)<br />
	ruby $(FULL_CURRENT_PATH)
</p>

<p>
	然后Save一下，以后可直接使用。（有很多变量可用，在NppExec_043_dll_ANSI\doc 下的NppExec.txt中讲解的很详细）
</p>

<p>
	点击OK，即可自动弹出一个Console运行Ruby程序。
</p>

<p>
	这个Console窗口默认是在NotePad++的下方的，可以双击Console栏，就会弹出来，然后按自己喜好拖拽到任意一侧，我就托到右侧了，宽屏的话可以更合理利用空间。
</p>

<p>
	为Console支持中文输出，在&ldquo;插件-&gt;NppExec-&gt;Console Output&rdquo;中选择UTF-8。
</p>