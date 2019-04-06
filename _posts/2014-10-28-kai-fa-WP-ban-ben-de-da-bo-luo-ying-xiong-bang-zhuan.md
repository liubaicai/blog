---
layout:     post
title:      "开发WP版本的大菠萝英雄榜[转]"
date:       2014-10-28 10:33:11 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<h2>
	前言
</h2>

<p>
	&nbsp;
</p>

<p>
	想当年Team有无数人在玩大菠萝，我被忽悠进来做肉盾，选了蛮子，从1.0开始，经历了103、105、108、2.0、2.1。这个游戏对我最大的帮助是学习了不同的技术，比如XAML、比如xcode开发、比如WP的开发。
</p>

<p>
	这篇文章不会step by step的介绍如何从0开始做WP开发，我会重点记录开发过程中要注意的坑，以及一些发布上架时的注意事项。
</p>

<p>
	文中大部分内容对于熟悉XAML的人来讲，可能过于简单。放在这里，希望对初学者有个帮助，尤其是如我这样做winform开发的人。
</p>

<p>
	&nbsp;
</p>

<p>
	先上几张图，
</p>

<p>
	<a href="http://images.cnitblog.com/blog/640/201410/271006266285865.png"><img alt="wp_ss_20141024_0001" border="0" height="244" src="http://images.cnitblog.com/blog/640/201410/271006284099820.png" style="display: inline; border-width: 0px;" title="wp_ss_20141024_0001" width="148" /></a><a href="http://images.cnitblog.com/blog/640/201410/271006289255963.png"><img alt="wp_ss_20141024_0002" border="0" height="244" src="http://images.cnitblog.com/blog/640/201410/271006294094648.png" style="display: inline; border-width: 0px;" title="wp_ss_20141024_0002" width="148" /></a><a href="http://images.cnitblog.com/blog/640/201410/271006298318819.png"><img alt="wp_ss_20141024_0005" border="0" height="244" src="http://images.cnitblog.com/blog/640/201410/271006302375463.png" style="display: inline; border-width: 0px;" title="wp_ss_20141024_0005" width="148" /></a><a href="http://images.cnitblog.com/blog/640/201410/271006308001891.png"><img alt="wp_ss_20141024_0006" border="0" height="244" src="http://images.cnitblog.com/blog/640/201410/271006314256533.png" style="display: inline; border-width: 0px;" title="wp_ss_20141024_0006" width="148" /></a><a href="http://images.cnitblog.com/blog/640/201410/271006321288917.png"><img alt="wp_ss_20141024_0007" border="0" height="244" src="http://images.cnitblog.com/blog/640/201410/271006331595502.png" style="display: inline; border-width: 0px;" title="wp_ss_20141024_0007" width="148" /></a><a href="http://images.cnitblog.com/blog/640/201410/271006338316131.png"><img alt="wp_ss_20141024_0008" border="0" height="244" src="http://images.cnitblog.com/blog/640/201410/271006347221460.png" style="display: inline; border-width: 0px;" title="wp_ss_20141024_0008" width="148" /></a> <a href="http://images.cnitblog.com/blog/640/201410/271006351594158.png"><img alt="wp_ss_20141024_0009" border="0" height="244" src="http://images.cnitblog.com/blog/640/201410/271006357378516.png" style="display: inline; border-width: 0px;" title="wp_ss_20141024_0009" width="148" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

<p>
	&nbsp;
</p>

<h2>
	官方API
</h2>

<p>
	玻璃渣现在有两套API在并行运行，官方文档老版本的地址：&lt;a href="https://github.com/blizzard/d3-api-docs" title="https://github.com/blizzard/d3-api-docs">https://github.com/blizzard/d3-api-docs</a>，新版本的地址:<a href="https://dev.battle.net/io-docs" title="https://dev.battle.net/io-docs">https://dev.battle.net/io-docs</a>。
</p>

<p>
	两者的区别是，前者不包含诸如坚韧、圣教军等资料片中出现的内容，当然也不包括天梯、附魔等内容。后者不包含每个装备的item tooltip html。同时，后者必须要注册一个开发者账号（免费的）。
</p>

<h2>
	XAML绑定
</h2>

<h3>
	Appbar的写法
</h3>

<div class="cnblogs_code" onclick="cnblogs_code_show('0af48228-ef70-431b-8f64-b544fb73457a')">
	<img alt="" class="code_img_closed" id="code_img_closed_0af48228-ef70-431b-8f64-b544fb73457a" src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" /><img alt="" class="code_img_opened" id="code_img_opened_0af48228-ef70-431b-8f64-b544fb73457a" onclick="cnblogs_code_hide('0af48228-ef70-431b-8f64-b544fb73457a',event)" src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" style="display: none;" />
	<div class="cnblogs_code_hide" id="cnblogs_code_open_0af48228-ef70-431b-8f64-b544fb73457a">
		<pre>
