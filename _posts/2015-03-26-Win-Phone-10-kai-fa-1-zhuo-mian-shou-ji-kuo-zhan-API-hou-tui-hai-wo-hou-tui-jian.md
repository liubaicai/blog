---
layout:     post
title:      "Win(Phone)10开发第(1)弹，桌面和手机的扩展API，还我后退键"
date:       2015-03-26 03:04:44 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	喜大普奔的win10 uap开发预览版终于出了，这次更新跟8.1的变化不是很大，但是将原本win8.1和wp8.1uap的分项目的形式，改为了整合成一个项目，经过一次编译打包成一个appx包，实现了无缝跨平台。
</p>

<p>
	每一个平台特有的API，就变为了扩展API，以下几种
</p>

<p>
	<img alt="Device families" id="DeviceFamilyTree" src="https://i-msdn.sec.s-msft.com/dynimg/IC787018.png" title="Device families" xmlns="" />
</p>

<p>
	下面，就以wp特有的后退键为例，看一下不同平台扩展api的使用。
</p>

<p>
	如果你新建一个win10UAP的项目，跑在wp上运行，你会发现，后退键竟然他喵的是后台！这不是抢Home键的饭碗么！
</p>

<p>
	自带的几种风格的页面，竟然是用的左上角虚拟后退键，这种倒行逆施的行为微软你真是够了！
</p>

<p>
	一定要把后退功能找回来！！
</p>

<p>
	于是就用到了扩展api：
</p>

<p>
	1.Add References
</p>

<p>
	2.选择 Universal App Platform - Extensions
</p>

<p>
	3.勾选Windows Mobile Extension SDK
</p>

<p>
	4.愉快的使用 Windows.Phone.UI.Input.HardwareButtons.BackPressed += HardwareButtons_BackPressed;
</p>

<p>
	这句代码放到win10桌面里运行是会crash的，因为桌面版里没有此API，所以需要用
</p>

<p>
	Windows.Foundation.Metadata.ApiInformation.IsTypePresent("Windows.Phone.UI.Input.HardwareButtons")
</p>

<p>
	运行时判断是否有该API的支持。
</p>

<p>
	于是，最后的代码可能是这样：
</p>

<pre class="brush:csharp;">
	if (Windows.Foundation.Metadata.ApiInformation.IsTypePresent("Windows.Phone.UI.Input.HardwareButtons"))
            {
                Windows.Phone.UI.Input.HardwareButtons.BackPressed -= HardwareButtons_BackPressed;
                Windows.Phone.UI.Input.HardwareButtons.BackPressed += HardwareButtons_BackPressed;
            }</pre>

<pre class="brush:csharp;">
        private void HardwareButtons_BackPressed(object sender, Windows.Phone.UI.Input.BackPressedEventArgs e)
        {
            e.Handled = true;
            Frame rootFrame = Window.Current.Content as Frame;
            if (rootFrame.CanGoBack)
                rootFrame.GoBack();
            else
                Application.Current.Exit();
        }</pre>

<p>
	于是就愉快的实现了后退键后退的功能。
</p>