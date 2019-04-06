---
layout:     post
title:      "WindowsPhone模拟Toast弹出框"
date:       2014-01-08 09:14:12 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	Coding4Fun这个开源控件中有ToastPrompt这个弹出框组件，但是由于<span style="font-size: 13px;">Coding4Fun太庞大，</span>如果只用到&lt;span style="font-size: 13px;">ToastPrompt这个控件的话，整个引用不太值当的。于是自己写了一个差不多的简易Toast，如果需要其他功能可以酌情添加。包含向右滑动取消弹出的功能。&lt;/span>
</p>

<p>
	<a href="http://www.liubaicai.net/wp-content/uploads/2014/01/20140109172732.png"><img alt="20140109172732" class="alignnone size-medium wp-image-255" height="153" src="http://www.liubaicai.net/wp-content/uploads/2014/01/20140109172732-300x153.png" width="300" /></a>
</p>

<p>
	考虑用Popup弹出框，首先定义一个弹出的UserControl，包含一个Message文本框和弹出结束的对应动画:
</p>

<pre class="brush:xml;">
&lt;UserControl x:Name="userControl" x:Class="Toast.ToastBox"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    mc:Ignorable="d"
    FontFamily="{StaticResource PhoneFontFamilyNormal}"
    FontSize="{StaticResource PhoneFontSizeNormal}"
    Foreground="{StaticResource PhoneForegroundBrush}"
    Width="480" Height="62"&gt;
	&lt;UserControl.Resources&gt;
		&lt;Storyboard x:Name="Open"&gt;
			&lt;DoubleAnimationUsingKeyFrames Storyboard.TargetProperty="(UIElement.Projection).(PlaneProjection.GlobalOffsetX)" Storyboard.TargetName="userControl"&gt;
				&lt;EasingDoubleKeyFrame KeyTime="0" Value="-480"/&gt;
				&lt;EasingDoubleKeyFrame KeyTime="0:0:0.3" Value="0"/&gt;
			&lt;/DoubleAnimationUsingKeyFrames&gt;
			&lt;DoubleAnimationUsingKeyFrames Storyboard.TargetProperty="(UIElement.Opacity)" Storyboard.TargetName="userControl"&gt;
				&lt;EasingDoubleKeyFrame KeyTime="0" Value="0"/&gt;
				&lt;EasingDoubleKeyFrame KeyTime="0:0:0.3" Value="1"/&gt;
			&lt;/DoubleAnimationUsingKeyFrames&gt;
		&lt;/Storyboard&gt;
		&lt;Storyboard x:Name="Close"&gt;
			&lt;DoubleAnimationUsingKeyFrames Storyboard.TargetProperty="(UIElement.Opacity)" Storyboard.TargetName="userControl"&gt;
				&lt;EasingDoubleKeyFrame KeyTime="0" Value="1"/&gt;
				&lt;EasingDoubleKeyFrame KeyTime="0:0:0.3" Value="0"/&gt;
			&lt;/DoubleAnimationUsingKeyFrames&gt;
			&lt;DoubleAnimationUsingKeyFrames Storyboard.TargetProperty="(UIElement.Projection).(PlaneProjection.GlobalOffsetX)" Storyboard.TargetName="userControl"&gt;
				&lt;EasingDoubleKeyFrame KeyTime="0" Value="0"/&gt;
				&lt;EasingDoubleKeyFrame KeyTime="0:0:0.3" Value="480"/&gt;
			&lt;/DoubleAnimationUsingKeyFrames&gt;
		&lt;/Storyboard&gt;
	&lt;/UserControl.Resources&gt;
	&lt;UserControl.Projection&gt;
		&lt;PlaneProjection/&gt;
	&lt;/UserControl.Projection&gt;
    
    &lt;Grid x:Name="LayoutRoot" Background="{StaticResource PhoneAccentBrush}"&gt;
        &lt;TextBlock x:Name="message" Text="" FontFamily="DengXian" FontSize="20" VerticalAlignment="Top" HorizontalAlignment="Left" Margin="30,30,0,0"/&gt;
    &lt;/Grid&gt;
&lt;/UserControl&gt;</pre>

<pre class="brush:csharp;">
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;

namespace Toast
{
    public partial class ToastBox : UserControl
    {
        public ToastBox()
        {
            InitializeComponent();
        }

        public static readonly DependencyProperty MessageProperty
            = DependencyProperty.Register("Message", typeof(string), typeof(ToastBox), new PropertyMetadata(OnMessageChanged));
        private static void OnMessageChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            if (d != null &amp;&amp; d is ToastBox)
            {
                (d as ToastBox).SetMessage((string)e.NewValue);
            }
        }
        private void SetMessage(string toastBox)
        {
            message.Text = toastBox;
        }
        public string Message
        {
            get
            {
                return (string)GetValue(MessageProperty);
            }
            set
            {
                SetValue(MessageProperty, value);
            }
        }
    }
}</pre>

<p>
	然后新建一个ToastPrompt类:
</p>

<pre class="brush:csharp;">
namespace Toast
{
    public class ToastPrompt
    {
        public event EventHandler Click;
        public event EventHandler Completed;

        public void Show(string message)
        {
            try
            {
                Popup p = new Popup();
                ToastBox tb = new ToastBox() { Message = message };
                p.Child = tb;
                p.IsOpen = true;
                tb.Open.Begin();
                DispatcherTimer timer = new DispatcherTimer();
                tb.Open.Completed += new EventHandler((sender, eventargs) =&gt;
                {
                    try
                    {
                        timer.Interval = TimeSpan.FromSeconds(3);
                        timer.Tick += new EventHandler((sd, ea) =&gt;
                        {
                            try
                            {
                                if (timer != null &amp;&amp; timer.IsEnabled)
                                {
                                    timer.Stop();
                                    tb.Close.Begin();
                                    tb.Close.Completed += new EventHandler((s, e) =&gt;
                                    {
                                        try
                                        {
                                            p.IsOpen = false;
                                            if (Completed != null)
                                                Completed.Invoke(this, new EventArgs());
                                        }
                                        catch { }
                                    });
                                }
                            }
                            catch { }
                        });
                        timer.Start();
                    }
                    catch { }
                });
                tb.Tap += new EventHandler&lt;GestureEventArgs&gt;((sender, eventargs) =&gt;
                {
                    try
                    {
                        if (Click != null)
                            Click.Invoke(this, new EventArgs());
                    }
                    catch { }
                });
                tb.ManipulationCompleted += new EventHandler&lt;ManipulationCompletedEventArgs&gt;((sender, eventargs) =&gt;
                {
                    try
                    {
                        if (eventargs.TotalManipulation.Translation.X &gt; 200 || eventargs.FinalVelocities.LinearVelocity.X &gt; 1000)
                        {
                            if (timer != null &amp;&amp; timer.IsEnabled)
                            {
                                timer.Stop();
                                tb.Close.Begin();
                                tb.Close.Completed += new EventHandler((sd, ea) =&gt;
                                {
                                    try
                                    {
                                        p.IsOpen = false;
                                        if (Completed != null)
                                            Completed.Invoke(this, new EventArgs());
                                    }
                                    catch { }
                                });
                            }
                        }
                    }
                    catch { }
                });
            }
            catch { }
        }
    }
}</pre>

<p>
	至此，一个简易的Toast弹出框就成功了，可以用如下方式调用:
</p>

<pre class="brush:csharp;">
var toast = new ToastPrompt();
toast.Show("再按一次退出程序~~~");</pre>

<p>
	<span style="font-size: 13px;">Toast还有相应的&lt;/span>Completed和Click的事件处理~~~
</p>