<span style="color: #0000ff;">&lt;</span><span style="color: #800000;">phone:PhoneApplicationPage.ApplicationBar</span><span style="color: #0000ff;">&gt;</span>

    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">shell:ApplicationBar </span><span style="color: #ff0000;">BackgroundColor</span><span style="color: #0000ff;">="Black"</span><span style="color: #ff0000;"> ForegroundColor</span><span style="color: #0000ff;">="White"</span><span style="color: #ff0000;">  Mode</span><span style="color: #0000ff;">="Default"</span><span style="color: #ff0000;">  Opacity</span><span style="color: #0000ff;">="1.0"</span><span style="color: #ff0000;"> IsMenuEnabled</span><span style="color: #0000ff;">="True"</span><span style="color: #ff0000;"> IsVisible</span><span style="color: #0000ff;">="True"</span><span style="color: #0000ff;">&gt;</span> 
        <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">shell:ApplicationBar.MenuItems</span><span style="color: #0000ff;">&gt;</span> 
            <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">shell:ApplicationBarMenuItem </span><span style="color: #ff0000;">Text</span><span style="color: #0000ff;">="Feedback"</span><span style="color: #ff0000;"> Click</span><span style="color: #0000ff;">="Email_Click"</span><span style="color: #0000ff;">/&gt;</span> 
            <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">shell:ApplicationBarMenuItem </span><span style="color: #ff0000;">Text</span><span style="color: #0000ff;">="Share"</span><span style="color: #ff0000;"> Click</span><span style="color: #0000ff;">="Share_Click"</span><span style="color: #0000ff;">/&gt;</span> 
            <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">shell:ApplicationBarMenuItem </span><span style="color: #ff0000;">Text</span><span style="color: #0000ff;">="Score"</span><span style="color: #ff0000;"> Click</span><span style="color: #0000ff;">="Score_Click"</span><span style="color: #0000ff;">/&gt;</span> 
            <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">shell:ApplicationBarMenuItem </span><span style="color: #ff0000;">Text</span><span style="color: #0000ff;">="Clear Cache"</span><span style="color: #ff0000;"> Click</span><span style="color: #0000ff;">="ClearCache_Click"</span><span style="color: #0000ff;">/&gt;</span> 
            <span style="color: #008000;">&lt;!--</span><span style="color: #008000;">&lt;shell:ApplicationBarMenuItem Text="Server Status" Click="ServerStatus_Click"/&gt;</span><span style="color: #008000;">--&gt;</span> 
        <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">shell:ApplicationBar.MenuItems</span><span style="color: #0000ff;">&gt;</span> 

        <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">shell:ApplicationBarIconButton </span><span style="color: #ff0000;">IconUri</span><span style="color: #0000ff;">="/assets/appbar/search.png"</span><span style="color: #ff0000;"> Text</span><span style="color: #0000ff;">="Search Friend"</span><span style="color: #ff0000;"> Click</span><span style="color: #0000ff;">="AppbarAddFriend_Click"</span><span style="color: #0000ff;">/&gt;</span> 

    <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">shell:ApplicationBar</span><span style="color: #0000ff;">&gt;</span> 
<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">phone:PhoneApplicationPage.ApplicationBar</span><span style="color: #0000ff;">&gt;</span></pre>
	</div>
	<span class="cnblogs_code_collapse">View Code</span>
</div>

<p>
	&nbsp;
</p>

<p>
	这里分为两部分，MenuItems是右下角三个点对应的菜单项，IconButton对应的是图标按钮。前者无对应图标，如果是英文，则全部小写字母；后者可以指定是否只显示图标，或者同时显示图标与文字。
</p>

<h3>
	画线
</h3>

<div class="cnblogs_code">
	<pre>
<span style="color: #0000ff;">&lt;</span><span style="color: #800000;">Line </span><span style="color: #ff0000;">X2</span><span style="color: #0000ff;">="300"</span><span style="color: #ff0000;"> Stroke</span><span style="color: #0000ff;">="White"</span><span style="color: #ff0000;"> Height</span><span style="color: #0000ff;">="1"</span><span style="color: #ff0000;"> StrokeThickness</span><span style="color: #0000ff;">="3"</span><span style="color: #0000ff;">&gt;&lt;/</span><span style="color: #800000;">Line</span><span style="color: #0000ff;">&gt;</span></pre>
</div>

<p>
	&nbsp;
</p>

<p>
	这段XAML画一条白色的线，注意颜色及线宽都是用Stroke***属性指定的。
</p>

<h3>
	指定格式绑定数字
</h3>

<div class="cnblogs_code">
	<pre>
<span style="color: #0000ff;">&lt;</span><span style="color: #800000;">TextBlock </span><span style="color: #ff0000;">HorizontalAlignment</span><span style="color: #0000ff;">="Right"</span><span style="color: #ff0000;"> Text</span><span style="color: #0000ff;">="</span><span style="color: #808000;">{Binding Toughness, Converter={StaticResource IntConverter}}</span><span style="color: #0000ff;">"</span><span style="color: #0000ff;">&gt;</span>Toughness<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">TextBlock</span><span style="color: #0000ff;">&gt;</span></pre>
</div>

<p>
	这个文本框绑定资料片中英雄的坚韧属性，如果想按照千分位（或者你自己别的格式显示），则再指定Converter的class信息。
</p>

<p>
	如，千分位的Convert代码如下：
</p>

<div class="cnblogs_code">
	<pre>
<span style="color: #0000ff;">public</span> <span style="color: #0000ff;">class</span><span style="color: #000000;"> IntConverter : IValueConverter 
    { 
        </span><span style="color: #0000ff;">public</span> <span style="color: #0000ff;">object</span> Convert(<span style="color: #0000ff;">object</span> value, Type targetType, <span style="color: #0000ff;">object</span><span style="color: #000000;"> parameter, CultureInfo culture) 
        { 
            </span><span style="color: #0000ff;">return</span> String.Format(<span style="color: #800000;">"</span><span style="color: #800000;">{0:N0}</span><span style="color: #800000;">"</span><span style="color: #000000;">, value); 
        }</span></pre>
</div>

<p>
	&nbsp;
</p>

<p>
	&nbsp;
</p>

<p>
	而如果显示小数点后两位的浮点数，则对应代码为：
</p>

<div class="cnblogs_code">
	<pre>
<span style="color: #0000ff;">public</span> <span style="color: #0000ff;">object</span> Convert(<span style="color: #0000ff;">object</span> value, Type targetType, <span style="color: #0000ff;">object</span><span style="color: #000000;"> parameter, CultureInfo culture) 
        { 

            </span><span style="color: #0000ff;">return</span> String.Format(<span style="color: #800000;">"</span><span style="color: #800000;">{0:f2}</span><span style="color: #800000;">"</span><span style="color: #000000;">, value); 
        }</span></pre>
</div>

<p>
	&nbsp;
</p>

<h3>
	属性的嵌套绑定
</h3>

<div class="cnblogs_code">
	<pre>
<span style="color: #0000ff;">&lt;</span><span style="color: #800000;">Border </span><span style="color: #ff0000;">BorderThickness</span><span style="color: #0000ff;">="1"</span><span style="color: #ff0000;"> Height</span><span style="color: #0000ff;">="130"</span><span style="color: #ff0000;"> Canvas.Left</span><span style="color: #0000ff;">="72"</span><span style="color: #ff0000;"> Canvas.Top</span><span style="color: #0000ff;">="515"</span><span style="color: #ff0000;"> Width</span><span style="color: #0000ff;">="68"</span><span style="color: #ff0000;"> BorderBrush</span><span style="color: #0000ff;">="</span><span style="color: #808000;">{Binding ItemList[mainhand].BorderBrush]}</span><span style="color: #0000ff;">"</span><span style="color: #ff0000;">  Tap</span><span style="color: #0000ff;">="MainHand_Tap"</span><span style="color: #0000ff;">&gt;</span> 
    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">Border.Background</span><span style="color: #0000ff;">&gt;</span> 
        <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">ImageBrush </span><span style="color: #ff0000;">ImageSource</span><span style="color: #0000ff;">="</span><span style="color: #808000;">{Binding ItemList[mainhand].BorderBackGround}</span><span style="color: #0000ff;">"</span><span style="color: #0000ff;">/&gt;</span> 
    <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">Border.Background</span><span style="color: #0000ff;">&gt;</span> 
    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">Image </span><span style="color: #ff0000;">Source</span><span style="color: #0000ff;">="</span><span style="color: #808000;">{Binding ItemList[mainhand].ItemImage}</span><span style="color: #0000ff;">"</span><span style="color: #ff0000;"> Stretch</span><span style="color: #0000ff;">="None"</span><span style="color: #ff0000;"> Height</span><span style="color: #0000ff;">="128"</span><span style="color: #ff0000;"> Width</span><span style="color: #0000ff;">="64"</span><span style="color: #ff0000;"> Margin</span><span style="color: #0000ff;">="0,0,0,0"</span><span style="color: #0000ff;">/&gt;</span> 
<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">Border</span><span style="color: #0000ff;">&gt;</span></pre>
</div>

<p>
	&nbsp;
</p>

<p>
	这个page的DataContext是Hero hero，而Hero的部分结构如下：
</p>

<div class="cnblogs_code">
	<pre>
<span style="color: #0000ff;">public</span> <span style="color: #0000ff;">class</span><span style="color: #000000;"> Hero 
{ 
    </span><span style="color: #0000ff;">private</span> <span style="color: #0000ff;">int</span><span style="color: #000000;"> id; 
    </span><span style="color: #0000ff;">private</span> <span style="color: #0000ff;">string</span><span style="color: #000000;"> name; 
</span><span style="color: #008000;">//</span><span style="color: #008000;">。。。&lt;/span>

    <span style="color: #0000ff;">private</span> Dictionary&lt;<span style="color: #0000ff;">string</span>, Item&gt; itemList = <span style="color: #0000ff;">new</span> Dictionary&lt;<span style="color: #0000ff;">string</span>, Item&gt;();</pre>
</div>

<p>
	&nbsp;
</p>

<p>
	主手武器的图片，如果用code behind方式写，对应代码中的hero.ItemList[&ldquo;mainhand&rdquo;].ItemImage。XAML方式则对应为：&quot;{Binding ItemList[mainhand].ItemImage}" 。注意mainhand属性在xaml中没有了双引号。
</p>

<h3>
	属性的嵌套绑定2
</h3>

<div class="cnblogs_code">
	<pre>
<span style="color: #0000ff;">&lt;</span><span style="color: #800000;">Image </span><span style="color: #ff0000;">Canvas.Left</span><span style="color: #0000ff;">="254"</span><span style="color: #ff0000;"> Canvas.Top</span><span style="color: #0000ff;">="38"</span><span style="color: #ff0000;"> Source</span><span style="color: #0000ff;">="</span><span style="color: #808000;">{Binding SkillList[1].SkillImage}</span><span style="color: #0000ff;">"</span><span style="color: #ff0000;"> Stretch</span><span style="color: #0000ff;">="None"</span><span style="color: #ff0000;"> Tap</span><span style="color: #0000ff;">="Skill1_Tap"</span><span style="color: #0000ff;">&gt;&lt;/</span><span style="color: #800000;">Image</span><span style="color: #0000ff;">&gt;</span></pre>
</div>

<p>
	这是Skill中的鼠标右键技能，大菠萝目前一共有2个鼠标技能，4个Action技能，4个被动技能（资料片之前是3个），代码中简单的用SkillList包含了这10个技能。所以对于鼠标右键技能，绑定的Xaml就变成了"{Binding SkillList[1].SkillImage}" ，同理，对于第一个被动技能，则对应的是="{Binding SkillList[6].SkillImage}"
</p>

<h2>
	代码相关
</h2>

<h3>
	Unix时间的转换
</h3>

<p>
	D3中的last updated是Unix时间，是一个ulong类型的值，转换为DateTime的代码如下:
</p>

<div class="cnblogs_code">
	<pre>
DateTime unix = <span style="color: #0000ff;">new</span> DateTime(<span style="color: #800080;">1970</span>, <span style="color: #800080;">1</span>, <span style="color: #800080;">1</span>, <span style="color: #800080;">0</span>, <span style="color: #800080;">0</span>, <span style="color: #800080;">0</span><span style="color: #000000;">, DateTimeKind.Utc); 
DateTime last </span>= unix.AddSeconds(lastUpdated);</pre>
</div>

<p>
	&nbsp;
</p>

<h3>
	文件名过长
</h3>

<p>
	为了提高效率，对于装备的图片，代码中进行了缓存，保存在该应用的IsolatedStorage目录下。D3中的tooltip名字都很长，Windows系统中，路径+文件名长度不能超过260个字节。所以简单的做法，是对文件名做了一个Hash，来作为缓存文件名称。（当然，会有偶尔的冲突，这个代码没有做处理）
</p>

<div class="cnblogs_code">
	<pre>
localfile = Math.Abs(localfile.GetHashCode()).ToString();<span style="color: #008000;">//</span><span style="color: #008000;">localfile就是本地缓存的文件名。&lt;/span></pre>
</div>

<p>
	&nbsp;
</p>

<h3>
	手机可用空间
</h3>

<div class="cnblogs_code">
	<pre>
<span style="color: #0000ff;">string</span> free =<span style="color: #000000;"> String.Empty; 

</span><span style="color: #0000ff;">long</span> freeSize=<span style="color: #000000;">IsolatedStorageFile.GetUserStoreForApplication().AvailableFreeSpace;

</span><span style="color: #0000ff;">if</span> (freeSize &gt;&gt; <span style="color: #800080;">30</span> &gt;= <span style="color: #800080;">1</span>) free = String.Format(<span style="color: #800000;">"</span><span style="color: #800000;">{0:N0}GB</span><span style="color: #800000;">"</span>, (freeSize &gt;&gt; <span style="color: #800080;">30</span><span style="color: #000000;">)); 
</span><span style="color: #0000ff;">else</span> <span style="color: #0000ff;">if</span> (freeSize &gt;&gt; <span style="color: #800080;">20</span> &gt;= <span style="color: #800080;">1</span>) free = String.Format(<span style="color: #800000;">"</span><span style="color: #800000;">{0:N0}MB</span><span style="color: #800000;">"</span>, (freeSize &gt;&gt; <span style="color: #800080;">20</span><span style="color: #000000;">)); 
</span><span style="color: #0000ff;">else</span> <span style="color: #0000ff;">if</span> (freeSize &gt;&gt; <span style="color: #800080;">10</span> &gt;= <span style="color: #800080;">1</span>) free = String.Format(<span style="color: #800000;">"</span><span style="color: #800000;">{0:N0}KB</span><span style="color: #800000;">"</span>, (freeSize &gt;&gt; <span style="color: #800080;">10</span><span style="color: #000000;">)); 
</span><span style="color: #0000ff;">else</span> free = String.Format(<span style="color: #800000;">"</span><span style="color: #800000;">{0:N0}</span><span style="color: #800000;">"</span>, freeSize);</pre>
</div>

<p>
	&nbsp;
</p>

<h3>
	读取本地资源
</h3>

<div class="cnblogs_code">
	<pre>
<span style="color: #0000ff;">public</span><span style="color: #000000;"> BitmapImage BackGround 
        { 
            </span><span style="color: #0000ff;">get</span><span style="color: #000000;"> 
            { 
                </span><span style="color: #0000ff;">return</span> <span style="color: #0000ff;">new</span> BitmapImage(<span style="color: #0000ff;">new</span> Uri(<span style="color: #800000;">"</span><span style="color: #800000;">/assets/background/</span><span style="color: #800000;">"</span> + <span style="color: #0000ff;">this</span>._class.Replace(<span style="color: #800000;">"</span><span style="color: #800000;">-</span><span style="color: #800000;">"</span>, <span style="color: #800000;">""</span>).ToLower() + <span style="color: #0000ff;">this</span>.male + <span style="color: #800000;">"</span><span style="color: #800000;">_background.jpg</span><span style="color: #800000;">"</span><span style="color: #000000;">, UriKind.Relative)); 

            } 
        }</span></pre>
</div>

<p>
	注意Uri的路径写法。
</p>

<h3>
	展示适配WP屏幕的HTML信息
</h3>

<p>
	<a href="http://images.cnitblog.com/blog/640/201410/271006351594158.png"><img alt="wp_ss_20141024_0009" border="0" height="244" src="http://images.cnitblog.com/blog/640/201410/271006357378516.png" style="display: inline; border-width: 0px;" title="wp_ss_20141024_0009" width="148" /></a>
</p>

<p>
	这是优化过的利用内置WebBrowser展示的我左手华戒的tooltip信息。如果直接用WebBrowser展示，该html会非常小，基本不可读。
</p>

<p>
	对于这个问题，可以通过设置viewport来解决。官方很有价值的一篇文章，请戳这里:<a href="http://blogs.msdn.com/b/iemobile/archive/2011/01/21/managing-the-browser-viewport-in-windows-phone-7.aspx" title="http://blogs.msdn.com/b/iemobile/archive/2011/01/21/managing-the-browser-viewport-in-windows-phone-7.aspx">http://blogs.msdn.com/b/iemobile/archive/2011/01/21/managing-the-browser-viewport-in-windows-phone-7.aspx</a>
</p>

<p>
	放代码如下:
</p>

<div class="cnblogs_code">
	<pre>
StringBuilder sb = <span style="color: #0000ff;">new</span><span style="color: #000000;"> StringBuilder(); 

sb.AppendLine(</span><span style="color: #800000;">"</span><span style="color: #800000;">&lt;html&gt;</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
sb.AppendLine(</span><span style="color: #800000;">"</span><span style="color: #800000;">&lt;html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-us\"&gt;</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
sb.AppendLine(</span><span style="color: #800000;">"</span><span style="color: #800000;">&lt;head xmlns:og=\"http://ogp.me/ns#\" xmlns:fb=\"http://ogp.me/ns/fb#\"&gt;</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
sb.AppendLine(</span><span style="color: #800000;">"</span><span style="color: #800000;">&lt;meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\" /&gt;</span><span style="color: #800000;">"</span>);<span style="color: #008000;">//</span><span style="color: #008000;">这行很重要 </span>
sb.AppendLine(<span style="color: #800000;">"</span><span style="color: #800000;">&lt;meta name=\"viewport\" content=\"width=370,minimum-scale=1\" /&gt;</span><span style="color: #800000;">"</span>);<span style="color: #008000;">//</span><span style="color: #008000;">这行也很重要</span>
<span style="color: #000000;">
sb.AppendLine(</span><span style="color: #800000;">"</span><span style="color: #800000;">&lt;/head&gt;</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
sb.AppendLine(</span><span style="color: #800000;">"</span><span style="color: #800000;">&lt;body style=\"background-color:black\"&gt;</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
sb.AppendLine(lines); </span><span style="color: #008000;">//</span><span style="color: #008000;">这就是D3返回给我的华戒的html描述信息</span>
<span style="color: #000000;">
sb.AppendLine(</span><span style="color: #800000;">"</span><span style="color: #800000;">&lt;/body&gt;</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
sb.AppendLine(</span><span style="color: #800000;">"</span><span style="color: #800000;">&lt;/html&gt;</span><span style="color: #800000;">"</span>);</pre>
</div>

<p>
	&nbsp;
</p>

<h3>
	并行获取数据
</h3>

<p>
	每个英雄有14个装备，每个装备的信息都要单独获取对应的图片及tooltip。如果采用await GetItemByKey的方式，则14个装备的图片全部读完，读取时间至少在8秒之上。
</p>

<p>
	利用Task的并行处理方式，我们的处理效率则大大提高了。
</p>

<h4>
	性能差的方式
</h4>

<div class="cnblogs_code" onclick="cnblogs_code_show('089e7597-86e2-4ce2-b738-142a28e4ec4b')">
	<img alt="" class="code_img_closed" id="code_img_closed_089e7597-86e2-4ce2-b738-142a28e4ec4b" src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" /><img alt="" class="code_img_opened" id="code_img_opened_089e7597-86e2-4ce2-b738-142a28e4ec4b" onclick="cnblogs_code_hide('089e7597-86e2-4ce2-b738-142a28e4ec4b',event)" src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" style="display: none;" />
	<div class="cnblogs_code_hide" id="cnblogs_code_open_089e7597-86e2-4ce2-b738-142a28e4ec4b">
		<pre>
list.Add(<span style="color: #800000;">"</span><span style="color: #800000;">head</span><span style="color: #800000;">"</span>, <span style="color: #0000ff;">await</span> GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">head</span><span style="color: #800000;">"</span><span style="color: #000000;">)); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">torso</span><span style="color: #800000;">"</span>, <span style="color: #0000ff;">await</span> GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">torso</span><span style="color: #800000;">"</span><span style="color: #000000;">)); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">feet</span><span style="color: #800000;">"</span>, <span style="color: #0000ff;">await</span> GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">feet</span><span style="color: #800000;">"</span><span style="color: #000000;">)); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">hands</span><span style="color: #800000;">"</span>, <span style="color: #0000ff;">await</span> GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">hands</span><span style="color: #800000;">"</span><span style="color: #000000;">)); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">shoulders</span><span style="color: #800000;">"</span>, <span style="color: #0000ff;">await</span> GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">shoulders</span><span style="color: #800000;">"</span><span style="color: #000000;">)); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">legs</span><span style="color: #800000;">"</span>, <span style="color: #0000ff;">await</span> GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">legs</span><span style="color: #800000;">"</span><span style="color: #000000;">)); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">bracers</span><span style="color: #800000;">"</span>, <span style="color: #0000ff;">await</span> GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">bracers</span><span style="color: #800000;">"</span><span style="color: #000000;">)); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">mainhand</span><span style="color: #800000;">"</span>, <span style="color: #0000ff;">await</span> GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">mainHand</span><span style="color: #800000;">"</span><span style="color: #000000;">)); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">offhand</span><span style="color: #800000;">"</span>, <span style="color: #0000ff;">await</span> GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">offHand</span><span style="color: #800000;">"</span><span style="color: #000000;">)); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">waist</span><span style="color: #800000;">"</span>, <span style="color: #0000ff;">await</span> GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">waist</span><span style="color: #800000;">"</span><span style="color: #000000;">)); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">rightfinger</span><span style="color: #800000;">"</span>, <span style="color: #0000ff;">await</span> GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">rightFinger</span><span style="color: #800000;">"</span><span style="color: #000000;">)); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">leftfinger</span><span style="color: #800000;">"</span>, <span style="color: #0000ff;">await</span> GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">leftFinger</span><span style="color: #800000;">"</span><span style="color: #000000;">)); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">neck</span><span style="color: #800000;">"</span>, <span style="color: #0000ff;">await</span> GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">neck</span><span style="color: #800000;">"</span><span style="color: #000000;">)); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">special</span><span style="color: #800000;">"</span>, <span style="color: #0000ff;">await</span> GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">special</span><span style="color: #800000;">"</span>));</pre>
	</div>
	<span class="cnblogs_code_collapse">View Code</span>
</div>

<p>
	&nbsp;
</p>

<h4>
	高性能的方式
</h4>

<div class="cnblogs_code" onclick="cnblogs_code_show('88fa032f-ceb6-4414-abec-ba6bf8df048e')">
	<img alt="" class="code_img_closed" id="code_img_closed_88fa032f-ceb6-4414-abec-ba6bf8df048e" src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" /><img alt="" class="code_img_opened" id="code_img_opened_88fa032f-ceb6-4414-abec-ba6bf8df048e" onclick="cnblogs_code_hide('88fa032f-ceb6-4414-abec-ba6bf8df048e',event)" src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" style="display: none;" />
	<div class="cnblogs_code_hide" id="cnblogs_code_open_88fa032f-ceb6-4414-abec-ba6bf8df048e">
		<pre>
Task&lt;Item&gt; head = GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">head</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
Task</span>&lt;Item&gt; torso = GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">torso</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
Task</span>&lt;Item&gt; feet = GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">feet</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
Task</span>&lt;Item&gt; hands = GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">hands</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
Task</span>&lt;Item&gt; shoulders = GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">shoulders</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
Task</span>&lt;Item&gt; legs = GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">legs</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
Task</span>&lt;Item&gt; bracers = GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">bracers</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
Task</span>&lt;Item&gt; mainhand = GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">mainHand</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
Task</span>&lt;Item&gt; offhand = GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">offHand</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
Task</span>&lt;Item&gt; waist = GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">waist</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
Task</span>&lt;Item&gt; rightfinger = GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">rightFinger</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
Task</span>&lt;Item&gt; leftfinger = GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">leftFinger</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
Task</span>&lt;Item&gt; neck = GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">neck</span><span style="color: #800000;">"</span><span style="color: #000000;">); 
Task</span>&lt;Item&gt; special = GetItemByKey(person, <span style="color: #800000;">"</span><span style="color: #800000;">special</span><span style="color: #800000;">"</span>);</pre>
	</div>
	<span class="cnblogs_code_collapse">View Code</span>
</div>

<p>
	//上面代码会立刻返回，只是定义了task而已。
</p>

<p>
	await Task.WhenAll(head, torso, feet, hands, shoulders, legs, bracers, mainhand, offhand, waist, rightfinger, leftfinger, neck, special);
</p>

<p>
	//这行代码会并行执行这14个任务，等待所有信息完成。
</p>

<div class="cnblogs_code" onclick="cnblogs_code_show('cc635f62-03c8-48d2-ad54-48bbf27508a0')">
	<img alt="" class="code_img_closed" id="code_img_closed_cc635f62-03c8-48d2-ad54-48bbf27508a0" src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" /><img alt="" class="code_img_opened" id="code_img_opened_cc635f62-03c8-48d2-ad54-48bbf27508a0" onclick="cnblogs_code_hide('cc635f62-03c8-48d2-ad54-48bbf27508a0',event)" src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" style="display: none;" />
	<div class="cnblogs_code_hide" id="cnblogs_code_open_cc635f62-03c8-48d2-ad54-48bbf27508a0">
		<pre>
list.Add(<span style="color: #800000;">"</span><span style="color: #800000;">head</span><span style="color: #800000;">"</span><span style="color: #000000;">, head.Result); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">torso</span><span style="color: #800000;">"</span><span style="color: #000000;">, torso.Result); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">feet</span><span style="color: #800000;">"</span><span style="color: #000000;">, feet.Result); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">hands</span><span style="color: #800000;">"</span><span style="color: #000000;">, hands.Result); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">shoulders</span><span style="color: #800000;">"</span><span style="color: #000000;">, shoulders.Result); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">legs</span><span style="color: #800000;">"</span><span style="color: #000000;">, legs.Result); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">bracers</span><span style="color: #800000;">"</span><span style="color: #000000;">, bracers.Result); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">mainhand</span><span style="color: #800000;">"</span><span style="color: #000000;">, mainhand.Result); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">offhand</span><span style="color: #800000;">"</span><span style="color: #000000;">, offhand.Result); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">waist</span><span style="color: #800000;">"</span><span style="color: #000000;">, waist.Result); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">rightfinger</span><span style="color: #800000;">"</span><span style="color: #000000;">, rightfinger.Result); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">leftfinger</span><span style="color: #800000;">"</span><span style="color: #000000;">, leftfinger.Result); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">neck</span><span style="color: #800000;">"</span><span style="color: #000000;">, neck.Result); 
list.Add(</span><span style="color: #800000;">"</span><span style="color: #800000;">special</span><span style="color: #800000;">"</span>, special.Result);</pre>
	</div>
	<span class="cnblogs_code_collapse">View Code</span>
</div>

<p>
	//14个任务的结果加入到list中。
</p>

<h3>
	判断Json片段是否为空
</h3>

<div class="cnblogs_code">
	<pre>
<span style="color: #0000ff;">private</span> <span style="color: #0000ff;">async</span> Task&lt;List&lt;Skill&gt;&gt;<span style="color: #000000;"> GetSkillList(dynamic skills) 
{ 
    List</span>&lt;Skill&gt; skillList = <span style="color: #0000ff;">new</span> List&lt;Skill&gt;<span style="color: #000000;">(); 
    </span><span style="color: #0000ff;">foreach</span> (<span style="color: #0000ff;">var</span> skill <span style="color: #0000ff;">in</span><span style="color: #000000;"> skills) 
    { 
        </span><span style="color: #0000ff;">if</span> (skill.ToString()!=<span style="color: #800000;">"</span><span style="color: #800000;">{}</span><span style="color: #800000;">"</span>)<span style="color: #008000;">//</span><span style="color: #008000;">skill不是null，如果不存在，则对应{}</span></pre>
</div>

<p>
	&nbsp;
</p>

<h2>
	发布到商店
</h2>

<h4>
	WebBrowser的权限
</h4>

<p>
	如果应用中用了WebBrowser，则需要指定相关权限。具体位置在：project-Properties-WMAppManifest.xml-Capabilities中，要check上ID_CAP_WEBBROWSERCOMPONENT
</p>

<h4>
	SL8.1版本的发布
</h4>

<p>
	对于SL8.1版本的WP应用，Package.appxmanifest文件的内容，要做修改。我这个程序是从8.0升级上来的，所以还是SL内核的版本，如果是一个新建的8.1WP应用，则无需做下面的修改。
</p>

<ul>
	<li>
		&lt;publisherDiaplsyName&gt;与开发商名字一致
	</li>
	<li>
		&lt;Identity&gt;下面的Name要与你在dev center中预留的名字一致
	</li>
	<li>
		&lt;Publisher&gt;与dev center中的开发商GUID一致
	</li>
</ul>

<h4>
	Deploy error: Package could not be registered
</h4>

<p>
	官方论坛上有这个解答：&lt;a href="https://social.msdn.microsoft.com/Forums/en-US/da89f2ee-03b6-43ed-aa21-97ef091798c9/deploy-error-package-could-not-be-registered?forum=WindowsPhonePreviewSDK" title="https://social.msdn.microsoft.com/Forums/en-US/da89f2ee-03b6-43ed-aa21-97ef091798c9/deploy-error-package-could-not-be-registered?forum=WindowsPhonePreviewSDK">https://social.msdn.microsoft.com/Forums/en-US/da89f2ee-03b6-43ed-aa21-97ef091798c9/deploy-error-package-could-not-be-registered?forum=WindowsPhonePreviewSDK</a>
</p>

<h4>
	8.1的系列官方blog
</h4>

<p>
	<a href="http://blogs.msdn.com/b/thunbrynt/archive/2014/03/31/windows-phone-8-1-for-developers-overview.aspx" title="http://blogs.msdn.com/b/thunbrynt/archive/2014/03/31/windows-phone-8-1-for-developers-overview.aspx">http://blogs.msdn.com/b/thunbrynt/archive/2014/03/31/windows-phone-8-1-for-developers-overview.aspx</a>
</p>

<p>
	原文：http://www.cnblogs.com/juqiang/p/4053548.html
</p>